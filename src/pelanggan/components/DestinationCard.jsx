import { Link } from "react-router-dom";

export default function DestinationCard({ id, image, title, price }) {
  const cardContent = (
    <>
      <div className="destination-image-wrapper">
        <img src={image} alt={title} className="destination-image-modern" />

        <div className="destination-price-badge">
          <span className="destination-price-text">{price}</span>
        </div>
      </div>

      <div className="destination-content-modern">
        <h3 className="destination-title-modern">{title}</h3>

        <div className="destination-info-list">
          <div className="destination-info-item">
            <span>🕒</span>
            <span>2 Days Trip</span>
          </div>

          <div className="destination-info-item">
            <span>✈️</span>
            <span>Flight Included</span>
          </div>

          <div className="destination-info-item">
            <span>👨‍👩‍👧</span>
            <span>Family Friendly</span>
          </div>
        </div>

        <div className="destination-footer-modern">
          <div className="destination-rating">
            <div className="destination-stars">★★★★★</div>

            <span className="destination-rating-text">4.9</span>
          </div>

          <button type="button" className="destination-arrow-btn">
            →
          </button>
        </div>
      </div>
    </>
  );

  if (id) {
    return (
      <Link
        to={`/detail/${id}`}
        className="destination-card-modern"
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="destination-card-modern">{cardContent}</div>;
}