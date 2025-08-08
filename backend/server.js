// backend/ server.js
const express =require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
require('dotenv').config();
console.log(process.env.DB_NAME); // verifie que sa marche 
const app = express();

// middlewares

app.use(cors());
app.use(express.json());  // c´est pour lire les requetes json
app.use(bodyParser.json());

// route de text
app.get('/',(req, res) => {
    res.send('Bienvenue sur le backend de Djims Marketplace');
});

// Lancement du serveur 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port${PORT}`);

});

const db =require('./config/db');