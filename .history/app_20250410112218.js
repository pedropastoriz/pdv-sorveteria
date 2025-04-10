const express = require('express');
const app = express();
const path = require('path');
//novo
const cors = require('cors');
app.use(cors());
app.use(express.json());

const homeRoute = require('./backend/home');
const cadastroRoute = require('./backend/cadastro');
const carrinhoRoute = require('./backend/carrinho');
const produtosRoute = require('./backend/produtos'); // Caminho do arquivo criado

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Registro de rotas
app.use('/home', homeRoute);
app.use('/cadastro', cadastroRoute);
app.use('/carrinho', carrinhoRoute);
app.use('/api', produtosRoute); // Rota para o arquivo produtos

app.get('/', (req, res) => res.redirect('/home.html'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
