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
        <img src={logoImg} alt="Web Store" width="10%"/>    
        <span>Bem vindo(a), {user_name}</span>        
        <Link className="back-link" to="/products">
              <FiArrowLeft size="16" color="#9400d3"/>
              Voltar
        </Link>          
        <button onClick={handleLogout} type="button">
            <FiPower size="18" color="#9400d3" />
        </button>
      </header>

      <h1>Carrinho</h1>

      <ul>
        <div className="cart-properties">
          <span className="properties-left">PRODUTO</span>
          <span className="properties-right">PREÇO</span>
          <span className="properties-right">QUANTIDADE</span>
          <span className="properties-right">REMOVER</span>
        </div>
        {products.map(product => (
          <li key={product.id}>          
            <img 
              src="https://a-static.mlcdn.com.br/618x463/god-of-war-iii-remasterizado-ps4-sony/variadocombr/0711719501336/7560b57fd796f9b9798e161319684022.jpg" 
              width="7%"
            />

            <p>{product.title}</p>

            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>   
            <p>1</p>
            <button onClick={handleLogout} type="button">
                <FiTrash size="15" color="#494949" />
            </button>    
          </li>  
        ))}
      </ul>
    </div>
  );
}