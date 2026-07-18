import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import { resolveMediaUrl } from "../../utils/media";
import { formatIDR } from "../../utils/formatter";

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

function formatCurrency(value) {
  return formatIDR(value);
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

function getPackageImage(image) {
  return resolveMediaUrl(image);
}

export default function CustomerBookingCard({ booking }) {
  const packageData = booking.package || {};

  const status = booking.status || "waiting_confirmation";
  const statusLabel = getStatusLabel(status);

  const title =
    packageData.title ||
    booking.tourTitle ||
    "Travel Package";

  const location =
    packageData.location ||
    booking.location ||
    "-";

  const image =
    getPackageImage(packageData.image) ||
    getPackageImage(booking.tourImage);

  const tripDate =
    booking.trip_date ||
    booking.date ||
    "-";

  const guestCount =
    booking.guest_count ||
    booking.guests ||
    1;

  const totalPrice =
    booking.total_price ||
    booking.totalPrice ||
    0;

  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-[210px] object-cover"
          />
        ) : (
          <div className="w-full h-[210px] bg-gradient-to-br from-[#181e4b] to-[#AAB700] flex items-center justify-center px-6 text-center">
            <h3 className="text-white text-2xl font-bold">
              {title}
            </h3>
          </div>
        )}

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
            status
          )}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-bold text-[#181e4b]">
          {title}
        </h2>

        <p className="text-sm text-pink-500 mt-1 flex items-center gap-1">
          <FiMapPin />
          {location}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Visit beautiful places and enjoy unforgettable travel experiences with
          Nick’s Holiday.
        </p>

        <div className="flex gap-4 text-sm text-gray-600 mt-4">
          <span className="flex items-center gap-1">
            <FiCalendar />
            {formatDate(tripDate)}
          </span>

          <span className="flex items-center gap-1">
            <FiUsers />
            {guestCount} Guest
          </span>
        </div>

        <div className="flex items-center justify-between mt-6 border-t pt-4">
          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-xl font-bold text-[#AAB700]">
              {formatCurrency(totalPrice)}
            </p>
          </div>

          <Link
            to={`/bookings/${booking.id}`}
            className="bg-[#AAB700] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#98a500]"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
