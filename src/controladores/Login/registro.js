const registroSchema = require('../../validacoes/registroSchema');

const registrar = async (req, res) => {
  const {
    nome, email, senha, restaurante,
  } = req.body;

  try {
    await registroSchema.validate(req.body);

    return res.status(200).json('Validado!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { registrar };
