import React, { useEffect, useState } from 'react'
import Titulo from './../components/Titulo/index';

import { Link, useParams } from 'react-router-dom';

import produtos from "../test/produtos.json"
import Comentarios from '../components/Comentarios';
import star from '../assets/star.svg'
import api from '../services/api';

const Detalhes = () => {
    const { id } = useParams()
    const [modal, setModal] = useState(false)
    var somaNotas = 0
    const [produtoEscolhido, setProdutoEscolhido] = useState([])
    const [nomeCategoria, setNomeCategoria] = useState('')

    useEffect(() => {
        api
            .get(`/idProduto/${id}`)
            .then((response) => {
                setProdutoEscolhido(response.data)
            })
    }, [])

    useEffect(() => {
        console.log(produtoEscolhido.categoria)
        if(produtoEscolhido.categoria){
            api
              .get(`/idCategoria/${produtoEscolhido.categoria}`)
              .then((response) => {
                setNomeCategoria(response.data.nomeCategoria)
                console.log(response.data.nomeCategoria)
            })
        }
    }, [produtoEscolhido])

    if (produtoEscolhido.comentarios) {
        produtoEscolhido.comentarios.map((comentario) => {
            return somaNotas += comentario.nota
        })
    }
    const mediaNotas = produtoEscolhido.comentarios ? somaNotas / produtoEscolhido.comentarios.length : 0;

    // Lógica do carrinho
    const [quantity, setQuantity] = useState(1)


    const handleQuantityChange = (event) => {
        const newValue = parseInt(event.target.value, 10)
        setQuantity(newValue)
    }

    const handleAddToCart = () => {
        const product = {
            id: produtoEscolhido.id,
            nome: produtoEscolhido.nome,
            preco: produtoEscolhido.preco,
            quantidade: quantity
        };

        // Recupere os dados do carrinho do Local Storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Verifique se o produto já está no carrinho
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantidade += quantity;
        } else {
            cartItems.push(product);
        }

        // Atualize os dados do carrinho no Local Storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        setModal(true)
    };

    return (
        <div className=''>
            <Titulo texto={produtoEscolhido.nome + " - Detalhes"} />
            <div className='flex justify-center items-center gap-5 my-5'>
                <div className='h-96 w-96 flex items-center justify-center bg-white rounded-xl shadow'>
                <img src={produtoEscolhido.imagem} alt="" className='h-80 w-80' />
                </div>
                <div className='w-1/3 bg-white p-8 h-96 rounded-xl flex flex-col justify-between shadow'>
                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-2xl font-semibold'>{produtoEscolhido.nome}</h3>
                            <p className='flex items-center'>{5} <img src={star} alt="" className='h-5 ml-1' /></p>
                        </div>
                        <p className='font-semibold text-yellow-500'>{nomeCategoria}</p>
                        <p className='my-5'>{produtoEscolhido.descricao}</p>
                        <p className='font-semibold text-xl my-5'>R${produtoEscolhido.preco ? produtoEscolhido.preco.toFixed(2) : "0.00"}</p>
                    </div>
                    <div className='flex items-center'>
                        <input type="number" value={quantity} onChange={handleQuantityChange} min={1} className='hover-input w-12 text-base p-2' />
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