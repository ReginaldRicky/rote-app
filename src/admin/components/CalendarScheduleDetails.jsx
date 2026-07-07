import { Link } from "react-router-dom";
import { FiExternalLink, FiPackage, FiUsers } from "react-icons/fi";
import { formatDateID } from "../../utils/formatter";

export default function CalendarScheduleDetails({ event }) {
  if (!event) {
    return (
      <aside className="min-h-0 border-t border-[#edf1f6] bg-[#fbfcfe] px-4 py-4 xl:border-l xl:border-t-0">
        <h2 className="text-[14px] font-bold text-[#111827]">
          Schedule Details
        </h2>

        <div className="mt-10 text-center">
          <p className="text-[13px] font-semibold text-[#111827]">
            No schedule selected
          </p>

          <p className="mt-2 text-[12px] leading-5 text-[#94a3b8]">
            Click a schedule from the calendar to view the details.
          </p>
        </div>
      </aside>
    );
  }

  const scheduleItems = Array.isArray(event.schedule) ? event.schedule : [];

  return (
    <aside className="min-h-0 overflow-y-auto border-t border-[#edf1f6] bg-[#fbfcfe] px-4 py-4 xl:border-l xl:border-t-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-bold text-[#111827]">
          Schedule Details
        </h2>

        {event.link ? (
          <Link
            to={event.link}
            className="inline-flex items-center gap-1 rounded-lg border border-[#e7edf4] bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#64748b] hover:bg-[#f8fafc] hover:text-[#111827]"
          >
            Open
            <FiExternalLink size={12} />
          </Link>
        ) : null}
      </div>

      <span className="mb-3 inline-flex rounded-full bg-[#AAB700]/10 px-3 py-1 text-[10px] font-bold text-[#AAB700]">
        {event.kind || "Schedule"}
      </span>

      <h3 className="mb-5 text-[18px] font-extrabold leading-tight text-[#AAB700]">
        {event.title}
      </h3>

      <div className="space-y-[14px] border-b border-[#edf1f6] pb-5">
        <div>
          <p className="text-[10px] font-semibold text-[#94a3b8]">
            Destination
          </p>

          <p className="mt-1 text-[12px] font-medium leading-5 text-[#334155]">
            {event.destination || "-"}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#94a3b8]">
            Duration / Booking Size
          </p>

          <p className="mt-1 text-[12px] font-medium leading-5 text-[#334155]">
            {event.duration || "-"}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#94a3b8]">
            Date
          </p>

          <p className="mt-1 text-[12px] font-medium leading-5 text-[#334155]">
            {formatDateID(event.date)}
            {event.endDate && event.endDate !== event.date
              ? ` - ${formatDateID(event.endDate)}`
              : ""}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#94a3b8]">
            Total Participant
          </p>

          <p className="mt-1 flex items-center gap-2 text-[12px] font-bold text-[#334155]">
            <FiUsers size={13} />
            {event.totalParticipant || 0} pax
          </p>
        </div>
      </div>

      {scheduleItems.length > 0 ? (
        <div className="border-b border-[#edf1f6] py-4">
          <h4 className="mb-3 text-[12px] font-bold text-[#111827]">
            Package Itinerary
          </h4>

          <div className="space-y-3">
            {scheduleItems.map((item) => (
              <div
                key={item.id || `${item.dayNumber}-${item.title}`}
                className="rounded-[10px] bg-white px-4 py-4 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#AAB700]">
                  Day {item.dayNumber || item.day_number || "-"}
                </p>

                <p className="mt-2 text-[12px] font-bold text-[#111827]">
                  {item.title || "Schedule"}
                </p>

                <p className="mt-1 whitespace-pre-line text-[11px] leading-5 text-[#64748b]">
                  {item.activity || "No activity details."}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pt-4">
        <h4 className="mb-3 flex items-center gap-2 text-[12px] font-bold text-[#111827]">
          <FiPackage size={13} />
          Related Details
        </h4>

        <div className="space-y-3">
          {(event.meetingPoints || []).map((point, index) => (
            <div
              key={`${point.type}-${index}`}
              className="rounded-[10px] bg-white px-4 py-4 shadow-sm"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
                {point.type}
              </p>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-[#94a3b8]">
                    Start
                  </p>

                  <p className="mt-1 text-[12px] font-medium leading-4 text-[#334155]">
                    {point.startName}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-[#94a3b8]">
                    {point.startTime}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-[#94a3b8]">
                    Finish / Status
                  </p>

                  <p className="mt-1 text-[12px] font-medium leading-4 text-[#334155]">
                    {point.finishName}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-[#94a3b8]">
                    {point.finishTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
