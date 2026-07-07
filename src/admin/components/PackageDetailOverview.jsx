export default function PackageDetailOverview({ packageItem }) {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <article className="rounded-[20px] border border-[#e7edf4] bg-white p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
          About Package
        </p>

        <h2 className="mt-2 text-[22px] font-extrabold text-[#111827]">
          Package Overview
        </h2>

        <p className="mt-4 text-[13px] leading-7 text-[#64748b]">
          {packageItem.description || "No description available."}
        </p>
      </article>

      <article className="rounded-[20px] border border-[#e7edf4] bg-white p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
          Quick Summary
        </p>

        <h2 className="mt-2 text-[22px] font-extrabold text-[#111827]">
          Selling Info
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#f8fafc] p-4">
            <p className="text-[11px] text-[#94a3b8]">Rating</p>
            <h3 className="mt-1 text-[20px] font-extrabold text-[#111827]">
              {packageItem.rating}
            </h3>
          </div>

          <div className="rounded-2xl bg-[#f8fafc] p-4">
            <p className="text-[11px] text-[#94a3b8]">Participants</p>
            <h3 className="mt-1 text-[20px] font-extrabold text-[#111827]">
              {packageItem.participants}
            </h3>
          </div>

          <div className="rounded-2xl bg-[#f8fafc] p-4">
            <p className="text-[11px] text-[#94a3b8]">Includes</p>
            <h3 className="mt-1 text-[20px] font-extrabold text-[#111827]">
              {packageItem.includes?.length || 0}
            </h3>
          </div>

          <div className="rounded-2xl bg-[#f8fafc] p-4">
            <p className="text-[11px] text-[#94a3b8]">Schedule</p>
            <h3 className="mt-1 text-[20px] font-extrabold text-[#111827]">
              {packageItem.schedule?.length || 0}
            </h3>
          </div>
        </div>
      </article>
    </section>
  );
}