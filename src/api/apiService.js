import axios from 'axios';

// Base URL from environment or fallback to localhost
const baseURL = "https://green.appsxyzabc.com"; //for green development
// const baseURL = "https://appsxyzabc.com"; // for blue dev : todo: pass from environment, issue with browser cache
// Create Axios instances for different services
const authApi = axios.create({ baseURL });
const financeApi = axios.create({ baseURL });
const analyticsApi = axios.create({ baseURL });

// Helper function to get the token from localStorage
function attachAuthToken(config) {
  const token = localStorage.getItem('token'); // Fetch token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

// Intercept all requests to attach the token
authApi.interceptors.request.use(attachAuthToken);
financeApi.interceptors.request.use(attachAuthToken);
analyticsApi.interceptors.request.use(attachAuthToken);

// Auth API calls
export const login = async (username, password) => {
  return await authApi.post('/login', { username, password });
};

export const signup = async (username, password) => {
  return await authApi.post('/signup', { username, password });
};

// Finance API calls
export const applyForFinance = async (loanTypes, amount, purpose) => {
  return await financeApi.post('/apply-finance', { loan_types: loanTypes, amount, purpose });
};

export const getFinancingOptions = async () => {
  return await financeApi.get('/financing-options');
};

// Analytics API calls
export const sendNotification = async (user, message) => {
  return await analyticsApi.post('/notify', { user, message });
};

// Fetch financing options for the application form
export const fetchFinancingOptions = async () => {
  try {
    const response = await financeApi.get('/financing-options');
    return response.data;
  } catch (error) {
    console.error("Error fetching financing options:", error);
    throw error;
  }
};

// Fetch user's finance applications using the /status endpoint
export const fetchUserApplications = async (token) => {
  try {
    const response = await financeApi.get('/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
};

// Fetch all applications (paginated if needed)
export const fetchAllApplications = async (token) => {
  try {
    const response = await axios.get('/admin/applications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all applications:', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (appId, newStatus, token) => {
  try {
    const response = await axios.put(`/admin/update_status/${appId}/${newStatus}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// Add this function to fetch analytics data
export const fetchAnalyticsData = async () => {
  try {
    const response = await analyticsApi.get('/analytics');
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

export const logFinancingOptionsVisit = async () => {
  try {
    console.log("Attempting to log financing options visit");  // Debug log
    await financeApi.post('/log-financing-options-visit');
    console.log("Logged financing options visit successfully");  // Success log
  } catch (error) {
    console.error("Error logging financing options visit:", error);
  }
};




