/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken');
const { encrypt } = require('../../banco_de_dados/encriptacao');
const conexao = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const editarUsuario = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  const { ID } = dadosUsuarios;
  const {
    email, nomeUsuario, nomeRestaurante, descricao, imagem_restaurante, categoria_id, taxa_entrega,
    tempo_entrega_minutos, valor_minimo_pedido, senha,
  } = req.body;
  if (!nomeUsuario || !nomeRestaurante || !descricao || !imagem_restaurante || !categoria_id
    || !taxa_entrega || !tempo_entrega_minutos || !valor_minimo_pedido || !senha || !email) {
    res.status(400).json('Nenhum campo deve estar em branco');
  }
  try {
    const senhaEncriptada = JSON.stringify(encrypt(senha));

    const query = `
      UPDATE usuario SET email = $1, nome = $2,senha = $3 WHERE id = $4;`;
    const editarDadosUsuario = await conexao.query(query, [email,
      nomeUsuario,
      senhaEncriptada,
      ID]);

    if (editarDadosUsuario.rowCount === 0) {
      return res.status(400).json('Erro ao editar dados do usuario');
    }

    const query2 = `UPDATE restaurante
      SET nome = $1, 
      descricao=$2,
      imagem_restaurante=$3,
      categoria_id=$4,
      taxa_entrega=$5,
      tempo_entrega_minutos=$6,
      valor_minimo_pedido=$7
      WHERE usuario_id=$8;`;

    const editarRestaurante = await conexao.query(query2, [nomeRestaurante,
      descricao,
      imagem_restaurante,
      categoria_id,
      taxa_entrega,
      tempo_entrega_minutos,
      valor_minimo_pedido,
      ID]);
    if (editarRestaurante.rowCount === 0) {
      return res.status(400).json('Erro ao editar dados do restaurante');
    }
    res.status(200).json();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { editarUsuario };
