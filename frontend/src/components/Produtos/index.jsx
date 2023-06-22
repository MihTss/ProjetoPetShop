import React, { useEffect, useState } from 'react'
import ProductCard from './../ProductCard/index';
import api from '../../services/api';

const Produtos = ({ nomeCategoria, filter, findTitle, idCategoria }) => {
  const [todosProdutos, setTodosProdutos] = useState([])

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


  const listaProdutos = todosProdutos.filter(
    produto => produto.categoria.toLowerCase() === idCategoria.toLowerCase()
  )

  const sortedProducts = listaProdutos.sort((a, b) => {
    if (filter === 'preco-menor') {
      return b.preco - a.preco
    } else if (filter === 'preco-maior') {
      return a.preco - b.preco
    } else {
      return a.nome.localeCompare(b.nome)
    }
  })

  const filteredProducts = sortedProducts.filter(produto => {
    if (!findTitle) {
      return true
    }
    return produto.nome.toLowerCase().includes(findTitle.toLowerCase())
  })

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