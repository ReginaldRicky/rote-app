import { FiMail } from "react-icons/fi";

export default function ForgotPasswordForm() {
  return (
    <form className="w-full">

      <h1 className="text-4xl font-poppins-semibold text-gray-800 mb-6">
        Forgot your password?
      </h1>

      <p className="text-gray-500 font-poppins-regular leading-7 mb-12">
        Enter your email address and we'll send
        <br />
        you link to reset your password.
      </p>

      {/* EMAIL */}

      <div className="mb-10">

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

      {/* BUTTON */}

      <button type="submit" className="login-button">
        Send
      </button>

    </form>
  );
}