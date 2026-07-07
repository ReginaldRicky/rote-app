import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiKey,
  FiMail,
  FiPackage,
  FiSave,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import { getAdminProfile, updateAdminProfile } from "../services/adminProfileService";
import { formatNumber, formatDateID } from "../../utils/formatter";

const inputClass =
  "h-12 w-full rounded-2xl border border-[#e7edf4] bg-white px-4 text-[13px] font-semibold text-[#111827] outline-none transition focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10";

function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-2xl border border-[#edf1f6] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AAB700]/10 text-[#AAB700]">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
            {label}
          </p>
          <h3 className="mt-1 text-[22px] font-extrabold text-[#111827]">
            {value}
          </h3>
        </div>
      </div>

      {helper ? (
        <p className="mt-3 text-[11px] leading-5 text-[#64748b]">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProfile();
      const adminData = data.admin || {};

      setAdmin(adminData);
      setStats(data.stats || {});
      setFormData((current) => ({
        ...current,
        name: adminData.name || "",
        email: adminData.email || "",
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
    } catch (err) {
      console.error("GET ADMIN PROFILE ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Profile admin gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const statCards = useMemo(
    () => [
      {
        label: "Managed Bookings",
        value: formatNumber(stats.managed_bookings || 0),
        helper: `${formatNumber(stats.pending_bookings || 0)} booking menunggu konfirmasi`,
        icon: FiCalendar,
      },
      {
        label: "Tour Packages",
        value: formatNumber(stats.tour_packages || 0),
        helper: "Jumlah package yang ada di database",
        icon: FiPackage,
      },
      {
        label: "Customers",
        value: formatNumber(stats.customers || 0),
        helper: "Customer yang sudah register",
        icon: FiUsers,
      },
    ],
    [stats]
  );

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.new_password && formData.new_password !== formData.new_password_confirmation) {
      setError("Konfirmasi password baru tidak sama.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name: formData.name,
        email: formData.email,
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      };

      const response = await updateAdminProfile(payload);
      const nextAdmin = response.data?.admin;

      if (nextAdmin) {
        setAdmin(nextAdmin);
      }

      setFormData((current) => ({
        ...current,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      }));
      setSuccess("Profile admin berhasil diperbarui.");
      await loadProfile();
    } catch (err) {
      console.error("UPDATE ADMIN PROFILE ERROR:", err.response?.data || err);

      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0]?.[0];
        setError(firstError || "Data profile tidak valid.");
      } else {
        setError(err.response?.data?.message || "Profile admin gagal diperbarui.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-[22px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#64748b]">
          Memuat profile admin dari database...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#111827]">
            Admin Profile
          </h1>

          <p className="mt-1 text-[13px] text-[#94a3b8]">
            Profile ini memakai data admin asli dari tabel database, bukan data dummy.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white shadow-[0_12px_26px_rgba(170,183,0,0.25)] transition hover:bg-[#98a500] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSave size={15} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          {success}
        </div>
      ) : null}

      <section className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] bg-[#AAB700]/10 text-[#AAB700]">
              <FiUser size={32} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[22px] font-extrabold text-[#111827]">
                  {admin?.name || "Admin"}
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#AAB700]/10 px-3 py-1 text-[11px] font-bold text-[#AAB700]">
                  <FiCheckCircle size={12} />
                  Active
                </span>
              </div>

              <p className="mt-1 text-[13px] font-semibold text-[#64748b]">
                Admin · Nick's Holiday
              </p>

              <p className="mt-1 text-[12px] text-[#94a3b8]">
                {admin?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[520px]">
            {statCards.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <article className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#AAB700]/10 text-[#AAB700]">
              <FiMail size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-extrabold text-[#111827]">
                Account Information
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-[#64748b]">
                Hanya field yang benar-benar ada di tabel admin yang bisa diedit.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[12px] font-bold text-[#111827]">
                Full Name
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClass}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-bold text-[#111827]">
                Email Address
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={inputClass}
                required
              />
            </label>
          </div>
        </article>

        <article className="rounded-[22px] border border-[#e7edf4] bg-[#fbfcf2] p-5 shadow-sm">
          <h2 className="text-[16px] font-extrabold text-[#111827]">
            Database Summary
          </h2>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                Joined Date
              </p>
              <p className="mt-1 text-[13px] font-bold text-[#111827]">
                {formatDateID(stats.joined_date)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                Confirmed / Completed Trips
              </p>
              <p className="mt-1 text-[13px] font-bold text-[#111827]">
                {formatNumber(stats.confirmed_trips || 0)} trips
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                Last Updated
              </p>
              <p className="mt-1 text-[13px] font-bold text-[#111827]">
                {stats.last_updated || "-"}
              </p>
            </div>
          </div>
        </article>
      </section>

      <article className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#AAB700]/10 text-[#AAB700]">
            <FiKey size={18} />
          </div>

          <div>
            <h2 className="text-[16px] font-extrabold text-[#111827]">
              Change Password
            </h2>
            <p className="mt-1 text-[12px] leading-5 text-[#64748b]">
              Kosongkan bagian ini kalau tidak ingin mengganti password admin.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-[12px] font-bold text-[#111827]">
              Current Password
            </span>
            <input
              type="password"
              value={formData.current_password}
              onChange={(event) => updateField("current_password", event.target.value)}
              className={inputClass}
              placeholder="Password lama"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[12px] font-bold text-[#111827]">
              New Password
            </span>
            <input
              type="password"
              value={formData.new_password}
              onChange={(event) => updateField("new_password", event.target.value)}
              className={inputClass}
              placeholder="Minimal 8 karakter"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[12px] font-bold text-[#111827]">
              Confirm New Password
            </span>
            <input
              type="password"
              value={formData.new_password_confirmation}
              onChange={(event) =>
                updateField("new_password_confirmation", event.target.value)
              }
              className={inputClass}
              placeholder="Ulangi password baru"
            />
          </label>
        </div>
      </article>
    </form>
  );
}
