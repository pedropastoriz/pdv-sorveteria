const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// URL da conexão com o MongoDB Atlas
const uri = "mongodb+srv://saborvete:reinilton@cluster0.znnugwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(uri);

// Nome do banco e coleção
const dbName = 'saborvete';
const colecao = 'produtos';

router.post('/', async (req, res) => {
  try {
    const carrinhoCliente = req.body.carrinho;

    await client.connect();
    const db = client.db(dbName);
    const produtosCol = db.collection(colecao);

    let resumo = [];
    let total = 0;

    for (const item of carrinhoCliente) {
      const produto = await produtosCol.findOne({ nome: item.nome });

      if (!produto) {
        console.warn(`Produto não encontrado: ${item.nome}`);
        continue;
      }

      const quantidade = item.quantidade;
      const preco = produto.preco;
      const subtotal = preco * quantidade;

      resumo.push({
        nome: produto.nome,
        quantidade,
        preco,
        total: subtotal
      });

      total += subtotal;
    }

    res.json({ resumo, total });

  } catch (erro) {
    console.error("Erro na rota /api/carrinho:", erro);
    res.status(500).json({ erro: 'Erro ao processar o carrinho' });
  } finally {
    await client.close();
  }
});

module.exports = router;
