import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { fetchUserApplications, fetchFinancingOptions } from '../../api/apiService'; // Import both API services
import { useAuthToken, useAuth } from '../../context/AuthProvider'; // Import to get the current user's token

const Dashboard = () => {
  const [applications, setApplications] = useState([]); // Store user applications
  const [financingOptions, setFinancingOptions] = useState([]); // Store all financing options
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Error state

  // Get the current user's token (this assumes you have a token-based authentication)
  const token = useAuthToken();
  const { username } = useAuth();
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch user applications
        const appData = await fetchUserApplications(token);

        // Fetch financing options
        const optionsData = await fetchFinancingOptions();

        setApplications(appData || []); // Set applications if available
        setFinancingOptions(optionsData || []); // Set financing options
        setLoading(false); // Disable loading once data is fetched
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [token]);

  // Helper function to map loan type IDs to loan option names
  const getLoanTypeNames = (loanTypeIds) => {
    return loanTypeIds.map(id => {
      const loanOption = financingOptions.find(option => option._id === id);
      return loanOption ? loanOption.option_name : id; // Return option name or the ID if not found
    });
  };

  // Render the application cards
  const renderApplications = () => (
    <Grid container spacing={3}>
      {applications.map((app) => (
        <Grid item xs={12} sm={6} md={4} key={app._id}>
          <Card variant="outlined">
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
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
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

  // Render a message if there are no applications
  const renderNoApplicationsMessage = () => (
    <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 3 }}>
      You have no active finance applications.
      <br />

      Explore Financing Options

    </Typography>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
        }}
      >
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
