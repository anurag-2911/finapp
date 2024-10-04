import axios from 'axios';
// Adjust base URLs to reflect the new direct mapping in Ingress
const baseURL = window.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

// Auth Service API instance (no /auth-service prefix needed now)
const authApi = axios.create({
  baseURL: baseURL,  // No need for /auth-service
});

// Finance Service API instance (no /finance-service prefix needed now)
const financeApi = axios.create({
  baseURL: baseURL,  // No need for /finance-service
});

// Analytics Service API instance (no /analytics-service prefix needed now)
const analyticsApi = axios.create({
  baseURL: baseURL,  // No need for /analytics-service
});

export const login = async (username, password) => {
  return await authApi.post('/login', { username, password });
};

export const signup = async (username, password) => {
  return await authApi.post('/signup', { username, password });
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
