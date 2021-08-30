/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const conexao = require('../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarPedidos = async (req, res) => {
  const dadosUsuario = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const restaurante_id = dadosUsuario.idDoRestaurante;

  try {
    const pedidosSQL = 'SELECT * FROM pedido WHERE restaurante_id = $1 ORDER BY id DESC';
    const pedidos = await conexao.query(pedidosSQL, [restaurante_id]);

    if (pedidos.length === 0) {
      return res.status(404).json('Não nenhum pedido registrado para este usuário.');
    }

    const output = {
      Restaurante: dadosUsuario.NomeRestaurante,
      Pedidos: {
        ...pedidos.rows,
      },
    };

    return res.json(output);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarPedidos };
