import { FiEdit2 } from "react-icons/fi";
import BookingStatusBadge from "./BookingStatusBadge";

const tableColumns = [
  { key: "name", label: "Name", width: "19%" },
  { key: "packageName", label: "Package", width: "23%" },
  { key: "date", label: "Date", width: "16%" },
  { key: "price", label: "Total", width: "12%" },
  { key: "status", label: "Status", width: "12%" },
  { key: "action", label: "Action", width: "6%" },
];

export default function BookingsTable({
  bookings = [],
  rowsPerPage = 8,
  onEdit,
}) {
  const rowSlots = Array.from({ length: rowsPerPage }, (_, index) => {
    return bookings[index] || null;
  });

  function handleEdit(item) {
    if (onEdit) {
      onEdit(item);
      return;
    }

    console.log("Edit booking:", item);
  }

  return (
    <section className="overflow-hidden rounded-[18px] border border-[#e7edf4] bg-white shadow-sm">
      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed">
          <colgroup>
            {tableColumns.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>

          <thead>
            <tr className="h-[52px] border-b border-[#edf1f6] bg-[#f1f8fb] text-left text-[11px] text-[#8a94a6]">
              {tableColumns.map((column) => (
                <th key={column.key} className="px-5 font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowSlots.map((item, index) => {
              const isLastRow = index === rowSlots.length - 1;

              if (!item) {
                return (
                  <tr
                    key={`empty-row-${index}`}
                    className={`h-[58px] ${
                      isLastRow ? "" : "border-b border-[#f5f7fb]"
                    }`}
                  >
                    {tableColumns.map((column) => (
                      <td key={column.key} className="px-5">
                        <span className="invisible">Empty</span>
                      </td>
                    ))}
                  </tr>
                );
              }

              return (
                <tr
                  key={`${item.source}-${item.id}`}
                  className={`h-[58px] transition hover:bg-[#f8fafc] ${
                    isLastRow ? "" : "border-b border-[#f5f7fb]"
                  }`}
                >
                  <td className="px-5">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-[#111827]">
                        {item.name}
                      </p>

                      {item.source === "customer" && (
                        <p className="mt-1 text-[10px] font-bold text-[#AAB700]">
                          Customer Booking
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5">
                    <p className="truncate text-[13px] font-medium text-[#334155]">
                      {item.packageName}
                    </p>
                  </td>

                  <td className="px-5">
                    <p className="truncate text-[13px] text-[#64748b]">
                      {item.date}
                    </p>
                  </td>

                  <td className="px-5">
                    <p className="truncate text-[13px] font-semibold text-[#111827]">
                      {item.price}
                    </p>
                  </td>

                  <td className="px-5">
                    <BookingStatusBadge status={item.status} />
                  </td>

                  <td className="px-5">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="inline-flex h-8 items-center justify-center gap-2 rounded-xl bg-[#AAB700]/10 px-3 text-[12px] font-bold text-[#AAB700] transition hover:bg-[#AAB700] hover:text-white"
                    >
                      <FiEdit2 size={13} />
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}