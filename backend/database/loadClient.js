require('./mongodb')
const usersModels = require('../models/clientModel')
const clientes = require('./client.json')

async function carregarDados() {
  try {
    await usersModels.deleteMany({})
    for (const user of clientes) {
      await usersModels.create(user)
    }
    console.log('Carga de clientes feita!')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
}
carregarDados()
