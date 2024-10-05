import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider'; // Use AuthProvider instead of UserProvider

ReactDOM.render(
  <AuthProvider> {/* Replace UserProvider with AuthProvider */}
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
