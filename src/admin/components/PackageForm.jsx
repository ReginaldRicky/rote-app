import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi";

import PackageBasicInfo from "./PackageBasicInfo";
import PackageImageSection from "./PackageImageSection";
import PackageIncludesSection from "./PackageIncludesSection";
import PackageScheduleSection from "./PackageScheduleSection";
import { validatePackageFormData } from "./packageFormUtils";
import { useToast } from "../../components/useToast";

export default function PackageForm({
  formData,
  setFormData,
  backTo,
  backLabel,
  title,
  subtitle,
  cancelTo,
  submitLabel,
  onSubmit,
  saving = false,
}) {

  const { warning } = useToast();

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function updateInclude(index, value) {
    setFormData((current) => {
      const nextIncludes = [...current.includes];
      nextIncludes[index] = value;
      return { ...current, includes: nextIncludes };
    });
  }

  function addInclude() {
    setFormData((current) => ({ ...current, includes: [...current.includes, ""] }));
  }

  function removeInclude(index) {
    setFormData((current) => ({
      ...current,
      includes: current.includes.length > 1 ? current.includes.filter((_, itemIndex) => itemIndex !== index) : [""],
    }));
  }

  function updateSchedule(index, field, value) {
    setFormData((current) => {
      const nextSchedule = [...current.schedule];
      nextSchedule[index] = { ...nextSchedule[index], [field]: value };
      return { ...current, schedule: nextSchedule };
    });
  }

  function addSchedule() {
    setFormData((current) => ({
      ...current,
      schedule: [
        ...current.schedule,
        { day: `Day ${current.schedule.length + 1}`, dayNumber: current.schedule.length + 1, title: "", activity: "", evening: "" },
      ],
    }));
  }

  function removeSchedule(index) {
    setFormData((current) => ({
      ...current,
      schedule:
        current.schedule.length > 1
          ? current.schedule.filter((_, itemIndex) => itemIndex !== index)
          : [{ day: "Day 1", dayNumber: 1, title: "", activity: "", evening: "" }],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validatePackageFormData(formData);
    if (validationError) {
      warning(validationError);
      return;
    }
    onSubmit(formData);
  }

  
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to={backTo} className="inline-flex items-center gap-2 text-[13px] font-bold text-[#64748b] transition hover:text-[#AAB700]">
            <FiArrowLeft size={16} />
            {backLabel}
          </Link>

          <h1 className="mt-3 text-[24px] font-extrabold text-[#111827]">{title}</h1>
          <p className="mt-1 text-[13px] text-[#94a3b8]">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to={cancelTo} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-5 text-[13px] font-bold text-[#64748b] transition hover:bg-[#f8fafc]">
            <FiX size={15} />
            Cancel
          </Link>

          <button type="submit" disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#AAB700] px-5 text-[13px] font-bold text-white transition hover:bg-[#98a500] disabled:opacity-60">
            <FiSave size={15} />
            {submitLabel}
          </button>
        </div>
      </div>

      <PackageBasicInfo formData={formData} updateField={updateField} />
      <PackageImageSection formData={formData} updateField={updateField} />

      <PackageIncludesSection includes={formData.includes} updateInclude={updateInclude} addInclude={addInclude} removeInclude={removeInclude} />
      <PackageScheduleSection schedule={formData.schedule} updateSchedule={updateSchedule} addSchedule={addSchedule} removeSchedule={removeSchedule} />
    </form>
  );
}
