import React from 'react';
import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
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
