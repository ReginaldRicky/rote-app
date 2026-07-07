import api from "../../lib/api";

const ADMIN_NOTIFICATION_STATE_KEY = "admin_notification_state";

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

export async function getAdminNotifications() {
  const response = await api.get("/admin/notifications", {
    headers: authHeaders(),
  });

  const items = Array.isArray(response.data?.data) ? response.data.data : [];
  return applyLocalNotificationState(items);
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
