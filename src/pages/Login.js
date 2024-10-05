import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Access dispatch from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      const { access_token, role } = response.data;

      // Dispatch the login success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: access_token, role }
      });

      setError(null);
      navigate('/dashboard');
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
