export default function SpecialsCard({ item }) {
  return (
    <div className="specials-card">
      <img src={item.image} alt={item.title} className="specials-card-image" />
      <h4 className="specials-card-title">{item.title}</h4>
      <div className="specials-card-meta">
        <span>🕒 Duration 2 hours</span>
        <span>🚐 Transport Facility</span>
        <span>👨‍👩‍👧 Family Plan</span>
      </div>
      <div className="specials-card-footer">
        <div className="specials-rating">★★★★☆ <span>584 reviews</span></div>
        <div className="specials-price">$35.00 <span>per person</span></div>
      </div>
    </div>
  );
}