import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

export default function AdminLoginForm({ formData, updateField, onSubmit }) {
  const [showPassword] = useState(false);

  return (
    <div className="w-full max-w-[530px]">
      <div>
        <h1 className="text-[42px] font-bold tracking-[-0.03em] text-[#111827]">
          Sign in
        </h1>

        <p className="mt-5 text-[16px] leading-7 text-[#6b7280]">
          Admin access only
          <br />
          Back to website?{" "}
          <Link
            to="/"
            className="font-semibold text-[#2563eb] transition hover:text-[#1d4ed8]"
          >
            Go home!
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-12 space-y-8">
        <div>
          <label className="block text-[15px] font-semibold text-[#111827]">
            Username or Email
          </label>

          <div className="mt-5 flex items-center gap-4 border-b border-[#9ca3af] pb-4">
            <FiUser size={18} className="shrink-0 text-[#8a94a6]" />

            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="Enter your username or email"
              className="w-full bg-transparent text-[15px] font-medium text-[#111827] outline-none placeholder:text-[#8a94a6]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[15px] font-semibold text-[#111827]">
            Password
          </label>

          <div className="mt-5 flex items-center gap-4 border-b border-[#9ca3af] pb-4">
            <FiLock size={18} className="shrink-0 text-[#8a94a6]" />

            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent text-[15px] font-medium text-[#111827] outline-none placeholder:text-[#8a94a6]"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-[15px] font-medium text-[#6b7280]">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(event) => updateField("remember", event.target.checked)}
              className="h-4 w-4 rounded border-[#9ca3af] accent-[#AAB700]"
            />
            remember me
          </label>

          <button
            type="button"
            className="text-[15px] font-medium text-[#2563eb] transition hover:text-[#1d4ed8]"
          >
            Forgot Password ?
          </button>
        </div>

        <button
          type="submit"
          className="h-[64px] w-full rounded-full bg-[#AAB700] text-[16px] font-bold text-white shadow-[0_18px_35px_rgba(170,183,0,0.28)] transition hover:bg-[#98a500]"
        >
          Login
        </button>
      </form>

      <div className="mt-11 text-center">
        <p className="text-[17px] font-semibold text-[#9ca3af]">
          or continue with
        </p>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-[#2563eb] transition hover:bg-[#e5e7eb]"
          >
            <FaFacebookF size={18} />
          </button>

          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827] transition hover:bg-[#e5e7eb]"
          >
            <FaApple size={20} />
          </button>

          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f4f6] text-[#ef4444] transition hover:bg-[#e5e7eb]"
          >
            <FaGoogle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}