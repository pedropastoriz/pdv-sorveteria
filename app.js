const express = require('express');
const app = express();
const path = require('path');

const homeRoute = require('./backend/home');
const cadastroRoute = require('./backend/cadastro');
const carrinhoRoute = require('./backend/carrinho');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve arquivos HTML, CSS e JS

// Middleware para log de requisições (opcional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Definição das rotas
app.use('/home', homeRoute);
app.use('/cadastro', cadastroRoute);
app.use('/carrinho', carrinhoRoute);

// Redireciona "/" para "/home"
app.get('/', (req, res) => res.redirect('/home'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
