import api from "../../lib/api";

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

export const createBooking = async (data) => {
  const response = await api.post("/customer/bookings", data, {
    headers: authHeaders(),
  });

  return response.data;
};

export const getBookings = async () => {
  const response = await api.get("/customer/bookings", {
    headers: authHeaders(),
  });

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }

  return [];
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/customer/bookings/${bookingId}`, {
    headers: authHeaders(),
  });

  if (response.data?.data) {
    return response.data.data;
  }

  return response.data;
};