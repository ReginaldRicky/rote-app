import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../services/adminAuthService";

export default function AdminProtectedRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}