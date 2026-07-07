import { Link } from "react-router-dom";

export default function TravelPackageCard({ item }) {
  const detailUrl = item?.id ? `/admin/packages/${item.id}` : "/admin/packages";

  return (
    <article className="bg-white rounded-[14px] p-2.5 shadow-sm">
      <Link to={detailUrl} className="relative block rounded-[12px] overflow-hidden mb-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[145px] object-cover"
          />
        ) : (
          <div className="flex h-[145px] items-center justify-center bg-gradient-to-br from-[#181e4b] to-[#AAB700] px-4 text-center text-white font-bold">
            {item.title}
          </div>
        )}

        <span className="absolute top-2 left-2 bg-[#AAB700]/10 text-[#AAB700] text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur bg-white/80">
          {item.badge || `${item.participant_limit || item.participants || 0} pax`}
        </span>
      </Link>

      <h3 className="text-[14px] font-bold text-[#111827] leading-5">
        {item.title}
      </h3>

      <p className="text-[11px] text-[#8a94a6] mt-1">
        {item.meta || `${item.location || "-"} • ${item.duration || "Flexible"}`}
      </p>

      <div className="flex items-end justify-between mt-3 gap-3">
        <div>
          <p className="text-[20px] font-bold text-[#AAB700] leading-none">
            {item.price}
          </p>

          <span className="text-[10px] text-[#9aa5b1]">
            per person
          </span>
        </div>

        <Link
          to={detailUrl}
          className="bg-[#AAB700] hover:bg-[#98a500] text-white text-[11px] font-semibold px-4 py-2 rounded-lg transition whitespace-nowrap"
        >
          See Detail
        </Link>
      </div>
    </article>
  );
}
