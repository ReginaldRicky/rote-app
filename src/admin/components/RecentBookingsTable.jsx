import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentBookingsTable({ bookings = [] }) {
  const [query, setQuery] = useState("");

  const statusClass = {
    Confirmed: "bg-[#e4f4eb] text-[#15803d]",
    Completed: "bg-[#e4f4eb] text-[#15803d]",
    Pending: "bg-[#eff6ff] text-[#2563eb]",
    "Waiting Confirmation": "bg-[#eff6ff] text-[#2563eb]",
    Cancelled: "bg-[#ffe6e8] text-[#ff6b6b]",
  };

  const filteredBookings = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return bookings.slice(0, 5);
    }

    return bookings.filter((item) => {
      return [item.name, item.package, item.duration, item.date, item.price, item.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    }).slice(0, 5);
  }, [bookings, query]);

  return (
    <section className="bg-white rounded-[18px] border border-[#edf1f6] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-bold text-[#1f2c3a]">
          Recent Bookings
        </h2>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center w-[210px] h-9 rounded-xl bg-[#f6f8fb] px-3 border border-[#eef2f7]">
            <input
              type="text"
              placeholder="Search booking"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent outline-none text-xs text-[#334155] placeholder:text-[#b2bac5]"
            />
          </div>

          <Link
            to="/admin/bookings"
            className="h-9 bg-[#AAB700] text-white text-xs font-semibold px-4 rounded-xl inline-flex items-center"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="text-left text-[11px] text-[#9aa5b1] border-b border-[#eef2f7]">
              <th className="py-2.5 font-medium">Name</th>
              <th className="py-2.5 font-medium">Package</th>
              <th className="py-2.5 font-medium">Duration</th>
              <th className="py-2.5 font-medium">Date</th>
              <th className="py-2.5 font-medium">Price</th>
              <th className="py-2.5 font-medium">Status</th>
              <th className="py-2.5 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((item) => (
              <tr
                key={item.id || `${item.name}-${item.date}`}
                className="border-b border-[#f5f7fb] last:border-none"
              >
                <td className="py-3 text-[13px] font-medium text-[#1f2c3a]">
                  {item.name}
                </td>

                <td className="py-3 text-[13px] text-[#6b7280]">
                  {item.package}
                </td>

                <td className="py-3 text-[13px] text-[#6b7280]">
                  {item.duration}
                </td>

                <td className="py-3 text-[13px] text-[#6b7280]">
                  {item.date}
                </td>

                <td className="py-3 text-[13px] text-[#1f2c3a] font-medium">
                  {item.price}
                </td>

                <td className="py-3">
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                      statusClass[item.status] || statusClass.Pending
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-3">
                  <Link
                    to={item.id ? `/admin/bookings/${item.id}/edit` : "/admin/bookings"}
                    className="text-[12px] font-bold text-[#AAB700] hover:underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-sm text-[#64748b]">
                  Tidak ada booking yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
