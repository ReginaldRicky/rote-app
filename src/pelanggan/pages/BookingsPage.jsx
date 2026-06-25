import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CustomerBookingCard from "../components/CustomerBookingCard";
import BookingEmptyState from "../components/BookingEmptyState";

const BOOKINGS_KEY = "customerBookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem(BOOKINGS_KEY) || "[]"
      );

      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />

      <PageHeader
        title="My Bookings"
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "My Bookings" },
        ]}
      />

      <section className="px-6 lg:px-20 py-10">
        {bookings.length === 0 ? (
          <BookingEmptyState />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <CustomerBookingCard
                key={booking.bookingId}
                booking={booking}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}