const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const { query } = require('../banco_de_dados/conexao');
const { erro } = require('../erros');

// eslint-disable-next-line consistent-return
const verificarLogin = async (req, res, next) => {
  const tokenUsuario = req.header('tokenUsuario');

  if (!tokenUsuario || tokenUsuario.trim() === '') {
    return res.status(400).json(erro.necessitaLogin);
  }

  try {
    const { Email } = jwt.verify(tokenUsuario, jwtSecret);
    const encontrarRegistroSQL = 'SELECT * FROM usuario WHERE email = $1';
    const encontrarRegistro = await query(encontrarRegistroSQL, [Email]);

    if (encontrarRegistro.rowCount === 0) {
      return res.status(404).json(erro.necessitaLogin);
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json(erro.necessitaLogin);
    }

    return res.status(400).json(error.message);
  }
};

module.exports = { verificarLogin };
