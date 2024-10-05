import React, { useContext } from 'react'; // Ensure useContext is imported
import { Navigate, Outlet } from 'react-router-dom'; // Ensure Navigate and Outlet are imported
import { AuthContext } from '../context/AuthProvider'; // Ensure AuthContext is imported

const PrivateRoute = () => {
  const { state } = useContext(AuthContext); // Access the global auth state
  const isAuthenticated = state?.isAuthenticated; // Ensure this is correctly read

  console.log("Checking authentication state in PrivateRoute:", isAuthenticated); // Debugging

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
