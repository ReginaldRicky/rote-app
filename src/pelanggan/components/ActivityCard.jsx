import { Link } from "react-router-dom";

function getStars(rating = 4) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

export default function ActivityCard({ item }) {
  return (
    <Link
      to={`/detail/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="activity-card">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="activity-card-image"
          />
        ) : (
          <div className="activity-card-image flex items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] text-white font-bold">
            {item.title}
          </div>
        )}

        <div className="activity-card-body">
          <div className="activity-card-top">
            <span className="activity-badge">{item.category}</span>

            <div className="activity-rating">
              <span className="activity-stars">{getStars(item.rating)}</span>
              <span className="activity-reviews">
                ({item.reviews} reviews)
              </span>
            </div>
          </div>

          <h3 className="activity-card-title">{item.title}</h3>

          <div className="activity-meta">
            <span>🕒 {item.duration}</span>
            <span>🚐 {item.transport}</span>
            <span>👨‍👩‍👧 {item.plan}</span>
          </div>
        </div>

        <div className="activity-card-price">
          <span className="price-amount">{item.price}</span>
          <span className="price-label">per person</span>
        </div>
      </div>
    </Link>
  );
}