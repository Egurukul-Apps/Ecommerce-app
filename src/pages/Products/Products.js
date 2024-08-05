import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(API_ENDPOINTS.PRODUCTS)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const viewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => viewDetails(product.id)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
