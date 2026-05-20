export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Nick&apos;s <span>Holiday</span>
      </div>

      <div className="nav-links">
        <a href="#">Destinations</a>
        <a href="#">Bookings</a>
        <a href="#">About Us</a>
      </div>

      <div className="nav-buttons">
        <a href="/register" className="btn-signup">
          Sign up
        </a>
        <a href="/login" className="btn-signin">
          Sign in
        </a>
      </div>

    </nav>
  );
}

