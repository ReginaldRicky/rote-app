import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";

import {
  resetPassword,
  verifyResetEmail,
} from "../services/customerAuthService";

function getApiError(err, fallback) {
  const validationErrors = err.response?.data?.errors;

  if (validationErrors) {
    const firstError = Object.values(validationErrors)
      .flat()
      .find(Boolean);

    if (firstError) return firstError;
  }

  return err.response?.data?.message || err.message || fallback;
}

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [account, setAccount] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  async function handleVerifyEmail(event) {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();

    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const data = await verifyResetEmail(email);

      setAccount(data);
      setFormData((current) => ({
        ...current,
        email,
      }));
      setStep("reset");
      setMessage("Email ditemukan. Silakan buat password baru.");
    } catch (err) {
      console.error("VERIFY RESET EMAIL ERROR:", err.response?.data || err);
      setError(getApiError(err, "Email tidak ditemukan."));
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();

    if (!formData.password || formData.password.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await resetPassword({
        email: formData.email.trim().toLowerCase(),
        account_type: account?.account_type,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      setMessage("Password berhasil diganti. Silakan login dengan password baru.");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err.response?.data || err);
      setError(getApiError(err, "Password gagal diganti."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full"
      onSubmit={step === "email" ? handleVerifyEmail : handleResetPassword}
    >
      <h1 className="mb-4 text-4xl font-poppins-semibold text-gray-800">
        Forgot Password
      </h1>

      <p className="mb-8 text-sm leading-6 text-gray-500 font-poppins-regular">
        Masukkan email akunmu. Jika email terdaftar, kamu bisa langsung membuat password baru.
      </p>

      {message && (
        <div className="mb-6 rounded-xl border border-[#AAB700]/30 bg-[#AAB700]/10 p-3 text-sm font-poppins-medium text-[#7d8700]">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-poppins-medium text-red-500">
          {error}
        </div>
      )}

      <div className="mb-8">
        <label className="mb-2 block text-sm text-gray-700 font-poppins-medium">
          Email
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500">
          <FiMail className="mr-3 text-lg text-gray-500" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            disabled={step === "reset"}
            className="w-full bg-transparent py-3 text-sm outline-none font-poppins-regular disabled:text-gray-500"
          />
        </div>
      </div>

      {step === "reset" && (
        <>
          {account?.name && (
            <p className="mb-5 rounded-xl bg-[#f8fafc] px-4 py-3 text-xs leading-5 text-gray-500">
              Akun ditemukan atas nama <strong className="text-gray-800">{account.name}</strong>.
            </p>
          )}

          <div className="mb-8">
            <label className="mb-2 block text-sm text-gray-700 font-poppins-medium">
              New Password
            </label>

            <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500">
              <FiLock className="mr-3 text-lg text-gray-500" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-transparent py-3 text-sm outline-none font-poppins-regular"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-2 block text-sm text-gray-700 font-poppins-medium">
              Confirm Password
            </label>

            <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500">
              <FiLock className="mr-3 text-lg text-gray-500" />

              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-transparent py-3 text-sm outline-none font-poppins-regular"
              />
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        className="login-button disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : step === "email"
          ? "Confirm Email"
          : "Reset Password"}
      </button>

      <div className="mt-6 text-center text-sm text-gray-500">
        Remember your password?
        <Link to="/login" className="ml-1 font-poppins-semibold text-blue-500 hover:underline">
          Back to login
        </Link>
      </div>
    </form>
  );
}
