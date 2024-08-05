import React from 'react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <h1>Dashboard</h1>
      <input type="text" className="search-input" placeholder="Search..." />
    </div>
  );
};

export default TopBar;
