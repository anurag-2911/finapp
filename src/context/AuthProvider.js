import React, { createContext, useReducer } from 'react';
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
