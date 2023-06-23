# ProjetoPetShop
## Desenvolvido por Gabriel Rossa e Milena Schrickte

## O projeto conta com os seguintes Endpoints:

### CLIENTE
#### /cadastrarCliente (POST)
Exemplo de JSON a ser enviado:
{
  "nomeCompleto": "",
  "cpf": "",
  "telefone": ,
  "endereco": "",
  "imagem": "",
  "cartaoCredito": [
    {
      "nome": "",
      "numero": ,
      "cvc": 
    }
  ],
  "email": "",
  "senha": ""
}
#### /listarClientes (GET)
#### /idCliente/:id (GET)
#### /atualizarCliente/:id (PUT)
#### /excluirCliente/:id (DELETE)

### CATEGORIA
#### /cadastrarCategoria (POST)
Exemplo de JSON a ser enviado:
{
  "nomeCategoria": "",
  "descricao": ""
}
#### /listarCategorias (GET)
#### /idCategoria/:id (GET)
#### /atualizarCategoria/:id (PUT)

### PRODUTO
#### /cadastrarProduto (POST)
Exemplo de JSON a ser enviado:
{
  "nome": "",
  "imagem": "",
  "descricao": "",
  "preco": ,
  "categoria": "",
  "animal": "",
  "comentarios": [
    {
      "texto": "",
      "nota": ,
      "usuario": ""
    }
  ]
}
#### /listarProdutos (GET)
#### /idProduto/:_id (GET)
#### /atualizarProduto/:_id (PUT)

### PEDIDOS
#### /cadastrarPedido (POST)
Exemplo de JSON a ser enviado:
--Header
{
  "Authorization": "Bearer ..."
}

--Body
{
  "cliente": "",
  "precoTotal": ,
  "listaProdutos": [
    {
      "idProduct": "",
      "quantidade": 
    }
  ]
}
#### /listarPedidos (GET)
#### /buscarPedidoPorNome/:nomeDoCliente (GET)
#### /atualizarPedido/:id (PUT)

### LOGIN
#### /login (POST)
{
  "email": "",
  "senha": ""
}
