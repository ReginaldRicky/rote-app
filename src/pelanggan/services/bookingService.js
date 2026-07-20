import api from "../../lib/api";
import { resolveMediaUrl } from "../../utils/media";

function getToken() {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function normalizeBooking(booking) {
  if (!booking || typeof booking !== "object") return booking;

  return {
    ...booking,
    package: booking.package
      ? {
          ...booking.package,
          image: resolveMediaUrl(booking.package.image || ""),
        }
      : booking.package,
  };
}

export const createBooking = async (data) => {
  const response = await api.post("/customer/bookings", data, {
    headers: authHeaders(),
  });

  const responseData = response.data;
  return {
    ...responseData,
    data: normalizeBooking(responseData?.data),
  };
};

export const getBookings = async () => {
  const response = await api.get("/customer/bookings", {
    headers: authHeaders(),
  });

  const items = Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.data?.data)
    ? response.data.data
    : [];

  return items.map(normalizeBooking);
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/customer/bookings/${bookingId}`, {
    headers: authHeaders(),
  });

  return normalizeBooking(response.data?.data || response.data);
};
