import axios from 'axios';

// Base URL from environment or fallback to localhost
const baseURL = window.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

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
