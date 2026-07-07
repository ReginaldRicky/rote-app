import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import PackageForm from "../components/PackageForm";
import {
  cleanPackageFormData,
  toPackageFormData,
} from "../components/packageFormUtils";

import {
  getPackageById,
  updatePackage,
} from "../../services/packageService";

export default function PackageEdit() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [packageItem, setPackageItem] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPackage() {
      try {
        setLoading(true);
        setError("");

        const data = await getPackageById(packageId);

        if (!data) {
          throw new Error("Package tidak ditemukan.");
        }

        if (active) {
          setPackageItem(data);
          setFormData(toPackageFormData(data));
        }
      } catch (err) {
        console.error(
          "GET PACKAGE ERROR:",
          err.response?.data || err
        );

        if (active) {
          setError(
            err.response?.data?.message ||
              err.message ||
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

  async function handleSubmit(data) {
    try {
      setSaving(true);

      const payload = cleanPackageFormData(data);

      await updatePackage(packageId, payload);

      alert("Package berhasil diperbarui.");

      navigate(`/admin/packages/${packageId}`);
    } catch (err) {
      console.error(
        "UPDATE PACKAGE ERROR:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
          "Package gagal diperbarui."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[900px] rounded-[20px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <p className="text-[14px] text-[#64748b]">
          Memuat data package...
        </p>
      </div>
    );
  }

  if (error || !packageItem || !formData) {
    return (
      <div className="mx-auto max-w-[900px] rounded-[20px] border border-[#e7edf4] bg-white p-8 text-center shadow-sm">
        <h1 className="text-[24px] font-extrabold text-[#111827]">
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

  return (
    <PackageForm
      formData={formData}
      setFormData={setFormData}
      backTo={`/admin/packages/${packageId}`}
      backLabel="Back to Detail"
      title="Edit Package"
      subtitle="Update package information, trip date, image, includes, and daily schedule."
      cancelTo={`/admin/packages/${packageId}`}
      submitLabel={
        saving ? "Saving..." : "Save Changes"
      }
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}