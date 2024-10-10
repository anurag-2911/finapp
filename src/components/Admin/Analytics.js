import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LoginIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchAnalyticsData } from '../../api/apiService';
import { useAuth } from '../../context/AuthProvider';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { username } = useAuth();
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
        <Box sx={{ p: 3, mt: -4 }}>
            <Typography variant="h4" gutterBottom>Admin Analytics Dashboard</Typography>
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
            {/* Metrics Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <EventIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">Total Events</Typography>
                                    <Typography variant="h4">{analyticsData.total_events}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <LoginIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">Total Logins</Typography>
                                    <Typography variant="h4">{analyticsData.total_logins}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <AttachMoneyIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">Financing Checks</Typography>
                                    <Typography variant="h4">{analyticsData.total_financing_option_checks}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Logins per User Table */}
            <Typography variant="h5" gutterBottom>Logins Per User</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Logins</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(analyticsData.logins_per_user).map((user) => (
                            <TableRow key={user}>
                                <TableCell component="th" scope="row">
                                    {user}
                                </TableCell>
                                <TableCell align="right">{analyticsData.logins_per_user[user]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default Analytics;
