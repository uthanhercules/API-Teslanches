const supabase = require('../../supabase');

const carregarImagem = async (req, res) => {
  const { nome, imagem } = req.body;

  const buffer = Buffer.from(imagem, 'base64');

  try {
    const { data, error } = await supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(nome, buffer);

    if (error) {
      return res.status(400).json(error.message);
    }

    const { publicURL, error: errorPublicUrl } = supabase
      .storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(nome);

    if (errorPublicUrl) {
      return res.status(400).json(errorPublicUrl.message);
    }

    return res.json(publicURL);
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
