import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { setSearchTerm } from '../../redux/productSlice';
import './TopBar.css';

const TopBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="top-bar">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-actions">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default TopBar;