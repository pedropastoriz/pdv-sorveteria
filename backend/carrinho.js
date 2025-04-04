const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/produtos.json');

// POST: recebe itens do carrinho, calcula o total
router.post('/', (req, res) => {
  const carrinho = req.body.carrinho; // [{ id: 1, quantidade: 2 }, ...]

  const produtos = JSON.parse(fs.readFileSync(dbPath));
  let total = 0;
  let resumo = [];

  for (const item of carrinho) {
    const produto = produtos.find(p => p.id === item.id);
    if (produto) {
      total += produto.preco * item.quantidade;
      resumo.push({ nome: produto.nome, preco: produto.preco, quantidade: item.quantidade });
    }
  }

  res.json({ resumo, total });
});

module.exports = router;
