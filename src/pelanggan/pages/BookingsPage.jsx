import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CustomerBookingCard from "../components/CustomerBookingCard";
import BookingEmptyState from "../components/BookingEmptyState";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      try {
        setLoading(true);
        setError("");

        const response = await getBookings();

        /*
          Aman untuk 2 bentuk response:
          1. response = [...]
          2. response = { success: true, data: [...] }
        */
        const list = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        if (active) {
          setBookings(list);
        }
      } catch (err) {
        console.error(err);

        if (active) {
          setError(
            err.response?.data?.message ||
              "Gagal mengambil data booking."
          );
          setBookings([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
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
        {loading && (
          <div className="bg-white p-12 rounded-3xl text-center shadow">
            <h2 className="text-2xl font-bold text-[#181e4b]">
              Loading Bookings...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load your booking data.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Failed to Load Bookings
            </h2>

            <p className="text-red-500 mt-2">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <BookingEmptyState />
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <CustomerBookingCard
                key={booking.id}
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