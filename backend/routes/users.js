const express             = require('express')
const router              = express.Router()
const clientController    = require('../controllers/clientController')
const categoryController  = require('../controllers/categoryController')
const productController   = require('../controllers/productController')
const orderController     = require('../controllers/orderController')
const loginController     = require('../controllers/loginController');
const auth                = require ('../auth/auth')


// Clientes endpoints 
router.post('/cadastrarCliente'               , clientController.saveClient)
router.get('/listarClientes'                  , clientController.listClient)
router.get('/idCliente/:id'                   , clientController.searchClient)
router.put('/atualizarCliente/:id'            , clientController.updateClient)
router.delete('/excluirCliente/:id'           , clientController.deleteClient)

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

// Orders endopoints 
router.post('/cadastrarPedido',auth.autorizar , orderController.saveOrder)
router.get('/listarPedidos'                   , orderController.listOrders)
router.get('/buscarPedidoPorNome/:cliente'    , orderController.searchOrder)
router.put('/atualizarPedido/:id'             , orderController.updateOrder)
 
// Login endpoints 
router.post('/login'                          , loginController.login);

module.exports = router