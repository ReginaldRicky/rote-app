import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AdminPagination({
  totalItems,
  rowsPerPage,
  currentPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  rowsOptions = [5, 8, 10],
  selectWeight = "font-semibold",
  buttonWeight = "font-medium",
  pageWeight = "font-semibold",
}) {
  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="mt-4 flex flex-col gap-3 text-[12px] text-[#8a94a6] md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span>Showing</span>

        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          className={`h-8 rounded-lg border border-[#edf1f6] bg-white px-2 text-[12px] ${selectWeight} text-[#64748b] outline-none`}
        >
          {rowsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <span>
          {startItem} - {endItem} of {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex h-8 items-center gap-1 rounded-lg border border-[#edf1f6] bg-white px-3 ${buttonWeight} text-[#64748b] disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <FiChevronLeft size={14} />
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 rounded-lg text-[12px] ${pageWeight} transition ${
                currentPage === page
                  ? "bg-[#AAB700] text-white"
                  : "border border-[#edf1f6] bg-white text-[#64748b] hover:bg-[#f8fafc]"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex h-8 items-center gap-1 rounded-lg border border-[#edf1f6] bg-white px-3 ${buttonWeight} text-[#64748b] disabled:cursor-not-allowed disabled:opacity-40`}
        >
          Next
          <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}