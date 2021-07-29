const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const obterProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idProduto } = req.params;

  try {
    const query3 = 'select * from produto where id = $1 ';
    const { rowCount, rows: produto } = await conexao.query(query3, [idProduto]);

    if (rowCount === 0) {
      return res.status(404).json('Produto informado não existe');
    }
    const query = 'select restaurante_id from produto where id = $1';
    const { rows: restaurante } = await conexao.query(query, [idProduto]);

    const restauranteId = restaurante[0].restaurante_id;

    const query2 = 'select usuario_id from restaurante where id = $1';
    const { rows: usuario } = await conexao.query(query2, [restauranteId]);

    if (usuario[0].usuario_id !== ID) {
      return res.status(404).json('Produto não pertence ao usuario logado');
    }

    res.status(200).json(produto[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterProduto };
