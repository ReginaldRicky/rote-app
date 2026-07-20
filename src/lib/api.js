import axios from "axios";

function isLocalHostname(hostname = "") {
  return ["localhost", "127.0.0.1", "::1"].includes(String(hostname).toLowerCase());
}

export function getApiBaseUrl() {
  const configuredUrl = String(import.meta.env.VITE_API_URL || "").trim();
  const browserOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
  const fallbackUrl = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8000/api`
    : "http://localhost:8000/api";

  try {
    const parsedUrl = new URL(configuredUrl || fallbackUrl, browserOrigin);

    // Saat frontend dibuka melalui IP LAN tetapi .env masih memakai localhost,
    // arahkan API ke host yang sama dengan browser agar bisa dipakai di komputer lain.
    if (
      typeof window !== "undefined" &&
      isLocalHostname(parsedUrl.hostname) &&
      !isLocalHostname(window.location.hostname)
    ) {
      parsedUrl.hostname = window.location.hostname;
    }

    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return fallbackUrl;
  }
}

export function getApiOrigin() {
  try {
    return new URL(getApiBaseUrl()).origin;
  } catch {
    return "";
  }
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 12000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const requestPath = String(config.url || "");
    const isAdminRequest = requestPath.startsWith("/admin");
    const token = isAdminRequest
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Biarkan Axios menentukan boundary multipart secara otomatis.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
