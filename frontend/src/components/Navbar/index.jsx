import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo-petshop.png';
import Profile from '../Profile';

const Navbar = () => {
  const location = useLocation();
  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))


  return (
    <div className='flex justify-between items-center h-20 px-5' style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
      <Link to="/">
        <img src={logo} alt="" className='h-16 hover-button' />
      </Link>
      <div className='flex items-center'>
        {location.pathname !== '/login' && !userLogged && (
          <Link to="/login" className='m-2 hover-button bg-white rounded-lg px-2 py-1'>Logar</Link>
        )}
        {location.pathname !== '/cadastro' && !userLogged && (
          <Link to="/cadastro" className='m-2 hover-button bg-white rounded-lg px-2 py-1'>Cadastrar</Link>
        )}
        {location.pathname !== '/checkout' && userLogged && (
          <Link to="/checkout" className='m-2 hover-button bg-white rounded-lg px-2 py-1'>Carrinho</Link>
        )}
        {
         location.pathname !== '/checkout' && !userLogged && (
          <Link to="/login" className='m-2 hover-button bg-white rounded-lg px-2 py-1'>Carrinho</Link>
        ) 
        }
        {userLogged && (
          <Profile/>
        )         
        }
      </div>
    </div>
  );
};

export default Navbar;