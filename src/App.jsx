import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import ProtectedRoute from "./pelanggan/components/ProtectedRoute";
import "./App.css";

import Home from "./pelanggan/pages/Home";

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

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#AAB700]/20 border-t-[#AAB700] rounded-full animate-spin"></div>

        <p className="font-poppins-medium text-gray-500 text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>

      <p className="text-gray-500">
        Halaman tidak ditemukan.
      </p>

      <Link
        to="/"
        className="bg-[#AAB700] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#98a500] transition"
      >
        Kembali ke Home
      </Link>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.28,
          ease: "easeOut",
        }}
        className="min-h-screen"
      >
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Halaman publik */}
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Halaman khusus pelanggan yang sudah login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/bookings/:bookingId" element={<BookingDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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