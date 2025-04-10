const express = require('express');
const app = express();
const path = require('path');

const homeRoute = require('./config/home');
const cadastroRoute = require('./config/cadastro');
const carrinhoRoute = require('./config/carrinho');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/home', homeRoute);
app.use('/cadastro', cadastroRoute);
app.use('/carrinho', carrinhoRoute);

app.get('/', (req, res) => res.redirect('/home.html'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
