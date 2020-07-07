import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash, FiArrowLeft, FiPlus, FiMinus } from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct, removeOneProduct, removeAllProducts } from '../../store/cart';

import './styles.css';
import logoImg from '../../assets/logo.png';

const Cart = () => {
  const history = useHistory();

  const dispatch = useDispatch(); 

  const cart = useSelector(state => state.cart);     

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

  function handleAddCart(product) {
    const amount = 1;
    const item = {
      product,
      amount
    }
    dispatch(addProduct(item));    
  }

  function handleRemoveCart(id) {
    dispatch(removeProduct(id));
  }

  function handleRemoveOneCart(id) {
    dispatch(removeOneProduct(id));
  }

  function handleRemoveAllCart() {
    dispatch(removeAllProducts());
  }

  async function handleCheckOut() {
    
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
        {cart.cart.map(item => (
          <li key={item.product.id}> 
            <div className="product">
              <img 
                src={item.product.image} 
                alt="produto"              
              />

              <p>{item.product.title}</p>

              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.value)}</p>   
              <div className="amount">
                <button onClick={() => handleAddCart(item.product)} type="button">
                    <FiPlus size="15" color="#494949" />
                </button> 
                <p>{item.amount}</p>
                <button onClick={() => handleRemoveOneCart(item.product.id)} type="button">
                    <FiMinus size="15" color="#494949" />
                </button> 
              </div>
              <button onClick={() => handleRemoveCart(item.product.id)} type="button">
                  <FiTrash size="15" color="#494949" />
              </button> 
            </div>   
          </li>    
        ))} 
        { cart.cart.length === 0 ?
          (
            <div className="product empty">
              <p>O seu carrinho está vazio :(</p>
            </div>   
          ) : null
        }        
        <div className="cart-properties bottom">          
          <span className="total">TOTAL:</span>
          <span className="total-value">
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cart.totalValue)}
          </span>
        </div>
        <div className="btn">
          <button 
            onClick={() => handleRemoveAllCart()} 
            type="button" 
          >              
            Limpar Carrinho
          </button> 
          <button 
            onClick={() => handleCheckOut()} 
            type="button"          
          >              
            Finalizar Pedido 
          </button> 
        </div> 
      </ul>
    </div>
  );
}

export default Cart;