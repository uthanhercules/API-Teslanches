/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarPedidos = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;

  try {
    const query = 'select  pedido.id, restaurante_id,consumidor_id,valor_produtos,taxa_entrega,pedido.valor_total, endereco_entrega, nome_usuario from pedido INNER JOIN consumidor on consumidor.id = pedido.consumidor_id where restaurante_id = $1 AND enviado = false ORDER BY pedido.id DESC';
    const { rows: pedidos } = await conexao.query(query, [ID]);
    for (pedido of pedidos) {
      pedido.endereco_entrega = JSON.parse(pedido.endereco_entrega);
    }
    for (const pedido of pedidos) {
      const query1 = 'select * from carrinho where pedido_id = $1';
      const { rows: itens } = await conexao.query(query1, [pedido.id]);
      pedido.carrinho = itens;
    }
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listarPedidos2 = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;

  try {
    const query = 'select  pedido.id, restaurante_id,consumidor_id,valor_produtos,taxa_entrega,pedido.valor_total, endereco_entrega, nome_usuario from pedido INNER JOIN consumidor on consumidor.id = pedido.consumidor_id where restaurante_id = $1 AND enviado = true ORDER BY pedido.id DESC';
    const { rows: pedidos } = await conexao.query(query, [ID]);
    for (pedido of pedidos) {
      pedido.endereco_entrega = JSON.parse(pedido.endereco_entrega);
    }
    for (const pedido of pedidos) {
      const query1 = 'select * from carrinho where pedido_id = $1';
      const { rows: itens } = await conexao.query(query1, [pedido.id]);
      pedido.carrinho = itens;
    }
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarPedidos, listarPedidos2 };
