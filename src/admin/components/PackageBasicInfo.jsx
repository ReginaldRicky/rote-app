import PackageFormField from "./PackageFormField";
import { inputClass, textareaClass, getTodayDate } from "./packageFormUtils";
import { formatIDR } from "../../utils/formatter";

export default function PackageBasicInfo({ formData, updateField }) {
  const today = getTodayDate();

  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="border-b border-[#edf1f6] pb-4">
        <h2 className="text-[16px] font-extrabold text-[#111827]">Basic Information</h2>
        <p className="mt-1 text-[12px] text-[#94a3b8]">
          Fill the package information that will be shown on customer, admin, and calendar pages.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PackageFormField label="Package Title">
          <input type="text" value={formData.title} onChange={(event) => updateField("title", event.target.value)} className={inputClass} placeholder="Example: Bali Beach Escape" required />
        </PackageFormField>

        <PackageFormField label="Location">
          <input type="text" value={formData.location} onChange={(event) => updateField("location", event.target.value)} className={inputClass} placeholder="Example: Bali, Indonesia" required />
        </PackageFormField>

        <PackageFormField label="Start Date">
          <input type="date" value={formData.startDate} onChange={(event) => updateField("startDate", event.target.value)} className={inputClass} min={today} required />
        </PackageFormField>

        <PackageFormField label="End Date">
          <input type="date" value={formData.endDate} onChange={(event) => updateField("endDate", event.target.value)} className={inputClass} min={formData.startDate || today} required />
        </PackageFormField>

        <PackageFormField label="Price">
          <input type="number" value={formData.priceAmount} onChange={(event) => updateField("priceAmount", event.target.value)} className={inputClass} min="0" placeholder="Contoh: 1000000" required />
          {formData.priceAmount ? (
            <p className="mt-2 text-[12px] font-bold text-[#AAB700]">Preview: {formatIDR(formData.priceAmount)}</p>
          ) : null}
        </PackageFormField>

        <PackageFormField label="Participant Limit">
          <input type="number" value={formData.participants} onChange={(event) => updateField("participants", event.target.value)} className={inputClass} min="1" required />
        </PackageFormField>
      </div>

      <div className="mt-4">
        <PackageFormField label="Description">
          <textarea value={formData.description} onChange={(event) => updateField("description", event.target.value)} className={textareaClass} placeholder="Write package description..." required />
        </PackageFormField>
      </div>
    </section>
  );
}
