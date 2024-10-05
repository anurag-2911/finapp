import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const Home = () => {
  // Data for loan options
  const loanOptions = [
    {
      title: 'Home Loans',
      description: 'Get the best deals on home loans with low interest rates.',
      image: '/images/homeloan.jpg',  
    },
    {
      title: 'Car Loans',
      description: 'Drive your dream car with affordable car loans.',
      image: '/images/carloan.jpg',  
    },
    {
      title: 'Education Loans',
      description: 'Secure your future with low-interest education loans.',
      image: '/images/educationloan.jpg', 
    },
    {
      title: 'Personal Loans',
      description: 'Personal loans for all your needs with flexible repayment options.',
      image: '/images/personalloan.jpg', 
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
      {/* Header Section */}
      <Typography variant="h3" gutterBottom>
        Welcome to Our Finance Application
      </Typography>
      <Typography variant="body1" sx={{ mb: 5, px: { xs: 2, md: 0 } }}>
        Explore various financing options tailored for your needs. Manage your finances effectively with us!
      </Typography>

      {/* Loan Options Section */}
      <Grid container spacing={4} justifyContent="center">
        {loanOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                alt={option.title}
                height="160"
                image={option.image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center', pb: 2 }}>
                <Button variant="contained" color="primary">
                  Learn More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Benefits of Loans Section */}
      <Box sx={{ mt: 6, px: { xs: 2, md: 0 } }}>
        <Typography variant="h4" gutterBottom>
          Why Take a Loan with Us?
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Low Interest Rates</Typography>
            <Typography variant="body1">
              Our loan products come with some of the lowest interest rates in the market, making your repayments easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Flexible Repayment Options</Typography>
            <Typography variant="body1">
              Choose a repayment plan that fits your financial situation and pay at your own pace.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Fast Processing</Typography>
            <Typography variant="body1">
              Get your loan approved quickly with our fast and hassle-free application process.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
