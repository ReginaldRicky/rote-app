import { Link } from "react-router-dom";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";

export default function PackageDetailToolbar({ packageItem }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <Link
          to="/admin/packages"
          className="inline-flex items-center gap-2 text-[13px] font-bold text-[#64748b] transition hover:text-[#AAB700]"
        >
          <FiArrowLeft size={16} />
          Back to Packages
        </Link>

        <h1 className="mt-3 text-[24px] font-extrabold text-[#111827]">
          Package Detail
        </h1>

        <p className="mt-1 text-[13px] text-[#94a3b8]">
          Manage package information, includes, and daily schedule.
        </p>
      </div>

      <Link
        to={`/admin/packages/${packageItem.id}/edit`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500]"
      >
        <FiEdit2 size={15} />
        Edit Package
      </Link>
    </div>
  );
}