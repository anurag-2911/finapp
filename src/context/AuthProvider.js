import React, { createContext, useReducer, useContext } from 'react';
import { authReducer, initialState } from './authReducer';

// Create a new context for Auth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to get the token from the context
export const useAuthToken = () => {
  const { state } = useContext(AuthContext); // Access token from AuthContext
  return state?.token;
};

// Custom hook to get the username from the context
export const useUsername = () => {
  const { state } = useContext(AuthContext); // Access username from AuthContext
  return state?.username;
};

// Custom hook to get the user role from the context
export const useUserRole = () => {
  const { state } = useContext(AuthContext); // Access role from AuthContext
  return state?.role;
};

// Custom hook to check if the user is authenticated
export const useIsAuthenticated = () => {
  const { state } = useContext(AuthContext); // Access isAuthenticated from AuthContext
  return state?.isAuthenticated;
};
