import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiShield,
} from "react-icons/fi";

function InfoBadge({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#edf1f6] bg-white px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f8fafc] text-[#AAB700]">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#94a3b8]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[12px] font-bold text-[#111827]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function AdminProfileAccountSummary({ formData }) {
  return (
    <aside className="space-y-5">
      <article className="rounded-[22px] border border-[#e7edf4] bg-[#fbfcf2] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#AAB700] shadow-sm">
            <FiActivity size={18} />
          </div>

          <div>
            <h2 className="text-[16px] font-extrabold text-[#111827]">
              Account Summary
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-[#64748b]">
              Quick overview of this admin account.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <InfoBadge
            icon={FiBriefcase}
            label="Department"
            value={formData.department}
          />

          <InfoBadge
            icon={FiShield}
            label="Access"
            value={formData.accessLevel}
          />

          <InfoBadge
            icon={FiCalendar}
            label="Joined"
            value={formData.joinedDate}
          />

          <InfoBadge
            icon={FiActivity}
            label="Status"
            value={formData.accountStatus}
          />
        </div>
      </article>
    </aside>
  );
}