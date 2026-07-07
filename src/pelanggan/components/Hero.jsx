import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (guests) {
      params.set("guests", guests);
    }

    if (date) {
      params.set("date", date);
    }

    navigate(`/destinations${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-badge">
          Explore The World
        </span>

        <h1 className="hero-title">
          Find Your Perfect
          <br />
          Travel Destination
        </h1>

        <p className="hero-description">
          Discover beautiful places, unforgettable experiences,
          and amazing adventures around the world with the best
          travel packages for your next journey.
        </p>
      </div>

      <form className="hero-search-box" onSubmit={handleSearch}>
        <div className="hero-search-item">
          <span>Location</span>
          <input
            type="text"
            placeholder="Search destination"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div className="hero-search-divider"></div>

        <div className="hero-search-item">
          <span>Guests</span>
          <input
            type="number"
            min="1"
            placeholder="2 Guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          />
        </div>

        <div className="hero-search-divider"></div>

        <div className="hero-search-item">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <button type="submit" className="hero-search-btn">
          Search
        </button>
      </form>
    </section>
  );
}

export default Hero;
