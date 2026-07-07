export default function BookingStatusBadge({ status = "Waiting Confirmation" }) {
  const statusClass = {
    "Waiting Confirmation": "bg-[#fff4db] text-[#c77700]",
    Confirmed: "bg-[#e4f4eb] text-[#15803d]",
    Cancelled: "bg-[#ffe6e8] text-[#ff6b6b]",
    Completed: "bg-[#eff6ff] text-[#2563eb]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold ${
        statusClass[status] || statusClass["Waiting Confirmation"]
      }`}
    >
      {status}
    </span>
  );
}