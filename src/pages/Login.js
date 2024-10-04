import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For redirecting after login
import { login } from '../api/apiService'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      const token = response.data.access_token;
      
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token);
      
      // Redirect to the dashboard after successful login
      navigate('/dashboard'); 

      setError(null);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2, width: '100%' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, width: '100%' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
