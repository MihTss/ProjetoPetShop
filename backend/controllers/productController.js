const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')


class productController {

  async saveProducts(req, res) {
    let user = req.body
    const max = await productModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    
        const categoryId = req.body.categoria;
        
        // Query the "categories" collection to get the ObjectId corresponding to the id
        const category = await categoryModel.findOne({ id: categoryId });
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        // Replacing with objectId found
        user.categoria = category._id; 
        
        const result = await productModel.create(user)
        res.status(201).json(result)
  }

    // List Products 
  async listProduct(req, res) {
    const result = await productModel.find({})
    res.status(200).json(result)
  }

  async buscarPorIdProduto(req, res) {
    const _id = req.params._id
    const resultado = await productModel.findOne({ '_id': _id })
    res.status(200).json(resultado)
  }

    // Update Product 
  async updateProduct(req, res) {
    const id = req.params.id
    const _id = String((await productModel.findOne({ 'id': id }))._id)
    const categoryId = req.body.categoria;
    let user = req.body

    // Query the "categories" collection to get the ObjectId corresponding to the id
    const category = await categoryModel.findOne({ id: categoryId });
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    // Replacing with objectId found
    user.categoria = category._id; 

    await productModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

module.exports = new productController()
