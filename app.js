const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./backend/home');
const cadastroRoute = require('./backend/cadastro');
const carrinhoRoute = require('./backend/carrinho');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


// Rotas
app.use('/home', homeRoute);
app.use('/cadastro', cadastroRoute);
app.use('/carrinho', carrinhoRoute);

// Página inicial (poderia redirecionar ou servir um index)
app.get('/', (req, res) => res.redirect('/home'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
