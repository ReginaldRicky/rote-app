import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div
      id="header-container"
      className="flex justify-between items-center p-4"
    >
      <div id="search-bar" className="relative w-full max-w-lg">
        <input id="search-input" type="text" placeholder="Search Here..." />
        <FaSearch id="search-icon" />
      </div>

      <div id="icons-container">
        <div id="notification-icon">
          <FaBell />
          <span id="notification-badge">50</span>
        </div>
        <div id="chart-icon">
          <FcAreaChart />
        </div>
        <div id="settings-icon">
          <SlSettings />
        </div>

        <div id="profile-container">
          <span id="profile-text">
            Hello, <b>Fikri Muhaffizh</b>
          </span>
          <img
            id="profile-avatar"
            src="https://avatar.iran.liara.run/public/28"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

