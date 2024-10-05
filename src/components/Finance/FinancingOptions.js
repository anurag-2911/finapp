import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { fetchFinancingOptions, applyForFinancing } from '../../api/apiService';

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

  const handleApply = async (optionId) => {
    try {
      await applyForFinancing(optionId);
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to submit application.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Financing Options
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {options.length === 0 && !error && <Typography>No options available</Typography>}
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{option.option_name}</Typography>
                <Typography variant="body2">{option.description}</Typography>
                <Typography variant="body2">Interest Rate: {option.interest_rate}%</Typography>
                <Typography variant="body2">Duration: {option.duration_months} months</Typography>
                <Typography variant="body2">Max Amount: ${option.max_amount}</Typography>
                <Typography variant="body2">
                  Eligibility: Min Income ${option.eligibility_criteria.min_income}, Credit Score {option.eligibility_criteria.credit_score}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleApply(option._id)}>
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FinancingOptions;