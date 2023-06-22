require('./mongodb')
const usersModels = require('../models/categoryModel')
const categorias = require('./category.json')

async function loadData() {
  try {
    // Performs a bulk delete operation on a database collection named "usersModels"
    await usersModels.deleteMany({}) 

    //loads the json called "category.js"
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
loadData()