import React, { useContext } from 'react'; // Ensure useContext is imported
import { Navigate, Outlet } from 'react-router-dom'; // Ensure Navigate and Outlet are imported
import { AuthContext } from '../context/AuthProvider'; // Ensure AuthContext is imported

const PrivateRoute = () => {
  const { state } = useContext(AuthContext); // Access the global auth state
  const isAuthenticated = state?.isAuthenticated; // Ensure this is correctly read
  const isAdmin = state?.role === 'admin';

  console.log("Checking authentication state in PrivateRoute:", isAuthenticated, "Admin Only:", adminOnly, "Is Admin:", isAdmin); // Debugging

  // If user is not authenticated, redirect to login
  if (!Boolean(isAuthenticated)) {
    return <Navigate to="/login" />;
  }

  // If the route is admin only and the user is not an admin, redirect to dashboard
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // If authenticated (and has admin access if required), allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
