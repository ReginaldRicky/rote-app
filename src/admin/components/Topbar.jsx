import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiCheckCircle,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

import {
  getAdminSession,
  logoutAdmin,
} from "../services/adminAuthService";
import { getAdminNotifications } from "../services/adminNotificationService";

export default function Topbar() {
  const navigate = useNavigate();
  const [adminSession, setAdminSession] = useState(() => getAdminSession());
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(
    (item) => item.status === "Unread"
  ).length;

  async function loadNotifications() {
    try {
      const data = await getAdminNotifications();
      setNotifications(data.slice(0, 8));
    } catch (error) {
      console.warn("TOPBAR NOTIFICATIONS ERROR:", error.response?.data || error);
      setNotifications([]);
    }
  }

  function handleLogout() {
    logoutAdmin();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    loadNotifications();

    function handleAuthChange() {
      setAdminSession(getAdminSession());
      loadNotifications();
    }

    function handleNotificationChange() {
      loadNotifications();
    }

    window.addEventListener("admin-auth-change", handleAuthChange);
    window.addEventListener("admin-notification-change", handleNotificationChange);

    return () => {
      window.removeEventListener("admin-auth-change", handleAuthChange);
      window.removeEventListener("admin-notification-change", handleNotificationChange);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleNotification() {
    setOpenNotification((current) => !current);
    setOpenProfile(false);
  }

  function toggleProfile() {
    setOpenProfile((current) => !current);
    setOpenNotification(false);
  }

  return (
    <header className="h-[84px] bg-white border-b border-[#edf1f6] px-6 lg:px-7 flex items-center justify-between">
      <div />

      <div className="flex items-center gap-4">
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={toggleNotification}
            className="relative w-11 h-11 rounded-xl border border-[#edf1f6] bg-white flex items-center justify-center text-[#4b5563] hover:bg-[#f8fafc]"
          >
            <FiBell />

            {unreadCount > 0 ? (
              <span className="absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6b6b] px-1 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {openNotification ? (
            <div className="absolute right-0 top-[54px] z-50 w-[360px] overflow-hidden rounded-[18px] border border-[#edf1f6] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between border-b border-[#edf1f6] px-4 py-4">
                <div>
                  <h3 className="text-[14px] font-extrabold text-[#111827]">
                    Notifications
                  </h3>

                  <p className="mt-0.5 text-[11px] text-[#94a3b8]">
                    {unreadCount} unread real notifications
                  </p>
                </div>

                <Link
                  to="/admin/notifications"
                  onClick={() => setOpenNotification(false)}
                  className="text-[11px] font-bold text-[#AAB700] hover:text-[#98a500]"
                >
                  View All
                </Link>
              </div>

              <div className="max-h-[330px] overflow-y-auto p-2">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((item) => {
                    const isUnread = item.status === "Unread";

                    return (
                      <Link
                        key={item.id}
                        to={item.link || "/admin/notifications"}
                        onClick={() => setOpenNotification(false)}
                        className={`block rounded-[14px] p-3 transition hover:bg-[#f8fafc] ${
                          isUnread ? "bg-[#fbfcf2]" : "bg-white"
                        }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              isUnread
                                ? "bg-[#AAB700]/10 text-[#AAB700]"
                                : "bg-[#f1f5f9] text-[#64748b]"
                            }`}
                          >
                            <FiCheckCircle size={15} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="truncate text-[12px] font-bold text-[#111827]">
                                {item.title}
                              </h4>

                              {isUnread ? (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-[#AAB700]" />
                              ) : null}
                            </div>

                            <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#64748b]">
                              {item.message}
                            </p>

                            <p className="mt-1 text-[10px] font-medium text-[#94a3b8]">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="rounded-xl bg-[#f8fafc] p-4 text-center text-[12px] text-[#64748b]">
                    Belum ada notifikasi dari database.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={toggleProfile}
            className="flex items-center gap-3 rounded-xl pl-2 pr-3 py-1.5 hover:bg-[#f8fafc] transition"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Admin"
              className="w-10 h-10 rounded-xl object-cover"
            />

            <div className="hidden md:block leading-tight text-left">
              <p className="text-sm font-semibold text-[#1f2c3a]">
                {adminSession?.name || "Admin"}
              </p>
              <p className="text-xs text-[#9aa5b1]">{adminSession?.role || "Admin"}</p>
            </div>

            <FiChevronDown
              className={`text-[#9aa5b1] text-sm transition ${
                openProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {openProfile ? (
            <div className="absolute right-0 top-[58px] z-50 w-[240px] overflow-hidden rounded-[18px] border border-[#edf1f6] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
              <div className="border-b border-[#edf1f6] px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Admin"
                    className="h-11 w-11 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-extrabold text-[#111827]">
                      {adminSession?.name || "Admin"}
                    </h3>

                    <p className="truncate text-[11px] text-[#94a3b8]">
                      {adminSession?.email || "Admin account"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link
                  to="/admin/profile"
                  onClick={() => setOpenProfile(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#111827]"
                >
                  <FiUser size={15} className="text-[#AAB700]" />
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-[#ef4444] transition hover:bg-[#fef2f2]"
                >
                  <FiLogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
