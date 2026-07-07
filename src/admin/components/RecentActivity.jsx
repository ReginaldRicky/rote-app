import { Link } from "react-router-dom";
import { FiCheckCircle, FiMoreHorizontal } from "react-icons/fi";

export default function RecentActivity({ items = [] }) {
  return (
    <section className="bg-white rounded-[18px] border border-[#edf1f6] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[16px] font-bold text-[#1f2c3a]">
            Recent Activity
          </h2>

          <p className="text-[11px] text-[#94a3b8] mt-0.5">
            Aktivitas terbaru dari booking customer
          </p>
        </div>

        <Link
          to="/admin/bookings"
          className="text-[#94a3b8] hover:text-[#111827]"
          title="Open bookings"
        >
          <FiMoreHorizontal />
        </Link>
      </div>

      <div className="space-y-3">
        {items.slice(0, 5).map((item, index) => {
          const Wrapper = item.to ? Link : "div";
          const wrapperProps = item.to
            ? { to: item.to }
            : {};

          return (
            <Wrapper
              key={`${item.title || item.text}-${index}`}
              {...wrapperProps}
              className="flex gap-3 rounded-xl p-1 transition hover:bg-[#AAB700]/10"
            >
              <div className="w-8 h-8 rounded-full bg-[#AAB700]/10 text-[#AAB700] flex items-center justify-center flex-shrink-0">
                <FiCheckCircle size={14} />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#334155] leading-4">
                  {item.title || item.text}
                </p>

                {item.description && (
                  <p className="text-[10px] text-[#64748b] leading-4">
                    {item.description}
                  </p>
                )}

                <span className="text-[10px] text-[#94a3b8]">
                  {item.time}
                </span>
              </div>
            </Wrapper>
          );
        })}

        {items.length === 0 && (
          <p className="rounded-xl bg-[#f8fafc] p-4 text-center text-xs text-[#64748b]">
            Belum ada aktivitas baru.
          </p>
        )}
      </div>
    </section>
  );
}
