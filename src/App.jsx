import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

import Home from "./pages/Home";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));
const Detail = lazy(() => import("./pages/Detail"));
const Booking = lazy(() => import("./pages/Booking"));

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-poppins-medium text-gray-500">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
<Route path="/bookings" element={<BookingsPage />} />
          {/* Route Detail */}
          <Route path="/detail/:id" element={<Detail />} />

          {/* Route Booking */}
          <Route path="/booking/:id" element={<Booking />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-gray-500">Halaman tidak ditemukan.</p>
                <a href="/" className="text-blue-500 underline">
                  Kembali ke Home
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;