import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { Dashboard, MonetizationOn, AccountBalance, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'; 
import { UserContext } from '../../context/UserContext';  

const Sidebar = () => {
  const { state } = useContext(AuthContext); // Access global authentication state
  const { user } = useContext(UserContext); // Access user data, including avatar and username
  
  const isUserAdmin = state?.role === 'admin'; // Check if the user is an admin
  const isAuthenticated = state?.isAuthenticated; // Check if the user is authenticated

  console.log('Auth state in sidebar', state);
  console.log('User data in sidebar', user);

  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: 'primary.main',
        height: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '16px',
        boxSizing: 'border-box',
      }}
    >
      {isAuthenticated && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            paddingTop: '20px',
          }}
        >
          <Avatar
            src={user?.avatar}  // User avatar URL
            alt={user?.username}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h6">{user?.username}</Typography>
        </Box>
      )}

      <List>
        {isUserAdmin ? (
          <>
            <ListItem button component={Link} to="/admin-panel">
              <ListItemIcon sx={{ color: 'white' }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItem>

            <ListItem button component={Link} to="/analytics">
              <ListItemIcon sx={{ color: 'white' }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/dashboard" disabled={!isAuthenticated}>
              <ListItemIcon sx={{ color: 'white' }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/apply-finance" disabled={!isAuthenticated}>
              <ListItemIcon sx={{ color: 'white' }}>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary="Apply for Financing" />
            </ListItem>

            <ListItem button component={Link} to="/financing-options" disabled={!isAuthenticated}>
              <ListItemIcon sx={{ color: 'white' }}>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Financing Options" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
