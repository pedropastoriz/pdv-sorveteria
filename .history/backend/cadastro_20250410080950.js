const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
//const cors = require('cors');

const url = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

/*router.use(express.json());
router.use(cors());
*/
async function conectarMongo() {
    try {
        await client.connect();
        console.log("✅ [Cadastro] Conectado com sucesso ao MongoDB");
        return client.db("Saborvete").collection("sorvetes");
    } catch (erro) {
        console.error("❌ [Cadastro] Erro ao conectar no MongoDB:", erro);
        throw erro;
    }
}

router.get('/cadastro/sorvetes', async (req, res) => {
    try {
        const colecao = await conectarMongo();
        const sorvetes = await colecao.find().toArray();
        res.json(sorvetes);
    } catch (erro) {
        res.status(500).send("Erro ao buscar sorvetes");
    }
});

router.put('/atualizar', async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
        return res.status(400).json({ erro: "Preencha Todos Os Campos" });
    }

    try {
        const colecao = await conectarMongo();
        const resultado = await colecao.updateOne(
            { nome },
            { $set: { preco, quantidade } }
        );

        if (resultado.matchedCount > 0) {
            res.json({ mensagem: "Produto atualizado com sucesso!" });
        } else {
            res.status(404).json({ erro: "Produto não encontrado!" });
        }
    } catch (erro) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

module.exports = router;
