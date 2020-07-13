import React, {useState, useEffect} from 'react';

import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/cart';

import api from '../../services/api';

import './styles.css'

import ProductCard from '../../components/ProductCard';

const ProductList = ({ title, order, page }) => {  
  
  const [products, setProducts] = useState([]);  

  const dispatch = useDispatch(); 
  
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get('products', {
      params: {
        'title': title,
        'order': order,
        'pages': page
      },
      headers: {
        Authorization: user_id,
      }
    }).then(response => {           
      console.log(response.headers);
      setProducts(response.data);
    })
  }, [user_id, title, order, page]); 

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
      { products.length ?
        <>
          {products.map(product => (
            <li key={product.id} className="item">
              <ProductCard 
                product={product} 
                handleAddCart={handleAddCart}
              />            
            </li>  
          ))}
        </>
      :      
        <li>
          Nenhum produto encontrado.
        </li>        
      }
    </ul>
  );
}

export default ProductList;