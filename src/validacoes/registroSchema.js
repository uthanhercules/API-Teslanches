const yup = require('./yup');

const registroSchema = yup.object().shape({
  nome: yup.string().max(100).required(),
  email: yup.string().max(100).email().required(),
  senha: yup.string().required(),
  restaurante: yup.object({
    nome: yup.string().max(50).required(),
    descricao: yup.string().max(100),
    idCategoria: yup.number().required(),
    taxaEntrega: yup.number().required(),
    tempoEntregaEmMinutos: yup.number().required(),
    valorMinimoPedido: yup.number().required(),
  }).required(),
});

module.exports = registroSchema;
