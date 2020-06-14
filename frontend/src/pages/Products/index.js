import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiShoppingCart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Products() {
  const history = useHistory();
  
  const [products, setProducts] = useState([]);

  // const [cart, setCart] = useState([]);

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

  // async function handleCart(product) {
    
  // }

  return (
    <div onLoad={handleSession} className="products-container">
      <header>
        <div className="left">
          <img src={logoImg} alt="Web Store" width="10%"/>
          <span>Bem vindo(a), {user_name}</span>      
        </div>
        <div className="right">
          <button onClick={() => { history.push('/cart') }} type="button" style={ {width: 130} }>
              <FiShoppingCart size="18" color="#fff" />
              <span>
                Carrinho
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

      <h1>Produtos</h1>

      <ul className="items-grid">
        {products.map(product => (
          <li key={product.id} className="item">          
            <img 
              src={product.imgURL} 
              alt="produto"              
            />
            <div className="item-description">
              <h1>{product.title}</h1>
              <h2>{product.plataform}</h2>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>   
            </div>
            <button 
              onClick={() => {}} 
              type="button"
            >              
              Comprar 
            </button>       
          </li>  
        ))}
      </ul>
    </div>
  );
}