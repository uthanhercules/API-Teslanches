const loginSchema = require('../../validacoes/loginSchema');

const logar = async (req, res) => {
  try {
    await loginSchema.validate(req.body);

    return res.status(200).json('Validado!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { logar };
