import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo-petshop.png';
import Profile from '../Profile';
import jwt from 'jwt-decode'

const Navbar = () => {
  // Declaração dos estados utilizados nesse componente 
  const location = useLocation();
  const [userLogged, setUserLogged] = useState(JSON.parse(sessionStorage.getItem('userLogged')))

  //Função responsável por verificar se o token do usuário está valido a cada troca de página, caso ela não esteja, exclui as informações do usuário da sessionStorage afim de "deslogar" ele, como uma validação da sessão do usuário
  useEffect(() => {
    const token = userLogged ? userLogged.token : null
    if (token) {
      //Decodifica as informações do token
      const dataToken = jwt(token)
      //Pega o horário de expiração do token
      const expirationTime = dataToken.exp
      //Compara a hora de expiração com a hora atual e, caso esteja expirada, remove as informações do usuário da sessionStorage
      if (expirationTime < Date.now() / 1000) {
        sessionStorage.setItem('userLogged', null)
        window.location.reload()
      }
    }
    setUserLogged(JSON.parse(sessionStorage.getItem('userLogged')))
  }, [location])

  //Return do componente navbar
  //A ideia aqui é fazer a navegação entre páginas, mas antes é feita a validações referentes à qual página o usuário se encontra e se está logado ou não
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
          <Profile />
        )
        }
      </div>
    </div>
  );
};

export default Navbar;