import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'; // Import the global AuthContext

const PrivateRoute = () => {
  const { state } = useContext(AuthContext); // Access the global auth state
  const isAuthenticated = state.isAuthenticated; // Check if the user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Navigate to login if not authenticated
};

export default PrivateRoute;
