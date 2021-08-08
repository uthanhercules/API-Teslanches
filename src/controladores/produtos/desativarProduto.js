const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const desativarProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idProduto } = req.params;

  try {
    const query = 'select * from produto where id = $1';
    const { rowCount } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      res.status(404).json('Produto informado não existe');
    }
    const query1 = 'select restaurante_id from produto where id = $1';
    const { rows: restaurante } = await conexao.query(query1, [idProduto]);

    const restauranteId = restaurante[0].restaurante_id;

    const query2 = 'select usuario_id from restaurante where id = $1';
    const { rows: usuario } = await conexao.query(query2, [restauranteId]);

    if (usuario[0].usuario_id !== ID) {
      return res.status(404).json('Produto não pertence ao usuario logado');
    }

    const query3 = 'update produto set ativo = FALSE where id = $1';
    const produtoAtualizado = await conexao.query(query3, [idProduto]);

    if (produtoAtualizado === 0) {
      return res.status(400).json('O produto não foi atualizado');
    }

    return res.status(200).json('Produto foi desativado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { desativarProduto };
