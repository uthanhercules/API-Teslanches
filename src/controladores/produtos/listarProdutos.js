const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarProdutos = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;

  try {
    const query = 'select id from restaurante where usuario_id = $1';
    const { rows: restaurante } = await conexao.query(query, [ID]);

    const restauranteId = restaurante[0].id;

    const query2 = 'select * from produto where restaurante_id = $1';
    const { rows: produtos } = await conexao.query(query2, [restauranteId]);

    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarProdutos };
