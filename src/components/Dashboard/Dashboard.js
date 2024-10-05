import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { fetchUserApplications } from '../../api/apiService'; // Import API service to fetch user's applications
import { useAuthToken } from '../../context/AuthProvider'; // Import to get the current user's token

const Dashboard = () => {
  const [applications, setApplications] = useState([]); // Store user applications
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Error state

  // Get the current user's token (this assumes you have a token-based authentication)
  const token = useAuthToken();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchUserApplications(token); // Fetch user applications
        setApplications(data || []); // Set applications if available
        setLoading(false); // Disable loading once data is fetched
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
        setLoading(false);
      }
    };
    loadApplications();
  }, [token]);

  // Render a message if there are no applications
  const renderNoApplicationsMessage = () => (
    <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 3 }}>
      You have no active finance applications.
      <br />
      <Button color="primary" variant="contained" href="/financing-options" sx={{ mt: 2 }}>
        Explore Financing Options
      </Button>
    </Typography>
  );

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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Finance Applications
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {applications.length > 0 ? renderApplications() : renderNoApplicationsMessage()}
    </Box>
  );
};

export default Dashboard;
