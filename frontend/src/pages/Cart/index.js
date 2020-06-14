import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower, FiTrash, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Cart() {
  const history = useHistory();
  
  const [products, setProducts] = useState([]);  

  const user_id = localStorage.getItem('user_id');
  const user_name = localStorage.getItem('user_name');

  useEffect(() => {
    api.get('products', {
      headers: {
        Authorization: user_id,
      }
    }).then(response => {
      setProducts(response.data);
    })
  }, [user_id]);

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function handleSession() {
    if (!user_name) {
      localStorage.clear();
      history.push('/');
    }    
  }  

  return (
    <div onLoad={handleSession} className="cart-container">
      <header>
        <div className="left">
          <img src={logoImg} alt="Web Store" width="10%"/>
          <span>Bem vindo(a), {user_name}</span>      
        </div>
        <div className="right">
          <button onClick={() => { history.push('/products') }} type="button" style={ {width: 100} }>
              <FiArrowLeft size="18" color="#fff" />
              <span>
                Voltar
              </span>
          </button>
          <button onClick={handleLogout} type="button" style={ {width: 90} }>
              <FiPower size="18" color="#fff" />
              <span>
                Sair
              </span>
          </button>
        </div>
      </header>      

      <h1>Carrinho</h1>

      <ul>
        <div className="cart-properties">
          <span>PRODUTO</span>
          <span>PREÇO</span>
          <span>QUANTIDADE</span>
          <span>REMOVER</span>
        </div>
        {products.map(product => (
          <li key={product.id}>          
            <img 
              src={product.imgURL} 
              alt="produto"              
            />

            <p>{product.title}</p>

            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>   
            <p>1</p>
            <button onClick={() => {}} type="button">
                <FiTrash size="15" color="#494949" />
            </button>    
          </li>  
        ))}
        <div className="cart-properties">          
          <span className="total">TOTAL:</span>
          <span className="total-value">R$2000,00</span>
        </div>
        <div className="btn">
          <button 
            onClick={() => {}} 
            type="button" 
          >              
            Limpar Carrinho
          </button> 
          <button 
            onClick={() => {}} 
            type="button"          
          >              
            Finalizar Pedido 
          </button> 
        </div> 
      </ul>
    </div>
  );
}