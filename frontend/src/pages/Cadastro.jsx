import React, { useState } from 'react';
import Titulo from '../components/Titulo';
import mc from '../assets/mc.svg';
import '../css/card.css';
import api from './../services/api';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    //Declaração dos estados utilizados nesse componente 
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate()
    const [numeroCartaoFormatado, setNumeroCartaoFormatado] = useState('');

    //Declaração do estado em forma de objeto que armazena as informações do usuário digitadas no formulário
    const [userData, setUserData] = useState({
        nomeCompleto: '',
        telefone: '',
        endereco: '',
        cpf: '',
        foto: null,
        cartaoCredito: {
            nome: '',
            numero: '',
            cvc: '',
        },
        email: '',
        senha: '',
    });

    //Função responsável por formatar o número do cartão e exibir no front, adicionando dois espaços a cara quatro dígitos informados pelo usuário
    function formatarNumeroCartao(event) {
        let numeroDigitado = event.target.value;
        numeroDigitado = numeroDigitado.replace(/\D/g, '');

        let numeroFormatado = '';
        for (let i = 0; i < numeroDigitado.length; i++) {
            if (i > 0 && i % 4 === 0) {
                numeroFormatado += '  ';
            }
            numeroFormatado += numeroDigitado[i];
        }

        setNumeroCartaoFormatado(numeroFormatado);
        //Armazena os dados do cartão de crédito sem a formatação, ou seja, o número sem espaços
        setUserData((prevData) => ({
            ...prevData,
            cartaoCredito: {
                ...prevData.cartaoCredito,
                numero: numeroDigitado,
            },
        }));
    }

    //Função responsável por manipular a imagem selecionada pelo usuário (Redimensiona a imagem para que a maior dimensão fique em 150px ocupando menos espaço no BD, salva a imagem e a exibe como preview na tela de cadastro)
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();

                //Lógica de redimensionamento da imagem selecionada
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 150;
                    const MAX_HEIGHT = 150;

                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const dataUrl = canvas.toDataURL('image/jpeg');

                    //Seta o preview da imagem para aparecer no front
                    setImagePreview(dataUrl);
                    //Armazena a imagem no objeto que contém as informações do usuário
                    setUserData((prevData) => ({
                        ...prevData,
                        imagem: dataUrl,
                    }));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file); //inicia a leitura do conteúdo do arquivo e, quando a leitura é concluída, permite manipular a URL de dados resultante e redimensionar a imagem/definir o preview
        }
    };

    //Função responsável por atualizar a mudança de dados de qualquer input do formulário.
    const handleDataChange = (event) => {
        const { name, value } = event.target;

        //Verifica se é um dado do cartão de crédito, pois precisa alterar a rota de armazenamento do objeto
        if (name.startsWith('cartaoCredito.')) {
            const cardField = name.split('.')[1];
            setUserData((prevData) => ({
                ...prevData,
                cartaoCredito: {
                    ...prevData.cartaoCredito,
                    [cardField]: value,
                },
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    //Função responsável por enviar o userData para o endpoint que armazena o cliente no BD
    const handleFormSubmit = (event) => {
        event.preventDefault();
        api
            .post('/cadastrarCliente', userData)
            .then((response) => {
                alert("Cadastro efetuado!")
                navigate('/')
            })
            .catch((error) => {
                console.error(error.response.data);
                alert(" Ocorreu um erro! " + error.response.data.error)
            });
    };

    // Retorno do componente Cadastro, contendo o formulário com os inputs necessários para cadastrar o usuário
    return (
        <div className='bg-white'>
            <Titulo texto="Cadastro de Cliente" />
            <div className="flex flex-col items-center mx-auto shadow bg-white w-fit p-10 rounded-xl mb-10">
                <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
                    <div className="flex gap-10">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Dados Pessoais</h3>
                            <input
                                required
                                type="text"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="Nome"
                                name="nomeCompleto"
                                value={userData.nomeCompleto}
                                onChange={handleDataChange}
                            />
                            <br />
                            <input
                                required
                                type="text"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="Telefone"
                                name="telefone"
                                value={userData.telefone}
                                onChange={handleDataChange}
                            />
                            <br />
                            <input
                                required
                                type="text"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="Endereço"
                                name="endereco"
                                value={userData.endereco}
                                onChange={handleDataChange}
                            />
                            <br />
                            <input
                                required
                                type="text"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="CPF"
                                name="cpf"
                                value={userData.cpf}
                                onChange={handleDataChange}
                            />
                            <br />
                            <p className="mb-2">Selecione sua foto de perfil:</p>
                            <div id="upload-imagem" className="flex">
                                <div>
                                    <label htmlFor="upload" className="hover-button bg-yellow-400 px-3 py-1 rounded-lg cursor-pointer">
                                        Selecionar imagem
                                    </label>
                                    <input
                                        id="upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="ml-2 h-16 w-16 overflow-hidden">
                                        <div className="image-preview w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${imagePreview})` }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Dados do Cartão</h3>
                            <div className="card__bank mb-4">
                                <div className="card__bank-info">
                                    <span className="card__bank-name">Cartão</span>
                                    <img className="card__img" src={mc} alt="" />
                                </div>
                                <div className="card__number">
                                    <input
                                        required
                                        type="text"
                                        value={numeroCartaoFormatado}
                                        onChange={formatarNumeroCartao}
                                        maxLength={22}
                                        minLength={22}
                                        placeholder="xxxx  xxxx  xxxx  xxxx"
                                    />
                                </div>
                                <div className="card__details">
                                    <input
                                        className="card__name"
                                        required
                                        type="text"
                                        placeholder="Nome no cartão"
                                        name="cartaoCredito.nome"
                                        value={userData.cartaoCredito.nome}
                                        onChange={handleDataChange}
                                    />
                                    <div className="card__code">
                                        <span>CVC</span>
                                        <input
                                            required
                                            type="password"
                                            className="card__cvc"
                                            placeholder="CVC"
                                            maxLength={3}
                                            minLength={3}
                                            name="cartaoCredito.cvc"
                                            value={userData.cartaoCredito.cvc}
                                            onChange={handleDataChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Dados de Login</h3>
                            <input
                                required
                                type="email"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="E-mail"
                                name="email"
                                value={userData.email}
                                onChange={handleDataChange}
                            />
                            <br />
                            <input
                                required
                                type="password"
                                className="hover-input p-2 w-80 my-2"
                                placeholder="Senha"
                                name="senha"
                                value={userData.senha}
                                onChange={handleDataChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="hover-button py-1 w-24 bg-yellow-400 mt-4">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;