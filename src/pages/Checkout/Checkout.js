import React from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css';
import { selectCartItems } from '../Cart/cartSelectors';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout">
      <div className="address-details">
        <h2>Shipping Address</h2>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Address Line 1</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Address Line 2</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input type="text" required />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="order-summary-item">
                <span>{item.title}</span>
                <span>${item.price} x {item.quantity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        {cartItems.length > 0 && (
          <button className="complete-payment-btn">Complete Payment</button>
        )}
        </div>
    </div>
  );
};

export default Checkout;
