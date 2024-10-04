import axios from 'axios';
// Adjust base URLs to include the service paths
const baseURL = window.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

// Auth Service API instance
const authApi = axios.create({
  baseURL: `${baseURL}/auth-service`, // Add /auth-service
});

// Finance Service API instance
const financeApi = axios.create({
  baseURL: `${baseURL}/finance-service`, // Add /finance-service
});

// Analytics Service API instance
const analyticsApi = axios.create({
  baseURL: `${baseURL}/analytics-service`, // Add /analytics-service
});

export const login = async (email, password) => {
  return await authApi.post('/login', { email, password });
};

export const signup = async (email, password) => {
  return await authApi.post('/signup', { email, password });
};

export const applyForFinance = async (amount, purpose) => {
  return await financeApi.post('/apply', { amount, purpose });
};

export const getFinancingOptions = async () => {
  return await financeApi.get('/financing-options');
};

export const sendNotification = async (user, message) => {
  return await analyticsApi.post('/notify', { user, message });
};
