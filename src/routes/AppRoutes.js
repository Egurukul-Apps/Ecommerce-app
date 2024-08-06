import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import Products from '../pages/Products/Products';
import ProductDetail from '../pages/Products/ProductDetail';
import Categories from '../pages/Categories/Categories'; // Import the new Categories component

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetail />} />
      <Route path="categories" element={<Categories />} /> {/* Add this new route */}
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRoutes;