import React, { useState } from 'react';
import ItemCarrinho from '../ItemCarrinho';

const Carrinho = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    window.location.reload()
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantidade: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div className=''>
      {cartItems.length > 0 ? (
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
