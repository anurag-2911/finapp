import axios from 'axios';
import config from './config';

// Auth Service API instance
const authApi = axios.create({
  baseURL: config.authService, 
});

// Finance Service API instance
const financeApi = axios.create({
  baseURL: config.financeService, 
});

// Notification Service API instance
const notificationApi = axios.create({
  baseURL: config.notificationService, 
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
  return await notificationApi.post('/notify', { user, message });
};
