const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

// Função para conectar ao banco de dados
async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
}

// POST: Recebe itens do carrinho e calcula o total
router.post('/', async (req, res) => {
    const carrinho = req.body.carrinho; // [{ nome: "Chocolate", quantidade: 2 }, ...]
    
    if (!Array.isArray(carrinho) || carrinho.length === 0) {
        return res.status(400).json({ erro: "Carrinho vazio ou inválido!" });
    }

    try {
        await connectDB();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");

        let total = 0;
        let resumo = [];

        for (const item of carrinho) {
            const produto = await colecao.findOne({ nome: item.nome });

            if (produto) {
                total += produto.preco * item.quantidade;
                resumo.push({ nome: produto.nome, preco: produto.preco, quantidade: item.quantidade });
            }
        }

        res.json({ resumo, total });
    } catch (erro) {
        console.error("Erro ao processar carrinho:", erro);
        res.status(500).json({ erro: "Erro ao calcular total do carrinho." });
    }
});

module.exports = router;