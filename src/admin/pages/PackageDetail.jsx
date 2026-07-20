import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiImage } from "react-icons/fi";

import { getPackageById } from "../../services/packageService";

import PackageDetailToolbar from "../components/PackageDetailToolbar";
import PackageDetailSummaryCard from "../components/PackageDetailSummaryCard";
import PackageDetailInfoGrid from "../components/PackageDetailInfoGrid";
import PackageDetailOverview from "../components/PackageDetailOverview";
import PackageDetailIncludes from "../components/PackageDetailIncludes";
import PackageDetailSchedule from "../components/PackageDetailSchedule";


function getPackageStatus(packageItem) {
  if (packageItem.participants >= 22) {
    return "High Demand";
  }

  if (packageItem.participants <= 16) {
    return "Limited";
  }

  return "Available";
}

export default function PackageDetail() {
  const { packageId } = useParams();

  const [packageItem, setPackageItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPackage() {
      if (
        !packageId ||
        packageId === "undefined" ||
        packageId === "null"
      ) {
        setError("ID package tidak valid.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getPackageById(packageId);

        if (active) {
          setPackageItem(data);
        }
      } catch (err) {
        console.error(
          "GET PACKAGE DETAIL ERROR:",
          err.response?.data || err
        );

        if (active) {
          setError(
            err.response?.data?.message ||
              "Package tidak ditemukan."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPackage();

    return () => {
      active = false;
    };
  }, [packageId]);

  if (loading) {
    return (
      <div className="rounded-[20px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <p className="text-[14px] text-[#64748b]">
          Memuat detail package...
        </p>
      </div>
    );
  }

  if (error || !packageItem) {
    return (
      <div className="rounded-[20px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#AAB700]/10 text-[#AAB700]">
          <FiImage size={24} />
        </div>

        <h1 className="mt-5 text-[24px] font-extrabold text-[#111827]">
          Package Not Found
        </h1>

        <p className="mt-2 text-[13px] text-[#64748b]">
          {error ||
            `Package dengan ID ${packageId} tidak ditemukan.`}
        </p>

        <Link
          to="/admin/packages"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500]"
        >
          Back to Packages
        </Link>
      </div>
    );
  }

  const status = getPackageStatus(packageItem);

  return (
    <div className="space-y-5">
      <PackageDetailToolbar
        packageItem={packageItem}
      />

      <PackageDetailSummaryCard
        packageItem={packageItem}
        status={status}
      />

      <PackageDetailInfoGrid
        packageItem={packageItem}
      />

      <PackageDetailOverview
        packageItem={packageItem}
      />

      <PackageDetailIncludes
        includes={packageItem.includes}
      />

      <PackageDetailSchedule
        schedule={packageItem.schedule}
      />
    </div>
  );
}