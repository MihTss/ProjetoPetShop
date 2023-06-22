const express             = require('express')
const router              = express.Router()
const clientController    = require('../controllers/clientController')
const categoriaController = require('../controllers/categoryController')
const productController   = require('../controllers/productController')
const pedidosController   = require('../controllers/orderController')
const loginController     = require('../controllers/loginController');
const auth                = require ('../auth/auth')


// Endpoints clientes
router.get('/listarClientes'         , clientController.listarCliente)
router.get('/idCliente/:id'         , clientController.buscarPorIdCliente)
router.post('/cadastrarCliente'     , clientController.cadastrarCliente)
router.put('/atualizarCliente/:id'  , clientController.atualizarCliente)
router.delete('/excluirCliente/:id' , clientController.excluirCliente)

//Endpoints Categoria
router.get('/listarCategorias'       , categoriaController.listarCategoria)
router.get('/idCategoria/:_id'       , categoriaController.buscarPorIdCategoria)
router.post('/cadastrarCategoria'   , categoriaController.cadastrarCategoria)
router.put('/atualizarCategoria/:id', categoriaController.atualizarCategoria)

//Endopoints Produto
router.post('/cadastrarProduto'     , productController.cadastrarProduto)
router.get('/listarProdutos'         , productController.listarProduto)
router.get('/idProduto/:_id'         , productController.buscarPorIdProduto)
router.put('/atualizarProduto/:_id'  , productController.atualizarProduto)

//Endopoints Pedidos
router.post('/cadastrarPedido',auth.autorizar, pedidosController.cadastrarPedidos)
router.put('/atualizarPedido/:id'           , pedidosController.atualizarPedidos)
router.get('/buscarPedidoPorNome/:cliente'   , pedidosController.buscarPedidoPorNome)
router.get('/listarPedidos'                  , pedidosController.listarPedidos)


//Endpoints Login
router.post('/login', loginController.login);

module.exports = router