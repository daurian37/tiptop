// const express = require("express");
// const mysql = require("mysql");
// const next = require("next");
// const multer = require("multer");
// const path = require("path");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // Configuration de la base de données MySQL (serveur local)
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "ttt",
//   port: 3306,
// });

// // Configuration de la base de données MySQL (serveur Docker)
// // const db = mysql.createConnection({
// //   host: "db",
// //   user: "ttt_user",
// //   password: "password",
// //   database: "ttt",
// //   port: 3306,
// // });

// db.connect((err) => {
//     if (err) {
//       console.error("Erreur de connexion à la base de données :", err);
//       return;
//     }
//     console.log("Connecté à la base de données MySQL");
//   });

//   app.prepare().then(() => {
//     const server = express();
//     server.use(express.json());



//     server.listen(3000, (err) => {
//         if (err) throw err;
//         console.log("> Prêt sur http://localhost:3000");
//       });
//     });
    