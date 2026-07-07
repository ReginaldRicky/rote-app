import { formatIDR } from "../../utils/formatter";

export default function BookingSummary({ tour, guests, date, totalPrice }) {
  const image = tour?.image || tour?.thumbnail || "";

  return (
    <aside className="booking-summary-clean">
      {image ? (
        <img src={image} alt={tour?.title || "Travel package"} />
      ) : (
        <div className="flex h-[240px] items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] text-center text-2xl font-bold text-white">
          {tour?.title || "Travel Package"}
        </div>
      )}

      <div className="booking-summary-body-clean">
        <span className="booking-summary-category-clean">{tour?.category || "Tour Package"}</span>
        <h2>{tour?.title}</h2>

        <div className="booking-summary-meta-clean">
          <p>📍 {tour?.location}</p>
          <p>🕒 {tour?.duration}</p>
          <p>🚐 {tour?.transport || "Transport Included"}</p>
          <p>👨‍👩‍👧 {tour?.plan || `${tour?.participants || 0} participants`}</p>
          <p>⭐ {tour?.rating || 0} ({tour?.reviews || 0} reviews)</p>
          <p>📅 {date || "Select travel date"}</p>
        </div>

        <div className="booking-summary-price-clean">
          <div>
            <span>Price/person</span>
            <strong>{formatIDR(tour?.priceValue ?? tour?.rawPrice ?? 0)}</strong>
          </div>

          <div>
            <span>Guests</span>
            <strong>{guests || 1}</strong>
          </div>

          <div className="booking-summary-total-clean">
            <span>Total</span>
            <strong>{formatIDR(totalPrice)}</strong>
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
