const db = require("./db");
const { faker } = require("@faker-js/faker");

const NUM_USERS = 50;
const NUM_TICKETS = 100;
const PASSWORD_HASH = "$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6";

async function createUsers() {
    const users = [];
    for (let i = 0; i < NUM_USERS; i++) {
        const user = [faker.internet.email(), faker.person.firstName(), faker.person.lastName(), PASSWORD_HASH, 2];
        users.push(user);
    }

    const query = "INSERT INTO user (email, firstname, lastname, password, idCategorie_user) VALUES ?";
    db.query(query, [users], (err) => {
        if (err) {
            console.error("Error inserting users:", err);
            return;
        }
        console.log("Les utilisateurs ont été ajouté avec succès.");
    });
}

async function createJeux() {
    const jeux = [];
    const participantsPerGame = Math.floor(NUM_USERS / 5); // 5 jeux
    for (let i = 0; i < 5; i++) {
        const jeu = [`jeu_${i + 1}`, faker.lorem.sentence(), participantsPerGame, faker.date.future(), faker.date.future()];
        jeux.push(jeu);
    }

    const query = "INSERT INTO jeu (title, description, nbre_participant, date_debut, date_fin) VALUES ?";
    db.query(query, [jeux], (err) => {
        if (err) {
            console.error("Error inserting games:", err);
            return;
        }
        console.log("Le jeu a été ajouté avec succès.");
    });
}

async function createTickets() {
    db.query("SELECT id FROM user", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return;
        }

        const users = results;
        const tickets = [];
        const numJeux = 5;
        for (let i = 0; i < NUM_TICKETS; i++) {
            const ticket = [`ticket_${i + 1}`, users[i % users.length].id, (i % numJeux) + 1];
            tickets.push(ticket);
        }

        const query = "INSERT INTO ticket (title, idUser, idJeu) VALUES ?";
        db.query(query, [tickets], (err) => {
            if (err) {
                console.error("Error inserting tickets:", err);
                return;
            }
            console.log("Les tickets ont été ajouté avec succès.");
            // createLots();
        });
    });
}

async function seedDatabase() {
    await createUsers();
    await createJeux();
    await createTickets();
}

seedDatabase();
