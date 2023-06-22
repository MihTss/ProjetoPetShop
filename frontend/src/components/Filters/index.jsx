import React, { useState } from 'react';

import './styles.css';

export const Filters = ({ onTitleChange, onFilterChange }) => {
  const [selected, setSelected] = useState('nome')
  const [title, setTitle] = useState('')

  const handleSelectChange = (event) =>{
    setSelected(event.target.value)
    onFilterChange(event.target.value)
  }

  const handleTitle = (event) =>{
    setTitle(event.target.value)
    onTitleChange(event.target.value)
  }
  
  return (
    <div className="w-screen text-center input-group my-3 gap-4 grid grid-cols-5 px-4">
      <div className='col-span-1'></div>
      <input required value={title} onChange={handleTitle} type="text" className="col-span-3 form-control p-2 hover-input rounded-lg" placeholder='Digite o título que deseja buscar...'/>
      <select value={selected} onChange={handleSelectChange} className='hover-select rounded-end p-2'>
        <option value="nome">Nome</option>
        <option value="preco-menor">Preço (maior-menor)</option>
        <option value="preco-maior">Preço (menor-maior)</option>
      </select>
    </div>
  );
};
