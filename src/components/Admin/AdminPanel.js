import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminPanel = () => {
  const applications = [
    { id: 1, user: 'User1', amount: '10000', status: 'Pending' },
    { id: 2, user: 'User2', amount: '15000', status: 'Approved' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Panel</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.user}</TableCell>
                <TableCell>{app.amount}</TableCell>
                <TableCell>{app.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPanel;
