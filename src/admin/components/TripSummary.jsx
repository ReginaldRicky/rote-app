import { FiNavigation } from "react-icons/fi";

export default function TripSummary({
  total = 1200,
  done = 620,
  booked = 465,
  cancelled = 115,
}) {
  const totalData = done + booked + cancelled || 1;

  return (
    <section className="bg-white rounded-[16px] border border-[#e5edf5] px-4 py-3 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 w-[145px] flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#AAB700]/10 text-[#AAB700] flex items-center justify-center text-xl">
            <FiNavigation />
          </div>

          <div>
            <p className="text-[12px] text-[#718096] leading-none">
              Total Trips
            </p>

            <h3 className="text-[24px] font-bold text-[#111827] leading-tight">
              {total.toLocaleString()}
            </h3>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="h-4 rounded-md overflow-hidden bg-[#AAB700]/10 flex mb-2">
            <div
              className="bg-[#AAB700]"
              style={{ width: `${(done / totalData) * 100}%` }}
            />

            <div
              className="bg-[#AAB700]/45"
              style={{ width: `${(booked / totalData) * 100}%` }}
            />

            <div
              className="bg-red-300"
              style={{ width: `${(cancelled / totalData) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-5 text-[12px] text-[#4b5563]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AAB700]" />
              Done <strong>{done}</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AAB700]/45" />
              Booked <strong>{booked}</strong>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-300" />
              Canceled <strong>{cancelled}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}