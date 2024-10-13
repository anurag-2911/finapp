import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { signup } from '../../api/apiService'; 
import useStyles from './signupStyles';  

function Signup() {
  const classes = useStyles();  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(null);  
  const navigate = useNavigate();  

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
      }, 5000);  // Redirect to login after 5 seconds
    } catch (err) {
      // Display error message returned from the backend
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error creating account. Please try again.');
      }
    }
  };

  return (
    <Box className={classes.signupContainer}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
      {success && <Alert severity="success" className={classes.alert}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classes.formControl}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.formControl}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={classes.formControl}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
