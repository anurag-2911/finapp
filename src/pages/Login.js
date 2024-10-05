import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Tooltip, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
      // Navigate based on role
      if (role === 'admin') {
        navigate('/admin-panel'); // Navigate to AdminPanel if user is admin
      } else {
        navigate('/dashboard'); // Navigate to Dashboard for normal users
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '400px' },
          backgroundColor: 'white',
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Username Field with Tooltip */}
          <Tooltip title="Enter your username. It's case-sensitive." arrow>
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
                      <InfoIcon color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Tooltip>

          {/* Password Field with Show/Hide Toggle and Tooltip */}
          <Tooltip title="Enter your password. Make sure it's strong." arrow>
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
                    <IconButton onClick={handlePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Tooltip>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              height: '50px',
              mt: 2,
              boxShadow: 3,
              ':hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
