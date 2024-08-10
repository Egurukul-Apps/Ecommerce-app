import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { increaseQuantity,decreaseQuantity,removeFromCart, setNavigation, clearNavigation } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(setNavigation('/dashboard/checkout'));
    dispatch(clearNavigation()); 
    navigate('/dashboard/checkout'); 
  };

  

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img className="cart-item-image" src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </li>
          ))}
          <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
        </ul>
      )}
    </div>
  );
};

export default Cart;
