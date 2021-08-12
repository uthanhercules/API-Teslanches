const yup = require('./yup');

const cadastrarProdutosSchema = yup.object().shape({
  nome: yup.string().max(50).required(),
  descricao: yup.string().max(100),
  preco: yup.number().required(),
  permiteObservacoes: yup.boolean(),
  imagemProduto: yup.string(),
});

module.exports = cadastrarProdutosSchema;
