import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import TravelPackageCard from "./TravelPackageCard";

function sortItems(items, mode) {
  const sorted = [...items];

  if (mode === "popular") {
    return sorted.sort((a, b) => Number(b.reviews || b.rating || 0) - Number(a.reviews || a.rating || 0));
  }

  if (mode === "price-low") {
    return sorted.sort((a, b) => Number(a.priceValue || 0) - Number(b.priceValue || 0));
  }

  return sorted.sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0));
}

export default function TravelPackagesSection({ items = [] }) {
  const [mode, setMode] = useState("latest");

  const visibleItems = useMemo(() => {
    return sortItems(items, mode).slice(0, 3);
  }, [items, mode]);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-bold text-[#111827]">
          Travel Packages
        </h2>

        <div className="flex items-center gap-2">
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="h-8 rounded-lg border border-[#e5edf5] bg-white px-3 text-[11px] font-semibold text-[#111827] outline-none"
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
            <option value="price-low">Cheapest</option>
          </select>

          <Link
            to="/admin/packages"
            className="h-8 px-3 rounded-lg border border-[#e5edf5] bg-white text-[11px] font-semibold text-[#111827] inline-flex items-center"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="bg-[#AAB700]/10 rounded-[16px] p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {visibleItems.map((item) => (
            <TravelPackageCard key={item.id || item.title} item={item} />
          ))}

          {visibleItems.length === 0 && (
            <div className="col-span-full rounded-xl bg-white p-5 text-center text-sm text-[#64748b]">
              Belum ada package. Tambahkan package baru dari menu Packages.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
