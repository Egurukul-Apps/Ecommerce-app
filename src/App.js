// src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  </GoogleOAuthProvider>
);

export default App;