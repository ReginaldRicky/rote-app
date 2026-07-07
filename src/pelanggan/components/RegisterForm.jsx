import { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { registerCustomer } from "../services/customerAuthService";


export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function validate() {
    const email = formData.email.trim();
    const username = formData.username.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!email || !username || !password || !confirmPassword) {
      return "Semua field wajib diisi.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Format email tidak valid.";
    }

    if (username.length < 3) {
      return "Username minimal 3 karakter.";
    }

    if (password.length < 8) {
      return "Password minimal 8 karakter.";
    }

    if (password !== confirmPassword) {
      return "Password dan Confirm Password tidak sama.";
    }


    return null;
  }

async function handleSubmit(e) {
  e.preventDefault();

  setError("");
  setSuccess("");

  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);

  try {
    await registerCustomer({
      nama: formData.username.trim(),

      email: formData.email
        .trim()
        .toLowerCase(),

      password: formData.password,

      password_confirmation:
        formData.confirmPassword,
    });

    setSuccess(
      "Registrasi berhasil. Silakan login."
    );

    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (err) {
    console.error(
      "Registrasi pelanggan gagal:",
      err
    );

    const validationErrors =
      err.response?.data?.errors;

    if (validationErrors) {
      const firstError =
        Object.values(validationErrors)
          .flat()
          .find(Boolean);

      setError(
        firstError ||
        "Data registrasi tidak valid."
      );

      return;
    }

    setError(
      err.response?.data?.message ||
      err.message ||
      "Registrasi gagal."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-poppins-medium text-gray-800 mb-4">
        Sign up
      </h1>

      <p className="text-gray-500 text-sm leading-6 mb-10 font-poppins-regular">
        If you already have an account
        <br />
        You can
        <Link
          to="/login"
          className="text-pink-500 font-poppins-semibold ml-1"
        >
          Login here !
        </Link>
      </p>

      {success && (
        <div className="mb-6 p-3 bg-green-50 border border-green-300 rounded-lg text-green-600 text-sm font-poppins-regular">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-500 text-sm font-poppins-regular">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Email
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-pink-500 transition-colors duration-200">
          <FiMail className="text-gray-500 text-lg mr-3 flex-shrink-0" />

          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Username
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-pink-500 transition-colors duration-200">
          <FiUser className="text-gray-500 text-lg mr-3 flex-shrink-0" />

          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Password
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-pink-500 transition-colors duration-200">
          <FiLock className="text-gray-500 text-lg mr-3 flex-shrink-0" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-colors"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Confirm Password
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-pink-500 transition-colors duration-200">
          <FiLock className="text-gray-500 text-lg mr-3 flex-shrink-0" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full outline-none py-3 text-sm font-poppins-regular bg-transparent"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-colors"
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="login-button disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}