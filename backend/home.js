const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/home.html'));
    });

// Definição da rota GET para "/home"
router.get('/dados', (req, res) => {
    const dbPath = path.join(__dirname, '../data/produtos.json');
    try {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(data);
    } catch (erro) {
        console.error("Erro ao ler produtos:", erro);
        res.status(500).json({ erro: "Erro ao carregar os produtos" });
    }
});
// Exporta o router para ser usado no app.js
module.exports = router;