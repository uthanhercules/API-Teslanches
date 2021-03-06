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
    email, nomeUsuario, nomeRestaurante, descricao, categoria_id, taxa_entrega,
    tempo_entrega_minutos, valor_minimo_pedido, senha,
  } = req.body;
  if (!email || !nomeUsuario || !nomeRestaurante || !categoria_id
    || !taxa_entrega || !tempo_entrega_minutos || !valor_minimo_pedido) {
    return res.status(400).json('Todos os campos, exceto Descrição e Senha, devem ser preenchidos');
  }
  try {
    if (senha) {
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
    } else {
      const query = `
      UPDATE usuario SET email = $1, nome = $2 WHERE id = $3;`;
      const editarDadosUsuario = await conexao.query(query, [email,
        nomeUsuario,
        ID]);

      if (editarDadosUsuario.rowCount === 0) {
        return res.status(400).json('Erro ao editar dados do usuario');
      }
    }

    if (descricao) {
      const query2 = `UPDATE restaurante
      SET nome = $1, 
      descricao=$2,
      categoria_id=$3,
      taxa_entrega=$4,
      tempo_entrega_minutos=$5,
      valor_minimo_pedido=$6
      WHERE usuario_id=$7;`;

      const editarRestaurante = await conexao.query(query2, [nomeRestaurante,
        descricao,
        categoria_id,
        taxa_entrega,
        tempo_entrega_minutos,
        valor_minimo_pedido,
        ID]);
      if (editarRestaurante.rowCount === 0) {
        return res.status(400).json('Erro ao editar dados do restaurante');
      }
    } else {
      const query2 = `UPDATE restaurante
      SET nome = $1, 
      categoria_id=$2,
      taxa_entrega=$3,
      tempo_entrega_minutos=$4,
      valor_minimo_pedido=$5
      WHERE usuario_id=$6;`;

      const editarRestaurante = await conexao.query(query2, [nomeRestaurante,
        categoria_id,
        taxa_entrega,
        tempo_entrega_minutos,
        valor_minimo_pedido,
        ID]);
      if (editarRestaurante.rowCount === 0) {
        return res.status(400).json('Erro ao editar dados do restaurante');
      }
    }

    res.status(200).json('');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { editarUsuario };
