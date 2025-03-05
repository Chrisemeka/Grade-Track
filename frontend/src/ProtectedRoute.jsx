import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  // const userRole = localStorage.getItem('user', JSON.stringify(data.user.role)); // Get role from localStorage (or use a global state)

  const user = JSON.parse(localStorage.getItem("user")); 
  const userRole = user?.role;

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
// The ProtectedRoute component checks if the user is authenticated and has the required role to access the route. 
// If the user is not authenticated or does not have the required role, it redirects to the login page or the home page. 
// You can customize the logic based on your authentication requirements.// Path: frontend/src/pages/auth/Login.jsx