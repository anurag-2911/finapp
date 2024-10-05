import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
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
        const data = await fetchAllApplications(token); // Fetch applications from the backend
        setApplications(data);
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
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
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
  );
};

export default AdminPanel;
