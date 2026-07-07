import { FiPlus, FiSearch, FiSliders } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PackagesToolbar({
  query,
  status,
  sort,
  onSearch,
  onStatusChange,
  onSortChange,
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-[24px] font-bold text-[#111827]">
          Packages
        </h1>

        <p className="mt-1 text-[12px] text-[#94a3b8]">
          Manage tour packages, prices, participants, and package details.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3 sm:w-[280px]">
          <FiSearch size={15} className="shrink-0 text-[#a8b3c2]" />

          <input
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            type="text"
            placeholder="Search package, location, price"
            className="w-full bg-transparent text-[12px] text-[#334155] outline-none placeholder:text-[#b2bac5]"
          />
        </div>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-10 rounded-xl border border-[#edf1f6] bg-white px-3 text-[12px] font-semibold text-[#64748b] outline-none"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="High Demand">High Demand</option>
          <option value="Limited">Limited</option>
        </select>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-10 rounded-xl border border-[#edf1f6] bg-white px-3 text-[12px] font-semibold text-[#64748b] outline-none"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Lowest Price</option>
          <option value="price-high">Highest Price</option>
          <option value="rating-high">Highest Rating</option>
          <option value="participants-high">Most Participants</option>
        </select>

        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#edf1f6] bg-white px-3 text-[12px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc] sm:w-10"
        >
          <FiSliders size={15} />
          <span className="sm:hidden">Filter</span>
        </button>

<Link
  to="/admin/packages/add"
  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-4 text-[12px] font-bold text-white shadow-[0_12px_26px_rgba(170,183,0,0.25)] transition hover:bg-[#98a500]"
>
  <FiPlus size={15} />
  Add Package
</Link>
      </div>
    </div>
  );
}