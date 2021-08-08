const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const deletarProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idProduto } = req.params;

  try {
    const query2 = 'select * from produto where id = $1 ';
    const { rowCount } = await conexao.query(query2, [idProduto]);

    if (rowCount === 0) {
      return res.status(404).json('Produto informado não existe');
    }
    const query0 = 'select restaurante_id from produto where id = $1';
    const { rows: restaurante } = await conexao.query(query0, [idProduto]);

    const restauranteId = restaurante[0].restaurante_id;

    const query1 = 'select usuario_id from restaurante where id = $1';
    const { rows: usuario } = await conexao.query(query1, [restauranteId]);

    if (usuario[0].usuario_id !== ID) {
      return res.status(404).json('Produto não pertence ao usuario logado');
    }

    const query3 = 'delete from produto where id = $1';
    const produtoExcluido = await conexao.query(query3, [idProduto]);

    if (produtoExcluido.rowCount === 0) {
      return res.status(404).json('Não foi possível excluir o produto');
    }

    return res.status(200).json('Produto deletado com sucesso!');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { deletarProduto };
