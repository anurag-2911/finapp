import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    LinearProgress
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LoginIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchAnalyticsData } from '../../api/apiService';
import { CircularProgressWithLabel } from '../Shared/CircularProgressWithLabel';

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

    // Calculate max logins to normalize progress bar values
    const maxLogins = Math.max(...Object.values(analyticsData.logins_per_user));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Admin Analytics Dashboard</Typography>

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

            {/* Logins per User */}
            <Typography variant="h5" gutterBottom>Logins Per User</Typography>
            <Grid container spacing={3}>
                {Object.keys(analyticsData.logins_per_user).map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h6">{user}</Typography>
                                <CircularProgressWithLabel
                                    value={(analyticsData.logins_per_user[user] / maxLogins) * 100}
                                    label={`${analyticsData.logins_per_user[user]} logins`}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Financing Checks per User */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Financing Checks Per User</Typography>
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
