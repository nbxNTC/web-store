import React from 'react';

import './styles.css'

const ProductCard = ({product, handleAddCart}) => {
  return (
    <>
      <div className="item-img">
        <img 
          src={product.image} 
          alt="produto"              
        />
      </div>                      
      <div className="item-description">
        <h1>{product.title}</h1>
        <h2>{product.plataform}</h2>
        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>   
        <button 
          onClick={() => handleAddCart(product)} 
          type="button"
          className="btn-buy"
        >              
          Comprar 
        </button> 
      </div>
    </>
  );
}

export default ProductCard;