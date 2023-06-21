const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    autoCreate: true,
  },
  nomeCategoria: String,
  descricao: String
})

module.exports = mongoose.model('categorias', userSchema)