import React from "react";

function Hero() {
  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-overlay"></div>

      {/* Content */}
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

      {/* Search Box */}
      <div className="hero-search-box">

        <div className="hero-search-item">
          <span>Location</span>
          <input type="text" placeholder="Search destination" />
        </div>

        <div className="hero-search-divider"></div>

        <div className="hero-search-item">
          <span>Guests</span>
          <input type="text" placeholder="2 Guests" />
        </div>

        <div className="hero-search-divider"></div>

        <div className="hero-search-item">
          <span>Date</span>
          <input type="text" placeholder="Select date" />
        </div>

        <button className="hero-search-btn">
          Search
        </button>

      </div>

    </section>
  );
}

export default Hero;