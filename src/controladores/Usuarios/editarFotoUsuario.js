/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../banco_de_dados/encriptacao');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const editarFotoUsuario = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const { imagem_restaurante } = req.body;
  if (!imagem_restaurante) {
    return res.status(400).json('Campo de imagem deve ser enviado!');
  }

  try {
    const query3 = 'UPDATE restaurante SET imagem_restaurante = $1 WHERE usuario_id=$2';
    const conexaoImagem = await conexao.query(query3, [imagem_restaurante, ID]);
    if (conexaoImagem.rowCount === 0) {
      return res.status(400).json('Erro ao editar imagem do restaurante');
    }
    res.status(200).json('');
  } catch (error) {
    res.status(400).json('Erro ao editar foto do usuario');
  }
};

module.exports = { editarFotoUsuario };
