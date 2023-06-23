const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')


class productController {

  // Registrar produto dentro do banco de dados através da API 
  async saveProducts(req, res) {
    let user = req.body
    const max = await productModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    
        const categoryId = req.body.categoria;
        
        // Consultando a coleção "categories" para obter o ObjectId correspondente ao id
        const category = await categoryModel.findOne({ id: categoryId });
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        // Substituindo por objectId encontrado
        user.categoria = category._id; 
        
        const result = await productModel.create(user)
        res.status(201).json(result)
  }

    // Listar os produtos buscando no banco de dados através da API 
  async listProduct(req, res) {
    const result = await productModel.find({})
    res.status(200).json(result)
  }

  // Buscar o produto por ID dentro do banco de dados através da API
  async findProductById(req, res) {
    const _id = req.params._id
    const resultado = await productModel.findOne({ '_id': _id })
    res.status(200).json(resultado)
  }

    // Atualizar o produto encontrado no banco de dados, por ID, através da API
  async updateProduct(req, res) {
    const id = req.params.id
    const _id = String((await productModel.findOne({ 'id': id }))._id)
    const categoryId = req.body.categoria;
    let user = req.body

    // Consultando a coleção "categories" para obter o ObjectId correspondente ao id
    const category = await categoryModel.findOne({ id: categoryId });
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    // Substituindo por objectId encontrado
    user.categoria = category._id; 

    await productModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

//Exportação da função
module.exports = new productController()
