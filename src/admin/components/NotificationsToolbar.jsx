import { FiFilter, FiSearch } from "react-icons/fi";

export default function NotificationsToolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-[16px] font-extrabold text-[#111827]">
          Notification Center
        </h2>

        <p className="mt-1 text-[12px] text-[#94a3b8]">
          Manage latest admin notifications.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3 sm:w-[280px]">
          <FiSearch size={15} className="shrink-0 text-[#a8b3c2]" />

          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            type="text"
            placeholder="Search notifications"
            className="w-full bg-transparent text-[12px] text-[#334155] outline-none placeholder:text-[#b2bac5]"
          />
        </div>

        <div className="flex h-10 items-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3">
          <FiFilter size={14} className="text-[#a8b3c2]" />

          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="bg-transparent text-[12px] font-semibold text-[#64748b] outline-none"
          >
            <option value="All">All Status</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>
      </div>
    </div>
  );
}