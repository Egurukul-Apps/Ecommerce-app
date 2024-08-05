import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { API_ENDPOINTS } from '../../config';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    axios.get(API_ENDPOINTS.PRODUCTS)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleClick = (productId) => {
    navigate(`/dashboard/products/${productId}`); 
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div 
            className="product-card" 
            key={product.id} 
            onClick={() => handleClick(product.id)} 
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;