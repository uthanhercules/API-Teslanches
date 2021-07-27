const { encrypt } = require('../../banco_de_dados/encriptacao');
const registroSchema = require('../../validacoes/registroSchema');
const { query } = require('../../banco_de_dados/conexao');
const { erro } = require('../../erros');

const registrar = async (req, res) => {
  const {
    nome, email, senha, restaurante,
  } = req.body;

  try {
    await registroSchema.validate(req.body);

    const encontrarRegistroSQL = 'SELECT * FROM usuario WHERE email = $1';
    const encontrarRegistro = await query(encontrarRegistroSQL, [email]);

    if (encontrarRegistro.rowCount > 0) {
      return res.status(400).json(erro.emailJaRegistrado);
    }

    const senhaEncriptada = JSON.stringify(encrypt(senha));
    const inserirUsuarioSQL = 'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)';
    // eslint-disable-next-line no-unused-vars
    const inserirUsuario = await query(inserirUsuarioSQL, [nome, email, senhaEncriptada]);

    const encontrarRegistroAtual = await query(encontrarRegistroSQL, [email]);
    const idRegistroAtual = encontrarRegistroAtual.rows[0].id;

    const inserirRestauranteSQL = 'INSERT INTO restaurante (usuario_id, nome, descricao, categoria_id, taxa_entrega, tempo_entrega_minutos, valor_minimo_pedido) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    // eslint-disable-next-line no-unused-vars
    const inserirRestaurante = await query(inserirRestauranteSQL, [
      idRegistroAtual,
      restaurante.nome,
      restaurante.descricao,
      restaurante.idCategoria,
      restaurante.taxaEntrega,
      restaurante.tempoEntregaEmMinutos,
      restaurante.valorMinimoPedido,
    ]);

    return res.status(200).json('Usuário registrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { registrar };
