import React, { useState } from 'react'
import Titulo from './../components/Titulo/index';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    //Declaração dos estados utilizados nesse componente 
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate('')

    //Função responsável por preparar e enviar o JSON com as informações de login do usuário. Além disso, armazena os dados recebidos do DB em um sessionStorage,bem como o JWT gerado pelo Backend, afim de validar a sessão do usuário antes de qualquer operação.
    const handleSubmit = (event) => {
        event.preventDefault();

        const bodyParam = {
            email: email,
            senha: senha
        }

        api.post('/login', bodyParam)
            .then((response) => {
                var objetoString = JSON.stringify(response.data)
                sessionStorage.setItem("userLogged", objetoString); //Armazenamento das informações do usuário recebidas como resposta da API
                navigate("/");
            })
            .catch((err) => {
                console.error(err.response.data)
                alert(" Ocorreu um erro! " + err.response.data.error)
            })
            .finally(() => {
                //Exclusão dos dados digitados, (segurança)
                setEmail("")
                setSenha("")
            })
    }

    //Retorno do componente Login
    //Basicamente retorna os campos para que o usuário possa digitar seus dados de login e enviar esse login
    return (
        <div className='mb-10'>
            <Titulo texto={"Login de Usuário"} />
            <form onSubmit={handleSubmit} className='bg-white rounded-xl text-center mx-auto flex flex-col items-center w-1/4 py-10 my-4 shadow'>
                <h3 className='font-semibold text-lg mb-5'>Login</h3>
                <input required className='w-2/3 p-2 mb-2 hover-input rounded-lg' type="email" placeholder='E-mail' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input required className='w-2/3 p-2 hover-input rounded-lg' type="password" placeholder='Senha' value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                <div className='flex gap-4 mt-10'>
                    <Link to="/cadastro" className='w-24 hover-button rounded-lg bg-white flex items-center justify-center'>Cadastre-se</Link>
                    <button type='submit' className='w-24 hover-button py-1 rounded-lg bg-yellow-400'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login