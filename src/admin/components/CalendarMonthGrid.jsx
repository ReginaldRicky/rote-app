import { FiCalendar } from "react-icons/fi";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mutedCellStyle = {
  backgroundImage:
    "repeating-linear-gradient(135deg, transparent 0px, transparent 9px, rgba(148, 163, 184, 0.13) 9px, rgba(148, 163, 184, 0.13) 11px)",
};

function getEventStyle(isSelected, kind) {
  if (isSelected) {
    return "bg-[#AAB700] text-white shadow-[0_8px_18px_rgba(170,183,0,0.25)]";
  }

  if (kind === "Booking") {
    return "bg-[#eff6ff] text-[#111827] hover:bg-[#dbeafe]";
  }

  return "bg-[#f4f6e5] text-[#111827] hover:bg-[#eef2cf]";
}

export default function CalendarMonthGrid({
  days = [],
  events = [],
  selectedEvent,
  onSelectEvent,
}) {
  function getEventsByDate(date, muted) {
    if (muted) return [];

    return events.filter((event) => event.date === date);
  }

  return (
    <div className="flex h-full min-w-[820px] flex-col bg-white">
      <div className="grid h-[28px] shrink-0 grid-cols-7 border-b border-[#edf1f6] bg-[#eef8fb]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center text-[10px] font-bold text-[#64748b]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6">
        {days.map((dayItem, index) => {
          const dayEvents = getEventsByDate(dayItem.date, dayItem.muted);
          const isRightEdge = (index + 1) % 7 === 0;
          const isBottomRow = index >= 35;

          return (
            <div
              key={dayItem.id}
              style={dayItem.muted ? mutedCellStyle : undefined}
              className={`relative min-h-0 bg-white p-[8px] ${
                isRightEdge ? "" : "border-r border-[#edf1f6]"
              } ${isBottomRow ? "" : "border-b border-[#edf1f6]"}`}
            >
              <span
                className={`absolute left-[8px] top-[7px] text-[10px] font-medium ${
                  dayItem.muted ? "text-[#cbd5e1]" : "text-[#94a3b8]"
                }`}
              >
                {dayItem.day}
              </span>

              <div className="flex h-full flex-col gap-1 overflow-hidden pt-[22px]">
                {dayEvents.slice(0, 2).map((event) => {
                  const isSelected = selectedEvent?.id === event.id;

                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className={`flex min-h-[54px] w-full flex-col justify-between rounded-[7px] px-[10px] py-[8px] text-left transition ${getEventStyle(
                        isSelected,
                        event.kind
                      )}`}
                    >
                      <p className="line-clamp-2 text-[11px] font-bold leading-[15px]">
                        {event.title}
                      </p>

                      <div
                        className={`flex items-center gap-1.5 text-[9px] ${
                          isSelected ? "text-white/85" : "text-[#64748b]"
                        }`}
                      >
                        <FiCalendar size={10} />
                        <span>{event.kind || "Schedule"}</span>
                      </div>
                    </button>
                  );
                })}

                {dayEvents.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => onSelectEvent(dayEvents[2])}
                    className="rounded-md bg-[#f8fafc] px-2 py-1 text-left text-[9px] font-bold text-[#64748b] hover:bg-[#eef2cf]"
                  >
                    +{dayEvents.length - 2} more
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
