import {
  FiMail,
  FiLock,
  FiUser,
  FiEyeOff,
} from "react-icons/fi";

import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="w-full">

      {/* TITLE */}

      <h1 className="text-4xl font-poppins-medium text-gray-800 mb-4">
        Sign up
      </h1>

      {/* DESCRIPTION */}

      <p className="text-gray-500 text-sm leading-6 mb-10 font-poppins-regular">
        If you already have an account register
        <br />
        You can

        <Link
          to="/"
          className="text-pink-500 font-poppins-semibold ml-1"
        >
          Login here !
        </Link>

      </p>

      {/* EMAIL */}

      <div className="mb-6">

        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Email
        </label>

        <div className="flex items-center border-b border-gray-400">

          <FiMail className="text-gray-500 text-lg mr-3" />

          <input
            type="email"
            placeholder="Enter your email address"
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

      {/* USERNAME */}

      <div className="mb-6">

        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Username
        </label>

        <div className="flex items-center border-b border-gray-400">

          <FiUser className="text-gray-500 text-lg mr-3" />

          <input
            type="text"
            placeholder="Enter your User name"
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

          <FiEyeOff className="text-gray-500 text-lg cursor-pointer" />

        </div>

      </div>

      {/* CONFIRM PASSWORD */}

      <div className="mb-10">

        <label className="block text-sm text-gray-700 mb-2 font-poppins-medium">
          Confirm Password
        </label>

        <div className="flex items-center border-b border-gray-400">

          <FiLock className="text-gray-500 text-lg mr-3" />

          <input
            type="password"
            placeholder="Confirm your Password"
            className="
              w-full
              outline-none
              py-3
              text-sm
              font-poppins-regular
              bg-transparent
            "
          />

          <FiEyeOff className="text-gray-500 text-lg cursor-pointer" />

        </div>

      </div>

      {/* BUTTON */}

      <button type="submit" className="login-button">
        Register
      </button>

    </form>
  );
}