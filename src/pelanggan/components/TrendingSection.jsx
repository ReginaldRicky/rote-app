import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import trendingImage from "../../assets/gallery8.jpg";
import { getTours } from "../data/tours";

function getTopTour(items) {
  if (!items.length) return null;

  return [...items].sort((a, b) => {
    const ratingDiff = Number(b.rating || 0) - Number(a.rating || 0);
    if (ratingDiff !== 0) return ratingDiff;
    return Number(b.reviews || 0) - Number(a.reviews || 0);
  })[0];
}

export default function TrendingSection() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadTrendingPackage() {
      try {
        const data = await getTours();
        if (active) setTours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("TRENDING PACKAGE ERROR:", error.response?.data || error);
      }
    }

    loadTrendingPackage();

    return () => {
      active = false;
    };
  }, []);

  const topTour = useMemo(() => getTopTour(tours), [tours]);
  const image = topTour?.image || trendingImage;
  const detailUrl = topTour?.id ? `/detail/${topTour.id}` : "/destinations";
  const totalReviews = tours.reduce((sum, item) => sum + Number(item.reviews || 0), 0);
  const averageRating = tours.length
    ? tours.reduce((sum, item) => sum + Number(item.rating || 0), 0) / tours.length
    : 4.9;

  return (
    <section className="trending-wrapper">
      <div className="trending-bg"></div>
      <div className="trending-glow-left"></div>
      <div className="trending-glow-right"></div>

      <div className="trending-container">
        <div className="trending-image-section">
          <div className="circle-decoration-one"></div>
          <div className="circle-decoration-two"></div>

          <div className="floating-price-card">
            <p className="floating-label">
              Starting From
            </p>

            <h3 className="floating-price">
              {topTour?.price || "Rp0"}
            </h3>
          </div>

          <Link to={detailUrl} className="trending-image-wrapper">
            <div className="trending-image-glow"></div>

            <img
              src={image}
              alt={topTour?.title || "Trending Destination"}
              className="trending-main-image"
            />
          </Link>

          <div className="floating-review-card">
            <div className="review-stars">
              ★★★★★
            </div>

            <span className="review-rating">
              {Number(topTour?.rating || averageRating || 0).toFixed(1)} Rating
            </span>

            <p className="review-text">
              {totalReviews || topTour?.reviews || 0} Reviews
            </p>
          </div>
        </div>

        <div className="trending-text-section">
          <div className="trending-badge">
            <div className="badge-dot"></div>

            <span>
              TRENDING DESTINATION
            </span>
          </div>

          <h2 className="trending-heading">
            {topTour ? "Discover The" : "Discover More"}
            <br />
            <span>
              {topTour?.title || "Travel Package"}
            </span>
          </h2>

          <p className="trending-description">
            {topTour?.description ||
              "Explore curated travel packages, compare prices, check available dates, and book directly from the destination page."}
          </p>

          <div className="trending-stats">
            <div>
              <h3>{tours.length || 0}</h3>
              <p>Active Packages</p>
            </div>

            <div>
              <h3>{topTour?.participant_limit || topTour?.participants || 0}</h3>
              <p>Max Guests</p>
            </div>

            <div>
              <h3>{Number(averageRating || 0).toFixed(1)}</h3>
              <p>Average Rating</p>
            </div>
          </div>

          <div className="trending-buttons">
            <Link to={detailUrl} className="trending-primary-btn">
              Explore Now
            </Link>

            <Link to="/destinations" className="trending-circle-btn">
              →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
