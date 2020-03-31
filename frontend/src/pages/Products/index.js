import React, { useState, useEffect } from 'react';
import { useHistory, Link  } from 'react-router-dom';
import { FiPower, FiShoppingCart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Products() {
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

  async function handleAddToCart(id) {
    try {
      alert(`teste: ${id}`);
    } catch (error) {
      alert('Erro ao comprar produto, tente novamente.');
    }
  }

  return (
    <div onLoad={handleSession} className="products-container">
      <header>
        <img src={logoImg} alt="Web Store" width="10%"/>
        <span>Bem vindo(a), {user_name}</span>      
        <button onClick={handleLogout} type="button">
            <FiShoppingCart size="18" color="#9400d3" />
        </button>  
        <button onClick={handleLogout} type="button">
            <FiPower size="18" color="#9400d3" />
        </button>
      </header>

      <h1>Produtos</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>          
            <img 
              src="https://a-static.mlcdn.com.br/618x463/god-of-war-iii-remasterizado-ps4-sony/variadocombr/0711719501336/7560b57fd796f9b9798e161319684022.jpg" 
              width="80%"
            />

            <strong>{product.title}</strong>

            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>   

            <button onClick={() => handleAddToCart(product.id)} type="button">Comprar</button>       
          </li>  
        ))}
      </ul>
    </div>
  );
}