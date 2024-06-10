// Importă module necesare
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Creează o aplicație Express
const app = express();
const port = 3001;

// Configurează middleware-ul pentru a parsa cererile cu corp JSON
app.use(bodyParser.json());
// Configurează serverul pentru a servi fișiere statice din directorul 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pentru a gestiona cererile POST către '/submit'
app.post('/submit', (req, res) => {
    // Conține datele trimise prin formular, după ce au fost parsate de 'bodyParser'
    const formData = req.body;
    // Afișează datele formularului în consola serverului
    console.log('Received form data:', formData);
    // Răspunde cu un mesaj JSON pentru a confirma primirea datelor
    res.json({ message: 'Form data received successfully' });
});

// Middleware pentru gestionarea erorilor 404
app.use((req, res, next) => {
    // Dacă niciun alt endpoint nu se potrivește cu cererea, trimite un mesaj de eroare 404
    res.status(404).send('404 - Page Not Found');
});

// Pornește serverul și îl face să asculte pe portul specificat (3000)
app.listen(port, () => {
    // Când serverul pornește, afișează un mesaj în consolă
    console.log(`Server running at http://localhost:${port}/`);
});
