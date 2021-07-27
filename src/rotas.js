const express = require('express');
const { registrar } = require('./controladores/Login/registro');
const { logar } = require('./controladores/Login/login');

const rota = express();

rota.post('/usuarios', registrar);
rota.post('/login', logar);

module.exports = rota;
