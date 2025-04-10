const express = require('express');
const router = express.Router();
const path = require('path'); // Módulo para trabalhar com caminhos de arquivos
const fs = require('fs'); // Módulo para ler arquivos

// Rota para buscar os produtos no arquivo JSON
router.get('/produtos', (req, res) => {
    const filePath = path.join(__dirname, 'data/produtos.json'); // Ajuste para o local do arquivo JSON

    try {
        const data = fs.readFileSync(filePath, 'utf8'); // Lê o arquivo JSON
        const produtos = JSON.parse(data); // Converte o conteúdo do arquivo para objeto
        res.json(produtos); // Envia os dados como resposta
    } catch (erro) {
        console.error("Erro ao ler o arquivo JSON:", erro);
        res.status(500).json({ erro: "Erro ao carregar os produtos" });
    }
});

module.exports = router;

