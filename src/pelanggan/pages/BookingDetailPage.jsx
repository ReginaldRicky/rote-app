import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { getBookingById } from "../services/bookingService";
import BookingReviewForm from "../components/BookingReviewForm";

function formatCurrency(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatusLabel(status) {
  switch (status) {
    case "confirmed":
      return "Confirmed";

    case "cancelled":
      return "Cancelled";

    case "completed":
      return "Completed";

    case "waiting_confirmation":
    default:
      return "Waiting Confirmation";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    case "completed":
      return "bg-blue-100 text-blue-700";

    case "waiting_confirmation":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function getPackageImage(image) {
  if (!image) return "";

  const cleanImage = String(image).trim();

  if (!cleanImage) return "";

  if (
    cleanImage.startsWith("http://") ||
    cleanImage.startsWith("https://") ||
    cleanImage.startsWith("/")
  ) {
    return cleanImage;
  }

  return `/images/${cleanImage}`;
}

export default function BookingDetailPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBooking() {
      try {
        setLoading(true);
        setError("");

        const data = await getBookingById(bookingId);

        if (!active) return;

        setBooking(data);
      } catch (err) {
        console.error(err);

        if (!active) return;

        setError(
          err.response?.data?.message ||
            "Booking tidak ditemukan."
        );

        setBooking(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooking();

    return () => {
      active = false;
    };
  }, [bookingId]);

  const packageData = booking?.package || {};
  const image = getPackageImage(packageData.image);
  const status = booking?.status || "waiting_confirmation";

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

      <main className="px-6 lg:px-20 py-10">
        {loading && (
          <div className="bg-white rounded-3xl p-12 text-center shadow">
            <h2 className="text-2xl font-bold text-[#181e4b]">
              Loading Booking Detail...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load your booking information.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 text-center shadow">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f4f4dd] flex items-center justify-center text-4xl">
              📄
            </div>

            <h2 className="mt-6 text-3xl font-bold text-[#181e4b]">
              Booking Not Found
            </h2>

            <p className="mt-4 text-gray-500">
              {error}
            </p>

            <Link
              to="/bookings"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#AAB700] px-6 py-3 font-semibold text-white hover:bg-[#98a500]"
            >
              ← Back to My Bookings
            </Link>
          </div>
        )}

        {!loading && !error && booking && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="bg-white rounded-[28px] p-8 shadow">
              <div className="flex flex-col gap-6 md:flex-row">
                {image ? (
                  <img
                    src={image}
                    alt={packageData.title || "Travel package"}
                    className="w-full md:w-72 h-56 object-cover rounded-3xl"
                  />
                ) : (
                  <div className="w-full md:w-72 h-56 rounded-3xl bg-gradient-to-br from-[#181e4b] to-[#AAB700] flex items-center justify-center px-6 text-center">
                    <h3 className="text-white text-2xl font-bold">
                      {packageData.title || "Travel Package"}
                    </h3>
                  </div>
                )}

                <div className="flex-1">
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${getStatusClass(
                      status
                    )}`}
                  >
                    {getStatusLabel(status)}
                  </span>

                  <h1 className="mt-5 text-3xl font-bold text-[#181e4b]">
                    {packageData.title || "Travel Package"}
                  </h1>

                  <p className="mt-2 text-gray-500">
                    {packageData.location || "-"}
                  </p>

                  <p className="mt-5 text-gray-600 leading-relaxed">
                    {packageData.description ||
                      "Thank you for booking your travel package with Nick’s Holiday. Your booking is currently being processed."}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Full Name
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {booking.full_name}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Email
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {booking.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Phone
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {booking.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Travel Date
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {formatDate(booking.trip_date)}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Guests
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {booking.guest_count}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Currency
                  </p>
                  <p className="mt-1 font-bold text-[#181e4b]">
                    {booking.currency || "IDR"}
                  </p>
                </div>
              </div>

              {booking.note && (
                <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-400">
                    Note
                  </p>

                  <p className="mt-1 text-gray-700">
                    {booking.note}
                  </p>
                </div>
              )}
            </section>

            <aside className="bg-white rounded-[28px] p-8 shadow h-fit">
              <h2 className="text-2xl font-bold text-[#181e4b]">
                Price Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Price / Person</span>
                  <strong className="text-[#181e4b]">
                    {formatCurrency(booking.price_per_person)}
                  </strong>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Guests</span>
                  <strong className="text-[#181e4b]">
                    {booking.guest_count}
                  </strong>
                </div>

                <div className="border-t pt-5 flex justify-between gap-4">
                  <span className="text-lg font-bold text-[#181e4b]">
                    Total
                  </span>

                  <strong className="text-2xl font-bold text-[#AAB700]">
                    {formatCurrency(booking.total_price)}
                  </strong>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#f7f8ef] p-5 text-sm text-gray-600">
                <p>
                  ✓ Booking will be waiting for confirmation.
                </p>

                <p className="mt-2">
                  ✓ Admin will review your booking request.
                </p>
              </div>

              <Link
                to="/bookings"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#AAB700] px-6 py-3 font-semibold text-white hover:bg-[#98a500]"
              >
                Back to My Bookings
              </Link>
            </aside>
          </div>
        )}
        {!loading && !error && booking && (
  <section className="mt-8">
    <BookingReviewForm
      booking={booking}
      onSuccess={(review) => {
        setBooking((prev) => ({
          ...prev,
          review,
        }));
      }}
    />
  </section>
)}
      </main>

      <Footer />
    </div>
  );
}