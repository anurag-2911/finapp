import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Finance Application
      </Typography>
      <Typography variant="body1">
        This is a finance application where users can apply for financing, view options, and manage their financial dashboard.
      </Typography>
    </Box>
  );
};

export default Home;
