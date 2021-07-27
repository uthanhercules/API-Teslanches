const express = require('express');
const { registrar } = require('./controladores/Login/registro');
const { verificarLogin } = require('./filtros/verificarLogin');
const { logar } = require('./controladores/Login/login');

const rota = express();

rota.post('/usuarios', registrar);
rota.post('/login', logar);

rota.use(verificarLogin);

module.exports = rota;
