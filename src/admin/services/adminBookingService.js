import api from "../../lib/api";
import { formatDateID, formatIDR, parseNumericValue } from "../../utils/formatter";
import { resolveMediaUrl } from "../../utils/media";

export const BOOKING_STATUSES = [
  "Waiting Confirmation",
  "Confirmed",
  "Cancelled",
  "Completed",
];

const statusMapToApi = {
  "Waiting Confirmation": "waiting_confirmation",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
  Completed: "completed",
};

const statusMapFromApi = {
  waiting_confirmation: "Waiting Confirmation",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function normalizeBookingStatus(status) {
  if (!status) return "Waiting Confirmation";
  if (statusMapFromApi[status]) return statusMapFromApi[status];
  if (status === "Pending") return "Waiting Confirmation";
  if (BOOKING_STATUSES.includes(status)) return status;
  return "Waiting Confirmation";
}

export function toApiStatus(status) {
  return statusMapToApi[status] || status || "waiting_confirmation";
}

export function normalizeAdminBooking(booking = {}) {
  const packageData = booking.package || {};
  const guests = Math.max(1, Math.trunc(parseNumericValue(booking.guest_count ?? booking.guests, 1)));
  const total = parseNumericValue(booking.total_price ?? booking.totalPrice, 0);

  return {
    id: booking.id,
    source: "database",
    bookingId: booking.id,
    name: booking.full_name || booking.name || booking.pelanggan?.name || "Unknown Customer",
    email: booking.email || booking.pelanggan?.email || "",
    phone: booking.phone || "",
    packageId: booking.package_id || packageData.id || "",
    packageName: packageData.title || booking.packageName || "Unknown Package",
    duration: `${guests} ${guests === 1 ? "Guest" : "Guests"}`,
    date: booking.trip_date ? String(booking.trip_date).slice(0, 10) : booking.date || "",
    dateLabel: formatDateID(booking.trip_date || booking.date),
    price: formatIDR(total),
    totalPrice: total,
    pricePerPerson: parseNumericValue(booking.price_per_person, 0),
    status: normalizeBookingStatus(booking.status),
    apiStatus: booking.status || "waiting_confirmation",
    guests,
    location: packageData.location || "",
    packageImage: resolveMediaUrl(packageData.image || ""),
    note: booking.note || "",
    createdAt: booking.created_at || "",
    rawData: booking,
  };
}

export async function getAdminBookings() {
  const response = await api.get("/admin/bookings", { headers: authHeaders() });
  const items = Array.isArray(response.data?.data) ? response.data.data : [];
  return items.map(normalizeAdminBooking);
}

export async function getAdminBookingById(id) {
  const response = await api.get(`/admin/bookings/${id}`, { headers: authHeaders() });
  return normalizeAdminBooking(response.data?.data || response.data);
}

export async function createAdminBooking(data) {
  const response = await api.post("/admin/bookings", data, { headers: authHeaders() });
  return response.data;
}

export async function updateAdminBooking(bookingId, data) {
  const response = await api.put(`/admin/bookings/${bookingId}`, data, { headers: authHeaders() });
  return response.data;
}
