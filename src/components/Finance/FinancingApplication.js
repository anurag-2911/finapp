import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';
import { fetchFinancingOptions, applyForFinance } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import useStyles from './financingApplicationStyles';

const FinancingApplication = () => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalMaxAmount, setTotalMaxAmount] = useState(0);
  const [neededAmount, setNeededAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { username } = useAuth();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchFinancingOptions();
        setOptions(data);
        const savedSelections = JSON.parse(localStorage.getItem('selectedOptions')) || [];
        setSelectedOptions(savedSelections);
        calculateTotalMaxAmount(savedSelections, data);
      } catch (error) {
        console.error("Failed to load financing options:", error);
        setError('Failed to load financing options');
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
    calculateTotalMaxAmount(updatedSelections, options);
  };

  const calculateTotalMaxAmount = (selectedIds, allOptions) => {
    const total = selectedIds.reduce((sum, id) => {
      const option = allOptions.find(opt => opt._id === id);
      return sum + (option ? option.max_amount : 0);
    }, 0);
    setTotalMaxAmount(total);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await applyForFinance(selectedOptions, neededAmount, purpose);
      console.log('Financing application submitted successfully');
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application');
    }
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h6" className={classes.welcomeText}>
        Welcome, {username}!
      </Typography>
      <Typography variant="h5">Apply for Financing</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography className={classes.successMessage}>Application submitted successfully! Redirecting to dashboard...</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {options.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option._id)}
                    onChange={() => handleSelect(option._id)}
                  />
                }
                label={option.option_name}
                className={classes.checkboxLabel}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" className={classes.totalMaxAmount}>
          Total Max Amount: ${totalMaxAmount}
        </Typography>
        <TextField
          fullWidth
          id="neededAmount"
          name="neededAmount"
          label="Needed Amount"
          value={neededAmount}
          onChange={(e) => setNeededAmount(e.target.value)}
          className={classes.textField}
        />
        <TextField
          fullWidth
          id="purpose"
          name="purpose"
          label="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className={classes.textField}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.submitButton}
          disabled={success}
        >
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default FinancingApplication;
