const express = require('express');
const { registrar } = require('./controladores/Login/registro');
const { verificarLogin } = require('./filtros/verificarLogin');
const { logar } = require('./controladores/Login/login');
const { cadastrarProduto } = require('./controladores/produtos/cadastrarProdutos');
const { listarProdutos } = require('./controladores/produtos/listarProdutos');
const { obterProduto } = require('./controladores/produtos/obterProduto');
const { editarProduto } = require('./controladores/produtos/editarProduto');
const { deletarProduto } = require('./controladores/produtos/deletarProduto');
const { ativarProduto } = require('./controladores/produtos/ativarProduto');
const { desativarProduto } = require('./controladores/produtos/desativarProduto');
const { carregarImagem, excluirImagem } = require('./controladores/upload/uploads');

const rota = express();

rota.post('/usuarios', registrar);
rota.post('/login', logar);

rota.post('/upload', carregarImagem);
rota.post('/delete', excluirImagem);

rota.use(verificarLogin);

rota.post('/produtos', cadastrarProduto);
rota.get('/produtos', listarProdutos);
rota.get('/produtos/:idProduto', obterProduto);
rota.put('/produtos/:idProduto', editarProduto);
rota.delete('/produtos/:idProduto', deletarProduto);
rota.post('/produtos/:idProduto/ativar', ativarProduto);
rota.post('/produtos/:idProduto/desativar', desativarProduto);

module.exports = rota;
