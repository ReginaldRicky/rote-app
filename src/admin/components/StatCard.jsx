export default function StatCard({
  icon,
  label,
  value,
  change,
  danger = false,
}) {
  return (
    <article className="min-h-[92px] rounded-[18px] border border-[#e5ead0] bg-[#f7faea] px-5 py-4 shadow-sm">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <span className="text-[28px] text-[#AAB700]">
              {icon}
            </span>
          </div>

          <div>
            <p className="text-[14px] font-medium text-[#8b97a8] leading-none">
              {label}
            </p>

            <h3 className="mt-2 text-[28px] font-bold leading-none text-[#0f172a]">
              {value}
            </h3>
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-[9px] px-3 py-1 text-[12px] font-bold leading-none ${
            danger
              ? "bg-[#ffdede] text-[#ff5c5c]"
              : "bg-white text-[#6b7280]"
          }`}
        >
          {change}
        </span>
      </div>
    </article>
  );
}