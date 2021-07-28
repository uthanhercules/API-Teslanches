const conexao = require('../../banco_de_dados/conexao');

const obterProduto = async (req, res) => {
  const { idProduto } = req.params;

  try {
    const query = 'select * from produto where id = $1 ';
    const { rowCount, rows: produto } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      return res.status(404).json('Produto informado não existe');
    }

    res.status(200).json(produto[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterProduto };
