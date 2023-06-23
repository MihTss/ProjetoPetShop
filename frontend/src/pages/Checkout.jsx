import React, { useEffect, useState } from 'react'
import Titulo from './../components/Titulo/index';
import Carrinho from './../components/Carrinho/index';
import arrowRight from '../assets/arrow-right.svg'
import '../css/io-button.css'
import mc from '../assets/mc.svg';
import '../css/card.css'
import api from '../services/api';
import headerToken from './../services/headerConstructor';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    //Declaração dos estados utilizados nesse componente 
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0.00)
    const navigate = useNavigate()
    const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))

    //Declaração do estado em forma de objeto que armazena as informações do pedido
    const [orderData, setOrderData] = useState({});

    //Função responsável por buscar os itens do carrinho no localStorage, atualizar o estado cartItems com esses itens e também atualizar o estado orderData com a lista de produtos atualizada a partir dos itens do carrinho.
    useEffect(() => {
        if (!userLogged) {
            navigate("/login")
            return
        }
        setOrderData({
            cliente: userLogged.id,
            precoTotal: '',
            listaProdutos: [
                {
                    idProduct: '',
                    quantidade: '',
                }
            ]
        })
        //Busca itens do carrinho no localStorage
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        //Cria uma nova lista com os itens e suas informações
        const updatedListaProdutos = storedCartItems.map(item => ({
            idProduct: item.id,
            quantidade: item.quantidade,
        }));

        //Adiciona os itens no OrderData
        setOrderData(prevOrderData => ({
            ...prevOrderData,
            listaProdutos: updatedListaProdutos,
        }));
    }, []);

    //Função responsável por calcular o preço total dos produtos existentes no carrinho e armazenar no orderData a cada vez que os itens do carrinho forem alterados
    useEffect(() => {
        const calculateTotal = () => {
            let totalPrice = 0;
            cartItems.forEach((item) => {
                totalPrice += (item.preco * item.quantidade);
            });

            totalPrice = Number(totalPrice.toFixed(2));

            setTotal(totalPrice);
            setOrderData(prevOrderData => ({
                ...prevOrderData,
                precoTotal: totalPrice,
            }))
        };

        calculateTotal();
    }, [cartItems]);

    //Função responsável por validar a existencia de itens no carrinho, além de fazer o envio das informações para o endpoint responsável por armazená-las no DB, montando o JSON com header e body
    const handleSubmit = () => {
        if (orderData.listaProdutos.length === 0) {
            return alert('Seu carrinho está vazio!')
        }

        //Chama a função que formata o autenticador que será colocado no header do JSON
        const headers = headerToken()

        console.log(typeof (headers))
        //Envia os dados e o token de autenticação para o endpoint
        api
            .post('/cadastrarPedido', orderData, { headers })
            .then((response) => {
                alert('Compra efetuada!')
                //Reseta os dados armazenados para iniciar um novo pedido
                setOrderData([])
                localStorage.removeItem("cartItems")
                navigate('/')
            })
            .catch((error) => {
                console.error(error.response.data)
                alert("Ocorreu um erro! " + error.response.data.error)
                navigate('/login')
            })
    }

    //Retorno do componente com a parte de telas do checkout contendo o carrinho de compras, as informações de pagamento do usuário e o endereço.
    return (
        <div className='mb-10'>
            {
                userLogged ?

                    (<>
                        <Titulo texto={"Checkout"} />
                        <div className='flex flex-col justify-center align-center my-4 bg-white p-8 w-fit rounded-xl mx-auto shadow'>
                            <div className='flex justify-center gap-16'>
                                <div className='w-80'>
                                    <h3 className='font-semibold text-lg'>Produtos selecionados:</h3>
                                    <Carrinho />
                                </div>
                                <div className='w-80'>
                                    <h3 className='font-semibold text-lg'>Endereço de entrega:</h3>
                                    <div className='w-72 py-2 px-5 my-3 bg-white rounded-xl shadow'>
                                        <p>{userLogged.endereco}</p>
                                    </div>
                                    <h3 className='font-semibold text-lg'>Cartão de compra:</h3>
                                    <div className="card__bank my-5 shadow">
                                        <div className="card__bank-info">
                                            <span className="card__bank-name">Cartão</span>
                                            <img className="card__img" src={mc} alt="" />
                                        </div>
                                        <div className="card__number">
                                            <input
                                                disabled
                                                type="text"
                                                value={userLogged.cartaoCredito[0].numero.toString().replace(/(.{4})/g, '$1  ')}
                                            />
                                        </div>
                                        <div className="card__details">
                                            <input
                                                disabled
                                                className="card__name"
                                                type="text"
                                                value={userLogged.cartaoCredito[0].nome}
                                            />
                                            <div className="card__code">
                                                <span>CVC</span>
                                                <input
                                                    disabled
                                                    type="text"
                                                    className="card__cvc"
                                                    value={userLogged.cartaoCredito[0].cvc}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <h3 className='font-semibold text-lg'>Total: R${total.toFixed(2)}</h3>
                                <button className='cssbuttons-io-button' onClick={handleSubmit}>Finalizar pedido
                                    <div className='icon'>
                                        <svg xmlns={arrowRight} width={24} height={24} alt="" viewBox='0 0 24 24'><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </>) : (
                        <div></div>
                    )
            }
        </div>
    );
};

export default Checkout;
