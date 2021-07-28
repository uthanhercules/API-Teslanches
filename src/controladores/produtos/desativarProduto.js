const conexao = require('../../banco_de_dados/conexao');

const desativarProduto = async (req, res) => {
  const { idProduto } = req.params;

  try {
    const query = 'select * from produto where id = $1';
    const { rowCount } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      res.status(404).json('Produto informado não existe');
    }

    const query2 = 'update produto set ativo = FALSE where id = $1';
    const produtoAtualizado = await conexao.query(query2, [idProduto]);

    if (produtoAtualizado === 0) {
      return res.status(400).json('O produto não foi atualizado');
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { desativarProduto };
