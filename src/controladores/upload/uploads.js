const supabase = require('../../supabase');

const carregarImagem = async (req, res) => {
  const { nome, imagem } = req.body;

  const buffer = Buffer.from(imagem, 'base64');

  try {
    const data = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(nome, buffer);

    return res.json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirImagem = async (req, res) => {

};

module.exports = {
  carregarImagem,
  excluirImagem,
};
