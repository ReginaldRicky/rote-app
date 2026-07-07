import DestinationCard from "./DestinationCard";

import alaska from "../assets/Alaska.jpg";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";

const destinations = [
  {
    image: card1,
    title: "Alaska Westminster Tour",
    price: "$35.00",
  },
  {
    image: card2,
    title: "Vintage Double Decker",
    price: "$42.00",
  },
  {
    image: card3,
    title: "Magic of London",
    price: "$50.00",
  },
  {
    image: card4,
    title: "Family Adventure",
    price: "$29.00",
  },
];

export default function PopularCities() {
  return (
    <section className="popular-cities-section">

      {/* BACKGROUND GLOW */}

      <div className="popular-bg-glow-left"></div>
      <div className="popular-bg-glow-right"></div>

      {/* HEADER */}

      <div className="popular-header">

        <span className="popular-mini-title">
          POPULAR DESTINATIONS
        </span>

        <h2 className="popular-main-title">
          Explore Beautiful Cities
        </h2>

        <p className="popular-description">
          Discover incredible places around the world with premium
          travel experiences and unforgettable adventures.
        </p>

      </div>

      {/* FILTER BUTTONS */}

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
          <button
            key={city}
            className="popular-filter-btn"
          >
            {city}
          </button>
        ))}

      </div>

      {/* FEATURED SECTION */}

      <div className="featured-city-wrapper">

        {/* IMAGE */}

        <div className="featured-city-image-container">

          <img
            src={alaska}
            alt="Alaska"
            className="featured-city-image"
          />

          <div className="featured-city-overlay"></div>

          <div className="featured-city-content">

            <span className="featured-badge">
              Featured Destination
            </span>

            <h2 className="featured-city-title">
              Alaska
            </h2>

            <p className="featured-city-text">
              Explore breathtaking mountains, glaciers,
              wildlife, and unforgettable adventure tours.
            </p>

            <div className="featured-buttons">

              <button className="featured-primary-btn">
                Explore Now
              </button>

              <button className="featured-circle-btn">
                →
              </button>

            </div>

          </div>

        </div>

        {/* FEATURES */}

        <div className="featured-features-grid">

          {[
            "Public Transportation",
            "Nature & Adventure",
            "Private Transportation",
            "Business Tours",
            "Local Visit",
            "Mountain Hiking",
          ].map((item) => (
            <div
              key={item}
              className="feature-card"
            >
              <div className="feature-icon">
                ✓
              </div>

              <span>{item}</span>
            </div>
          ))}

        </div>

      </div>

      {/* DESTINATION CARDS */}

      <div className="popular-destination-grid">

        {destinations.map((item) => (
          <DestinationCard
            key={item.title}
            {...item}
          />
        ))}

      </div>

    </section>
  );
}