import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import BookingDetailCard from "../components/BookingDetailCard";
import BookingDetailNotFound from "../components/BookingDetailNotFound";

const BOOKINGS_KEY = "customerBookings";

function getBookings() {
  try {
    const data = JSON.parse(
      localStorage.getItem(BOOKINGS_KEY) || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function formatTravelDate(value) {
  if (!value) return "-";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCreatedAt(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function BookingDetailPage() {
  const { bookingId } = useParams();

  const currentUserId = localStorage.getItem("currentUserId");

  const booking = getBookings().find((item) => {
    const sameBooking =
      String(item.bookingId) === String(bookingId);

    const belongsToCurrentUser =
      !item.customerId ||
      !currentUserId ||
      String(item.customerId) === String(currentUserId);

    return sameBooking && belongsToCurrentUser;
  });

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        <BookingDetailNotFound />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />

      <PageHeader
        title="Booking Detail"
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "My Bookings", to: "/bookings" },
          { label: "Booking Detail" },
        ]}
      />

      <main className="booking-detail-premium-page">
        <div className="booking-detail-premium-container">
          <Link
            to="/bookings"
            className="booking-detail-premium-back"
          >
            <FiArrowLeft />
            Back to My Bookings
          </Link>

          <BookingDetailCard
            booking={booking}
            formattedTravelDate={formatTravelDate(booking.date)}
            formattedCreatedAt={formatCreatedAt(booking.createdAt)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}