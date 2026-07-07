import { Link } from "react-router-dom";

function getStars(rating = 0) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(Number(rating || 0))));
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
}

export default function SpecialsCard({ item }) {
  const content = (
    <>
      {item.image ? (
        <img src={item.image} alt={item.title} className="specials-card-image" />
      ) : (
        <div className="specials-card-image flex items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] px-4 text-center text-white font-bold">
          {item.title}
        </div>
      )}

      <h4 className="specials-card-title">{item.title}</h4>

      <div className="specials-card-meta">
        <span>🕒 {item.duration || "Flexible duration"}</span>
        <span>🚐 {item.transport || "Transport Included"}</span>
        <span>👨‍👩‍👧 {item.plan || `${item.participant_limit || 0} participants`}</span>
      </div>

      <div className="specials-card-footer">
        <div className="specials-rating">
          {getStars(item.rating)} <span>{item.reviews || 0} reviews</span>
        </div>
        <div className="specials-price">{item.price} <span>per person</span></div>
      </div>
    </>
  );

  if (item.id) {
    return (
      <Link
        to={`/detail/${item.id}`}
        className="specials-card"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </Link>
    );
  }

  return <div className="specials-card">{content}</div>;
}
