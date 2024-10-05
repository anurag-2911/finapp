import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchFinancingOptions } from '../../api/apiService';

const FinancingApplication = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      const data = await fetchFinancingOptions();
      setOptions(data);
      const savedSelections = JSON.parse(localStorage.getItem('selectedOptions')) || [];
      setSelectedOptions(savedSelections);
    };

    loadOptions();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: '',
      purpose: '',
      selectedOption: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required'),
      purpose: Yup.string().required('Required'),
      selectedOption: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('http://<BACKEND_API_URL>/apply-finance', values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Financing application submitted:', response.data);
      } catch (err) {
        console.error('Error submitting application:', err);
      }
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Apply for Financing</Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="selectedOption-label">Select Option</InputLabel>
          <Select
            labelId="selectedOption-label"
            id="selectedOption"
            name="selectedOption"
            value={formik.values.selectedOption}
            onChange={formik.handleChange}
            error={formik.touched.selectedOption && Boolean(formik.errors.selectedOption)}
          >
            {options.map((option) => (
              <MenuItem key={option._id} value={option._id} disabled={!selectedOptions.includes(option._id)}>
                {option.option_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          margin="normal"
        />
        <TextField
          fullWidth
          id="purpose"
          name="purpose"
          label="Purpose"
          value={formik.values.purpose}
          onChange={formik.handleChange}
          error={formik.touched.purpose && Boolean(formik.errors.purpose)}
          helperText={formik.touched.purpose && formik.errors.purpose}
          margin="normal"
        />
        <Button color="primary" variant="contained" type="submit">
          Submit Application
        </Button>
      </Box>
    </Box>
  );
};

export default FinancingApplication;