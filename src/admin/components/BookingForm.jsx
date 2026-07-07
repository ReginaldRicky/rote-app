import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi";

import BookingFormField from "./BookingFormField";
import {
  bookingInputClass,
  getPackagePricePreview,
  validateBookingFormData,
} from "./bookingFormUtils";
import { BOOKING_STATUSES } from "../services/adminBookingService";
import { formatIDR } from "../../utils/formatter";

export default function BookingForm({
  formData,
  setFormData,
  packages = [],
  backTo,
  backLabel,
  title,
  subtitle,
  cancelTo,
  submitLabel,
  onSubmit,
  saving = false,
}) {
  function updateField(field, value) {
    if (field === "packageId") {
      const selected = packages.find((item) => String(item.id) === String(value));

      setFormData((current) => ({
        ...current,
        packageId: value,
        date: selected?.startDate || selected?.start_date || current.date || "",
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateBookingFormData(formData);

    if (validationError) {
      alert(validationError);
      return;
    }

    onSubmit(formData);
  }

  const {
    selectedPackage,
    pricePerPerson,
    totalLabel,
  } = getPackagePricePreview(
    packages,
    formData.packageId,
    formData.guests
  );

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#64748b] transition hover:text-[#AAB700]"
          >
            <FiArrowLeft size={16} />
            {backLabel}
          </Link>

          <h1 className="mt-3 text-[24px] font-extrabold text-[#111827]">
            {title}
          </h1>

          <p className="mt-1 text-[13px] text-[#94a3b8]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={cancelTo}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-5 text-[13px] font-bold text-[#64748b] transition hover:bg-[#f8fafc]"
          >
            <FiX size={15} />
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500] disabled:opacity-60"
          >
            <FiSave size={15} />
            {submitLabel}
          </button>
        </div>
      </div>

      <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <div className="border-b border-[#edf1f6] pb-4">
          <h2 className="text-[16px] font-extrabold text-[#111827]">
            Booking Information
          </h2>

          <p className="mt-1 text-[12px] text-[#94a3b8]">
            Booking code sudah dihapus. Package mengambil data dari database dan harga dihitung otomatis dari jumlah tamu.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <BookingFormField label="Customer Name">
            <input
              type="text"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={bookingInputClass}
              placeholder="Example: Siti Rahma"
              required
            />
          </BookingFormField>

          <BookingFormField label="Email">
            <input
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={bookingInputClass}
              placeholder="customer@example.com"
              required
            />
          </BookingFormField>

          <BookingFormField label="Phone">
            <input
              type="text"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={bookingInputClass}
              placeholder="0887..."
              required
            />
          </BookingFormField>

          <BookingFormField label="Package Name">
            <select
              value={formData.packageId}
              onChange={(event) => updateField("packageId", event.target.value)}
              className={bookingInputClass}
              required
            >
              <option value="">Select package from database</option>

              {packages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} - {formatIDR(item.priceValue)}
                </option>
              ))}
            </select>
          </BookingFormField>

          <BookingFormField label="Guests">
            <input
              type="number"
              value={formData.guests}
              onChange={(event) => updateField("guests", event.target.value)}
              className={bookingInputClass}
              min="1"
              max={selectedPackage?.participants || undefined}
              required
            />

            {selectedPackage ? (
              <p className="mt-1 text-[11px] text-[#94a3b8]">
                Limit package: {selectedPackage.participants} participants
              </p>
            ) : null}
          </BookingFormField>

          <BookingFormField label="Travel Date">
            <input
              type="date"
              value={formData.date}
              onChange={(event) => updateField("date", event.target.value)}
              className={bookingInputClass}
              required
            />

            {selectedPackage?.startDate || selectedPackage?.endDate ? (
              <p className="mt-1 text-[11px] text-[#94a3b8]">
                Package period: {selectedPackage.startDate || "-"} sampai {selectedPackage.endDate || "-"}
              </p>
            ) : null}
          </BookingFormField>

          <BookingFormField label="Price / Person">
            <input
              type="text"
              value={formatIDR(pricePerPerson)}
              className={bookingInputClass}
              readOnly
            />
          </BookingFormField>

          <BookingFormField label="Total Price">
            <input
              type="text"
              value={totalLabel}
              className={bookingInputClass}
              readOnly
            />
          </BookingFormField>

          <BookingFormField label="Status">
            <select
              value={formData.status}
              onChange={(event) => updateField("status", event.target.value)}
              className={bookingInputClass}
              required
            >
              {BOOKING_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </BookingFormField>
        </div>

        <div className="mt-4">
          <BookingFormField label="Admin Note">
            <textarea
              value={formData.note || ""}
              onChange={(event) => updateField("note", event.target.value)}
              className="min-h-[100px] w-full resize-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[13px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10"
              placeholder="Optional note..."
            />
          </BookingFormField>
        </div>
      </section>
    </form>
  );
}
