import React, { useState } from 'react';
import trash from '../../assets/trash.svg';

//As funções são passadas por propriedade, pois são aplicadas em outro componente
const ItemCarrinho = ({ item, onRemoveItem, onUpdateQuantity }) => {
  //Declaração dos estados utilizados nesse componente 
  const [quantity, setQuantity] = useState(item.quantidade);

  //Função responsável por atualizar a quantidade de itens no input do tipo number e chamar a função que altera os valores armazenados
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  //Função responsável por atualizar a página quando o input do tipo Number sair de foco
  const reloadPage = () => {
    window.location.reload()
  }

  // Retorno do componente Item carrinho (Apresenta as informações dos produtos selecionados pelo usuário)
  return (
    <div className='w-80 py-2 px-5 my-3 bg-white rounded-xl shadow'>
      <div className='flex justify-between mb-2'>
        <h3 className='font-semibold'>{item.nome}</h3>
        <div className='flex'>
          <p className='mr-2'>Qtd: </p>
          <input type="number" value={quantity} min={1} className='hover-input w-10 text-base px-1 h-6' onChange={handleQuantityChange} onBlur={reloadPage}/>
        </div>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>R${item.preco.toFixed(2)}</p>
        <button type='button' onClick={() => onRemoveItem(item.id)}><img src={trash} alt="" className='w-5' /></button>
      </div>
    </div>
  );
};

export default ItemCarrinho;
