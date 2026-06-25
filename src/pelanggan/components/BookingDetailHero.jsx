import { Link } from "react-router-dom";
import { FiExternalLink, FiMapPin } from "react-icons/fi";

function getStatusClass(status) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    case "Completed":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function BookingDetailHero({ booking }) {
  return (
    <section className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-lg mb-8">
      <div className="grid lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="relative min-h-[300px] lg:min-h-[390px]">
          <img
            src={booking.tourImage}
            alt={booking.tourTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span
            className={`absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
              booking.status
            )}`}
          >
            {booking.status || "Waiting Confirmation"}
          </span>
        </div>

        <div className="p-7 lg:p-10">
          <p className="text-[#AAB700] font-semibold text-sm uppercase tracking-wider mb-3">
            Tour Booking
          </p>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#181e4b] leading-tight mb-4">
            {booking.tourTitle}
          </h1>

          <p className="flex items-center gap-2 text-gray-500 mb-8">
            <FiMapPin className="text-[#AAB700]" />
            {booking.location || "Location unavailable"}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#f8f9fb] border border-gray-100 rounded-2xl p-5">
              <span className="text-sm text-gray-400">
                Price Per Person
              </span>

              <p className="text-xl font-bold text-[#181e4b] mt-1">
                {booking.pricePerPerson || "-"}
              </p>
            </div>

            <div className="bg-[#AAB700]/10 border border-[#AAB700]/20 rounded-2xl p-5">
              <span className="text-sm text-gray-500">
                Total Payment
              </span>

              <p className="text-2xl font-bold text-[#AAB700] mt-1">
                {booking.totalPrice || "-"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/detail/${booking.tourId}`}
              className="inline-flex items-center gap-2 bg-[#181e4b] hover:bg-[#2d356f] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              View Tour
              <FiExternalLink />
            </Link>

            <Link
              to="/destinations"
              className="inline-flex items-center justify-center border border-gray-300 hover:border-[#AAB700] text-[#181e4b] px-6 py-3 rounded-full font-semibold transition"
            >
              Explore More Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}