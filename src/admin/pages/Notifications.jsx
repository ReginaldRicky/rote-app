import { useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiRefreshCw } from "react-icons/fi";

import NotificationsStats from "../components/NotificationsStats";
import NotificationsToolbar from "../components/NotificationsToolbar";
import NotificationItem from "../components/NotificationItem";
import {
  deleteNotificationLocal,
  getAdminNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/adminNotificationService";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadNotifications() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminNotifications();
      setItems(data);
    } catch (err) {
      console.error("GET ADMIN NOTIFICATIONS ERROR:", err.response?.data || err);
      setError(err.response?.data?.message || "Notifikasi gagal dimuat.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();

    function handleNotificationChange() {
      loadNotifications();
    }

    window.addEventListener("admin-notification-change", handleNotificationChange);

    return () => {
      window.removeEventListener("admin-notification-change", handleNotificationChange);
    };
  }, []);

  const filteredNotifications = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.title,
        item.message,
        item.time,
        item.type,
        item.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = keyword ? searchableText.includes(keyword) : true;
      const matchesStatus = status === "All" ? true : item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [items, query, status]);

  const unreadCount = items.filter((item) => item.status === "Unread").length;

  function markAsRead(id) {
    markNotificationRead(id);
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Read",
            }
          : item
      )
    );
  }

  function markAllAsRead() {
    markAllNotificationsRead(items);
    setItems((current) =>
      current.map((item) => ({
        ...item,
        status: "Read",
      }))
    );
  }

  function deleteNotification(id) {
    deleteNotificationLocal(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold text-[#111827]">
            Notifications
          </h1>

          <p className="mt-1 text-[13px] text-[#94a3b8]">
            Real-time ringkasan dari booking, customer baru, package baru,
            schedule, dan sisa kuota package.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadNotifications}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e7edf4] bg-white px-5 text-[13px] font-bold text-[#111827] transition hover:bg-[#f8fafc]"
          >
            <FiRefreshCw size={15} />
            Refresh
          </button>

          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500]"
          >
            <FiCheckCircle size={15} />
            Mark All as Read
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      ) : null}

      <NotificationsStats total={items.length} unread={unreadCount} />

      <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <NotificationsToolbar
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />

        <div className="mt-5 space-y-3">
          {loading ? (
            <div className="rounded-[18px] border border-dashed border-[#dbe3ec] bg-[#f8fafc] p-8 text-center">
              <p className="text-[14px] font-bold text-[#111827]">
                Memuat notifikasi real dari database...
              </p>
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))
          ) : (
            <div className="rounded-[18px] border border-dashed border-[#dbe3ec] bg-[#f8fafc] p-8 text-center">
              <p className="text-[14px] font-bold text-[#111827]">
                No notifications found
              </p>

              <p className="mt-2 text-[12px] text-[#94a3b8]">
                Belum ada aktivitas database yang cocok dengan filter ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
