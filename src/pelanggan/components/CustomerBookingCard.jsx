import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";

export default function CustomerBookingCard({ booking }) {
  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-md hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={booking.tourImage}
          className="w-full h-[210px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h2 className="text-lg font-bold text-[#181e4b]">
          {booking.tourTitle}
        </h2>

        {/* LOCATION */}
        <p className="text-sm text-pink-500 mt-1 flex items-center gap-1">
          <FiMapPin />
          {booking.location}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-3">
          Visit beautiful places and enjoy unforgettable travel experiences with Nick’s Holiday.
        </p>

        {/* META */}
        <div className="flex gap-4 text-sm text-gray-600 mt-4">
          <span className="flex items-center gap-1">
            <FiCalendar />
            {booking.date}
          </span>

          <span className="flex items-center gap-1">
            <FiUsers />
            {booking.guests}
          </span>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-6 border-t pt-4">
          <div>
            <p className="text-xs text-gray-400">From</p>
            <p className="text-xl font-bold text-[#AAB700]">
              {booking.totalPrice}
            </p>
          </div>

          <Link
            to={`/bookings/${booking.bookingId}`}
            className="bg-[#AAB700] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#98a500]"
          >
            Details
          </Link>
        </div>

      </div>
    </div>
  );
}