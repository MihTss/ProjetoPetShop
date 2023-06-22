import React from 'react'

const Titulo = ({texto} ) => {
  return (
    <div className='w-screen items-center flex justify-center h-12 mt-4'>
      <h2 className='text-2xl font-semibold'>{texto}</h2>
    </div>
  )
}

export default Titulo
