require('./mongodb')
const usersModels = require('../models/clientModel')
const clientes = require('./client.json')

async function loadData() {
  try {
    // Performs a bulk delete operation on a database collection named "usersModels"
    await usersModels.deleteMany({})
   //loads the json called "category.js"
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
loadData()
