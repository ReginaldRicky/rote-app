import { Link } from "react-router-dom";
import { FiCalendar, FiPlus, FiUsers } from "react-icons/fi";

export default function UpcomingTrips({ trips = [] }) {
  return (
    <section className="bg-white rounded-[18px] border border-[#dfe7ef] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-[#111827]">
            Upcoming Trips
          </h2>
          <p className="text-[10px] text-[#94a3b8]">
            Klik trip untuk mengubah status booking.
          </p>
        </div>

        <Link
          to="/admin/bookings/add"
          className="w-8 h-8 rounded-lg bg-[#AAB700] text-white flex items-center justify-center hover:bg-[#98a500]"
          title="Add booking"
        >
          <FiPlus size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {trips.map((trip) => (
          <Link
            to={trip.id ? `/admin/bookings/${trip.id}/edit` : "/admin/calendar"}
            key={trip.id || `${trip.title}-${trip.date}`}
            className="flex gap-3 rounded-[14px] p-2 hover:bg-[#AAB700]/10 transition"
          >
            {trip.image ? (
              <img
                src={trip.image}
                alt={trip.title}
                className="w-[66px] h-[66px] rounded-xl object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-[66px] h-[66px] rounded-xl bg-[#AAB700]/10 text-[#AAB700] flex items-center justify-center flex-shrink-0 font-bold">
                {trip.title?.[0] || "T"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <span className="inline-block bg-[#AAB700]/10 text-[#AAB700] text-[9px] font-semibold px-2 py-0.5 rounded-md mb-1">
                {trip.tag || "BOOKING"}
              </span>

              <h3 className="text-[13px] font-bold text-[#111827] leading-4 truncate">
                {trip.title}
              </h3>

              <p className="text-[11px] text-[#64748b] truncate">
                {trip.customerName || trip.location}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#94a3b8]">
                <span className="inline-flex items-center gap-1">
                  <FiCalendar size={11} />
                  {trip.date}
                </span>

                {trip.guests ? (
                  <span className="inline-flex items-center gap-1">
                    <FiUsers size={11} />
                    {trip.guests} pax
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
        ))}

        {trips.length === 0 && (
          <p className="rounded-xl bg-[#f8fafc] p-4 text-center text-xs text-[#64748b]">
            Belum ada upcoming trip.
          </p>
        )}
      </div>
    </section>
  );
}
