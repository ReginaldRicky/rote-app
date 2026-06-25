import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiMap,
  FiLogOut,
  FiUser,
  FiClipboard,
} from "react-icons/fi";

export default function Navbar({ transparent = false }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    function syncAuth() {
      const token = localStorage.getItem("accessToken");
      const storedUsername = localStorage.getItem("username");
      const storedAvatar = localStorage.getItem("avatar");

      setIsLoggedIn(Boolean(token));
      setUsername(storedUsername || "User");
      setAvatar(storedAvatar || null);
      setAvatarError(false);
    }

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");

    setIsLoggedIn(false);
    setUsername("User");
    setAvatar(null);
    setAvatarError(false);
    setDropdownOpen(false);

    window.dispatchEvent(new Event("auth-change"));

    navigate("/login");
  }

  const initial = username?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav
      className={`navbar ${
        transparent ? "navbar-transparent" : "navbar-solid"
      }`}
    >
      <div className="logo">
        <Link to="/dashboard">
          Nick&apos;s <span>Holiday</span>
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/destinations">Destinations</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>

      <div className="nav-buttons">

        {isLoggedIn ? (
          <div className="nav-profile-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className="nav-avatar-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {avatar && !avatarError ? (
                <img
                  src={avatar}
                  alt={username}
                  className="nav-avatar-img"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="nav-avatar-fallback">
                  {initial}
                </div>
              )}

              <span className="nav-avatar-name">{username}</span>

              <FiChevronDown
                className={`nav-avatar-chevron ${
                  dropdownOpen ? "nav-avatar-chevron-open" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="nav-dropdown">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `nav-dropdown-item ${
                      isActive ? "nav-dropdown-item-active" : ""
                    }`
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiUser className="nav-dropdown-icon" />
                  <span>My Profile</span>
                </NavLink>

                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `nav-dropdown-item ${
                      isActive ? "nav-dropdown-item-active" : ""
                    }`
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiClipboard className="nav-dropdown-icon" />
                  <span>My Bookings</span>
                </NavLink>

                <NavLink
                  to="/destinations"
                  className={({ isActive }) =>
                    `nav-dropdown-item ${
                      isActive ? "nav-dropdown-item-active" : ""
                    }`
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiMap className="nav-dropdown-icon" />
                  <span>Destinations</span>
                </NavLink>

                <div className="nav-dropdown-divider" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-dropdown-item nav-dropdown-logout"
                >
                  <FiLogOut className="nav-dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register" className="btn-signup">
              Sign up
            </Link>

            <Link to="/login" className="btn-signin">
              Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}