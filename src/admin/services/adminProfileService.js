import api from "../../lib/api";

const ADMIN_SESSION_KEY = "admin_session";

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

export async function getAdminProfile() {
  const response = await api.get("/admin/profile", {
    headers: authHeaders(),
  });

  return response.data?.data || { admin: null, stats: {} };
}

export async function updateAdminProfile(payload) {
  const response = await api.put("/admin/profile", payload, {
    headers: authHeaders(),
  });

  const admin = response.data?.data?.admin;

  if (admin) {
    try {
      const currentSession = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "{}");
      const nextSession = {
        ...currentSession,
        name: admin.name,
        email: admin.email,
        role: "Admin",
        isLoggedIn: true,
      };

      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(nextSession));
      window.dispatchEvent(new Event("admin-auth-change"));
    } catch (error) {
      console.warn("Failed to update local admin session:", error);
    }
  }

  return response.data;
}
