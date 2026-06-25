import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function BookingDetailNotFound() {
  return (
    <main className="min-h-[65vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl bg-white border border-gray-100 rounded-[28px] shadow-lg p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#AAB700]/10 flex items-center justify-center text-4xl">
          📄
        </div>

        <h1 className="text-3xl font-bold text-[#181e4b] mb-3">
          Booking Not Found
        </h1>

        <p className="text-gray-500 leading-7 mb-7">
          The booking you are looking for is unavailable or has been
          removed.
        </p>

        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 bg-[#AAB700] hover:bg-[#98a500] text-white px-6 py-3 rounded-full font-semibold transition"
        >
          <FiArrowLeft />
          Back to My Bookings
        </Link>
      </div>
    </main>
  );
}