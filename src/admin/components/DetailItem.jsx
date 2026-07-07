export default function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[16px] border border-[#edf1f6] bg-[#f8fafc] px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#AAB700]/10 text-[#AAB700]">
          <Icon size={16} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-[#94a3b8]">
            {label}
          </p>

          <p className="mt-1 truncate text-[13px] font-bold text-[#111827]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}