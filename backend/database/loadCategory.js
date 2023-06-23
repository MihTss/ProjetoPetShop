require('./mongodb')
const categoryModel = require('../models/categoryModel')
const categorias = require('./category.json')

async function loadData() {
  try {
    // Executa uma operação de exclusão em massa em uma coleção de banco de dados chamada "categoryModel"
    await categoryModel.deleteMany({}) 

    // Carrega no banco de dados o json chamado "category.js"
    for (const category of categorias) {
      await categoryModel.create(category)
    }
    console.log('Carga de categorias feita!')
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
}
loadData()