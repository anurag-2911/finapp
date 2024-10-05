import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, MonetizationOn, AccountBalance, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const isUserAdmin = user?.role === 'admin';
  const isUserTokenValid = Boolean(user?.token);

  console.log('user state in sidebar',   user);
  console.log('isUserAdmin in sidebar', isUserAdmin);
  console.log('isUserTokenValid in sidebar', isUserTokenValid);
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
        <ListItem button component={Link} to="/dashboard" disabled={!Boolean(isUserTokenValid)}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/apply-finance" disabled={!Boolean(isUserTokenValid)}>
          <ListItemIcon sx={{ color: 'white' }}>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary="Apply for Financing" />
        </ListItem>
        <ListItem button component={Link} to="/financing-options" disabled={!Boolean(isUserTokenValid)}>
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Financing Options" />
        </ListItem>
        <ListItem button component={Link} to="/admin-panel" disabled={!Boolean(isUserAdmin)}>
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