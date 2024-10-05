import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, MonetizationOn, AccountBalance, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: 'primary.main',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '164px', // Adjusted to match AppBar height
        boxSizing: 'border-box', // Ensure padding is included in height
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: 'white' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/apply-finance">
          <ListItemIcon sx={{ color: 'white' }}>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary="Apply for Financing" />
        </ListItem>
        <ListItem button component={Link} to="/financing-options">
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Financing Options" />
        </ListItem>
        <ListItem button component={Link} to="/admin-panel">
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