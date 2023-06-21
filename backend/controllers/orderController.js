const pedidoModel = require('../models/orderModel');
const clienteModel = require('../models/clientModel');
const productModel = require('../models/productModel')

class PedidoController {

    //CADASTRAR 
    async cadastrarPedidos(req, res) {
        const max = await pedidoModel.findOne({}).sort({ codigo: -1 });
        const pedido = req.body;
        pedido.codigo = max == null ? 1 : max.codigo + 1;


        for (const product of pedido.listaProdutos) {
            await productModel
              .findOne({ id: product.idProduct })
              .then((produto) => {
                if (produto) {
                  product.idProduct = produto._id;
                }
              });
          }
          
        const cliente = await clienteModel.findOne({ id: pedido.cliente });
        if (!cliente) {
        return res.status(404).json({ error: 'cliente não encontrado' });
        }
        // Utilize o ObjectId encontrado
        pedido.cliente = cliente._id; 

        
        const resultado = await pedidoModel.create(pedido);
        res.status(201).json(resultado);
    }

    //LISTAR
    async listarPedidos(req, res) {
        const resultado = await pedidoModel.find({})
        res.status(200).json(resultado)
      }

    //BUSCAR POR NOME DO CLIENTE 
    async buscarPedidoPorNome(req, res) {
        const cliente = req.params.nome
        const resultado = await clienteModel.findOne({ 'cliente': cliente })
        res.status(200).json(resultado)
    }

    //ATUALIZAR PEDIDOS 
    async atualizarPedidos(req, res) {
        const id = req.params.id
        const _id = String((await clienteModel.findOne({ 'id': id }))._id)
        await clientModel.findByIdAndUpdate(String(_id), req.body)
        res.status(200).send()
      }
}

module.exports = new PedidoController();

