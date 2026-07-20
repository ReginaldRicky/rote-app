import { formatIDR, parseNumericValue } from "../../utils/formatter";

export const inputClass =
  "h-11 w-full rounded-xl border border-[#e2e8f0] bg-white px-4 text-[13px] font-medium text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10";

export const textareaClass =
  "min-h-[120px] w-full resize-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-[13px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#AAB700] focus:ring-4 focus:ring-[#AAB700]/10";

export function getTodayDate() {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60_000;
  return new Date(currentDate.getTime() - timezoneOffset).toISOString().split("T")[0];
}

export function createEmptyPackageForm() {
  return {
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    priceAmount: "",
    currency: "IDR",
    participants: 1,
    image: "",
    thumbnail: "",
    imageFile: null,
    previewImage: "",
    description: "",
    includes: [""],
    schedule: [
      {
        day: "Day 1",
        title: "",
        activity: "",
        evening: "",
      },
    ],
    isPublished: true,
  };
}

export function parsePrice(price = "") {
  return String(parseNumericValue(price, 0));
}

export function formatPrice(value) {
  return formatIDR(value);
}

export function getDurationFromDates(startDate, endDate, fallback = "") {
  if (!startDate || !endDate) return fallback;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return fallback;
  }

  const diffTime = end.getTime() - start.getTime();
  const days = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
  const nights = Math.max(0, days - 1);

  if (days === 1) return "1 Day";
  return `${days} Days / ${nights} Nights`;
}

export function toPackageFormData(packageItem) {
  return {
    id: packageItem.id,
    title: packageItem.title || "",
    location: packageItem.location || "",
    startDate: packageItem.startDate || "",
    endDate: packageItem.endDate || "",
    priceAmount: String(packageItem.priceValue ?? packageItem.rawPrice ?? parsePrice(packageItem.price) ?? ""),
    currency: packageItem.currency || "IDR",
    participants: packageItem.participants || packageItem.participant_limit || 1,
    image: packageItem.image || "",
    thumbnail: packageItem.thumbnail || packageItem.image || "",
    imageFile: null,
    previewImage: packageItem.thumbnail || packageItem.image || "",
    description: packageItem.description || "",
    includes: packageItem.includes?.length ? [...packageItem.includes] : [""],
    schedule: packageItem.schedule?.length
      ? packageItem.schedule.map((item, index) => ({
          day: item.day || `Day ${item.dayNumber || index + 1}`,
          dayNumber: item.dayNumber || index + 1,
          title: item.title || "",
          activity: item.activity || "",
          evening: item.evening || "",
        }))
      : [
          {
            day: "Day 1",
            title: "",
            activity: "",
            evening: "",
          },
        ],
    isPublished: packageItem.isPublished ?? true,
  };
}

export function validatePackageFormData(formData) {
  const today = getTodayDate();

  if (!formData.title.trim()) return "Package title wajib diisi.";
  if (!formData.location.trim()) return "Location wajib diisi.";
  if (!formData.startDate) return "Start date wajib diisi.";
  if (!formData.endDate) return "End date wajib diisi.";
  if (formData.startDate < today) return "Start date tidak boleh sebelum hari ini.";
  if (formData.endDate < formData.startDate) return "End date tidak boleh sebelum start date.";
  if (formData.priceAmount === "" || parseNumericValue(formData.priceAmount, -1) < 0) return "Price wajib diisi dengan benar.";
  if (!formData.participants || Number(formData.participants) < 1) return "Participant limit minimal 1.";

  return "";
}

export function cleanPackageFormData(formData) {
  return {
    title: formData.title.trim(),
    location: formData.location.trim(),
    startDate: formData.startDate,
    endDate: formData.endDate,
    priceValue: parseNumericValue(formData.priceAmount, 0),
    currency: formData.currency || "IDR",
    participants: Number(formData.participants || 1),
    imageFile: formData.imageFile || null,
    description: formData.description.trim(),
    includes: formData.includes.map((item) => item.trim()).filter(Boolean),
    schedule: formData.schedule
      .map((item, index) => ({
        dayNumber: Number(item.dayNumber || String(item.day || "").replace(/[^0-9]/g, "") || index + 1),
        day: item.day || `Day ${index + 1}`,
        title: item.title.trim(),
        activity: item.activity.trim(),
        evening: (item.evening || "").trim(),
      }))
      .filter((item) => item.title || item.activity || item.evening),
    isPublished: formData.isPublished ?? true,
  };
}
