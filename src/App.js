import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import FinancingApplication from './components/Finance/FinancingApplication';
import FinancingOptions from './components/Finance/FinancingOptions';
import AdminPanel from './components/Admin/AdminPanel';
import Analytics from './components/Admin/Analytics';
import NotFound from './pages/NotFound';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider'; // Import AuthProvider to wrap the application

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider> {/* Wrap the app with AuthProvider for global authentication state */}
        <Router>
          <div className="App">
            <CssBaseline />
            <Navbar /> {/* Navbar now has access to the global auth state */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Toolbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Private routes for authenticated users */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/apply-finance" element={<FinancingApplication />} />
                    <Route path="/financing-options" element={<FinancingOptions />} />
                  </Route>

                  {/* Admin-only routes */}
                  <Route element={<PrivateRoute adminOnly={true} />}>
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
            </Box>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
