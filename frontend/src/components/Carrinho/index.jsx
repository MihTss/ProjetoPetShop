import React, { useState } from 'react';
import ItemCarrinho from '../ItemCarrinho';

const Carrinho = () => {
  //Declaração dos estados utilizados nesse componente 
  //No caso, é definido os valores padrão dos itens do carrinho buscando no localStorage e validando a existência desses itens
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  //Função responsável por remover um item do carrinho do usuário
  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.location.reload() //Reload para atualizar as alterações no front
  };

  //Função responsável por atualizar a quantidade de um item do carrinho
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantidade: newQuantity }; //Atualiza a quantidade, mas antes copia todas as outras informações do objeto, atualizando apenas a quantidade
      }
      return item;
    });
    setCartItems(updatedItems); //Atualiza o valor do estado
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); //Atualiza o valor do localStorage
  };

  // Retorno do componente Carrinho
  return (
    <div className=''>
      { //Valida a existência de itens no carrinho, caso existam itens, mostra-os na tela, caso contrário, mostra que não teve produtos selecionados
        cartItems.length > 0 ? (
          cartItems.map(item => (
            <ItemCarrinho key={item.id} item={item} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
          ))
        ) : (
          <p className='w-80 py-2 px-5 my-3 bg-white rounded-xl shadow'>Nenhum produto selecionado!</p>
        )}
    </div>
  );
};

export default Carrinho;
