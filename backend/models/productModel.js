const mongoose = require('mongoose')

// Criando um novo schema fornecido pelo mongoose, definindo a estrutura de dados que serão enviados ao banco de dados 
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
