const orderModel = require('../models/orderModel');
const clientModel = require('../models/clientModel');
const productModel = require('../models/productModel')

class orderController {

    // Registrar pedido dentro do banco de dados através da API
    async saveOrder(req, res) {
        const max = await orderModel.findOne({}).sort({ codigo: -1 });
        const order = req.body;
        order.codigo = max == null ? 1 : max.codigo + 1;

        // Procurando produtos em productModel e substituindo o "idProduct" por ObjectId dentro do banco de dados
          for (const product of order.listaProdutos) {
              await productModel
                .findOne({ id: product.idProduct })
                .then((produto) => {
                  if (produto) {
                    product.idProduct = produto._id;
                  }
                });
            }

        // Procurando cliente com base no IdCliente enviado via endpoint, em clientModel e substituindo o "cliente" por ObjectId dentro do banco de dados
        const client = await clientModel.findOne({ id: order.cliente });
        if (!client) {
        return res.status(404).json({ error: 'cliente não encontrado' });
        }
        order.cliente = client._id; 

        const result = await orderModel.create(order);
        res.status(201).json(result);
    }

    // Listar os pedidos buscando no banco de dados através da API
    async listOrders (req, res) {
        const result = await orderModel.find({})
        res.status(200).json(result)
      }

    // Buscar o pedido por ID dentro do banco de dados através da API
    async findOrderByName(req, res) {
        const client = req.params.nome
        const result = await clientModel.findOne({ 'cliente': client })
        res.status(200).json(result)
    }

    // Atualizar o pedido encontrada no banco de dados, por ID, através da API
    async updateOrder(req, res) {
        const id = req.params.id
        const _id = String((await clientModel.findOne({ 'id': id }))._id)
        await clientModel.findByIdAndUpdate(String(_id), req.body)
        res.status(200).send()
      }
}

//Exportação da função
module.exports = new orderController();

