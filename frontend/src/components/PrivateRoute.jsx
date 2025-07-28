import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to user's appropriate dashboard
    return <Navigate to={`/${userRole}`} replace />;
  }

  return children;
};

export default PrivateRoute;

// // src/components/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("accessToken");
//   const role = localStorage.getItem("userRole");

//   if (!token || !role) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default PrivateRoute;
