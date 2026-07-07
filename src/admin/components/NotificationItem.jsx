import { Link } from "react-router-dom";
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiPackage,
  FiTrash2,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

const typeIcon = {
  Booking: FiBell,
  Cancellation: FiXCircle,
  Package: FiPackage,
  Customer: FiUser,
  Schedule: FiClock,
};

function getTypeClass(type) {
  const classes = {
    Booking: "bg-[#eff6ff] text-[#2563eb]",
    Cancellation: "bg-[#ffe6e8] text-[#ff6b6b]",
    Package: "bg-[#AAB700]/10 text-[#AAB700]",
    Customer: "bg-[#f3e8ff] text-[#7e22ce]",
    Schedule: "bg-[#fff4db] text-[#c77700]",
  };

  return classes[type] || "bg-[#f8fafc] text-[#64748b]";
}

export default function NotificationItem({
  item,
  onMarkAsRead,
  onDelete,
}) {
  const Icon = typeIcon[item.type] || FiBell;
  const isUnread = item.status === "Unread";
  const link = item.link || "/admin/notifications";

  return (
    <article
      className={`rounded-[18px] border p-4 transition hover:bg-[#fbfcf2] ${
        isUnread
          ? "border-[#AAB700]/30 bg-[#fbfcf2]"
          : "border-[#edf1f6] bg-white"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <Link to={link} className="flex min-w-0 gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${getTypeClass(
              item.type
            )}`}
          >
            <Icon size={18} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[14px] font-extrabold text-[#111827]">
                {item.title}
              </h3>

              {isUnread ? (
                <span className="rounded-full bg-[#AAB700] px-2.5 py-1 text-[10px] font-bold text-white">
                  New
                </span>
              ) : null}

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getTypeClass(
                  item.type
                )}`}
              >
                {item.type}
              </span>
            </div>

            <p className="mt-2 text-[13px] leading-6 text-[#64748b]">
              {item.message}
            </p>

            <p className="mt-2 text-[11px] font-medium text-[#94a3b8]">
              {item.time}
            </p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={link}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#e7edf4] bg-white px-3 text-[12px] font-bold text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#111827]"
          >
            <FiExternalLink size={14} />
            Open
          </Link>

          {isUnread ? (
            <button
              type="button"
              onClick={() => onMarkAsRead(item.id)}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#AAB700]/10 px-3 text-[12px] font-bold text-[#AAB700] transition hover:bg-[#AAB700] hover:text-white"
            >
              <FiCheckCircle size={14} />
              Read
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[#fee2e2] bg-white px-3 text-[12px] font-bold text-[#ef4444] transition hover:bg-[#ef4444] hover:text-white"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
