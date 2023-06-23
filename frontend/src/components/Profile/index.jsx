import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  //Declaração dos estados utilizados nesse componente 
  const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))
  const [dropMenu, setDropMenu] = useState(false)
  const navigate = useNavigate()

  //Função responsável por controlar a abertura da modal para logout
  const dropMenuHandle = () => {
    setDropMenu(!dropMenu)
  }

  //Função responsável por fazer o logout do usuário
  const logoutHandle = () => {
    sessionStorage.setItem('userLogged', null)
    navigate('/')
    // window.location.reload()
  }

  // Retorno do componente Profile
  //Consiste na apresentação da imagem do usuário logado e no funcionamento da modal de logout de usuário
  return (
    <div className='relative'>
      <button type='button' onClick={dropMenuHandle} className='overflow-hidden w-10 h-10 flex items-center rounded-full hover-profile'>
        <img src={userLogged ? userLogged.imagem : ""} className='' />
      </button>
      <button type='button' onClick={logoutHandle} className={`absolute right-0 flex flex-col items-end shadow mt-2 hover-drop ${dropMenu ? "flex" : "hidden"}`}>
        <div className='bg-white h-2 w-3 relative mr-3' style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
        <div className='bg-white px-4 py-1 rounded-lg'>
          <p>Logout</p>
        </div>
      </button>
    </div>
  )
}

export default Profile