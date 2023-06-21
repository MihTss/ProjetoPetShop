const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        autoCreate: true,
      },
    nome:  String,
    imagem: String,
    descricao:  String,
    preco:  Number,
    categoria:{ type: mongoose.Schema.Types.ObjectId, ref: 'categorias' },
    animal:  String,
    comentarios: [{
         usuario: String,
         texto :  String,
         nota :  Number 
    }]
})

module.exports = mongoose.model('products', userSchema)
