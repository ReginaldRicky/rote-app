import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ transparent = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("accessToken");
      const storedUsername = localStorage.getItem("username");
      const storedAvatar = localStorage.getItem("avatar");

      setIsLoggedIn(!!token);
      setUsername(storedUsername || "User");
      setAvatar(storedAvatar || null);
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);
  // ── Cek status login ───────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
      setAvatar(storedAvatar || null);
    }
  }, []);

  // ── Tutup dropdown kalau klik di luar ─────────────────
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Logout ─────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    setIsLoggedIn(false);
    setUsername("");
    setAvatar(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${transparent ? "navbar-transparent" : "navbar-solid"}`}>
      {/* LOGO */}
      <div className="logo">
        <Link to="/dashboard">
          Nick&apos;s <span>Holiday</span>
        </Link>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link to="/destinations">Destinations</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/about">About Us</Link>
      </div>

      {/* AUTH BUTTONS */}
      <div className="nav-buttons">
        {isLoggedIn ? (
          // ── Sudah Login → tampilkan avatar + dropdown ──
          <div className="nav-profile-wrapper" ref={dropdownRef}>
            <button
              className="nav-avatar-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={username}
                  className="nav-avatar-img"
                />
              ) : (
                <div className="nav-avatar-fallback">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="nav-avatar-name">{username}</span>
              <span className="nav-avatar-chevron">▾</span>
            </button>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div className="nav-dropdown">
                <Link
                  to="/profile"
                  className="nav-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  👤 My Profile
                </Link>
                <Link
                  to="/destinations"
                  className="nav-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  🗺️ Destinations
                </Link>
                <div className="nav-dropdown-divider" />
                <button
                  onClick={handleLogout}
                  className="nav-dropdown-item nav-dropdown-logout"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // ── Belum Login ──
          <>
            <Link to="/register" className="btn-signup">Sign up</Link>
            <Link to="/login" className="btn-signin">Sign in</Link>
          </>
        )}
      </div>
    </nav>
  );
}