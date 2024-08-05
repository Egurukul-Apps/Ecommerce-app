import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setToken, setIsAuthenticated } from '../../redux/authSlice';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { API_ENDPOINTS } from '../../config';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        dispatch(setUser(userInfo.data));
        dispatch(setToken(tokenResponse.access_token));
        dispatch(setIsAuthenticated(true));
        navigate('/'); // Redirect to home page after Google login
      } catch (error) {
        console.error('Google login failed', error);
      }
    },
    onError: () => console.log('Google Login Failed'),
  });

  return (
    <div className="login-form">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => googleLogin()} className="google-btn">
        Sign in with Google
      </button>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;