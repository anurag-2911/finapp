import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const isUserAdmin = user?.role === 'admin';
  const isUserTokenValid = user && user.token;

  console.log('user state in navbar', user);
  console.log('isUserAdmin in navbar', isUserAdmin);
  console.log('isUserTokenValid in navbar', isUserTokenValid);

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Finance App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <>
            <Button color="inherit" component={Link} to="/login" disabled={!isUserTokenValid}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup" disabled={!isUserTokenValid}>
              Signup
            </Button>
          </>


          <>
            <Button color="inherit" component={Link} to="/dashboard" disabled={!isUserTokenValid}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/financing-options" disabled={!isUserTokenValid}>
              Financing Options
            </Button>

            <Button color="inherit" component={Link} to="/admin-panel" disabled={!isUserAdmin}>
              Admin Panel
            </Button>

          </>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;