import React from 'react'
import Comentario from '../Comentario'

const Comentarios = ({objeto}) => {  
  return (
    <section className='m-auto w-1/2 mb-5'>
      <h3 className='text-lg font-semibold mb-4'>Comentários do produto:</h3>
      {objeto.map((comentario, i) => (
        <Comentario conteudo={comentario} key={i}/>
      ))}
    </section>
  )
}

export default Comentarios