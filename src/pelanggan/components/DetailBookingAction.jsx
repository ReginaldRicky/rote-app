import { Link } from "react-router-dom";

export default function DetailBookingAction({ tour }) {
  return (
    <div className="detail-booking-action">
      <div>
        <span>Starting from</span>
        <strong>
          {tour.price}
          <small> per person</small>
        </strong>
      </div>

      <Link
        to={`/booking/${tour.id}`}
        className="detail-booking-action-btn"
      >
        Book This Tour
      </Link>
    </div>
  );
}