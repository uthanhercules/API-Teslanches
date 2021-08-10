/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const editarProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idProduto } = req.params;
  const {
    nome, descricao, preco, permiteObservacoes, imagemProduto,
  } = req.body;

  if (!nome && !descricao && !preco && !permiteObservacoes && !imagemProduto) {
    return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
  }

  try {
    const query = 'select * from produto where id = $1';
    const { rowCount } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      res.status(404).json('Produto informado não existe');
    }
    const query0 = 'select restaurante_id from produto where id = $1';
    const { rows: restaurante } = await conexao.query(query0, [idProduto]);

    const restauranteId = restaurante[0].restaurante_id;

    const query2 = 'select usuario_id from restaurante where id = $1';
    const { rows: usuario } = await conexao.query(query2, [restauranteId]);

    if (usuario[0].usuario_id !== ID) {
      return res.status(404).json('Produto não pertence ao usuario logado');
    }

    const body = {};
    const params = [];
    let n = 1;
    if (nome) {
      body.nome = nome;
      params.push(`nome = $${n}`);
      n++;
    }

    if (descricao) {
      body.descricao = descricao;
      params.push(`descricao = $${n}`);
      n++;
    }
    if (preco) {
      body.preco = preco;
      params.push(`preco = $${n}`);
      n++;
    }
    if (permiteObservacoes) {
      body.permiteObservacoes = permiteObservacoes;
      params.push(`permite_observacoes = $${n}`);
      n++;
    }
    if (imagemProduto) {
      body.imagemProduto = imagemProduto;
      params.push(`imagem_produto = $${n}`);
      n++;
    }
    const valores = Object.values(body);
    valores.push(idProduto);
    const queryAtualizacao = `update produto set ${params.join(', ')} where id = $${n}`;
    const produtoAtualizado = await conexao.query(queryAtualizacao, valores);

    if (produtoAtualizado === 0) {
      return res.status(400).json('O produto não foi atualizado');
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { editarProduto };
