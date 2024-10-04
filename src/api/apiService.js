import axios from 'axios';
import config from './config';

// Auth Service API instance
const authApi = axios.create({
    baseURL: config.authService,
});

// Add interceptors for logging requests and responses
authApi.interceptors.request.use((request) => {
    console.log('Request to auth service:', request); // Log request details
    return request;
}, (error) => {
    console.error('Request error:', error);  // Log request error
    return Promise.reject(error);
});

authApi.interceptors.response.use((response) => {
    console.log('Response from auth service:', response);  // Log response details
    return response;
}, (error) => {
    console.error('Response error:', error);  // Log response error
    return Promise.reject(error);
});

export const login = async (email, password) => {
    return await authApi.post('/login', { email, password });
};

// Finance Service API instance
const financeApi = axios.create({
    baseURL: config.financeService,
});

// Notification Service API instance
const notificationApi = axios.create({
    baseURL: config.notificationService,
});

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
