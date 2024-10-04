import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const FinancingApplication = () => {
  const formik = useFormik({
    initialValues: {
      amount: '',
      purpose: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Required'),
      purpose: Yup.string().required('Required'),
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
