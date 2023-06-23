import React, { useEffect, useState } from 'react'
import Titulo from './../components/Titulo/index';
import { Link, useParams } from 'react-router-dom';
import Comentarios from '../components/Comentarios';
import star from '../assets/star.svg'
import api from '../services/api';

const Detalhes = () => {
    //Declaração dos estados utilizados nesse componente 
    const { id } = useParams()
    const [modal, setModal] = useState(false)
    const [produtoEscolhido, setProdutoEscolhido] = useState([])
    const [nomeCategoria, setNomeCategoria] = useState('')
    const [Quantidade, setQuantidade] = useState(1)
    var somaNotas = 0

    //Função responsável por pegar produto selecionado, a partir do ID encontrado na URL da página, usando a API
    useEffect(() => {
        api
            .get(`/idProduto/${id}`)
            .then((response) => {
                setProdutoEscolhido(response.data)
            })
    }, [])

    //Função responsável por pegar o nome da categoria do produto em questão a partir do relacionamento do DB
    useEffect(() => {
        if (produtoEscolhido.categoria) {
            api
                .get(`/idCategoria/${produtoEscolhido.categoria}`)
                .then((response) => {
                    setNomeCategoria(response.data.nomeCategoria)
                })
        }
    }, [produtoEscolhido])

    //Valida a existencia de comentários no produto e armazena a nota presente nesse comentário no Somanotas para posteriormente calcular a média
    if (produtoEscolhido.comentarios) {
        produtoEscolhido.comentarios.map((comentario) => {
            return somaNotas += comentario.nota
        })
    }

    //Cálculo da média de notas dos comentários
    const mediaNotas = produtoEscolhido.comentarios ? somaNotas / produtoEscolhido.comentarios.length : 0;

    // INÍCIO DA LÓGICA DO CARRINHO
    //Função responsável por atualizar o valor do input e do estado de quantidade de itens
    const handleQuantidadeChange = (event) => {
        const newValue = parseInt(event.target.value, 10)
        setQuantidade(newValue)
    }

    //Função responsável por adicionar o produto com a quantidade certa ao carrinho
    const handleAddToCart = () => {
        const product = {
            id: produtoEscolhido.id,
            nome: produtoEscolhido.nome,
            preco: produtoEscolhido.preco,
            quantidade: Quantidade
        };

        // Pega os dados do carrinho do Local Storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Verifica se o produto já está no carrinho
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantidade += Quantidade;
        } else {
            cartItems.push(product);
        }

        // Atualiza os itens do carrinho no Local Storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        setModal(true)
    };

    //Retorno do componente detalhes que contém as seções, imagem, informações do produto, a opção de adicionar ao carrinho, bem como os comentários enviados sobre o produto com as respectivas notas dos usuários
    return (
        <div>
            <Titulo texto={produtoEscolhido.nome + " - Detalhes"} />
            <div className='flex justify-center items-center gap-5 my-5'>
                <div className='h-96 w-96 flex items-center justify-center bg-white rounded-xl shadow'>
                    <img src={produtoEscolhido.imagem} alt="" className='h-80 w-80' />
                </div>
                <div className='w-1/3 bg-white p-8 h-96 rounded-xl flex flex-col justify-between shadow'>
                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-2xl font-semibold'>{produtoEscolhido.nome}</h3>
                            <p className='flex items-center'>{mediaNotas.toFixed(1)} <img src={star} alt="" className='h-5 ml-1' /></p>
                        </div>
                        <p className='font-semibold text-yellow-500'>{nomeCategoria}</p>
                        <p className='my-5'>{produtoEscolhido.descricao}</p>
                        <p className='font-semibold text-xl my-5'>R${produtoEscolhido.preco ? produtoEscolhido.preco.toFixed(2) : "0.00"}</p>
                    </div>
                    <div className='flex items-center'>
                        <input type="number" value={Quantidade} onChange={handleQuantidadeChange} min={1} className='hover-input w-12 text-base p-2' />
                        <button type='button' onClick={handleAddToCart} className='ml-2 px-5 py-2 bg-yellow-400 rounded-lg hover-button'>Adicionar ao carrinho</button>
                    </div>
                </div>
            </div>
            {produtoEscolhido.comentarios && <Comentarios objeto={produtoEscolhido.comentarios} />}

            <div className={`items-center justify-center fixed w-screen h-screen top-0 ${modal ? 'flex' : 'hidden'}`}>
                <div className='bg-black w-screen fixed h-screen opacity-50 z-1'></div>
                <div className='bg-white flex flex-col items-center justify-center p-10 z-10 rounded-xl'>
                    <h2 className='text-2xl mb-4'>Produto adicionado ao carrinho!</h2>
                    <Link className='text-lg py-2 px-8 rounded-lg bg-yellow-400 font-semibold' to={"/"}>Ok</Link>
                </div>
            </div>
        </div>
    )
}

export default Detalhes