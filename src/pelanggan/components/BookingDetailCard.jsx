import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import BookingDetailInfoItem from "./BookingDetailInfoItem";

function getStatusClass(status) {
  switch (status) {
    case "Confirmed":
      return "booking-premium-status-confirmed";

    case "Cancelled":
      return "booking-premium-status-cancelled";

    case "Completed":
      return "booking-premium-status-completed";

    default:
      return "booking-premium-status-waiting";
  }
}

export default function BookingDetailCard({
  booking,
  formattedTravelDate,
  formattedCreatedAt,
}) {
  const status = booking.status || "Waiting Confirmation";

  const guestText = `${booking.guests || 1} ${
    Number(booking.guests) === 1 ? "Guest" : "Guests"
  }`;

  return (
    <article className="booking-detail-premium-card">
      <div className="booking-detail-premium-accent" />

      <div className="booking-detail-premium-top">
        <div className="booking-detail-premium-image-wrapper">
          <img
            src={booking.tourImage}
            alt={booking.tourTitle}
            className="booking-detail-premium-image"
          />

          <div className="booking-detail-premium-image-overlay" />

          <span
            className={`booking-detail-premium-status ${getStatusClass(
              status
            )}`}
          >
            {status}
          </span>

          <div className="booking-detail-premium-reference">
            <span>Booking Reference</span>
            <strong>{booking.bookingId}</strong>
          </div>
        </div>

        <div className="booking-detail-premium-summary">
          <div className="booking-detail-premium-label">
            <span />
            Tour Reservation
          </div>

          <h1>{booking.tourTitle}</h1>

          <p className="booking-detail-premium-location">
            <FiMapPin />
            {booking.location || "Location unavailable"}
          </p>

          <div className="booking-detail-premium-pricing">
            <div>
              <span>Price Per Person</span>
              <strong>{booking.pricePerPerson || "-"}</strong>
            </div>

            <div className="booking-detail-premium-total">
              <span>Total Payment</span>
              <strong>{booking.totalPrice || "-"}</strong>
            </div>
          </div>

          <div className="booking-detail-premium-actions">
            <Link
              to={`/detail/${booking.tourId}`}
              className="booking-detail-premium-primary-btn"
            >
              View Tour
              <FiExternalLink />
            </Link>

            <Link
              to="/destinations"
              className="booking-detail-premium-secondary-btn"
            >
              Explore More Tours
            </Link>
          </div>
        </div>
      </div>

      <div className="booking-detail-premium-content">
        <section className="booking-detail-premium-section">
          <div className="booking-detail-premium-heading">
            <span>01</span>

            <div>
              <h2>Travel Information</h2>
              <p>Your selected schedule and reservation details.</p>
            </div>
          </div>

          <div className="booking-detail-premium-info-list">
            <BookingDetailInfoItem
              icon={<FiCalendar />}
              label="Travel Date"
              value={formattedTravelDate}
            />

            <BookingDetailInfoItem
              icon={<FiUsers />}
              label="Number of Guests"
              value={guestText}
            />

            <BookingDetailInfoItem
              icon={<FiClock />}
              label="Booking Created"
              value={formattedCreatedAt}
            />
          </div>
        </section>

        <section className="booking-detail-premium-section">
          <div className="booking-detail-premium-heading">
            <span>02</span>

            <div>
              <h2>Customer Information</h2>
              <p>Contact information attached to this reservation.</p>
            </div>
          </div>

          <div className="booking-detail-premium-info-list">
            <BookingDetailInfoItem
              icon={<FiUser />}
              label="Full Name"
              value={booking.fullName}
            />

            <BookingDetailInfoItem
              icon={<FiMail />}
              label="Email Address"
              value={booking.email}
              breakText
            />

            <BookingDetailInfoItem
              icon={<FiPhone />}
              label="Phone Number"
              value={booking.phone}
            />
          </div>
        </section>
      </div>

      <section className="booking-detail-premium-note">
        <div className="booking-detail-premium-note-number">03</div>

        <div>
          <span>Additional Request</span>
          <h2>Customer Note</h2>

          <p>
            {booking.note || "No additional note was provided for this booking."}
          </p>
        </div>
      </section>
    </article>
  );
}