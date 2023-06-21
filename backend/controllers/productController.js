const productModel = require('../models/productModel')
const mongoose = require('mongoose')
const categoriaModel = require('../models/categoryModel')


class clientController {

  async cadastrarProduto(req, res) {
    let user = req.body
    const max = await productModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    
    const categoriaId = req.body.categoria;
    
    // Consultar a coleção "categorias" para obter o ObjectId correspondente ao id
    const categoria = await categoriaModel.findOne({ id: categoriaId });
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    // Utilize o ObjectId encontrado
    user.categoria = categoria._id; 
    
    const resultado = await productModel.create(user)
    res.status(201).json(resultado)
  }

  async listarProduto(req, res) {
    const resultado = await productModel.find({})
    res.status(200).json(resultado)
  }

  async buscarPorIdProduto(req, res) {
    const id = req.params.id
    const resultado = await productModel.findOne({ 'id': id })
    res.status(200).json(resultado)
  }

  async atualizarProduto(req, res) {
    const id = req.params.id
    const _id = String((await productModel.findOne({ 'id': id }))._id)
    await productModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

module.exports = new clientController()
