const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const { decrypt } = require('../../banco_de_dados/encriptacao');
const loginSchema = require('../../validacoes/loginSchema');
const { query } = require('../../banco_de_dados/conexao');
const { erro } = require('../../erros');

const logar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await loginSchema.validate(req.body);

    const encontrarRegistroSQL = 'SELECT * FROM usuario WHERE email = $1';
    const encontrarRegistro = await query(encontrarRegistroSQL, [email]);

    if (encontrarRegistro.rowCount === 0) {
      return res.status(400).json(erro.loginIncorreto);
    }

    const usuario = encontrarRegistro.rows[0];
    const senhaUsuario = decrypt(JSON.parse(usuario.senha));

    if (senha !== senhaUsuario) {
      return res.status(400).json(erro.loginIncorreto);
    }

    const tokenUsuario = jwt.sign({
      ID: usuario.id,
      Nome: usuario.nome,
      Email: usuario.email,
    }, jwtSecret, { expiresIn: '1h' });

    const authUsuario = {
      usuario: {
        ID: usuario.id,
        Nome: usuario.nome,
        Email: usuario.email,
      },
      tokenUsuario,
    };

    return res.status(200).json(authUsuario);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { logar };
