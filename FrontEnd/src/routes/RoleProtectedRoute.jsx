import React from "react";
import useAuthStore from "../store/authStore";
import { Navigate, Outlet  } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles,children }) => {
  const isAuthenticate = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </p>
    );
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
