const yup = require('./yup');

const cadastrarProdutosSchema = yup.object().shape({
  nome: yup.string().max(50).required(),
  descricao: yup.string().max(100),
  preco: yup.number().required(),
  permite_observacoes: yup.boolean().required(),
});

module.exports = cadastrarProdutosSchema;
