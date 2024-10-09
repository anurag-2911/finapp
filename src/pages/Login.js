import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext
import { UserContext } from '../context/UserContext';  // Import UserContext

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Access dispatch from AuthContext
  const { setUser } = useContext(UserContext); // Access UserContext to set avatar and username

  // Generate avatar URL based on username (Using a service like Gravatar or a placeholder)
  const generateAvatar = (username) => {
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
    return defaultAvatar;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      const { access_token, role } = response.data; // We don't get avatar from backend, handle it on frontend
      localStorage.setItem('token', access_token);

      // Dispatch the login success action and set the username
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: access_token, role, username }
      });

      // Generate the avatar and set the user information in UserContext
      const avatarUrl = generateAvatar(username);
      console.log('Generated avatar URL:', avatarUrl);

      setUser({
        token: access_token,
        role,
        username,
        avatar: avatarUrl,  // Set the avatar
      });

      console.log('User info after login:', { token: access_token, role, username, avatar: avatarUrl });

      setError(null);

      // Navigate based on role
      if (role === 'admin') {
        navigate('/admin-panel');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
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
        <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>Login</Button>
      </form>
    </Box>
  );
}

export default Login;
