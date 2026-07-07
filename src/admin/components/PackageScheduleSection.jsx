import { FiPlus, FiTrash2 } from "react-icons/fi";

import PackageFormField from "./PackageFormField";
import { inputClass } from "./packageFormUtils";

export default function PackageScheduleSection({
  schedule,
  updateSchedule,
  addSchedule,
  removeSchedule,
}) {
  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#edf1f6] pb-4">
        <div>
          <h2 className="text-[16px] font-extrabold text-[#111827]">
            Daily Schedule
          </h2>

          <p className="mt-1 text-[12px] text-[#94a3b8]">
            Add day by day itinerary for this package.
          </p>
        </div>

        <button
          type="button"
          onClick={addSchedule}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#AAB700]/10 px-4 text-[12px] font-bold text-[#AAB700] transition hover:bg-[#AAB700] hover:text-white"
        >
          <FiPlus size={14} />
          Add Day
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {schedule.map((scheduleItem, index) => (
          <div
            key={index}
            className="rounded-[18px] border border-[#edf1f6] bg-[#f8fafc] p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[13px] font-extrabold text-[#111827]">
                Schedule Item {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-white px-3 text-[12px] font-bold text-[#ef4444] transition hover:bg-[#ef4444] hover:text-white"
              >
                <FiTrash2 size={13} />
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <PackageFormField label="Day Label">
                <input
                  type="text"
                  value={scheduleItem.day}
                  onChange={(event) =>
                    updateSchedule(index, "day", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Example: Day 1"
                />
              </PackageFormField>

              <PackageFormField label="Schedule Title">
                <input
                  type="text"
                  value={scheduleItem.title}
                  onChange={(event) =>
                    updateSchedule(index, "title", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Example: Arrival and Check-in"
                />
              </PackageFormField>
            </div>

            <div className="mt-4">
              <PackageFormField label="Activity">
                <textarea
                  value={scheduleItem.activity}
                  onChange={(event) =>
                    updateSchedule(index, "activity", event.target.value)
                  }
                  className="min-h-[95px] w-full resize-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[13px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10"
                  placeholder="Write activity description..."
                />
              </PackageFormField>
            </div>

            <div className="mt-4">
              <PackageFormField label="Evening Activity">
                <textarea
                  value={scheduleItem.evening || ""}
                  onChange={(event) =>
                    updateSchedule(index, "evening", event.target.value)
                  }
                  className="min-h-[80px] w-full resize-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[13px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10"
                  placeholder="Optional evening activity..."
                />
              </PackageFormField>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}