import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'; // Import AuthContext

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext); // Access global authentication state and dispatch
  const isUserAdmin = state.role === 'admin'; // Check if the user is an admin
  const isAuthenticated = state.isAuthenticated; // Check if the user is authenticated

  console.log('Auth state in navbar', state);
  console.log('isUserAdmin in navbar', isUserAdmin);
  console.log('isAuthenticated in navbar', isAuthenticated);

  // Logout handler
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch the logout action
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finance App
        </Typography>
        <Box>
          {/* Show only Admin Panel and Logout for admin users */}
          {isUserAdmin ? (
            <>
              <Button color="inherit" component={Link} to="/admin-panel">
                Admin Panel
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Non-admin users see other options */}
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login" disabled={isAuthenticated}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup" disabled={isAuthenticated}>
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/dashboard" disabled={!isAuthenticated}>
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/financing-options" disabled={!isAuthenticated}>
                Financing Options
              </Button>
              {isAuthenticated && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
