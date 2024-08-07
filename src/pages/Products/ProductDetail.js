import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(currentProduct));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h2>{currentProduct.title}</h2>
      <img src={currentProduct.image} alt={currentProduct.title} />
      <p>{currentProduct.description}</p>
      <p>${currentProduct.price}</p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      <button onClick={handleAddToCart} className="add-to-cart-btn">Buy Now</button>
    </div>
  );
};

export default ProductDetail;