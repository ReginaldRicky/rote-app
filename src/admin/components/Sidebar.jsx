import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiCalendar,
  FiLogOut,
  FiMapPin,
} from "react-icons/fi";

import { logoutAdmin } from "../services/adminAuthService";

const menus = [
  { name: "Dashboard", path: "/admin", icon: <FiGrid /> },
  { name: "Packages", path: "/admin/packages", icon: <FiPackage /> },
  { name: "Bookings", path: "/admin/bookings", icon: <FiCalendar /> },
  { name: "Calendar", path: "/admin/calendar", icon: <FiCalendar /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutAdmin();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="w-[250px] bg-white border-r border-[#edf1f6] min-h-screen px-5 py-6 hidden lg:flex flex-col">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <FiMapPin className="text-[#AAB700] text-lg" />
          <h1 className="text-[22px] font-bold text-[#1f2c3a]">
            Nick&apos;s <span className="text-[#AAB700]">Holiday</span>
          </h1>
        </div>

        <nav className="space-y-1.5">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#AAB700] text-white shadow-[0_10px_24px_rgba(170,183,0,0.25)]"
                    : "text-[#6b7280] hover:bg-[#f5f7fb] hover:text-[#1f2c3a]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[16px] ${
                        isActive ? "text-white" : "text-[#7b8794]"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#AAB700] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-[#9ca3af] hover:text-[#1f2c3a] transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
}