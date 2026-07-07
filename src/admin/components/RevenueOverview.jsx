import { useMemo } from "react";
import { formatIDR } from "../../utils/formatter";

const chartLabels = ["M1", "M2", "M3", "M4", "M5", "M6"];

export default function RevenueOverview({ totalRevenue = 0 }) {
  const chartTotal = Number(totalRevenue || 0);
  const yLabels = [
    formatIDR(chartTotal),
    formatIDR(chartTotal * 0.75),
    formatIDR(chartTotal * 0.5),
    formatIDR(chartTotal * 0.25),
    formatIDR(0),
  ];

  const path = useMemo(() => {
    if (chartTotal <= 0) {
      return "M 0 170 C 120 170, 220 170, 320 170 C 430 170, 520 170, 620 170";
    }

    return "M 0 165 C 95 132, 145 155, 220 112 C 305 64, 390 118, 465 72 C 535 30, 585 62, 620 45";
  }, [chartTotal]);

  return (
    <section className="bg-white rounded-[18px] border border-[#dfe7ef] p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-[18px] font-bold text-[#111827]">
          Revenue Overview
        </h2>

        <p className="mt-1 text-[13px] font-bold text-[#AAB700]">
          {formatIDR(totalRevenue)} from confirmed and completed bookings
        </p>
      </div>

      <div className="relative h-[220px]">
        <div className="absolute left-0 top-0 bottom-8 w-20 flex flex-col justify-between">
          {yLabels.map((label, index) => (
            <span key={`${label}-${index}`} className="text-[11px] text-[#94a3b8] leading-none">
              {label}
            </span>
          ))}
        </div>

        <div className="absolute left-24 right-0 top-2 bottom-8">
          <div className="absolute inset-0 flex flex-col justify-between">
            {yLabels.map((label, index) => (
              <div key={`${label}-${index}`} className="border-t border-[#e5edf5]" />
            ))}
          </div>

          <svg viewBox="0 0 620 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d={path} fill="none" stroke="#AAB700" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute left-24 right-0 bottom-0 grid" style={{ gridTemplateColumns: `repeat(${chartLabels.length}, minmax(0, 1fr))` }}>
          {chartLabels.map((label) => (
            <span key={label} className="text-center text-[13px] text-[#94a3b8]">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
