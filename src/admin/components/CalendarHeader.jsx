import { FiChevronDown } from "react-icons/fi";

export default function CalendarHeader({
  monthLabel = "Calendar",
  onPrev,
  onNext,
}) {
  return (
    <header className="flex h-[48px] shrink-0 items-center justify-between border-b border-[#edf1f6] bg-white px-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-lg border border-[#e5edf5] px-3 py-1 text-xs font-bold text-[#64748b]"
        >
          ‹
        </button>

        <button
          type="button"
          className="flex items-center gap-2 text-[13px] font-bold text-[#111827]"
        >
          {monthLabel}
          <FiChevronDown size={13} className="text-[#64748b]" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="rounded-lg border border-[#e5edf5] px-3 py-1 text-xs font-bold text-[#64748b]"
        >
          ›
        </button>
      </div>
    </header>
  );
}