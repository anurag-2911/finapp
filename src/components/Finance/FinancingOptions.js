import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const FinancingOptions = () => {
  const options = [
    { id: 1, name: 'Option 1', details: 'Details about option 1.' },
    { id: 2, name: 'Option 2', details: 'Details about option 2.' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Financing Options
      </Typography>
      {options.map((option) => (
        <Card key={option.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{option.name}</Typography>
            <Typography variant="body2">{option.details}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FinancingOptions;
