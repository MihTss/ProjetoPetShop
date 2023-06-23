import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  //Return do componente ProductCard (Exibe as informações resumidas dos produtos vendidos)
  return (
    <div className='flex flex-col items-center bg-white rounded-xl p-4 hover-input'>     
      <img src={product.imagem} alt="" className='h-60 w-60'/>
      <h4 className='font-semibold text-xl'>{product.nome}</h4>
      <p>R${product.preco.toFixed(2)}</p>
      <Link to={`/produto/${product._id}`} className='px-7 py-2 m-1 bg-yellow-400 rounded-lg hover-button'>Detalhes</Link>
    </div>
  );
}

export default ProductCard;
