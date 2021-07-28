const conexao = require('../../banco_de_dados/conexao');

const deletarProduto = async (req, res) => {
  const { idProduto } = req.params;

  try {
    const query = 'select * from produto where id = $1 ';
    const { rowCount } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      return res.status(404).json('Produto informado não existe');
    }

    const query2 = 'delete from produto where id = $1';
    const produtoExcluido = await conexao.query(query2, [idProduto]);

    if (produtoExcluido.rowCount === 0) {
      return res.status(404).json('Não foi possível excluir o produto');
    }

    return res.status(200).json();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { deletarProduto };
