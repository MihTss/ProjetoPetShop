require('./mongodb')
const producModel = require('../models/productModel')
const products = require('../database/product.json')
const category = require('../models/categoryModel')

async function loadData() {
      // Performs a bulk delete operation on a database collection named "usersModels"
      await producModel.deleteMany({});

      // This loop searches within the "category" database for the same categoryId sent by the user, and if it finds it, it will replace product.categoria with the objectId within the database 
      for (const product of products) {
          await category
              .findOne({ id: product.categoria })
              .then((categoria) => {
                product.categoria = categoria._id;
                  return product;
              })
              .then(async (ProdutoAlterado) => {
                  await producModel.create(ProdutoAlterado);
              });
      }
  console.log("Carga de produtos concluída!");
}
loadData()