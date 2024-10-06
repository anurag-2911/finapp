import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  TableSortLabel,
} from '@mui/material';
import { fetchAllApplications, updateApplicationStatus } from '../../api/apiService';
import { useAuthToken } from '../../context/AuthProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const AdminPanel = () => {
  const [applications, setApplications] = useState([]); // Store all applications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [statusUpdate, setStatusUpdate] = useState({}); // Track status updates for each application
  const [sortConfig, setSortConfig] = useState({ key: 'submitted_by', direction: 'asc' }); // Sorting config state

  const token = useAuthToken();

  // Fetch all applications on component mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetchAllApplications(token);
        const { data } = response;

        setApplications(Array.isArray(data) ? data : []);
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

  // Helper function for status icons
  const getStatusIcon = (status) => {
    if (status === 'approved') return <CheckCircleIcon color="success" />;
    if (status === 'denied') return <ErrorIcon color="error" />;
    return <PendingActionsIcon color="warning" />;
  };

  // Sorting handler
  const handleSort = (column) => {
    const isAsc = sortConfig.key === column && sortConfig.direction === 'asc';
    setSortConfig({ key: column, direction: isAsc ? 'desc' : 'asc' });
  };

  // Sorting applications based on selected column and direction
  const sortedApplications = applications.slice().sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -1 * direction;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return 1 * direction;
    }
    return 0;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        Admin Panel
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {applications.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'submitted_by'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('submitted_by')}
                  >
                    User
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'amount'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'status'}
                    direction={sortConfig.direction}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Update Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedApplications.map((app) => (
                <TableRow
                  key={app._id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' },
                  }}
                >
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {app.submitted_by}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{app.amount}</Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusIcon(app.status)}{' '}
                    <Typography variant="body1" display="inline" sx={{ ml: 1 }}>
                      {app.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Select
                          value={statusUpdate[app._id] || app.status}
                          onChange={(e) => handleStatusChange(app._id, e.target.value)}
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="approved">Approved</MenuItem>
                          <MenuItem value="denied">Denied</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateStatus(app._id)}
                          sx={{ borderRadius: 2 }}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" sx={{ mt: 2 }}>
          No applications found.
        </Typography>
      )}
    </Box>
  );
};

export default AdminPanel;
