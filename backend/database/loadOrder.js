require('./mongodb')
const usersModels = require('../models/orderModel')
const clients = require ('../models/clientModel')
const orders = require('./orders.json')
const products = require('../models/productModel')

async function loadData() {
    // Performs a bulk delete operation on a database collection named "usersModels"
    await usersModels.deleteMany({});

    for (const order of orders) {
    // The line of code is looking for a document in a database collection, using the .findOne() method. The query is based on the condition { id: order.cliente }, which means that the id field of the document must be equal to the value of order.cliente.
      await clients
        .findOne({ id: order.cliente })
        .then(async (cliente) => {
          order.cliente = cliente._id;

    // There is a loop that loops through each element of the order.listProducts array. For each element, a database search is performed using the .findOne() method of the products object. The search is based on the condition { id: product.idProduct }, where product.idProduct is the identifier of the desired product.
    
          for (const product of order.listaProdutos) {
            await products
              .findOne({ id: product.idProduct })
              .then((produto) => {
                if (produto) {
                  product.idProduct = produto._id;
                }
              });
          }
          return order;
        })
        .then(async (PedidoAlterado) => {
          await usersModels.create(PedidoAlterado);
        });
    }
    
    console.log("Carga de pedidos concluída!");
  }
  
  loadData();
  