import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress 
        variant="determinate" 
        {...props} 
        sx={{ color: '#3f51b5' }}  
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="caption" 
          component="div" 
          color="textPrimary" 
          sx={{ fontSize: '1rem', fontWeight: 'bold' }}  
        >
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};
