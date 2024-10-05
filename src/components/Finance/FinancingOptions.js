import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { fetchFinancingOptions } from '../../api/apiService';

const FinancingOptions = () => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        console.log("Fetching financing options...");
        const data = await fetchFinancingOptions();
        console.log("Fetched financing options:", data);
        setOptions(data);
      } catch (err) {
        console.error("Error fetching financing options:", err);
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
      {options.length === 0 && !error && <Typography>No options available</Typography>}
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