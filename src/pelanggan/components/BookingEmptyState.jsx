import { Link } from "react-router-dom";

export default function BookingEmptyState() {
  return (
    <div className="bg-white p-12 rounded-3xl text-center shadow">
      <h2 className="text-2xl font-bold text-[#181e4b]">
        No Bookings Yet
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        Start exploring destinations and create your first booking
      </p>

      <Link
        to="/destinations"
        className="inline-block bg-[#AAB700] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#98a500]"
      >
        Find Destination
      </Link>
    </div>
  );
}