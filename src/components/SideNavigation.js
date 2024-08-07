import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SideNavigation.css';
import logo from '../assets/logo.png'; // Make sure to add your logo file to the assets folder

function SideNavigation() {

  
  return (
    <nav className="side-nav">
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" />
      </div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
        <li><Link to="/dashboard/products">Products</Link></li>
        <li><Link to="/dashboard/categories">Categories</Link></li> 
      </ul>
    </nav>
  );
}

export default SideNavigation;