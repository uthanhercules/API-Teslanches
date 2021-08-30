/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarPedidos = async (req, res) => {
  const dadosUsuario = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const restaurante_id = dadosUsuario.idDoRestaurante;

  try {
    const pedidosSQL = 'SELECT pedido.id, restaurante_id,consumidor_id, valor_produtos, taxa_entrega, valor_total, endereco_entrega, nome_usuario FROM pedido INNER JOIN consumidor ON consumidor.id = pedido.consumidor_id WHERE restaurante_id = $1 ORDER BY pedido.id DESC';
    const pedidos = await conexao.query(pedidosSQL, [restaurante_id]);

    if (pedidos.rows.length === 0) {
      return res.status(404).json('Não há nenhum pedido registrado para este usuário.');
    }

    const output = {
      Restaurante: dadosUsuario.NomeRestaurante,
      Pedidos: pedidos.rows,
    };

    return res.json(output);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listarItensDoPedido = async (req, res) => {
  const { idPedido } = req.params;
  // eslint-disable-next-line no-unused-vars
  const dadosUsuario = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  try {
    const itensSQL = 'SELECT pedido_id, produto_id, nome, preco, quantidade, valor_total FROM carrinho WHERE pedido_id = $1';
    const itens = await conexao.query(itensSQL, [idPedido]);

    if (itens.rows.length === 0) {
      return res.status(404).json('Não há nenhum pedido registrado com este número.');
    }

    return res.json(itens.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarPedidos, listarItensDoPedido };
