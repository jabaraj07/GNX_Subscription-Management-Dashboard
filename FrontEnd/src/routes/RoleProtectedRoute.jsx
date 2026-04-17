import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const isAuthenticate = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

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
        <ClipLoader size={40}/>
      </p>
    );
  }

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
