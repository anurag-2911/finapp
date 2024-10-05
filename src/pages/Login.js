import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext
import InfoIcon from '@mui/icons-material/Info';  // Tooltip icon for username
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Access dispatch from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      const { access_token, role } = response.data;
      localStorage.setItem('token', access_token);
      // Dispatch the login success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: access_token, role }
      });

      setError(null);
      if (role === 'admin') {
        navigate('/admin-panel'); // Navigate to AdminPanel if user is admin
      } else {
        navigate('/dashboard'); // Navigate to Dashboard for normal users
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',  // Full viewport height
        backgroundColor: '#f4f6f8',  // Subtle background color
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '90%', sm: '400px' },  // Responsive width
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        {/* Username Field */}
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field with Visibility Toggle */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5 }}  // Larger button for better touch experience
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
