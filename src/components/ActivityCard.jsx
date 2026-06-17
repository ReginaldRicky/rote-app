import { Link } from "react-router-dom";

export default function ActivityCard({ item }) {
  return (
    <Link
      to={`/detail/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="activity-card">
        <img
          src={item.image}
          alt={item.title}
          className="activity-card-image"
        />

        <div className="activity-card-body">
          <div className="activity-card-top">
            <span className="activity-badge">{item.category}</span>

            <div className="activity-rating">
              <span className="activity-stars">★★★★☆</span>
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