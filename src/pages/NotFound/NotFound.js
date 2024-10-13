import React from 'react';
import { Box, Typography } from '@mui/material';
import useStyles from './notFoundStyles';  

function NotFound() {
  const classes = useStyles();  

  return (
    <Box className={classes.notFoundContainer}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        Oops! The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
}

export default NotFound;
