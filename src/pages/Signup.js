import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, Tooltip, InputAdornment, IconButton, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful signup
import { signup } from '../api/apiService'; // API call for signup
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility for password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle visibility for confirm password
  const [error, setError] = useState(null); // Store error messages
  const [success, setSuccess] = useState(null); // Store success messages
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous messages
    setError(null);
    setSuccess(null);

    // Validate form inputs
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Call the signup API
      const response = await signup(username, password);
      setSuccess('Signup successful! You can now log in.');
      
      // Allow login after successful signup
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Redirect to login after 5 seconds
    } catch (err) {
      // Display error message returned from the backend
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error creating account. Please try again.');
      }
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8', p: 3 }}>
      <Paper elevation={6} sx={{ width: { xs: '100%', sm: '400px' }, p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          {/* Username Field with Tooltip */}
          <Tooltip title="Enter your preferred username. It's case-sensitive." arrow>
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
          <Tooltip title="Enter a strong password." arrow>
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

          {/* Confirm Password Field with Show/Hide Toggle */}
          <Tooltip title="Confirm your password." arrow>
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;
