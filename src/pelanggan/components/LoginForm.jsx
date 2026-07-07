import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";

import { loginCustomer } from "../services/customerAuthService";
import { loginAdmin } from "../../admin/services/adminAuthService";

function getCustomerDestination(location) {
  const from = location.state?.from;

  if (typeof from === "string" && !from.startsWith("/admin")) {
    return from;
  }

  return "/dashboard";
}

function getAdminDestination(location) {
  const from = location.state?.from;

  if (typeof from === "string" && from.startsWith("/admin")) {
    return from;
  }

  if (from?.pathname?.startsWith("/admin")) {
    return `${from.pathname}${from.search || ""}`;
  }

  return "/admin";
}

function extractLoginError(err) {
  const validationErrors = err.response?.data?.errors;

  if (validationErrors) {
    const firstError = Object.values(validationErrors)
      .flat()
      .find(Boolean);

    if (firstError) return firstError;
  }

  return (
    err.response?.data?.message ||
    err.message ||
    "Email atau password tidak sesuai."
  );
}

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setDataForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const email = dataForm.email.trim().toLowerCase();
    const password = dataForm.password;

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      try {
        await loginCustomer({ email, password });

        navigate(getCustomerDestination(location), {
          replace: true,
        });

        return;
      } catch (customerError) {
        const adminResult = await loginAdmin(email, password);

        if (adminResult.success) {
          navigate(getAdminDestination(location), {
            replace: true,
          });

          return;
        }

        throw new Error(
          extractLoginError(customerError) || adminResult.message
        );
      }
    } catch (err) {
      console.error("Login gagal:", err);
      setError(
        err.message ||
          "Login gagal. Pastikan email dan password sudah benar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl font-poppins-medium text-gray-800 mb-4">
        Sign in
      </h1>

      <p className="text-gray-500 text-sm leading-6 mb-10 font-poppins-regular">
        Anda harus login terlebih dahulu untuk dapat melakukan booking.
        <Link
          to="/register"
          className="text-blue-500 font-poppins-semibold ml-1"
        >
          Register here!
        </Link>
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-500 text-sm font-poppins-medium">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Email
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500 transition-colors duration-200">
          <FiUser className="text-gray-500 text-lg mr-3" />

          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Password
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500 transition-colors duration-200">
          <FiLock className="text-gray-500 text-lg mr-3" />

          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mb-8">
        <label className="flex items-center gap-2 text-gray-500 font-poppins-light">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-blue-500 hover:underline font-poppins-light"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="login-button disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
