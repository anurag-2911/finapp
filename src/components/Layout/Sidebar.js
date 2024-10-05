import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, MonetizationOn, AccountBalance, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'; // Import AuthContext

const Sidebar = () => {
  const { state } = useContext(AuthContext); // Access global authentication state
  const isUserAdmin = state.role === 'admin'; // Check if the user is an admin
  const isAuthenticated = state.isAuthenticated; // Check if the user is authenticated

  console.log('Auth state in sidebar', state);
  console.log('isUserAdmin in sidebar', isUserAdmin);
  console.log('isAuthenticated in sidebar', isAuthenticated);

  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: 'primary.main',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '104px',
        boxSizing: 'border-box',
      }}
    >
      <List>
        {/* Dashboard, visible only when authenticated */}
        <ListItem button component={Link} to="/dashboard" disabled={!isAuthenticated}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Apply for Financing, visible only when authenticated */}
        <ListItem button component={Link} to="/apply-finance" disabled={!isAuthenticated}>
          <ListItemIcon sx={{ color: 'white' }}>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary="Apply for Financing" />
        </ListItem>

        {/* Financing Options, visible only when authenticated */}
        <ListItem button component={Link} to="/financing-options" disabled={!isAuthenticated}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Financing Options" />
        </ListItem>

        {/* Admin Panel, visible only when the user is an admin */}
        <ListItem button component={Link} to="/admin-panel" disabled={!isUserAdmin}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
