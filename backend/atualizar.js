const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3001;

app.use(express.json()); // Permite requisições com JSON
app.use(cors()); // Libera acesso do frontend

// Criar um único cliente MongoDB e reutilizar
const client = new MongoClient(url);

// Rota para buscar os sorvetes do MongoDB
app.get('/sorvetes', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");

        const sorvetes = await colecao.find().toArray();
        res.json(sorvetes);
    } catch (erro) {
        console.error("Erro ao buscar sorvetes:", erro);
        res.status(500).send("Erro ao buscar sorvetes");
    }
});

// Rota para atualizar os sorvetes no MongoDB
app.put('/atualizar', async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({ erro: "Preencha Todos Os Campos" });
    }

    try {
        await client.connect();
        const db = client.db("Saborvete");
        const colecao = db.collection("sorvetes");

        const filtro = { nome };
        const novaInfo = { $set: { preco, quantidade } };

        const resultado = await colecao.updateOne(filtro, novaInfo);

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

app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});