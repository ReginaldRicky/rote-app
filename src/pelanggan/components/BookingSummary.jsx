export default function BookingSummary({ tour, guests, date, totalPrice }) {
  return (
    <aside className="booking-summary-clean">
      <img src={tour.image} alt={tour.title} />

      <div className="booking-summary-body-clean">
        <span className="booking-summary-category-clean">
          {tour.category || "Tour Package"}
        </span>

        <h2>{tour.title}</h2>

        <div className="booking-summary-meta-clean">
          <p>📍 {tour.location}</p>
          <p>🕒 {tour.duration}</p>
          <p>🚐 {tour.transport}</p>
          <p>👨‍👩‍👧 {tour.plan}</p>
          <p>⭐ {tour.rating} ({tour.reviews} reviews)</p>
          <p>📅 {date || "Select travel date"}</p>
        </div>

        <div className="booking-summary-price-clean">
          <div>
            <span>Price/person</span>
            <strong>{tour.price}</strong>
          </div>

          <div>
            <span>Guests</span>
            <strong>{guests || 1}</strong>
          </div>

          <div className="booking-summary-total-clean">
            <span>Total</span>
            <strong>{totalPrice}</strong>
          </div>
        </div>

        <div className="booking-summary-note-clean">
          <p>✓ Free cancellation up to 24 hours</p>
          <p>✓ Booking will be waiting for confirmation</p>
        </div>
      </div>
    </aside>
  );
}