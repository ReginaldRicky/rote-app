import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const USERS_KEY = "registeredCustomers";

export default function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const credential = dataForm.username.trim();
    const password = dataForm.password;

    if (!credential || !password) {
      setError("Username/email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    const users = getUsers();

    const foundUser = users.find((user) => {
      const sameUsername =
        user.username?.toLowerCase() === credential.toLowerCase();
      const sameEmail =
        user.email?.toLowerCase() === credential.toLowerCase();

      return (sameUsername || sameEmail) && user.password === password;
    });

    if (!foundUser) {
      setLoading(false);
      setError("Login gagal. Periksa username/email dan password.");
      return;
    }

    localStorage.setItem("accessToken", `local-token-${foundUser.id}`);
    localStorage.setItem("username", foundUser.username);
    localStorage.setItem("currentUserId", foundUser.id);
    localStorage.setItem("email", foundUser.email);

    if (foundUser.avatar) {
      localStorage.setItem("avatar", foundUser.avatar);
    } else {
      localStorage.removeItem("avatar");
    }

    window.dispatchEvent(new Event("auth-change"));

    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-poppins-medium text-gray-800 mb-4">
        Sign in
      </h1>

      <p className="text-gray-500 text-sm leading-6 mb-10 font-poppins-regular">
        If you don&apos;t have an account
        <br />
        You can
        <Link
          to="/register"
          className="text-blue-500 font-poppins-semibold ml-1"
        >
          Register here !
        </Link>
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-500 text-sm font-poppins-medium">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Username or Email
        </label>

        <div className="flex items-center border-b border-gray-400 focus-within:border-blue-500 transition-colors duration-200">
          <FiUser className="text-gray-500 text-lg mr-3" />

          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Enter your username or email"
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
          Forgot Password ?
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