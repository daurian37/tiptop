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
            return res.status(401).json("Aucun utilisateur ne correspond à ce compte.");
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);

        if (!passwordIsValid) {
            return res.status(401).json("Email ou mot de passe incorrect");
        }
        // Créer un token avec l'email de l'utilisateur
        const token = jwt.sign({ email: req.body.email }, "secret_key", { expiresIn: "1h" });

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

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sqlInsert = "INSERT INTO user (email, firstname, lastname, password) VALUES (?, ?, ?, ?)";
        const valuesInsert = [req.body.email, req.body.firstname, req.body.lastname, hash];

        db.query(sqlInsert, valuesInsert, (err, result) => {
            if (err) {
                res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur");
                return;
            }
            res.status(201).send("Utilisateur enregistré");
        });
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
