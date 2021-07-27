const express = require('express');
const { registrar } = require('./controladores/Login/registro');
const { logar } = require('./controladores/Login/login');
const { cadastrarProduto } = require('./controladores/produtos/cadastrarProdutos');

const rota = express();

rota.post('/usuarios', registrar);
rota.post('/login', logar);

// TO DO= Rotas protegidas
rota.post('/produtos', cadastrarProduto);

module.exports = rota;
