import { FiCheckCircle } from "react-icons/fi";

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#edf1f6] bg-[#f8fafc] p-4">
      <p className="text-[11px] font-semibold text-[#94a3b8]">
        {label}
      </p>

      <h3 className="mt-1 text-[22px] font-extrabold text-[#111827]">
        {value}
      </h3>
    </div>
  );
}

export default function AdminProfileSummary({ formData, stats }) {
  return (
    <section className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-[78px] w-[78px] overflow-hidden rounded-[22px] bg-[#f8fafc]">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[22px] font-extrabold text-[#111827]">
                {formData.name}
              </h2>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#AAB700]/10 px-3 py-1 text-[11px] font-bold text-[#AAB700]">
                <FiCheckCircle size={12} />
                Active
              </span>
            </div>

            <p className="mt-1 text-[13px] font-semibold text-[#64748b]">
              {formData.role} · {formData.department}
            </p>

            <p className="mt-1 text-[12px] text-[#94a3b8]">
              {formData.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[480px]">
          {stats.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </section>
  );
}