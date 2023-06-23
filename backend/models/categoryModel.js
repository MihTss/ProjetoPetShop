const mongoose = require('mongoose')

// Criando um novo schema fornecido pelo mongoose, definindo a estrutura de dados que serão enviados ao banco de dados 
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoCreate: true,
  },
  nomeCategoria: String,
  descricao: String
})

module.exports = mongoose.model('categorias', userSchema)