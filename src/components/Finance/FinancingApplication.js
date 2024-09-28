import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';

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
    onSubmit: (values) => {
      // Mock API call
      console.log('Financing Application Data:', values);
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
