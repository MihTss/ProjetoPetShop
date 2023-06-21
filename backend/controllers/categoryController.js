const categoryModel = require('../models/categoryModel')

class categoryController {

  // Register Category
  async saveCategory(req, res) {
    let user = req.body
    const max = await categoryModel.findOne({}).sort({ id: -1 })
    user.id = max == null ? 1 : max.id + 1
    const result = await categoryModel.create(user)
    res.status(201).json(result)
  }

  // List Category 
  async listCategory(req, res) {
    const result = await categoryModel.find({})
    res.status(200).json(result)
  }

  // Seach Category by Id 
  async searchCategory(req, res) {
    const id = req.params.id
    const result = await categoryModel.findOne({ 'id': id })
    res.status(200).json(result)
  }

  // Update Category 
  async updateCategory(req, res) {
    const id = req.params.id
    const _id = String((await categoryModel.findOne({ 'id': id }))._id)
    await categoryModel.findByIdAndUpdate(String(_id), req.body)
    res.status(200).send()
  }
}

module.exports = new categoryController()
