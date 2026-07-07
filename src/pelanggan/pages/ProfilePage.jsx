import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { getMyProfile, updateMyProfile } from "../services/profileService";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const pelanggan = await getMyProfile();

        if (!active) return;

        if (pelanggan) {
          setFormData((prev) => ({
            ...prev,
            name: pelanggan.name || "",
            email: pelanggan.email || "",
          }));
        }
      } catch (err) {
        console.error(err);

        if (!active) return;

        setError(
          err.response?.data?.message ||
            "Gagal mengambil data profil."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      return setError("Nama wajib diisi.");
    }

    if (!formData.email.trim()) {
      return setError("Email wajib diisi.");
    }

    if (
      formData.password &&
      formData.password !== formData.password_confirmation
    ) {
      return setError("Konfirmasi password tidak sama.");
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password || null,
        password_confirmation: formData.password_confirmation || null,
      };

      await updateMyProfile(payload);

      setSuccess("Profil berhasil diperbarui.");

      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      }));
    } catch (err) {
      console.error(err);

      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]?.[0];

        setError(firstError || "Data profil tidak valid.");
      } else {
        setError(
          err.response?.data?.message ||
            "Gagal memperbarui profil."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />

      <PageHeader
        title="My Profile"
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "My Profile" },
        ]}
      />

      <main className="px-6 lg:px-20 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-[28px] bg-white p-8 shadow-sm h-fit">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#181e4b] text-4xl font-bold text-white">
              {formData.name
                ? formData.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-[#181e4b]">
                {formData.name || "Customer"}
              </h2>

              <p className="mt-2 text-gray-500">
                {formData.email || "customer@email.com"}
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-[#f7f8ef] p-5 text-sm text-gray-600">
              <p className="font-semibold text-[#181e4b]">
                Account Information
              </p>

              <p className="mt-2">
                Kamu dapat memperbarui nama, email, dan password akun pelanggan
                dari halaman ini.
              </p>
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#AAB700]">
                Edit Profile
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[#181e4b]">
                Update Your Account
              </h1>

              <p className="mt-2 text-gray-500">
                Perbarui informasi akun pelanggan kamu.
              </p>
            </div>

            {loading && (
              <div className="rounded-2xl bg-gray-50 p-5 text-gray-500">
                Memuat data profil...
              </div>
            )}

            {!loading && error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
                {error}
              </div>
            )}

            {!loading && success && (
              <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
                {success}
              </div>
            )}

            {!loading && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-semibold text-[#181e4b]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#AAB700]"
                      placeholder="Masukkan nama"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-[#181e4b]">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-[#AAB700]"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>

                <div className="rounded-3xl bg-gray-50 p-6">
                  <h3 className="text-xl font-bold text-[#181e4b]">
                    Change Password
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Kosongkan jika tidak ingin mengganti password.
                  </p>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-semibold text-[#181e4b]">
                        New Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-[#AAB700]"
                        placeholder="Minimal 8 karakter"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-semibold text-[#181e4b]">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-[#AAB700]"
                        placeholder="Ulangi password baru"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-[#AAB700] px-8 py-4 font-bold text-white transition hover:bg-[#98a500] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}