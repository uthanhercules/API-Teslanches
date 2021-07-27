const express = require('express');
const { registrar } = require('./controladores/Login/registro');

const rota = express();

rota.post('/usuarios', registrar);

module.exports = rota;
