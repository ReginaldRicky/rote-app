import { Link } from "react-router-dom";
import { FiCalendar, FiPlus, FiSearch } from "react-icons/fi";
import { BOOKING_STATUSES } from "../services/adminBookingService";

export default function BookingsToolbar({
  query,
  status,
  month,
  onSearch,
  onStatusChange,
  onMonthChange,
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-[24px] font-bold text-[#111827]">
          Bookings
        </h1>

        <p className="mt-1 text-[12px] text-[#94a3b8]">
          Manage customer tour bookings and reservation status.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3 sm:w-[260px]">
          <FiSearch size={15} className="shrink-0 text-[#a8b3c2]" />

          <input
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            type="text"
            placeholder="Search name or package"
            className="w-full bg-transparent text-[12px] text-[#334155] outline-none placeholder:text-[#b2bac5]"
          />
        </div>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-10 rounded-xl border border-[#edf1f6] bg-white px-3 text-[12px] font-medium text-[#64748b] outline-none"
        >
          <option value="All">All Status</option>

          {BOOKING_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex h-10 items-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3">
          <FiCalendar size={14} className="text-[#a8b3c2]" />

          <select
            value={month}
            onChange={(event) => onMonthChange(event.target.value)}
            className="bg-transparent text-[12px] font-medium text-[#64748b] outline-none"
          >
            <option value="All">All Dates</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <Link
          to="/admin/bookings/add"
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-4 text-[12px] font-semibold text-white transition hover:bg-[#98a500]"
        >
          <FiPlus size={15} />
          Add Booking
        </Link>
      </div>
    </div>
  );
}