import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookingForm from "../components/BookingForm";
import { cleanBookingFormData, createEmptyBookingForm } from "../components/bookingFormUtils";
import { createAdminBooking } from "../services/adminBookingService";
import { getPackages } from "../../services/packageService";

export default function BookingAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(createEmptyBookingForm);
  const [packages, setPackages] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPackages().then(setPackages).catch((err) => console.error(err));
  }, []);

  async function handleSubmit(data) {
    try {
      setSaving(true);
      await createAdminBooking(cleanBookingFormData(data));
      alert("Booking berhasil dibuat.");
      navigate("/admin/bookings");
    } catch (err) {
      console.error("CREATE BOOKING ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Booking gagal dibuat.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <BookingForm
      formData={formData}
      setFormData={setFormData}
      packages={packages}
      backTo="/admin/bookings"
      backLabel="Back to Bookings"
      title="Add Booking"
      subtitle="Create a new booking using package data from database."
      cancelTo="/admin/bookings"
      submitLabel={saving ? "Saving..." : "Save Booking"}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
