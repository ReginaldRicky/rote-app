import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BookingForm from "../components/BookingForm";
import { cleanBookingFormData, toBookingFormData } from "../components/bookingFormUtils";
import { getAdminBookingById, updateAdminBooking } from "../services/adminBookingService";
import { getPackages } from "../../services/packageService";
import { useToast } from "../../components/useToast";

export default function BookingEdit() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { success, error: showError } = useToast();

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        const [booking, packageList] = await Promise.all([getAdminBookingById(bookingId), getPackages()]);
        if (!active) return;
        setFormData(toBookingFormData(booking));
        setPackages(packageList);
      } catch (err) {
        console.error("ADMIN BOOKING DETAIL ERROR:", err.response?.data || err);
        if (active) setError(err.response?.data?.message || "Booking tidak ditemukan.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => { active = false; };
  }, [bookingId]);

  async function handleSubmit(data) {
    try {
      setSaving(true);
      await updateAdminBooking(bookingId, cleanBookingFormData(data));
      success("Booking berhasil diperbarui.");
      navigate("/admin/bookings");
    } catch (err) {
      console.error("UPDATE BOOKING ERROR:", err.response?.data || err);
      showError(err.response?.data?.message ||"Booking gagal diperbarui.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="rounded-[20px] bg-white p-8 text-center text-sm text-[#64748b] shadow-sm">Memuat data booking...</div>;

  if (error || !formData) {
    return (
      <div className="mx-auto max-w-[900px] rounded-[20px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <h1 className="text-[24px] font-extrabold text-[#111827]">Booking Not Found</h1>
        <p className="mt-2 text-[13px] text-[#64748b]">{error || `Booking dengan ID ${bookingId} tidak ditemukan.`}</p>
        <Link to="/admin/bookings" className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500]">Back to Bookings</Link>
      </div>
    );
  }

  return (
    <BookingForm
      formData={formData}
      setFormData={setFormData}
      packages={packages}
      backTo="/admin/bookings"
      backLabel="Back to Bookings"
      title="Edit Booking"
      subtitle="Update customer, package, calculated price, and reservation status."
      cancelTo="/admin/bookings"
      submitLabel={saving ? "Saving..." : "Save Changes"}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
