import api from "../../lib/api";
import { resolveMediaUrl } from "../../utils/media";

const ADMIN_SESSION_KEY = "admin_session";
const ADMIN_TOKEN_KEY = "adminToken";

export function getAdminSession() {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null");
    if (!session || session.role !== "Admin" || session.isLoggedIn !== true) return null;

    return {
      ...session,
      avatar: resolveMediaUrl(session.avatar || ""),
    };
  } catch (error) {
    console.error("Failed to read admin session:", error);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    return null;
  }
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession() && localStorage.getItem(ADMIN_TOKEN_KEY));
}

export async function loginAdmin(email, password) {
  try {
    const response = await api.post("/admin/login", { email, password });
    const admin = response.data?.data?.admin || response.data?.admin;
    const token = response.data?.data?.token || response.data?.token;

    if (!admin || !token) {
      return { success: false, message: "Login admin gagal. Token tidak ditemukan." };
    }

    const session = {
      isLoggedIn: true,
      email: admin.email,
      name: admin.name,
      role: "Admin",
      avatar: resolveMediaUrl(admin.avatar || ""),
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    window.dispatchEvent(new Event("admin-auth-change"));

    return { success: true, session };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Email atau password admin salah.",
    };
  }
}

export async function logoutAdmin() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);

  try {
    if (token) {
      await api.post("/admin/logout");
    }
  } catch (error) {
    console.warn("Admin logout API failed:", error.response?.data || error);
  } finally {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.dispatchEvent(new Event("admin-auth-change"));
  }
}

export function getAdminAccountInfo() {
  return {
    email: "admin@nickholiday.com",
    password: "admin123",
  };
}
