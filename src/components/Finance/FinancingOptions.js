import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { fetchFinancingOptions, logFinancingOptionsVisit } from '../../api/apiService';
import { useAuth } from '../../context/AuthProvider';
import useStyles from './financingOptionsStyles';

const FinancingOptions = () => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useAuth();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchFinancingOptions();
        setOptions(data);
        const savedSelections = JSON.parse(localStorage.getItem('selectedOptions')) || [];
        setSelectedOptions(savedSelections);
        try {
          // Log that the user visited this page
          console.log('logging financing visit option');
          await logFinancingOptionsVisit();
        } catch (error) {
          setError(error);
        }

      } catch (err) {
        setError("Failed to load financing options");
      }
    };

    loadOptions();
  }, []);

  const handleSelect = (optionId) => {
    const updatedSelections = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    setSelectedOptions(updatedSelections);
    localStorage.setItem('selectedOptions', JSON.stringify(updatedSelections));
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h6" className={classes.welcomeText}>
        Welcome, {username}!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Financing Options
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {options.length === 0 && !error && <Typography>No options available</Typography>}
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option._id}>
            <Card className={classes.optionCard}>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOptions.includes(option._id)}
                      onChange={() => handleSelect(option._id)}
                    />
                  }
                  label=""
                  className={classes.checkboxControl}
                />
                <Typography variant="h5" className={classes.optionTitle}>
                  {option.option_name}
                </Typography>
                <Typography variant="body2">{option.description}</Typography>
                <Typography variant="body2" className={classes.optionDetails}>
                  Interest Rate: {option.interest_rate}%
                </Typography>
                <Typography variant="body2">Duration: {option.duration_months} months</Typography>
                <Typography variant="body2">Max Amount: ${option.max_amount}</Typography>
                <Typography variant="body2" className={classes.optionDetails}>
                  Eligibility: Min Income ${option.eligibility_criteria.min_income}, Credit Score {option.eligibility_criteria.credit_score}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FinancingOptions;
