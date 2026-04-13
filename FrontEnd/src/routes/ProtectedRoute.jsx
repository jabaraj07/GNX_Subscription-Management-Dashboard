import React from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  if (!isAuthenticated) {
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
  return children;
};

export default ProtectedRoute;
