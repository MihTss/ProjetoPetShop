const categoryModel = require('../models/categoryModel')

class categoryController {

  // Registrar categoria dentro do banco de dados através da API 
  async saveCategory(req, res) {
    let user = req.body
    const max = await categoryModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    const result = await categoryModel.create(user)
    res.status(201).json(result)
  }

  // Listar as categorias buscando no banco de dados através da API  
  async listCategory(req, res) {
    const result = await categoryModel.find({})
    res.status(200).json(result)
  }

  // Buscar a categoria por ID dentro do banco de dados através da API 
  async findCategoryById(req, res) {
    const _id = req.params._id
    const resultado = await categoryModel.findOne({ '_id': _id })
    res.status(200).json(resultado)
  }

  // Atualizar a categoria encontrada no banco de dados, por ID, através da API
  async updateCategory(req, res) {
    const id = req.params.id
    const _id = String((await categoryModel.findOne({ 'id': id }))._id)
    await categoryModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

//Exportação da função
module.exports = new categoryController()
