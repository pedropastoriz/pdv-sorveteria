const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/produtos.json');

router.post('/', (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const data = JSON.parse(fs.readFileSync(dbPath));

  const produtoExistente = data.find(p => p.nome === nome);

  if (produtoExistente) {
    produtoExistente.preco = preco;
    produtoExistente.quantidade = quantidade;
  } else {
    const novoProduto = {
      id: data.length + 1,
      nome,
      preco,
      quantidade
    };
    data.push(novoProduto);
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
});

module.exports = router;
