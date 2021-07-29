/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');
const cadastrarProdutosSchema = require('../../validacoes/cadastrarProdutosSchema');

const jwtSecret = process.env.JWT_SECRET;

const cadastrarProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const {
    nome, descricao, preco, permiteObservacoes,
  } = req.body;
  try {
    await cadastrarProdutosSchema.validate(req.body);

    const query0 = 'select id from restaurante where usuario_id = $1';
    const restauranteId = await conexao.query(query0, [ID]);
    const query = 'insert into produto (restaurante_id,nome, descricao, preco, permite_observacoes) values ($1,$2,$3,$4,$5)';
    const produto = await conexao.query(query, [restauranteId.rows[0].id, nome, descricao, preco, permiteObservacoes]);

    if (produto.rowCount === 0) {
      return res.status(400).json('Não foi possivel cadastrar o produto');
    }
    return res.status(200).json();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { cadastrarProduto };
