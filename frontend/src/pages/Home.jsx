import React, { useEffect, useState } from 'react'
import Titulo from './../components/Titulo/index';
import { Filters } from './../components/Filters/index';
import Produtos from '../components/Produtos';
import api from '../services/api';

const Home = () => {
  //Declaração dos estados utilizados nesse componente 
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('nome')
  const [listaCategorias, setListaCategorias] = useState([])

  //Função responsável por atualizar o estado do título digitado no input do componente filters
  const handleTitleChange = (value) => {
    setTitle(value)
  }

  //Função responsável por atualiar o valor selecionado no dropmenu com o tipo de ordenação no componente filters
  const handleFilterChange = (value) => {
    setFilter(value)
  }

  //Função responsável por ordenar a lista de categorias por nome
  const listaCategoriasOrdenadas = listaCategorias.sort((a, b) => {
    return a.nomeCategoria.localeCompare(b.nomeCategoria)
  })

  //Função responsável por pegar a lista de categorias existente no DB
  useEffect(() => {
    api
      .get('/listarCategorias')
      .then((response) => {
        setListaCategorias(response.data)
      })
  }, [])

  //Retorno do componente Home
  //Basicamente exibe as categorias de produtos em ordem alfabética e dentro de cada categoria, os produtos na ordem selecionada, bem como os produtos que tem o nome digitado pelo usuário
  return (
    <section className=''>
      <Titulo texto={"Home"} />
      <div>
        <Filters onTitleChange={handleTitleChange} onFilterChange={handleFilterChange} />
      </div>
      {
        listaCategoriasOrdenadas.map((categ, key) => (
          <Produtos key={key} filter={filter} findTitle={title} nomeCategoria={categ.nomeCategoria} idCategoria={categ._id} />
        ))
      }
    </section>
  )
}

export default Home
