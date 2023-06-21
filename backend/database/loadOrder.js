require('./mongodb')
const usersModels = require('../models/orderModel')
const clients = require ('../models/clientModel')
const orders = require('./orders.json')
const products = require('../models/productModel')

async function carregarDados() {
    await usersModels.deleteMany({});
    for (const order of orders) {
      await clients
        .findOne({ id: order.cliente })
        .then(async (cliente) => {
          order.cliente = cliente._id;

          
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
  
  carregarDados();
  