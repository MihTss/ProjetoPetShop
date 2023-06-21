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

// Categories endpoints 
router.post('/cadastrarCategoria'             , categoryController.saveCategory)
router.get('/listarCategorias'                , categoryController.listCategory)
router.get('/idCategoria/:id'                 , categoryController.searchCategory)
router.put('/atualizarCategoria/:id'          , categoryController.updateCategory)

// Products endopoints 
router.post('/cadastrarProduto'               , productController.saveProducts)
router.get('/listarProdutos'                  , productController.listProduct)
router.get('/idProduto/:id'                   , productController.searchProduct)
router.put('/atualizarProduto/:id'            , productController.updateProduct)

// Orders endopoints 
router.post('/cadastrarPedido',auth.autorizar , orderController.saveOrder)
router.get('/listarPedidos'                   , orderController.listOrders)
router.get('/buscarPedidoPorNome/:cliente'    , orderController.searchOrder)
router.put('/atualizarPedido/:id'             , orderController.updateOrder)
 
// Login endpoints 
router.post('/login'                          , loginController.login);

module.exports = router