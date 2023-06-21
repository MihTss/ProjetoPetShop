require('./mongodb')
const usersModels = require('../models/categoryModel')
const categorias = require('./category.json')

async function carregarDados() {
  try {
    await usersModels.deleteMany({})
    for (const category of categorias) {
      await usersModels.create(category)
    }
    console.log('Carga de categorias feita!')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
}
carregarDados()