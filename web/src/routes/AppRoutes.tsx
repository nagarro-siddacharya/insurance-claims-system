import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import ClaimsPage from "../pages/claims/ClaimsPage";
import CreateClaimPage from "../pages/claims/CreateClaimPage";
import ClaimDetailsPage from "../pages/claims/ClaimDetailsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/claims/new" element={<CreateClaimPage />} />
          <Route path="/claims/:id" element={<ClaimDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
