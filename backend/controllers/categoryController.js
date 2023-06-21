const categoriaModel = require('../models/categoryModel')

class categoriaController {

  async cadastrarCategoria(req, res) {
    let user = req.body
    const max = await categoriaModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    const resultado = await categoriaModel.create(user)
    res.status(201).json(resultado)
  }

  async listarCategoria(req, res) {
    const resultado = await categoriaModel.find({})
    res.status(200).json(resultado)
  }

  async buscarPorIdCategoria(req, res) {
    const id = req.params.id
    const resultado = await categoriaModel.findOne({ 'id': id })
    res.status(200).json(resultado)
  }

  async atualizarCategoria(req, res) {
    const id = req.params.id
    const _id = String((await categoriaModel.findOne({ 'id': id }))._id)
    await categoriaModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

module.exports = new categoriaController()
