import api from "../../lib/api";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function getMyProfile() {
  const response = await api.get("/customer/me", {
    headers: authHeaders(),
  });

  return response.data?.data?.pelanggan || null;
}

export async function updateMyProfile(data) {
  const response = await api.put("/customer/profile", data, {
    headers: authHeaders(),
  });

  const pelanggan = response.data?.data?.pelanggan || null;

  if (pelanggan) {
    localStorage.setItem("username", pelanggan.name || "");
    localStorage.setItem("email", pelanggan.email || "");
    localStorage.setItem("currentCustomer", JSON.stringify(pelanggan));
  }

  return response.data;
}