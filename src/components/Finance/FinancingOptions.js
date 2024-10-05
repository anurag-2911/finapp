import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { fetchFinancingOptions } from '../../api/apiService';

const FinancingOptions = () => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchFinancingOptions();
        setOptions(data);
      } catch (err) {
        setError("Failed to load financing options");
      }
    };

    loadOptions();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Financing Options
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {options.map((option) => (
        <Card key={option._id} sx={{ mb: 2 }}>
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