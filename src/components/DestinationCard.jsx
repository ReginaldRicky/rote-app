export default function DestinationCard({
  image,
  title,
  price,
}) {
  return (
    <div className="destination-card-modern">

      {/* IMAGE */}
      <div className="destination-image-wrapper">

        <img
          src={image}
          alt={title}
          className="destination-image-modern"
        />

        {/* PRICE */}
        <div className="destination-price-badge">

          <span className="destination-price-text">
            {price}
          </span>

        </div>

      </div>

      {/* CONTENT */}
      <div className="destination-content-modern">

        {/* TITLE */}
        <h3 className="destination-title-modern">
          {title}
        </h3>

        {/* INFO */}
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

        {/* FOOTER */}
        <div className="destination-footer-modern">

          {/* RATING */}
          <div className="destination-rating">

            <div className="destination-stars">
              ★★★★★
            </div>

            <span className="destination-rating-text">
              4.9
            </span>

          </div>

          {/* BUTTON */}
          <button className="destination-arrow-btn">
            →
          </button>

        </div>

      </div>

    </div>
  );
}