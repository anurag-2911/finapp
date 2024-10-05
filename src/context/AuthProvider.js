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
