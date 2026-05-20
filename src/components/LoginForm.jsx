import { useState } from "react";

import {
  FiUser,
  FiLock,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

export default function LoginForm() {

  /*
  |--------------------------------------------------------------------------
  | NAVIGATE
  |--------------------------------------------------------------------------
  */

  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */

  function handleChange(e) {

    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const response = await axios.post(
        "https://dummyjson.com/user/login",
        dataForm
      );

      console.log(response.data);

      /*
      |--------------------------------------------------------------------------
      | SIMPAN TOKEN
      |--------------------------------------------------------------------------
      */

      localStorage.setItem(
        "token",
        response.data.accessToken
      );

      /*
      |--------------------------------------------------------------------------
      | REDIRECT
      |--------------------------------------------------------------------------
      */

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Login gagal"
      );

    } finally {

      setLoading(false);

    }
  }

  /*
  |--------------------------------------------------------------------------
  | CONDITIONAL INFO
  |--------------------------------------------------------------------------
  */

  const loadingInfo = loading && (
    <div className="mb-6 text-blue-500 text-sm font-poppins-medium">
      Loading...
    </div>
  );

  const errorInfo = error && (
    <div className="mb-6 text-red-500 text-sm font-poppins-medium">
      {error}
    </div>
  );

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >

      {/* TITLE */}

      <h1 className="text-4xl font-poppins-medium text-gray-800 mb-4">
        Sign in
      </h1>

      {/* DESCRIPTION */}

      <p className="text-gray-500 text-sm leading-6 mb-10 font-poppins-regular">
        If you don't have an account register
        <br />

        You can

        <Link
          to="/register"
          className="text-blue-500 font-poppins-semibold ml-1"
        >
          Register here !
        </Link>

      </p>

      {/* ERROR INFO */}

      {errorInfo}

      {/* LOADING INFO */}

      {loadingInfo}

      {/* USERNAME */}

      <div className="mb-6">

        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Username
        </label>

        <div className="flex items-center border-b border-gray-400">

          <FiUser className="text-gray-500 text-lg mr-3" />

          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="
              w-full
              outline-none
              py-3
              text-sm
              font-poppins-regular
              bg-transparent
            "
          />

        </div>

      </div>

      {/* PASSWORD */}

      <div className="mb-6">

        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Password
        </label>

        <div className="flex items-center border-b border-gray-400">

          <FiLock className="text-gray-500 text-lg mr-3" />

          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="
              w-full
              outline-none
              py-3
              text-sm
              font-poppins-regular
              bg-transparent
            "
          />

        </div>

      </div>

      {/* OPTIONS */}

      <div className="flex items-center justify-between text-sm mb-8">

        <label className="flex items-center gap-2 text-gray-500 font-poppins-light">

          <input type="checkbox" />

          Remember me

        </label>

        <Link
          to="/forgot-password"
          className="
            text-blue-500
            hover:underline
            font-poppins-light
          "
        >
          Forgot Password ?
        </Link>

      </div>

      {/* BUTTON */}

      <button
        type="submit"
        className="login-button"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>

    </form>
  );
}