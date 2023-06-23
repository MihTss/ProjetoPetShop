const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');

// Criando um novo schema fornecido pelo mongoose, definindo a estrutura de dados que serão enviados ao banco de dados 
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoCreate: true,
  },
  nomeCompleto: {
    type: String,
    require: true
},
  imagem: String,
  cpf: String,
  telefone: Number,
  endereco: String,
  cartaoCredito: [{
    "nome": String,
    "numero": Number, 
    "cvc": Number
    
  }],
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
},
  senha: {
    type: String,
    required: true,
    select: false
},
token: {
  type: String,
  select: false
}
});

userSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = mongoose.model('clientes', userSchema)
