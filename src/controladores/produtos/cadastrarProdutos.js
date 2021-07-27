/* eslint-disable max-len */
const conexao = require('../../banco_de_dados/conexao');
const cadastrarProdutosSchema = require('../../validacoes/cadastrarProdutosSchema');

const cadastrarProduto = async (req, res) => {
  const { id } = req.usuario;
  const {
    nome, descricao, preco, permiteObservacoes,
  } = req.body;

  try {
    await cadastrarProdutosSchema.validate(req.body);

    const query = 'insert into produto (restaurante_id,nome, descricao, preco, permite_observacoes) values ($1,$2,$3,$4)';
    const produto = await conexao.query(query, [id, nome, descricao, preco, permiteObservacoes]);

    if (produto.rowCount === 0) {
      return res.status(400).json('Não foi possivel cadastrar o produto');
    }
    return res.status(200);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { cadastrarProduto };
