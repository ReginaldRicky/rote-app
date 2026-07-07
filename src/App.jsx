import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import ProtectedRoute from "./pelanggan/components/ProtectedRoute";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import MainLayout from "./admin/layouts/MainLayout";
import "./App.css";

// PUBLIC
import Home from "./pelanggan/pages/Home";

// LAZY PAGES (CUSTOMER)
const LoginPage = lazy(() => import("./pelanggan/pages/LoginPage"));
const RegisterPage = lazy(() => import("./pelanggan/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pelanggan/pages/ForgotPasswordPage"));
const DestinationsPage = lazy(() => import("./pelanggan/pages/DestinationsPage"));
const Detail = lazy(() => import("./pelanggan/pages/Detail"));
const Booking = lazy(() => import("./pelanggan/pages/Booking"));
const BookingsPage = lazy(() => import("./pelanggan/pages/BookingsPage"));
const BookingDetailPage = lazy(() => import("./pelanggan/pages/BookingDetailPage"));
const ProfilePage = lazy(() => import("./pelanggan/pages/ProfilePage"));
const AboutPage = lazy(() => import("./pelanggan/pages/AboutPage"));

// ADMIN
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
const AdminPackages = lazy(() => import("./admin/pages/Packages"));
const AdminPackageAdd = lazy(() => import("./admin/pages/PackageAdd"));
const AdminPackageDetail = lazy(() => import("./admin/pages/PackageDetail"));
const AdminPackageEdit = lazy(() => import("./admin/pages/PackageEdit"));
const AdminBookings = lazy(() => import("./admin/pages/Bookings"));
const AdminBookingAdd = lazy(() => import("./admin/pages/BookingAdd"));
const AdminBookingEdit = lazy(() => import("./admin/pages/BookingEdit"));
const AdminCalendar = lazy(() => import("./admin/pages/Calendar"));
const AdminProfile = lazy(() => import("./admin/pages/AdminProfile"));
const AdminNotifications = lazy(() => import("./admin/pages/Notifications"));

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>404 Not Found</h1>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location}>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/about" element={<AboutPage />} />

            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* CUSTOMER PROTECTED */}
            <Route element={<ProtectedRoute />}>
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/bookings/:bookingId" element={<BookingDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* ADMIN */}
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<MainLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="packages" element={<AdminPackages />} />
                <Route path="packages/add" element={<AdminPackageAdd />} />
                <Route path="packages/:packageId" element={<AdminPackageDetail />} />
                <Route path="packages/:packageId/edit" element={<AdminPackageEdit />} />

                <Route path="bookings" element={<AdminBookings />} />
                <Route path="bookings/add" element={<AdminBookingAdd />} />
                <Route path="bookings/:bookingId/edit" element={<AdminBookingEdit />} />

                <Route path="calendar" element={<AdminCalendar />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="profile" element={<AdminProfile />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AnimatedRoutes />
      </MotionConfig>
    </BrowserRouter>
  );
}