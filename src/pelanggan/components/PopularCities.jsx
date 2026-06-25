import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";

import alaska from "../../assets/alaska.jpg";
import { tours } from "../data/tours";

const destinationCards = tours.slice(0, 4);

export default function PopularCities() {
  return (
    <section className="popular-cities-section">
      <div className="popular-bg-glow-left"></div>
      <div className="popular-bg-glow-right"></div>

      <div className="popular-header">
        <span className="popular-mini-title">POPULAR DESTINATIONS</span>

        <h2 className="popular-main-title">Explore Beautiful Cities</h2>

        <p className="popular-description">
          Discover incredible places around the world with premium travel
          experiences and unforgettable adventures.
        </p>
      </div>

      <div className="popular-filter-wrapper">
        {[
          "New York",
          "California",
          "Alaska",
          "Sydney",
          "Dubai",
          "London",
          "Tokyo",
          "Delhi",
        ].map((city) => (
          <button key={city} type="button" className="popular-filter-btn">
            {city}
          </button>
        ))}
      </div>

      <div className="featured-city-wrapper">
        <div className="featured-city-image-container">
          <img src={alaska} alt="Alaska" className="featured-city-image" />

          <div className="featured-city-overlay"></div>

          <div className="featured-city-content">
            <span className="featured-badge">Featured Destination</span>

            <h2 className="featured-city-title">Alaska</h2>

            <p className="featured-city-text">
              Explore breathtaking mountains, glaciers, wildlife, and
              unforgettable adventure tours.
            </p>

            <div className="featured-buttons">
              <Link to="/destinations" className="featured-primary-btn">
                Explore Now
              </Link>

              <Link to="/destinations" className="featured-circle-btn">
                →
              </Link>
            </div>
          </div>
        </div>

        <div className="featured-features-grid">
          {[
            "Public Transportation",
            "Nature & Adventure",
            "Private Transportation",
            "Business Tours",
            "Local Visit",
            "Mountain Hiking",
          ].map((item) => (
            <div key={item} className="feature-card">
              <div className="feature-icon">✓</div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="popular-destination-grid">
        {destinationCards.map((item) => (
          <DestinationCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}