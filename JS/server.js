const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

// Autoriser les requêtes front
app.use(cors());
app.use(express.json());

// --- Création / ouverture de la base ---
const db = new sqlite3.Database('database.sqlite');

// --- Création de la table patients si non existante ---
db.run(`
    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        phone TEXT,
        medecin TEXT,
        date_consultation TEXT
    )
`);

// --- Enregistrement d'un patient ---
app.post('/save-patient', (req, res) => {
    const { nom, phone, medecin, date_consultation } = req.body;

    db.run(
        `INSERT INTO patients (nom, phone, medecin, date_consultation)
         VALUES (?,?,?,?)`,
        [nom, phone, medecin, date_consultation],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// --- Récupérer tous les patients ---
app.get('/patients', (req, res) => {
    db.all(`SELECT * FROM patients ORDER BY id DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(rows);
    });
});

// --- Lancement du serveur ---
app.listen(PORT, () => {
    console.log("Serveur opérationnel sur http://localhost:" + PORT);
});
