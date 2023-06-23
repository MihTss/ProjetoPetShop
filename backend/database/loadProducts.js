require('./mongodb')
const producModel = require('../models/productModel')
const products = require('../database/product.json')
const category = require('../models/categoryModel')

async function loadData() {
      // Performs a bulk delete operation on a database collection named "producModel"
      await producModel.deleteMany({});

      // Este loop procura no banco de dados "category" o mesmo categoryId enviado pelo usuário e, se o encontrar, substituirá product.categoria pelo objectId no banco de dados
      for (const product of products) {
          await category
              .findOne({ id: product.categoria })
              .then((categoria) => {
                product.categoria = categoria._id;
                  return product;
              })
              // carrega no banco de dados o json chamado "product.js"
              .then(async (ProdutoAlterado) => {
                  await producModel.create(ProdutoAlterado);
              });
      }
  console.log("Carga de produtos concluída!");
}
loadData()