import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PackageForm from "../components/PackageForm";
import { cleanPackageFormData, createEmptyPackageForm } from "../components/packageFormUtils";
import { createPackage } from "../../services/packageService";

export default function PackageAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(createEmptyPackageForm);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(data) {
    try {
      setSaving(true);
      await createPackage(cleanPackageFormData(data));
      alert("Package berhasil dibuat.");
      navigate("/admin/packages");
    } catch (err) {
      console.error("CREATE PACKAGE ERROR:", err.response?.data || err);
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        alert(Object.values(validationErrors)[0]?.[0] || "Data package tidak valid.");
        return;
      }
      alert(err.response?.data?.message || "Package gagal dibuat.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PackageForm
      formData={formData}
      setFormData={setFormData}
      backTo="/admin/packages"
      backLabel="Back to Packages"
      title="Add New Package"
      subtitle="Create a travel package with upload image, includes, and daily schedule."
      cancelTo="/admin/packages"
      submitLabel={saving ? "Saving..." : "Save Package"}
      saving={saving}
      onSubmit={handleSubmit}
    />
  );
}
