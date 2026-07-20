import api from "../../lib/api";
import { resolveMediaUrl } from "../../utils/media";

const ADMIN_SESSION_KEY = "admin_session";

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
    Accept: "application/json",
  };
}

function normalizeAdmin(admin) {
  if (!admin) return null;
  return {
    ...admin,
    avatar: resolveMediaUrl(admin.avatar || ""),
  };
}

export async function getAdminProfile() {
  const response = await api.get("/admin/profile", {
    headers: authHeaders(),
  });

  const data = response.data?.data || { admin: null, stats: {} };
  return {
    ...data,
    admin: normalizeAdmin(data.admin),
  };
}

export async function updateAdminProfile(payload) {
  const formData = new FormData();
  formData.append("name", payload.name || "");
  formData.append("email", payload.email || "");
  formData.append("current_password", payload.current_password || "");
  formData.append("new_password", payload.new_password || "");
  formData.append("new_password_confirmation", payload.new_password_confirmation || "");
  formData.append("remove_avatar", payload.remove_avatar ? "1" : "0");

  if (typeof File !== "undefined" && payload.avatarFile instanceof File) {
    formData.append("avatar", payload.avatarFile);
  }

  const response = await api.post("/admin/profile", formData, {
    headers: authHeaders(),
  });

  const responseData = response.data;
  const admin = normalizeAdmin(responseData?.data?.admin);

  if (admin) {
    try {
      const currentSession = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "{}");
      const nextSession = {
        ...currentSession,
        name: admin.name,
        email: admin.email,
        avatar: admin.avatar || "",
        role: "Admin",
        isLoggedIn: true,
      };

      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(nextSession));
      window.dispatchEvent(new Event("admin-auth-change"));
    } catch (error) {
      console.warn("Failed to update local admin session:", error);
    }
  }

  return {
    ...responseData,
    data: {
      ...(responseData?.data || {}),
      admin,
    },
  };
}
