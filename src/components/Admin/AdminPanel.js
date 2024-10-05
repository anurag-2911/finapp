import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Card, CardContent, Grid
} from '@mui/material';
import { fetchAllApplications, updateApplicationStatus } from '../../api/apiService'; // Import the API functions
import { useAuthToken } from '../../context/AuthProvider'; // To fetch admin's token for authorization

const AdminPanel = () => {
  const [applications, setApplications] = useState([]); // Store all applications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [statusUpdate, setStatusUpdate] = useState({}); // Track status updates for each application

  // Fetch the admin's token
  const token = useAuthToken();

  // Fetch all applications on component mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetchAllApplications(token); // Fetch applications from the backend
        const { data } = response; // Extract 'data' which contains the applications

        // Ensure we handle the case where data is an array
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          setApplications([]); // In case of unexpected structure, fallback to empty array
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
        setLoading(false);
      }
    };
    loadApplications();
  }, [token]);

  // Handle status update change
  const handleStatusChange = (appId, newStatus) => {
    setStatusUpdate((prevState) => ({
      ...prevState,
      [appId]: newStatus,
    }));
  };

  // Submit the status update
  const handleUpdateStatus = async (appId) => {
    const newStatus = statusUpdate[appId];
    try {
      await updateApplicationStatus(appId, newStatus, token);
      const updatedApps = applications.map((app) =>
        app._id === appId ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApps);
      alert('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Panel
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      {applications.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Update Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>{app.submitted_by}</TableCell>
                      <TableCell>{app.amount}</TableCell>
                      <TableCell>{app.status}</TableCell>
                      <TableCell>
                        <Select
                          value={statusUpdate[app._id] || app.status}
                          onChange={(e) => handleStatusChange(app._id, e.target.value)}
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="approved">Approved</MenuItem>
                          <MenuItem value="denied">Denied</MenuItem>
                        </Select>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ ml: 2 }}
                          onClick={() => handleUpdateStatus(app._id)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Mobile Card View */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Grid container spacing={3}>
              {applications.map((app) => (
                <Grid item xs={12} key={app._id}>
                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {app.submitted_by}
                      </Typography>
                      <Typography variant="body1">
                        Amount: ${app.amount}
                      </Typography>
                      <Typography variant="body1">
                        Status: {app.status}
                      </Typography>
                      <Select
                        value={statusUpdate[app._id] || app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        fullWidth
                        sx={{ my: 2 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="denied">Denied</MenuItem>
                      </Select>
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={() => handleUpdateStatus(app._id)}
                      >
                        Update Status
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          No applications found.
        </Typography>
      )}
    </Box>
  );
};

export default AdminPanel;
