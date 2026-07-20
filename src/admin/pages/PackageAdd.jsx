import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PackageForm from "../components/PackageForm";
import { cleanPackageFormData, createEmptyPackageForm } from "../components/packageFormUtils";
import { createPackage } from "../../services/packageService";
import { useToast } from "../../components/useToast";

export default function PackageAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(createEmptyPackageForm);
  const [saving, setSaving] = useState(false);
  const { success, error: showError } = useToast();

  async function handleSubmit(data) {
    try {
      setSaving(true);
      await createPackage(cleanPackageFormData(data));
      success("Package berhasil dibuat.");
      navigate("/admin/packages");
    } catch (err) {
      console.error("CREATE PACKAGE ERROR:", err.response?.data || err);
      const validationErrors = err.response?.data?.errors;
      if (validationErrors) {
        alert(Object.values(validationErrors)[0]?.[0] || "Data package tidak valid.");
        return;
      }
      showError(err.response?.data?.message || "Package gagal dibuat.");
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
