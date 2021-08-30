const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const enviarPedido = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idPedido } = req.params;

  try {
    const query1 = 'select restaurante_id from pedido where id = $1';
    const { rows: restaurante } = await conexao.query(query1, [idPedido]);

    const restauranteId = restaurante[0].restaurante_id;

    const query2 = 'select usuario_id from restaurante where id = $1';
    const { rows: usuario } = await conexao.query(query2, [restauranteId]);

    if (usuario[0].usuario_id !== ID) {
      return res.status(404).json('Produto não pertence ao usuario logado');
    }

    const query3 = 'update pedido set enviado = TRUE where id = $1';
    const produtoAtualizado = await conexao.query(query3, [idPedido]);

    if (produtoAtualizado === 0) {
      return res.status(400).json('Erro no envio do pedido.');
    }

    return res.status(200).json('');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { enviarPedido };
