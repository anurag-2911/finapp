import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, MonetizationOn, AccountBalance, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useStyles from './sidebarStyles';

const Sidebar = () => {
  const classes = useStyles();
  const { state } = useContext(AuthContext);  // Access global authentication state
  const isUserAdmin = state.role === 'admin';  // Check if the user is an admin
  const isAuthenticated = state.isAuthenticated;  // Check if the user is authenticated

  console.log('Auth state in sidebar', state);
  console.log('isUserAdmin in sidebar', isUserAdmin);
  console.log('isAuthenticated in sidebar', isAuthenticated);

  return (
    <Box className={classes.sidebar}>
      <List>
        {/* Conditionally render only Admin Panel for admin users */}
        {isUserAdmin ? (
          <>
            {/* Admin Panel, visible only when the user is an admin */}
            <ListItem button component={Link} to="/admin-panel">
              <ListItemIcon className={classes.listItemIcon}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItem>

            <ListItem button component={Link} to="/analytics">
              <ListItemIcon className={classes.listItemIcon}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
          </>
        ) : (
          <>
            {/* Non-admin users see other options */}
            <ListItem button component={Link} to="/dashboard" disabled={!isAuthenticated}>
              <ListItemIcon className={classes.listItemIcon}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/apply-finance" disabled={!isAuthenticated}>
              <ListItemIcon className={classes.listItemIcon}>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary="Apply for Financing" />
            </ListItem>

            <ListItem button component={Link} to="/financing-options" disabled={!isAuthenticated}>
              <ListItemIcon className={classes.listItemIcon}>
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
