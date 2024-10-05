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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {options.map((option) => (
          <Card key={option._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5">{option.option_name}</Typography>
              <Typography variant="body2">{option.description}</Typography>
              <Typography variant="body2">Interest Rate: {option.interest_rate}%</Typography>
              <Typography variant="body2">Duration: {option.duration_months} months</Typography>
              <Typography variant="body2">Max Amount: ${option.max_amount}</Typography>
              <Typography variant="body2">
                Eligibility: Min Income ${option.eligibility_criteria.min_income}, Credit Score {option.eligibility_criteria.credit_score}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FinancingOptions;