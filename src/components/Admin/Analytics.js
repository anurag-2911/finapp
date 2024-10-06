import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { fetchAnalyticsData } from '../../api/apiService';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsData(); // Call the API to fetch analytics data
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Analytics Dashboard</Typography>
      <Typography variant="body1">
        Total Events: {analyticsData.total_events}
      </Typography>
      <Typography variant="body1">
        Total Logins: {analyticsData.total_logins}
      </Typography>
      <Typography variant="body1">
        Total Financing Option Checks: {analyticsData.total_financing_option_checks}
      </Typography>

      <Typography variant="h5" gutterBottom>Logins Per User:</Typography>
      <List>
        {Object.keys(analyticsData.logins_per_user).map((user) => (
          <ListItem key={user}>
            <ListItemText primary={`${user}: ${analyticsData.logins_per_user[user]} logins`} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>Financing Checks Per User:</Typography>
      <List>
        {Object.keys(analyticsData.financing_checks_per_user).map((user) => (
          <ListItem key={user}>
            <ListItemText primary={`${user}: ${analyticsData.financing_checks_per_user[user]} checks`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Analytics;
