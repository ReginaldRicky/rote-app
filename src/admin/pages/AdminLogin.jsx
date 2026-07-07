import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminLoginBrandPanel from "../components/AdminLoginBrandPanel";
import AdminLoginMobileBrand from "../components/AdminLoginMobileBrand";
import AdminLoginForm from "../components/AdminLoginForm";

import {
  getAdminSession,
  loginAdmin,
} from "../services/adminAuthService";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/admin";

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    if (getAdminSession()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await loginAdmin(formData.email, formData.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[60%_40%]">
        <AdminLoginBrandPanel />

        <section className="flex min-h-screen items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full">
            <AdminLoginMobileBrand />

            <div className="mb-5 rounded-2xl border border-[#edf1f6] bg-[#f8fafc] px-5 py-4 text-[13px] leading-6 text-[#64748b]">
              <p className="font-bold text-[#111827]">
                Demo Admin Account
              </p>

              <p>Email: admin@nickholiday.com</p>
              <p>Password: admin123</p>
            </div>

            {error ? (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] font-semibold text-red-600">
                {error}
              </div>
            ) : null}

            <AdminLoginForm
              formData={formData}
              updateField={updateField}
              onSubmit={handleSubmit}
            />
          </div>
        </section>
      </div>
    </main>
  );
}