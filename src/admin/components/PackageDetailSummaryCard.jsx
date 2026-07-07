import {
  FiClock,
  FiImage,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { formatIDR } from "../../utils/formatter";
import PackageStatusBadge from "./PackageStatusBadge";

export default function PackageDetailSummaryCard({ packageItem, status }) {
  const imageSource = packageItem.thumbnail || packageItem.image;

  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[190px_minmax(0,1fr)_240px]">
        <div className="overflow-hidden rounded-[16px] bg-[#f8fafc]">
          {imageSource ? (
            <img
              src={imageSource}
              alt={packageItem.title}
              className="h-[150px] w-full object-cover xl:h-full"
            />
          ) : (
            <div className="flex h-[150px] items-center justify-center text-[#94a3b8] xl:h-full">
              <FiImage size={28} />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <PackageStatusBadge status={status} />

            <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-[11px] font-bold text-[#64748b]">
              ID #{packageItem.id}
            </span>
          </div>

          <h2 className="mt-3 text-[22px] font-extrabold leading-tight text-[#111827]">
            {packageItem.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-[#64748b]">
            {packageItem.description || "No description available."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafc] px-3 py-1.5 text-[11px] font-semibold text-[#64748b]">
              <FiMapPin size={12} className="text-[#AAB700]" />
              {packageItem.location}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafc] px-3 py-1.5 text-[11px] font-semibold text-[#64748b]">
              <FiClock size={12} className="text-[#AAB700]" />
              {packageItem.duration}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafc] px-3 py-1.5 text-[11px] font-semibold text-[#64748b]">
              <FiUsers size={12} className="text-[#AAB700]" />
              {packageItem.participants} travelers
            </span>
          </div>
        </div>

        <div className="rounded-[16px] border border-[#edf1f6] bg-[#fbfcf2] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
            Price
          </p>

          <h3 className="mt-2 text-[26px] font-extrabold text-[#AAB700]">
            {formatIDR(packageItem.price)}
          </h3>

          <p className="text-[11px] text-[#94a3b8]">
            per person
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3">
              <div className="flex items-center gap-1.5">
                <FiStar
                  size={13}
                  fill="currentColor"
                  className="text-[#facc15]"
                />

                <p className="text-[13px] font-extrabold text-[#111827]">
                  {packageItem.rating}
                </p>
              </div>

              <p className="mt-1 text-[10px] text-[#94a3b8]">
                Rating
              </p>
            </div>

            <div className="rounded-xl bg-white p-3">
              <p className="text-[13px] font-extrabold text-[#111827]">
                {packageItem.schedule?.length || 0}
              </p>

              <p className="mt-1 text-[10px] text-[#94a3b8]">
                Days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}