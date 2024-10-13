import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { fetchUserApplications, fetchFinancingOptions } from '../../api/apiService';
import { useAuthToken, useAuth } from '../../context/AuthProvider';
import useStyles from './dashboardStyles';

const Dashboard = () => {
  const classes = useStyles();
  const [applications, setApplications] = useState([]);
  const [financingOptions, setFinancingOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useAuthToken();
  const { username } = useAuth();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const appData = await fetchUserApplications(token);
        const optionsData = await fetchFinancingOptions();
        setApplications(appData || []);
        setFinancingOptions(optionsData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [token]);

  const getLoanTypeNames = (loanTypeIds) => {
    return loanTypeIds.map(id => {
      const loanOption = financingOptions.find(option => option._id === id);
      return loanOption ? loanOption.option_name : id;
    });
  };

  const renderApplications = () => (
    <Grid container spacing={3}>
      {applications.map((app) => (
        <Grid item xs={12} sm={6} md={4} key={app._id}>
          <Card variant="outlined" className={classes.applicationCard}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {app.purpose}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Loan Amount: ${app.amount}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {app.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Submitted: {new Date(app.submitted_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.loanTypeList}>
                Loan Types:
                <ul>
                  {getLoanTypeNames(app.loan_types).map((loanType, index) => (
                    <li key={index}>{loanType}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const renderNoApplicationsMessage = () => (
    <Typography variant="h6" className={classes.noApplicationsText}>
      You have no active finance applications.
      <br />
      Explore Financing Options
    </Typography>
  );

  return (
    <Box className={classes.dashboardContainer}>
      <Typography variant="h6" className={classes.welcomeText}>
        Welcome, {username}!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Your Finance Applications
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {applications.length > 0 ? renderApplications() : renderNoApplicationsMessage()}
    </Box>
  );
};

export default Dashboard;
