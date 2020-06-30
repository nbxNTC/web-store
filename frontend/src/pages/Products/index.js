import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiShoppingCart } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

import ProductList from '../../components/ProductList';

const Products = () => {
  const history = useHistory(); 

  const user_name = localStorage.getItem('user_name');

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

      <ProductList/>
      
    </div>
  );
}

export default Products;