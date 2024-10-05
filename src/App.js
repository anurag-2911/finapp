import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import FinancingApplication from './components/Finance/FinancingApplication';
import FinancingOptions from './components/Finance/FinancingOptions';
import AdminPanel from './components/Admin/AdminPanel';
import NotFound from './pages/NotFound';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <CssBaseline />
          <Navbar />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}> {/* Increased top margin */}
              {/* Adds spacing for the AppBar */}
              <Toolbar /> {/* Ensure enough spacing */}
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/apply-finance" element={<FinancingApplication />} />
                <Route path="/financing-options" element={<FinancingOptions />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
