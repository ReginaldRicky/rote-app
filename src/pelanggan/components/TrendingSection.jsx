import trendingImage from "../../assets/gallery8.jpg";

export default function TrendingSection() {
  return (
    <section className="trending-wrapper">

      {/* BACKGROUND */}

      <div className="trending-bg"></div>

      <div className="trending-glow-left"></div>
      <div className="trending-glow-right"></div>

      {/* CONTENT */}

      <div className="trending-container">

        {/* IMAGE SECTION */}

        <div className="trending-image-section">

          <div className="circle-decoration-one"></div>
          <div className="circle-decoration-two"></div>

          {/* PRICE CARD */}

          <div className="floating-price-card">

            <p className="floating-label">
              Starting From
            </p>

            <h3 className="floating-price">
              $299
            </h3>

          </div>

          {/* IMAGE */}

          <div className="trending-image-wrapper">

            <div className="trending-image-glow"></div>

            <img
              src={trendingImage}
              alt="Trending Destination"
              className="trending-main-image"
            />

          </div>

          {/* REVIEW CARD */}

          <div className="floating-review-card">

            <div className="review-stars">
              ★★★★★
            </div>

            <span className="review-rating">
              4.9 Rating
            </span>

            <p className="review-text">
              2.5k Happy Travelers
            </p>

          </div>

        </div>

        {/* TEXT SECTION */}

        <div className="trending-text-section">

          {/* BADGE */}

          <div className="trending-badge">

            <div className="badge-dot"></div>

            <span>
              TRENDING DESTINATION
            </span>

          </div>

          {/* TITLE */}

          <h2 className="trending-heading">

            Discover The

            <br />

            <span>
              Wilderlife
            </span>

            <br />

            Of Alaska

          </h2>

          {/* DESCRIPTION */}

          <p className="trending-description">

            Experience breathtaking mountains,
            frozen landscapes, wildlife adventures,
            and unforgettable memories across the
            beautiful lands of Alaska.

          </p>

          {/* STATS */}

          <div className="trending-stats">

            <div>

              <h3>
                25K+
              </h3>

              <p>
                Happy Travelers
              </p>

            </div>

            <div>

              <h3>
                120+
              </h3>

              <p>
                Tour Destinations
              </p>

            </div>

            <div>

              <h3>
                4.9
              </h3>

              <p>
                Average Rating
              </p>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="trending-buttons">

            <button className="trending-primary-btn">
              Explore Now
            </button>

            <button className="trending-circle-btn">
              →
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}