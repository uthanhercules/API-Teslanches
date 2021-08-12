/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const editarImagemProduto = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { idProduto } = req.params;
  const { imagem_produto } = req.body;
  if (!imagem_produto) {
    return res.status(400).json('Campo de imagem deve ser enviado!');
  }

  try {
    const query3 = 'UPDATE produto SET imagem_produto = $1 WHERE id=$2';
    const conexaoImagem = await conexao.query(query3, [imagem_produto, idProduto]);
    if (conexaoImagem.rowCount === 0) {
      return res.status(400).json('Erro ao editar imagem do produto');
    }
    res.status(200).json('');
  } catch (error) {
    res.status(400).json('Erro ao editar foto do produto');
  }
};

module.exports = { editarImagemProduto };
