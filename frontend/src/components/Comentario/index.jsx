import React from 'react'
import star from '../../assets/star.svg'

const Comentario = ({ conteudo }) => {
    return (
        <div className='bg-white hover-input px-4 py-2 mb-2'>
            <h4 className='font-semibold'>{conteudo.usuario}</h4>
            <div className='flex justify-between'>
                <p className='ml-2'>{conteudo.texto}</p>
                <p className='flex items-center'>{conteudo.nota},0 <img src={star} alt="" className='h-5 ml-1'/></p>
            </div>
        </div>
    )
}

export default Comentario