export default function PackageStatusBadge({ status = "Available" }) {
  const statusClass = {
    Available: "bg-[#edf7e8] text-[#4f8a10]",
    "High Demand": "bg-[#AAB700]/15 text-[#AAB700]",
    Limited: "bg-[#fff4db] text-[#c77700]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-bold ${
        statusClass[status] || statusClass.Available
      }`}
    >
      {status}
    </span>
  );
}