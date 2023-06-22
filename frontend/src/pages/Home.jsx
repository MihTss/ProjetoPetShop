import React, { useEffect, useState } from 'react'
import Titulo from './../components/Titulo/index';
import { Filters } from './../components/Filters/index';
import Produtos from '../components/Produtos';
import api from '../services/api';

const Home = () => {
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('nome')

  const [listaCategorias, setListaCategorias] = useState([])

  const handleTitleChange = (value) => {
    setTitle(value)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
  }

  const listaCategoriasOrdenadas = listaCategorias.sort((a, b) => {
    return a.nomeCategoria.localeCompare(b.nomeCategoria)
  })

  useEffect(() => {
    api
      .get('/listarCategorias')
      .then((response) => {
        setListaCategorias(response.data)
      })
  }, [])
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
