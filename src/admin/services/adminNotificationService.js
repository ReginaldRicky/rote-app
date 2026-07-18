import api from "../../lib/api";

const ADMIN_NOTIFICATION_STATE_KEY = "admin_notification_state";
const ADMIN_NOTIFICATION_CACHE_KEY = "admin_notification_cache_v2";
const ADMIN_NOTIFICATION_CACHE_TTL = 30_000;
let notificationRequest = null;

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
    Accept: "application/json",
  };
}

function readLocalState() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_NOTIFICATION_STATE_KEY) || "{}");
  } catch (error) {
    console.warn("Failed to read notification state:", error);
    localStorage.removeItem(ADMIN_NOTIFICATION_STATE_KEY);
    return {};
  }
}

function writeLocalState(state) {
  localStorage.setItem(ADMIN_NOTIFICATION_STATE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("admin-notification-change"));
}

export function applyLocalNotificationState(items = []) {
  const state = readLocalState();
  const readIds = new Set(state.readIds || []);
  const deletedIds = new Set(state.deletedIds || []);

  return items
    .filter((item) => !deletedIds.has(item.id))
    .map((item) => ({
      ...item,
      status: readIds.has(item.id) ? "Read" : item.status || "Unread",
    }));
}

function readNotificationCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(ADMIN_NOTIFICATION_CACHE_KEY) || "null");
    if (!cached || !Array.isArray(cached.items)) return null;
    if (Date.now() - Number(cached.savedAt || 0) > ADMIN_NOTIFICATION_CACHE_TTL) return null;
    return cached.items;
  } catch {
    return null;
  }
}

function writeNotificationCache(items) {
  try {
    sessionStorage.setItem(
      ADMIN_NOTIFICATION_CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), items })
    );
  } catch {
    // Cache hanya dipakai untuk mempercepat reload.
  }
}

export async function getAdminNotifications(options = {}) {
  const force = Boolean(options.force);

  if (!force) {
    const cached = readNotificationCache();
    if (cached) return applyLocalNotificationState(cached);
    if (notificationRequest) return notificationRequest;
  }

  notificationRequest = api
    .get("/admin/notifications", { headers: authHeaders() })
    .then((response) => {
      const items = Array.isArray(response.data?.data) ? response.data.data : [];
      writeNotificationCache(items);
      return applyLocalNotificationState(items);
    })
    .finally(() => {
      notificationRequest = null;
    });

  return notificationRequest;
}

export function markNotificationRead(notificationId) {
  const state = readLocalState();
  const readIds = new Set(state.readIds || []);
  readIds.add(notificationId);

  writeLocalState({
    ...state,
    readIds: [...readIds],
  });
}

export function markAllNotificationsRead(items = []) {
  const state = readLocalState();
  const readIds = new Set(state.readIds || []);

  items.forEach((item) => readIds.add(item.id));

  writeLocalState({
    ...state,
    readIds: [...readIds],
  });
}

export function deleteNotificationLocal(notificationId) {
  const state = readLocalState();
  const deletedIds = new Set(state.deletedIds || []);
  deletedIds.add(notificationId);

  writeLocalState({
    ...state,
    deletedIds: [...deletedIds],
  });
}
