export default function AdminSectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-[#edf1f6] pb-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#AAB700]/10 text-[#AAB700]">
        <Icon size={18} />
      </div>

      <div>
        <h2 className="text-[16px] font-extrabold text-[#111827]">
          {title}
        </h2>

        <p className="mt-1 text-[12px] leading-5 text-[#94a3b8]">
          {description}
        </p>
      </div>
    </div>
  );
}