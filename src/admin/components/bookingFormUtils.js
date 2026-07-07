import { formatIDR } from "../../utils/formatter";
import { toApiStatus } from "../services/adminBookingService";

export const bookingInputClass =
  "h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-[13px] font-medium text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10";

export function createEmptyBookingForm() {
  return {
    name: "",
    email: "",
    phone: "",
    packageId: "",
    date: "",
    guests: 1,
    note: "",
    status: "Waiting Confirmation",
  };
}

export function toBookingFormData(booking) {
  return {
    id: booking.id,
    name: booking.name || "",
    email: booking.email || "",
    phone: booking.phone || "",
    packageId: booking.packageId || "",
    date: booking.date || "",
    guests: booking.guests || 1,
    note: booking.note || "",
    status: booking.status || "Waiting Confirmation",
  };
}

export function cleanBookingFormData(formData) {
  return {
    package_id: Number(formData.packageId),
    full_name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    trip_date: formData.date,
    guest_count: Number(formData.guests || 1),
    note: formData.note?.trim() || null,
    status: toApiStatus(formData.status),
  };
}

export function validateBookingFormData(formData) {
  if (!formData.name.trim()) return "Customer name wajib diisi.";
  if (!formData.email.trim()) return "Email wajib diisi.";
  if (!formData.phone.trim()) return "Phone wajib diisi.";
  if (!formData.packageId) return "Package wajib dipilih.";
  if (!formData.date) return "Travel date wajib diisi.";
  if (!formData.guests || Number(formData.guests) < 1) return "Guest minimal 1.";
  return "";
}

export function getPackagePricePreview(packages, packageId, guests) {
  const selectedPackage = packages.find((item) => String(item.id) === String(packageId));
  const price = Number(selectedPackage?.priceValue || 0);
  const count = Number(guests || 1);
  return {
    selectedPackage,
    pricePerPerson: price,
    totalPrice: price * count,
    totalLabel: formatIDR(price * count),
  };
}
