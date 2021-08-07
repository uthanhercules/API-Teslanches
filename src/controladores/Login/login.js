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

    const encontrarNomeRestauranteSQL = 'SELECT nome FROM restaurante where usuario_id = $1';
    const encontrarNomeRestaurante = await query(encontrarNomeRestauranteSQL, [usuario.id]);

    const idRestauranteSQL = 'SELECT categoria_id FROM restaurante where usuario_id = $1';
    const idRestaurante = await query(idRestauranteSQL, [usuario.id]);
    const idDoRestaurante = idRestaurante.rows[0].categoria_id;

    const categoriaRestauranteSQL = 'SELECT nome FROM categoria WHERE id = $1';
    const categoriaRestaurante = await query(categoriaRestauranteSQL, [idDoRestaurante]);

    const nomeRestaurante = encontrarNomeRestaurante.rows[0];
    const tokenUsuario = jwt.sign({
      ID: usuario.id,
      Nome: usuario.nome,
      Email: usuario.email,
      NomeRestaurante: nomeRestaurante.nome,
      Categoria: categoriaRestaurante.rows[0].nome,
    }, jwtSecret, { expiresIn: '1h' });

    const authUsuario = {
      usuario: {
        ID: usuario.id,
        Nome: usuario.nome,
        Email: usuario.email,
        NomeRestaurante: nomeRestaurante.nome,
        Categoria: categoriaRestaurante.rows[0].nome,
      },
      tokenUsuario,
    };

    return res.status(200).json(authUsuario);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { logar };
