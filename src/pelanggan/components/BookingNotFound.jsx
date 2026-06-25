import { Link } from "react-router-dom";

export default function BookingNotFound() {
  return (
    <main className="booking-page-clean">
      <div className="booking-not-found-card">
        <h1>Tour Not Found</h1>

        <p>
          Destination yang ingin kamu booking tidak tersedia.
        </p>

        <Link to="/destinations">
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}