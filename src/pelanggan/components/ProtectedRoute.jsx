import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useCustomerAuth,
} from "../context/CustomerAuthContext";

export default function ProtectedRoute() {
  const location = useLocation();

  const {
    loading,
    isAuthenticated,
  } = useCustomerAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Memeriksa sesi login...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  return <Outlet />;
}