const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const obterUsuario = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  try {
    const query = `select u.id,u.nome,u.email,r.nome,r.categoria_id,r.descricao,r.taxa_entrega,r.tempo_entrega_minutos,r.valor_minimo_pedido
      from usuario as u
      JOIN restaurante as r ON r.usuario_id = u.id WHERE u.id = ${ID};
      `;
    const usuario = await conexao.query(query);
    return res.status(200).json(usuario.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterUsuario };
