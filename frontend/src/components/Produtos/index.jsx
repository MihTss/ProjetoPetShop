import React, { useEffect, useState } from 'react'
import ProductCard from './../ProductCard/index';
import api from '../../services/api';

const Produtos = ({ nomeCategoria, filter, findTitle, idCategoria }) => {
    //Declaração dos estados utilizados nesse componente 
  const [todosProdutos, setTodosProdutos] = useState([])

  //UseEffect para pegar os dados dos produtos através da API, usando axios
  useEffect(() => {
    api
      .get('/listarProdutos')
      .then((response) => {
        setTodosProdutos(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //Cria uma lista de produtos apenas com os itens filtrados com a categoria correspondente, recebida por props
  const listaProdutos = todosProdutos.filter(
    produto => produto.categoria.toLowerCase() === idCategoria.toLowerCase()
  )

  //Cria uma nova lista a partir dos produtos filtrados, mas agora ordenando-os de acordo com o filtro selecionado
  const sortedProducts = listaProdutos.sort((a, b) => {
    if (filter === 'preco-menor') {
      return b.preco - a.preco
    } else if (filter === 'preco-maior') {
      return a.preco - b.preco
    } else {
      return a.nome.localeCompare(b.nome)
    }
  })

  //Cria uma nova lista a partir dos produtos ordenados, mas agora apenas com os produtos cujo nome seja igual ao nome digitado no input do tipo texto existente no componente filters
  const filteredProducts = sortedProducts.filter(produto => {
    if (!findTitle) {
      return true
    }
    return produto.nome.toLowerCase().includes(findTitle.toLowerCase())
  })

  //Retorno do componente Produtos
  //Faz a validação da existência de produtos, caso não tenha nenhum produto correspondente, apresenta uma div vazia, caso tenha apresenta o componente da categoria correspondente
  return (
    <section>
      {
        filteredProducts.length === 0 ? (
          <div>
          </div>
        ) : (
          <div>
            <h3 className='text-center font-semibold w-screen bg-yellow-400 py-1'>{nomeCategoria}</h3>
            <div className='grid grid-cols-3 gap-4 m-4'>
              {
                filteredProducts.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))
              }
            </div>
          </div>
        )
      }

    </section>
  )
}

export default Produtos