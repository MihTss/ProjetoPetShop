const orderModel = require('../models/orderModel');
const clientModel = require('../models/clientModel');
const productModel = require('../models/productModel')

class orderController {

    //Register orders 
    async saveOrder(req, res) {
        const max = await orderModel.findOne({}).sort({ codigo: -1 });
        const order = req.body;
        order.codigo = max == null ? 1 : max.codigo + 1;

        // searching for products in productModel, and replacing the "idProduct" with ObjectId inside DB
          for (const product of order.listaProdutos) {
              await productModel
                .findOne({ id: product.idProduct })
                .then((produto) => {
                  if (produto) {
                    product.idProduct = produto._id;
                  }
                });
            }
        // searching for clients in clientModel, and replacing the "cliente" with ObjectId inside DB
        const client = await clientModel.findOne({ id: order.cliente });
        if (!client) {
        return res.status(404).json({ error: 'cliente não encontrado' });
        }
        // replacing with objectId found
        order.cliente = client._id; 

        const result = await orderModel.create(order);
        res.status(201).json(result);
    }

    // List Orders
    async listOrders (req, res) {
        const result = await orderModel.find({})
        res.status(200).json(result)
      }

    // Seach order by Client Id 
    async searchOrder(req, res) {
        const client = req.params.nome
        const result = await clientModel.findOne({ 'cliente': client })
        res.status(200).json(result)
    }

    // Update orders 
    async updateOrder(req, res) {
        const id = req.params.id
        const _id = String((await clientModel.findOne({ 'id': id }))._id)
        await clientModel.findByIdAndUpdate(String(_id), req.body)
        res.status(200).send()
      }
}

module.exports = new orderController();

