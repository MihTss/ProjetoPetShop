const mongoose = require('mongoose')
const URL = 'mongodb://0.0.0.0:27017/ecommerce'
const db = mongoose.connect(URL)
const con = mongoose.connection

// Verifica a conexão com o banco de dados, caso de certo, ele retorna no console 'conectado ao mongoDB!'
con.on('open', function () {
  console.log('Conectado ao MongoDB!')
})

// Verifica a conexão com o banco de dados, caso não de certo, ele retorna no console 'Erro na conexão com o MongoDB!'
con.on('error', function () {
  console.log('Erro na conexão com o MongoDB!')
})

// Caso seja desconectado do banco de dados, ele retorna no console 'Desconetado do MongoDB!' 
con.on('close', function () {
  console.log('Desconetado do MongoDB!')
})

//Exportação da função
module.exports = db
