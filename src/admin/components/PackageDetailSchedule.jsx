export default function PackageDetailSchedule({ schedule = [] }) {
  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-6 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
        Trip Schedule
      </p>

      <h2 className="mt-2 text-[22px] font-extrabold text-[#111827]">
        Daily Itinerary
      </h2>

      <div className="mt-6 space-y-6">
        {schedule.map((item, index) => (
          <div key={`${item.day}-${item.title}`} className="relative pl-7">
            {index !== schedule.length - 1 ? (
              <span className="absolute left-[5px] top-5 h-[calc(100%+24px)] w-px bg-[#e7edf4]" />
            ) : null}

            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[#AAB700]" />

            <div className="rounded-2xl bg-[#f8fafc] p-5">
              <h3 className="text-[15px] font-extrabold text-[#111827]">
                {item.day} - {item.title}
              </h3>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-[#94a3b8]">
                    Activity
                  </p>

                  <p className="mt-1 text-[13px] leading-6 text-[#64748b]">
                    {item.activity}
                  </p>
                </div>

                {item.evening ? (
                  <div>
                    <p className="text-[11px] font-bold text-[#94a3b8]">
                      Evening
                    </p>

                    <p className="mt-1 text-[13px] leading-6 text-[#64748b]">
                      {item.evening}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}