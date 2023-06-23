require('./mongodb')
const clientModel = require('../models/clientModel')
const clientes = require('./client.json')

async function loadData() {
  try {
    // Executa uma operação de exclusão em massa em uma coleção de banco de dados chamada "clientModel"
    await clientModel.deleteMany({})

   // carrega no banco de dados o json chamado "client.js"
    for (const user of clientes) {
      await clientModel.create(user)
    }
    console.log('Carga de clientes feita!')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
}
loadData()
