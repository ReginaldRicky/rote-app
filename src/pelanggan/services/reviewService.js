import api from "../../lib/api";

function authHeaders() {
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function createBookingReview(bookingId, data) {
  const response = await api.post(
    `/customer/bookings/${bookingId}/review`,
    data,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
}

export async function getPackageReviews(packageId) {
  const response = await api.get(`/packages/${packageId}/reviews`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }

  return [];
}
