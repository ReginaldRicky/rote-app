import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendarDays(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstCell = new Date(year, month, 1 - firstDay.getDay());
  const today = new Date();

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCell);
    date.setDate(firstCell.getDate() + index);

    return {
      id: date.toISOString().slice(0, 10),
      day: date.getDate(),
      muted: date.getMonth() !== month,
      today:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
    };
  });
}

function formatMonth(currentDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);
}

export default function MiniCalendar({ eventDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarDays = useMemo(() => getCalendarDays(currentDate), [currentDate]);
  const eventSet = useMemo(() => new Set(eventDates.filter(Boolean)), [eventDates]);

  function moveMonth(direction) {
    setCurrentDate((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
  }

  return (
    <section className="bg-white rounded-[18px] border border-[#dfe7ef] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-[#111827]">
          {formatMonth(currentDate)}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => moveMonth(-1)}
            className="w-7 h-7 rounded-lg bg-[#f6f8fb] border border-[#e5edf5] flex items-center justify-center text-[#64748b] hover:bg-[#AAB700]/10"
          >
            <FiChevronLeft size={14} />
          </button>

          <button
            type="button"
            onClick={() => moveMonth(1)}
            className="w-7 h-7 rounded-lg bg-[#f6f8fb] border border-[#e5edf5] flex items-center justify-center text-[#64748b] hover:bg-[#AAB700]/10"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] text-[#9aa5b1] mb-2">
        {days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {calendarDays.map((item) => {
          const hasEvent = eventSet.has(item.id);

          return (
            <div
              key={item.id}
              className={`h-7 rounded-md flex items-center justify-center text-[11px] ${
                item.today
                  ? "bg-[#AAB700] text-white font-bold"
                  : hasEvent
                  ? "bg-[#AAB700]/10 text-[#AAB700] font-semibold"
                  : item.muted
                  ? "text-[#cbd5e1]"
                  : "text-[#64748b]"
              }`}
              title={hasEvent ? "Ada booking/package pada tanggal ini" : undefined}
            >
              {item.day}
            </div>
          );
        })}
      </div>
    </section>
  );
}
