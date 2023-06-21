require('./mongodb')
const producModel = require('../models/productModel')
const products = require('../database/product.json')
const category = require('../models/categoryModel')

async function carregarDados() {
  await producModel.deleteMany({});
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
carregarDados()