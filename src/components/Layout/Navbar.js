import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finance App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" disabled={!isAuthenticated}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login" disabled={!isAuthenticated}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup" disabled={!isAuthenticated}>
            Signup
          </Button>
          <Button color="inherit" component={Link} to="/dashboard" disabled={isAuthenticated}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/financing-options" disabled={isAuthenticated}>
            Financing Options
          </Button>
          {userRole === 'admin' && (
            <Button color="inherit" component={Link} to="/admin-panel" disabled={isAuthenticated}>
              Admin Panel
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;