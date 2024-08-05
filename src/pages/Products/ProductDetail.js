import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { API_ENDPOINTS } from '../../config';
import './ProductDetail.css'; 

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${API_ENDPOINTS.PRODUCTS}/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleAddToCart = () => {
    console.log('Product added to cart:', product);
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2 className="product-title">{product.title}</h2>
      <img src={product.image} alt={product.title} className="product-image" />
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button className="buy-now-btn" onClick={handleAddToCart}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetail;
