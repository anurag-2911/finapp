import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';
import { fetchFinancingOptions } from '../../api/apiService';

const FinancingApplication = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalMaxAmount, setTotalMaxAmount] = useState(0);
  const [neededAmount, setNeededAmount] = useState('');

  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchFinancingOptions();
      setOptions(data);
      const savedSelections = JSON.parse(localStorage.getItem('selectedOptions')) || [];
      setSelectedOptions(savedSelections);
      calculateTotalMaxAmount(savedSelections, data);
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://<BACKEND_API_URL>/apply-finance', { selectedOptions, neededAmount }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Financing application submitted:', response.data);
    } catch (err) {
      console.error('Error submitting application:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Apply for Financing</Typography>
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
          margin="normal"
        />
        <Button color="primary" variant="contained" type="submit">
          Submit Application
        </Button>
      </form>
    </Box>
  );
};

export default FinancingApplication;