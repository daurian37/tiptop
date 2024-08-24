const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
const path = require("path");

// A decomenter avant de lancer la création de l'image docker
// const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
env.config();

const port = 8000 || process.env.PORT;

// Configuration de la base de données MySQL (pour lancer le serveur Docker)
// const db = mysql.createConnection({
//   host: "db",
//   user: "tiptop_user",
//   password: "password",
//   database: "tiptop",
//   port: 3306,
// });

// Middleware pour enregistrer les logs des requêtes
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      clientIp: req.ip || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"],
      requestedFrom: req.headers['x-requested-from'] || 'Unknown',
      requestBody: req.body,
      queryParams: req.query,
    };
    fs.appendFileSync(
      path.join(__dirname, "app.log"),
      JSON.stringify(log) + "\n"
    );
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Welcome ");
});

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Vérifier le token
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.email = decoded.email;
    next();
  });
};

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(result);
  });
});

app.get("/profile", verifyToken, (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  const email = req.email;

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(result[0]);
  });
});

app.put("/profile", verifyToken, (req, res) => {
  const { firstname, lastname, email, newPassword } = req.body;
  const currentEmail = req.email;

  if (!firstname || !lastname || !email) {
    return res
      .status(400)
      .json({ message: "Les champs prénom, nom et email sont obligatoires" });
  }

  // Vérifier si un nouveau mot de passe est fourni et valider
  if (newPassword) {
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!newPassword.match(validPassword)) {
      return res
        .status(400)
        .json({
          message:
            "Le mot de passe doit contenir entre 8 et 20 caractères, inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.",
        });
    }
  }

  let sql =
    "UPDATE user SET firstname = ?, lastname = ?, email = ? WHERE email = ?";
  let values = [firstname, lastname, email, currentEmail];

  if (newPassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    sql =
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ? WHERE email = ?";
    values = [firstname, lastname, email, hash, currentEmail];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Informations mises à jour avec succès" });
  });
});

app.get("/tickets/users", (req, res) => {
  const sqlUser = "SELECT * FROM user";
  db.query(sqlUser, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const userId = result[0].id;

    const sqlTickets = `
                SELECT 
                    t.idTicket,
                    t.title AS ticketTitle,
                    j.title AS gameTitle,
                    j.date_debut AS dateDebut,
                    j.date_fin AS dateFin,
                    l.title AS lotTitle,
                    u.id AS userId,
                    u.email AS userEmail,
                    u.firstname AS userFirstname,
                    u.lastname AS userLastname
                FROM 
                    ticket t
                JOIN 
                    jeu j ON t.idJeu = j.idJeu
                LEFT JOIN 
                    lot l ON t.idTicket = l.idTicket
                JOIN
                    user u ON t.idUser = u.id
                WHERE 
                    t.idUser = ?;
            `;

    db.query(sqlTickets, [userId], (err, tickets) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        user: result[0],
        tickets: tickets,
      });
    });
  });
});

app.get("/tickets", verifyToken, (req, res) => {
  const email = req.email;
  if (!email) {
    return res.status(400).json({ message: "Email requis" });
  }

  // Requête pour obtenir l'utilisateur par son email
  const sqlUser = "SELECT * FROM user WHERE email = ?";
  db.query(sqlUser, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const userId = result[0].id;

    const sqlTickets = `
                SELECT 
                    t.idTicket,
                    t.title AS ticketTitle,
                    j.title AS gameTitle,
                    j.date_debut AS dateDebut,
                    j.date_fin AS dateFin,
                    l.title AS lotTitle
                FROM 
                    ticket t
                JOIN 
                    jeu j ON t.idJeu = j.idJeu
                LEFT JOIN 
                    lot l ON t.idTicket = l.idTicket
                WHERE 
                    t.idUser = ?;
            `;

    db.query(sqlTickets, [userId], (err, tickets) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        user: result[0],
        tickets: tickets,
      });
    });
  });
});

app.get("/list/ticket", (req, res) => {
  const sqlTickets = `
        SELECT t.idTicket, t.title AS ticketTitle, t.idUser, t.idJeu, j.title AS jeuTitle, j.description AS jeuDescription, j.nbre_participant, j.date_debut, j.date_fin 
        FROM ticket t 
        JOIN jeu j ON t.idJeu = j.idJeu
    `;

  db.query(sqlTickets, (err, tickets) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ tickets });
  });
});

// Afficher tous les tickets
app.get("/list/tickets", (req, res) => {
  const sql = "SELECT * FROM `ticket`";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

app.get("/list/lots", (req, res) => {
  const sql = "SELECT * FROM `lot`";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

app.get("/lots/users", (req, res) => {
  const sql = `
        SELECT l.idLot, l.title AS lotTitle, t.title AS ticketTitle, t.idUser AS idUser,
            u.firstname, u.lastname
        FROM lot l
        LEFT JOIN ticket t ON l.idTicket = t.idTicket
        LEFT JOIN user u ON t.idUser = u.id
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

app.get("/lots", verifyToken, (req, res) => {
  const email = req.email;
  if (!email) {
    return res.status(400).json({ message: "Email requis" });
  }

  const sqlUser = "SELECT * FROM user WHERE email = ?";
  db.query(sqlUser, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const userId = result[0].id;

    const sql = `
            SELECT l.idLot, l.title AS lotTitle, t.title AS ticketTitle
            FROM lot l
            LEFT JOIN ticket t ON l.idTicket = t.idTicket
            WHERE t.idUser = ?
        `;

    db.query(sql, [userId], (err, lots) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ user: result[0], lots: lots });
    });
  });
});

app.get("/jeu", (req, res) => {
  const sql = "SELECT * FROM jeu";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE email =?";
  const values = [req.body.email];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json(err);
    }

    if (!result.length) {
      return res
        .status(401)
        .json("Aucun utilisateur ne correspond à ce compte.");
    }

    const user = result[0];
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }

    const token = jwt.sign(
      { email: req.body.email, category: user.idCategorie_user },
      "secret_key"
    );

    // Envoyer le token en réponse
    return res.json({ message: "Connexion réussie", token: token });
  });
});

app.post("/register", (req, res) => {
  const ifUserALreadyExist = "SELECT * FROM user WHERE email = ?";
  const values = [req.body.email];

  db.query(ifUserALreadyExist, values, (err, result) => {
    if (err) {
      return res.json(err);
    }

    if (result.length) {
      return res.status(409).json("Un utilisateur avec cet email existe déjà");
    }

    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!req.body.password.match(validPassword)) {
      return res
        .status(400)
        .json(
          "Mot de passe incorrect. Il doit contenir entre 8 et 20 caractères, inclure au moins une lettre majuscule, une lettre minuscule et un chiffre."
        );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const sqlInsert =
      "INSERT INTO user (email, firstname, lastname, password, idCategorie_user) VALUES (?, ?, ?, ?, ?)";
    const valuesInsert = [
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      hash,
      2,
    ];

    db.query(sqlInsert, valuesInsert, (err, result) => {
      if (err) {
        res
          .status(500)
          .send("Erreur lors de l'enregistrement de l'utilisateur");
        return;
      }
      res.status(201).send("Utilisateur enregistré");
    });
  });
});

// Vérification si le ticket existe déjà dans la table lot
app.get("/api/checkTicketInLot/:ticketNumber", verifyToken, (req, res) => {
  const ticketNumber = req.params.ticketNumber;
  const email = req.email;

  if (!email) {
    return res.status(400).json({ message: "Email requis" });
  }

  // Requête pour obtenir l'utilisateur par son email
  const sqlUser = "SELECT id FROM user WHERE email = ?";

  db.query(sqlUser, [email], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const userId = result[0].id;

    // Requête pour vérifier si le ticket appartient à l'utilisateur et s'il est dans un lot
    const query = `
            SELECT lot.*
            FROM lot
            JOIN ticket ON lot.idTicket = ticket.idTicket
            WHERE ticket.title = ? AND ticket.idUser = ?
        `;

    db.query(query, [ticketNumber, userId], (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification du ticket :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la vérification du ticket" });
      }

      if (results.length > 0) {
        res.json({ exists: true });
      } else {
        const userTicketQuery =
          "SELECT * FROM ticket WHERE title = ? AND idUser = ?";
        db.query(
          userTicketQuery,
          [ticketNumber, userId],
          (err, userTicketResults) => {
            if (err) {
              console.error(
                "Erreur lors de la vérification du ticket utilisateur :",
                err
              );
              return res
                .status(500)
                .json({
                  error: "Erreur lors de la vérification du ticket utilisateur",
                });
            }

            if (userTicketResults.length === 0) {
              res
                .status(403)
                .json({ message: "Ce ticket ne vous appartient pas." });
            } else {
              res.json({ exists: false });
            }
          }
        );
      }
    });
  });
});

// Route pour récupérer le numero de ticket entré par l'utilisateur
app.get("/api/ticket/:ticketNumber", (req, res) => {
  const ticketNumber = req.params.ticketNumber;
  const query = "SELECT * FROM ticket WHERE title = ?";
  db.query(query, [ticketNumber], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données" });
      return;
    }
    if (results.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });
});

// route pour enregistrer un lot gagné
app.post("/api/lot", (req, res) => {
  const { title, idTicket } = req.body;

  if (!title || !idTicket) {
    return res
      .status(400)
      .json({ error: "Les champs title et idTicket sont requis" });
  }

  // Vérifiez que le ticket existe et récupérez son id
  const ticketQuery = "SELECT idTicket FROM ticket WHERE title = ?";
  db.query(ticketQuery, [idTicket], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du ticket :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du ticket" });
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    const ticketId = results[0].idTicket;

    // Insérez le lot dans la table lot avec l'id du ticket
    const lotQuery = "INSERT INTO lot (title, idTicket) VALUES (?, ?)";
    db.query(lotQuery, [title, ticketId], (err, results) => {
      if (err) {
        console.error("Erreur lors de l'enregistrement du lot (serveur):", err);
        res
          .status(500)
          .json({ error: "Erreur lors de l'enregistrement du lot (serveur)" });
        return;
      }
      res.status(201).json({
        message: "Lot enregistré avec succès",
        lotId: results.insertId,
      });
    });
  });
});

app.put("/api/lot/:idLot", (req, res) => {
  const { idLot } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Le champs titre est requis" });
  }

  // Vérifiez si le lot existe
  const checkLotQuery = "SELECT idLot FROM lot WHERE idLot = ?";
  db.query(checkLotQuery, [idLot], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du lot :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération du lot" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Lot non trouvé" });
    }

    // Mise à jour du lot
    const updateLotQuery = "UPDATE lot SET title = ? WHERE idLot = ?";
    db.query(updateLotQuery, [title, idLot], (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du lot :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du lot" });
      }

      // Réponse de succès
      res.status(200).json({ message: "Lot mis à jour avec succès" });
    });
  });
});

app.put("/api/jeu/:idJeu", (req, res) => {
  const { idJeu } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Titre requis" });
  }

  const sql = "SELECT idJeu FROM jeu WHERE idJeu = ?";

  db.query(sql, [idJeu], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération du jeu :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération du lot" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Jeu non trouvé" });
    }

    const updatedJeuQuery = "UPDATE jeu SET title = ? WHERE idJeu = ?";
    db.query(updatedJeuQuery, [title, idJeu], (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return res.json({ status: "success" });
    });
  });
});
//route pour récupérer tous les lots
app.get("/api/totalLots", (req, res) => {
  const query = "SELECT * FROM lot";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des lots :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des lots" });
      return;
    }
    res.json(results);
  });
});

app.get("/protected-route", verifyToken, (req, res) => {
  // Si le token est valide, vous pouvez utiliser req.email pour accéder à l'adresse e-mail de l'utilisateur
  res.json({ message: "Access granted", email: req.email });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { email, message, subject, fullname } = req.body;

    if (!email || !message || !subject || !fullname) {
      return res.status(400).json({
        error:
          "Tous les champs sont obligatoires : email, message, sujet, nom complet.",
      });
    }

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: "gwordpress387@gmail.com",
          pass: "nepsgrqvybcvjjah",
        },
      })
    );

    const mailOptions = {
      from: email,
      to: "gwordpress387@gmail.com",
      subject: subject,
      text: `De: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Erreur lors de l'envoi de l'email :", error);
      } else {
        console.log("Email envoyé :", info.response);
      }
    });

    res.json({ message: "Votre message a été envoyé avec succès." });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    res
      .status(500)
      .send("Une erreur s'est produite lors de l'envoi de l'e-mail.");
  }
});

app.post("/logout", (req, res) => {
  res.json({ Message: "Logged out successfully" });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Prêt sur http://localhost:${port}`);
});
