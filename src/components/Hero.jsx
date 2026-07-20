import React from "react";

function Hero() {
  return (
    <section className="home-hero">

      {/* Background */}
      <div className="home-hero-overlay"></div>

      {/* Content */}
      <div className="home-hero-content">

        <span className="home-hero-badge">
          Explore The World
        </span>

        <h1 className="home-hero-title">
          Find Your Perfect
          <br />
          Travel Destination
        </h1>

        <p className="home-hero-description">
          Discover beautiful places, unforgettable experiences,
          and amazing adventures around the world with the best
          travel packages for your next journey.
        </p>

      </div>

      {/* Search Box */}
      <div className="home-hero-search-box">

        <div className="home-hero-search-item">
          <span>Location</span>
          <input type="text" placeholder="Search destination" />
        </div>

        <div className="home-hero-search-divider"></div>

        <div className="home-hero-search-item">
          <span>Guests</span>
          <input type="text" placeholder="2 Guests" />
        </div>

        <div className="home-hero-search-divider"></div>

        <div className="home-hero-search-item">
          <span>Date</span>
          <input type="text" placeholder="Select date" />
        </div>

        <button className="home-hero-search-btn">
          Search
        </button>

      </div>

    </section>
  );
}

export default Hero;