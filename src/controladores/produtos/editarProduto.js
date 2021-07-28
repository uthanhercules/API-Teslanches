/* eslint-disable no-plusplus */
const conexao = require('../../banco_de_dados/conexao');

const editarProduto = async (req, res) => {
  const { idProduto } = req.params;
  const {
    nome, descricao, preco, permiteObservacoes,
  } = req.body;

  if (!nome && !descricao && !preco && !permiteObservacoes) {
    return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
  }

  try {
    const query = 'select * from produto where id = $1';
    const { rowCount } = await conexao.query(query, [idProduto]);

    if (rowCount === 0) {
      res.status(404).json('Produto informado não existe');
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
