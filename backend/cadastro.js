const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();
const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

// Middleware para conexão com o MongoDB (garantir que conectamos apenas uma vez)
async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
}

// Rota para buscar os sorvetes do MongoDB
router.get('/', async (req, res) => {
    try {
        await connectDB();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");
        const sorvetes = await colecao.find().toArray();
        res.json(sorvetes);
    } catch (erro) {
        console.error("Erro ao buscar sorvetes:", erro);
        res.status(500).send("Erro ao buscar sorvetes");
    }
});

// Rota para adicionar um novo sorvete no MongoDB
router.post('/adicionar', async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({ erro: "Preencha Todos Os Campos" });
    }

    try {
        await connectDB();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");

        // Verifica se o produto já existe
        const produtoExistente = await colecao.findOne({ nome });

        if (produtoExistente) {
            return res.status(400).json({ erro: "Produto já existe!" });
        }

        await colecao.insertOne({ nome, preco, quantidade });
        res.status(201).json({ mensagem: "Produto adicionado com sucesso!" });
    } catch (erro) {
        console.error("Erro ao adicionar produto:", erro);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

// Rota para atualizar os sorvetes no MongoDB
router.put('/atualizar', async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({ erro: "Preencha Todos Os Campos" });
    }

    try {
        await connectDB();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");

        const resultado = await colecao.updateOne({ nome }, { $set: { preco, quantidade } });

        if (resultado.matchedCount > 0) {
            res.json({ mensagem: "Produto atualizado com sucesso!" });
        } else {
            res.status(404).json({ erro: "Produto não encontrado!" });
        }
    } catch (erro) {
        console.error("Erro ao atualizar:", erro);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

module.exports = router; // Agora exportamos o router corretamente
