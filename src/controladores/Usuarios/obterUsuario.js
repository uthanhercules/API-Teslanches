const jwt = require('jsonwebtoken');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const obterUsuario = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  try {
    const query = `select usuario.id,usuario.nome as nomeUsuario,usuario.email,restaurante.nome,restaurante.categoria_id,restaurante.descricao,restaurante.taxa_entrega,restaurante.tempo_entrega_minutos,restaurante.valor_minimo_pedido
      from usuario
      JOIN restaurante ON restaurante.usuario_id = usuario.id WHERE usuario.id = $1;
      `;
    const usuario = await conexao.query(query, [ID]);
    return res.status(200).json(usuario.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterUsuario };
