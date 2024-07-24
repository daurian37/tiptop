const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());
env.config();

// Configuration de la base de données MySQL (serveur local)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const port = 8000 || process.env.PORT;

// Configuration de la base de données MySQL (serveur Docker)
// const db = mysql.createConnection({
//   host: "db",
//   user: "ttt_user",
//   password: "password",
//   database: "ttt",
//   port: 3306,
// });

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
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

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!passwordIsValid) {
      return res.status(401).json("Email ou mot de passe incorrect");
    }
    // Créer un token avec l'email de l'utilisateur
    const token = jwt.sign({ email: req.body.email }, "secret_key", {
      expiresIn: "1h",
    });

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
app.get("/api/checkTicketInLot/:ticketNumber", (req, res) => {
  const ticketNumber = req.params.ticketNumber;
  const query = `
    SELECT lot.*
    FROM lot
    JOIN ticket ON lot.idTicket = ticket.idTicket
    WHERE ticket.title = ?
  `;

  db.query(query, [ticketNumber], (err, results) => {
    if (err) {
      console.error("Erreur lors de la vérification du ticket :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la vérification du ticket" });
      return;
    }

    if (results.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
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

// Définir la route pour récupérer les lots
app.get('/api/totalLots', (req, res) => {
  const query = 'SELECT * FROM lot';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des lots :', err);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(results);
  });
});

app.get("/protected-route", verifyToken, (req, res) => {
  // Si le token est valide, vous pouvez utiliser req.email pour accéder à l'adresse e-mail de l'utilisateur
  res.json({ message: "Access granted", email: req.email });
});

app.post("/logout", (req, res) => {
  res.json({ Message: "Logged out successfully" });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Prêt sur http://localhost:${port}`);
});
