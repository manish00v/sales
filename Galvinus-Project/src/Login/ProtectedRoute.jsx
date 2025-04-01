import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Get token from localStorage or your auth context
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  // If the token doesn't exist, redirect to login page
  if (!token) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // If token exists, render the children components (the protected page)
  return children;
};

export default PrivateRoute;
