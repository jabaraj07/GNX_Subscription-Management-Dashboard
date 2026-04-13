import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const HomeRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/dashboard" />;
};

export default HomeRedirect;