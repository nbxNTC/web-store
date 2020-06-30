import React, {useState, useEffect} from 'react';

import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/cart';

import api from '../../services/api';

import './styles.css'

import ProductCard from '../../components/ProductCard';

const ProductList = () => {
  
  const [products, setProducts] = useState([]);  

  const dispatch = useDispatch(); 
  
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get('products', {
      headers: {
        Authorization: user_id,
      }
    }).then(response => {
      setProducts(response.data);
    })
  }, [user_id]); 

  async function handleAddCart(product) {    
    const amount = 1;
    const item = {
      product,
      amount
    }
    dispatch(addProduct(item));      
  }

  return (
    <ul className="items-grid">
      {products.map(product => (
        <li key={product.id} className="item">
          <ProductCard 
            product={product} 
            handleAddCart={handleAddCart}
          />            
        </li>  
      ))}
    </ul>
  );
}

export default ProductList;