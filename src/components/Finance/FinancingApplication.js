import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';
import { fetchFinancingOptions, applyForFinance } from '../../api/apiService'; // Import API functions

const FinancingApplication = () => {
  const [options, setOptions] = useState([]); // Available financing options
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected financing options
  const [totalMaxAmount, setTotalMaxAmount] = useState(0); // Total amount of selected options
  const [neededAmount, setNeededAmount] = useState(''); // User input for needed amount
  const [purpose, setPurpose] = useState(''); // User input for the purpose
  const [error, setError] = useState(null); // Error handling state

  // Load financing options from backend on component mount
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

  // Handle selection of a financing option
  const handleSelect = (optionId) => {
    const updatedSelections = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    setSelectedOptions(updatedSelections);
    localStorage.setItem('selectedOptions', JSON.stringify(updatedSelections));
    calculateTotalMaxAmount(updatedSelections, options);
  };

  // Calculate the total max amount of selected financing options
  const calculateTotalMaxAmount = (selectedIds, allOptions) => {
    const total = selectedIds.reduce((sum, id) => {
      const option = allOptions.find(opt => opt._id === id);
      return sum + (option ? option.max_amount : 0);
    }, 0);
    setTotalMaxAmount(total);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await applyForFinance(selectedOptions, neededAmount, purpose); // Use API service to submit
      console.log('Financing application submitted successfully');
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Apply for Financing</Typography>
      {error && <Typography color="error">{error}</Typography>}
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
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Max Amount: ${totalMaxAmount}
        </Typography>
        <TextField
          fullWidth
          id="neededAmount"
          name="neededAmount"
          label="Needed Amount"
          value={neededAmount}
          onChange={(e) => setNeededAmount(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          id="purpose"
          name="purpose"
          label="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          margin="normal"
        />
        <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default FinancingApplication;
