const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
env.config();

const port = 8000 || process.env.PORT;

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
        return res.status(400).json({ message: "Les champs prénom, nom et email sont obligatoires" });
    }

    // Vérifier si un nouveau mot de passe est fourni et valider
    if (newPassword) {
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if (!newPassword.match(validPassword)) {
            return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 20 caractères, inclure au moins une lettre majuscule, une lettre minuscule et un chiffre." });
        }
    }

    let sql = "UPDATE user SET firstname = ?, lastname = ?, email = ? WHERE email = ?";
    let values = [firstname, lastname, email, currentEmail];

    if (newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        sql = "UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ? WHERE email = ?";
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

app.get("/lots/users", (req, res) => {
    const sql = `
        SELECT l.idLot, l.title AS lotTitle, t.title AS ticketTitle
        FROM lot l
        LEFT JOIN ticket t ON l.idTicket = t.idTicket
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

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE email =?";
    const values = [req.body.email];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json(err);
        }

        if (!result.length) {
            return res.status(401).json("Aucun utilisateur ne correspond à ce compte.");
        }

        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json("Email ou mot de passe incorrect");
        }

        const token = jwt.sign({ email: req.body.email, category: user.idCategorie_user }, "secret_key");

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
            return res.status(400).json("Mot de passe incorrect. Il doit contenir entre 8 et 20 caractères, inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sqlInsert = "INSERT INTO user (email, firstname, lastname, password, idCategorie_user) VALUES (?, ?, ?, ?, ?)";
        const valuesInsert = [req.body.email, req.body.firstname, req.body.lastname, hash, 2];

        db.query(sqlInsert, valuesInsert, (err, result) => {
            if (err) {
                res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur");
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
            return res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
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
                return res.status(500).json({ error: "Erreur lors de la vérification du ticket" });
            }

            if (results.length > 0) {
                res.json({ exists: true });
            } else {
                const userTicketQuery = "SELECT * FROM ticket WHERE title = ? AND idUser = ?";
                db.query(userTicketQuery, [ticketNumber, userId], (err, userTicketResults) => {
                    if (err) {
                        console.error("Erreur lors de la vérification du ticket utilisateur :", err);
                        return res.status(500).json({ error: "Erreur lors de la vérification du ticket utilisateur" });
                    }

                    if (userTicketResults.length === 0) {
                        res.status(403).json({ message: "Ce ticket ne vous appartient pas." });
                    } else {
                        res.json({ exists: false });
                    }
                });
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
            res.status(500).json({ error: "Erreur lors de la récupération des données" });
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
        return res.status(400).json({ error: "Les champs title et idTicket sont requis" });
    }

    // Vérifiez que le ticket existe et récupérez son id
    const ticketQuery = "SELECT idTicket FROM ticket WHERE title = ?";
    db.query(ticketQuery, [idTicket], (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération du ticket :", err);
            res.status(500).json({ error: "Erreur lors de la récupération du ticket" });
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
                res.status(500).json({ error: "Erreur lors de l'enregistrement du lot (serveur)" });
                return;
            }
            res.status(201).json({
                message: "Lot enregistré avec succès",
                lotId: results.insertId,
            });
        });
    });
});

//route pour récupérer tous les lots
app.get("/api/totalLots", (req, res) => {
    const query = "SELECT * FROM lot";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des lots :", err);
            res.status(500).json({ error: "Erreur lors de la récupération des lots" });
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
