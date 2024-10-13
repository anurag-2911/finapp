import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import loanOptions from '../../data/loanOptions';  
import useStyles from './homeStyles';  

const Home = () => {
  const classes = useStyles();  

  return (
    <Box className={classes.container}>
      <Typography variant="h3" gutterBottom>
        Welcome to Our Finance Application
      </Typography>
      <Typography variant="body1" sx={{ mb: 5 }}>
        Explore various financing options tailored for your needs. Manage your finances effectively with us!
      </Typography>

      {/* Loan Options Section */}
      <Grid container spacing={4}>
        {loanOptions.map((option, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card className={classes.loanCard}>
              <CardMedia
                component="img"
                alt={option.title}
                height="140"
                image={option.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" className={classes.loanButton}>
                Learn More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Benefits of Loans Section */}
      <Box className={classes.benefitsSection}>
        <Typography variant="h4" gutterBottom>
          Why Take a Loan with Us?
        </Typography>
        <Grid container spacing={3}>
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
