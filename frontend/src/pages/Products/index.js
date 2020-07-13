import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiShoppingCart, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

import ProductList from '../../components/ProductList';

const Products = () => {

  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);

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

  function handlePageRight() {
    setPage(page + 1);
  }

  function handlePageLeft() {
    if (page > 1) {
      setPage(page - 1);
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
          <button onClick={() => { history.push('/register-product') }} type="button" style={ {width: 100} }>              
              <span>
                Vender
              </span>
          </button>
          <button onClick={() => { history.push('/cart') }} type="button" style={ {width: 60} }>
              <FiShoppingCart size="18" color="#fff" />              
          </button>
          <button onClick={handleLogout} type="button" style={ {width: 90} }>
              <FiPower size="18" color="#fff" />
              <span>
                Sair
              </span>
          </button>
        </div>
      </header>


      <div className="search">

        <input 
          type="text"
          placeholder="Buscar produto"
          value={title}                        
          onChange={e => setTitle(e.target.value)}
          required
          /> 
        <div className="pagination">
          <button onClick={() =>  handlePageLeft() } type="button" style={ {width: 40} }>
            <FiArrowLeft size="18" color="#fff" />          
          </button>
          <p>{page}</p>
          <button onClick={() =>  handlePageRight() } type="button" style={ {width: 40} }>
            <FiArrowRight size="18" color="#fff" />          
          </button>
        </div>
      </div>
          <h1>Produtos</h1>

      <ProductList
        title={title}  
        order={order}
        page={page}
      />      
      
    </div>
  );
}

export default Products;