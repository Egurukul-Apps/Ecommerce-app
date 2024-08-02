
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <GoogleOAuthProvider clientId="849984988437-vr2bip4ocbdbu7rb8f6ij5l0k83o4su9.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }>
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

function DashboardHome() {
  return <h2>Welcome to your Dashboard</h2>;
}

export default App;