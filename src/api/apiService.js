import axios from 'axios';

// Base URL from environment or fallback to localhost
const baseURL = window.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

// Create Axios instances for different services
const authApi = axios.create({ baseURL });
const financeApi = axios.create({ baseURL });
const analyticsApi = axios.create({ baseURL });

// Intercept all requests to attach the token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

financeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

analyticsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const login = async (username, password) => {
  return await authApi.post('/login', { username, password });
};

export const signup = async (username, password) => {
  return await authApi.post('/signup', { username, password });
};

// Finance API calls
export const applyForFinance = async (amount, purpose) => {
  return await financeApi.post('/apply', { amount, purpose });
};

export const getFinancingOptions = async () => {
  return await financeApi.get('/financing-options');
};

// Analytics API calls
export const sendNotification = async (user, message) => {
  return await analyticsApi.post('/notify', { user, message });
};
