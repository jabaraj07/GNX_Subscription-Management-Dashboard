import { useState } from "react";
import SignupPage from "../src/pages/signupPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PlansPage from "./pages/PlansPage.jsx";
import AppLayout from "./component/AppLayout.jsx";
import RoleProtectedRoute from "./routes/RoleProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import UnauthorizePage from "./pages/UnauthorizePage.jsx";
import AdminLayout from "./component/AdminLayout.jsx";
import AdminSubscription from "./pages/AdminSubscription.jsx";
import NotFound from "./pages/NotFound.jsx";
// import HomeRedirect from "./component/HomeRedirect.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<HomeRedirect />} /> */}
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PlansPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="subscriptions" element={<AdminSubscription />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizePage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
