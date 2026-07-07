import {
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import PackageStatusBadge from "./PackageStatusBadge";
import { formatIDR } from "../../utils/formatter";

const tableColumns = [
  { key: "package", label: "Package", width: "32%" },
  { key: "location", label: "Location", width: "21%" },
  { key: "duration", label: "Duration", width: "16%" },
  { key: "price", label: "Price", width: "12%" },
  { key: "status", label: "Status", width: "11%" },
  { key: "action", label: "Action", width: "8%" },
];

export default function PackagesTable({
  packages = [],
  rowsPerPage = 6,
  getPackageStatus,
  onEdit,
}) {
  const rowSlots = Array.from({ length: rowsPerPage }, (_, index) => {
    return packages[index] || null;
  });

  function handleEdit(packageItem) {
    if (onEdit) {
      onEdit(packageItem);
      return;
    }

    console.log("Edit package:", packageItem);
  }

  return (
    <section className="overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white shadow-sm">

      <div className="w-full overflow-hidden">
        <table className="w-full table-fixed">
          <colgroup>
            {tableColumns.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>

          <thead>
            <tr className="h-[52px] border-b border-[#edf1f6] bg-[#f8fafc] text-left text-[11px] uppercase tracking-wide text-[#8a94a6]">
              {tableColumns.map((column) => (
                <th key={column.key} className="px-5 font-bold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowSlots.map((packageItem, index) => {
              const isLastRow = index === rowSlots.length - 1;

              if (!packageItem) {
                return (
                  <tr
                    key={`empty-package-row-${index}`}
                    className={`h-[86px] ${
                      isLastRow ? "" : "border-b border-[#f5f7fb]"
                    }`}
                  >
                    {tableColumns.map((column) => (
                      <td key={column.key} className="px-5">
                        {packages.length === 0 &&
                        index === 0 &&
                        column.key === "package" ? (
                          <div>
                            <p className="text-[13px] font-bold text-[#111827]">
                              Belum ada package
                            </p>
                            <p className="mt-1 text-[11px] text-[#94a3b8]">
                              Data package akan tampil di tabel ini.
                            </p>
                          </div>
                        ) : (
                          <span className="invisible">Empty</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              }

              const status = getPackageStatus(packageItem);

              return (
                <tr
                  key={packageItem.id}
                  className={`h-[86px] transition hover:bg-[#fbfcf2] ${
                    isLastRow ? "" : "border-b border-[#f5f7fb]"
                  }`}
                >
                  <td className="px-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            to={`/admin/packages/${packageItem.id}`}
                            className="shrink-0"
                        >
                        <img
                            src={packageItem.thumbnail || packageItem.image}
                            alt={packageItem.title}
                            className="h-14 w-16 rounded-xl object-cover shadow-sm transition hover:scale-[1.03]"
                        />
                        </Link>

                        <div className="min-w-0">
                        <Link
                            to={`/admin/packages/${packageItem.id}`}
                            className="block truncate text-[13px] font-extrabold text-[#111827] transition hover:text-[#AAB700]"
                        >
                            {packageItem.title}
                        </Link>

                        <div className="mt-1 flex min-w-0 items-center gap-2 text-[10px] text-[#94a3b8]">
                          <FiCheckCircle
                            size={11}
                            className="shrink-0 text-[#AAB700]"
                          />

                          <span className="truncate">
                            {packageItem.includes?.length || 0} includes
                          </span>

                          <span className="h-1 w-1 shrink-0 rounded-full bg-[#cbd5e1]" />

                          <span className="truncate">
                            {packageItem.schedule?.length || 0} days plan
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5">
                    <div className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-[#334155]">
                      <FiMapPin size={13} className="shrink-0 text-[#AAB700]" />
                      <span className="truncate">{packageItem.location}</span>
                    </div>
                  </td>

                  <td className="px-5">
                    <div className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-[#64748b]">
                      <FiClock size={13} className="shrink-0 text-[#AAB700]" />
                      <span className="truncate">{packageItem.duration}</span>
                    </div>
                  </td>

                  <td className="px-5">
                    <p className="truncate text-[15px] font-extrabold text-[#AAB700]">
                      {formatIDR(packageItem.price)}
                    </p>

                    <p className="text-[10px] text-[#94a3b8]">
                      per person
                    </p>
                  </td>

                  <td className="px-5">
                    <PackageStatusBadge status={status} />
                  </td>

                  <td className="px-5">
                    <button
                      type="button"
                      onClick={() => handleEdit(packageItem)}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#AAB700]/10 px-3 text-[12px] font-bold text-[#AAB700] transition hover:bg-[#AAB700] hover:text-white"
                    >
                      <FiEdit2 size={14} />
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