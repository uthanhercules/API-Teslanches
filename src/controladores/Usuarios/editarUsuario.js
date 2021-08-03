/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const editarUsuario = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;

  try {
    res.status(200).json();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { editarUsuario };
