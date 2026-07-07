import api from "../lib/api";
import { formatIDR } from "../utils/formatter";

function normalizeIncludes(includes) {
  if (!Array.isArray(includes)) return [];

  return includes
    .map((item) => {
      if (typeof item === "string") return item;
      return item?.item_name || item?.name || "";
    })
    .filter(Boolean);
}

function normalizeSchedules(schedules) {
  if (!Array.isArray(schedules)) return [];

  return schedules.map((item, index) => ({
    id: item.id,
    packageId: item.package_id ?? item.packageId,
    dayNumber: Number(item.day_number ?? item.dayNumber ?? index + 1),
    day: `Day ${Number(item.day_number ?? item.dayNumber ?? index + 1)}`,
    title: item.title || "",
    activity: item.activity || "",
    evening: item.evening || "",
  }));
}

export function normalizePackage(item = {}) {
  const priceValue = Number(item.price ?? item.priceValue ?? 0);
  const participants = Number(item.participant_limit ?? item.participants ?? 0);
  const schedules = normalizeSchedules(item.schedules || item.schedule || []);
  const includes = normalizeIncludes(item.includes || []);

  return {
    id: item.id,
    title: item.title || "",
    location: item.location || "",
    description: item.description || "",
    startDate: item.start_date ? String(item.start_date).slice(0, 10) : item.startDate || "",
    endDate: item.end_date ? String(item.end_date).slice(0, 10) : item.endDate || "",
    start_date: item.start_date || item.startDate || "",
    end_date: item.end_date || item.endDate || "",
    duration: item.duration || "",
    priceValue,
    price: formatIDR(priceValue),
    rawPrice: priceValue,
    currency: item.currency || "IDR",
    participants,
    participant_limit: participants,
    rating: Number(item.rating || 0),
    image: item.image || "",
    thumbnail: item.thumbnail || item.image || "",
    includes,
    schedule: schedules,
    schedules,
    isPublished: Boolean(item.is_published ?? item.isPublished ?? true),
    is_published: Boolean(item.is_published ?? item.isPublished ?? true),
    category: "TRAVEL PACKAGE",
    reviews: Number(item.reviews_count ?? item.reviews ?? 0),
    transport: "Transport Included",
    plan: `${participants} participants`,
    createdAt: item.created_at || "",
    updatedAt: item.updated_at || "",
  };
}

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

function authHeaders() {
  const token = getAdminToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }
    : {
        Accept: "application/json",
      };
}

function appendIfPresent(formData, key, value) {
  if (value !== undefined && value !== null) {
    formData.append(key, value);
  }
}

export function toMultipartPackagePayload(data) {
  if (data instanceof FormData) return data;

  const formData = new FormData();
  const schedules = data.schedules || data.schedule || [];
  const includes = Array.isArray(data.includes) ? data.includes : [];

  appendIfPresent(formData, "title", data.title || "");
  appendIfPresent(formData, "location", data.location || "");
  appendIfPresent(formData, "description", data.description || "");
  appendIfPresent(formData, "start_date", data.startDate || data.start_date || "");
  appendIfPresent(formData, "end_date", data.endDate || data.end_date || "");
  appendIfPresent(formData, "price", Number(data.priceValue ?? data.rawPrice ?? data.priceAmount ?? data.price ?? 0));
  appendIfPresent(formData, "currency", data.currency || "IDR");
  appendIfPresent(formData, "participant_limit", Number(data.participants ?? data.participant_limit ?? 0));
  appendIfPresent(formData, "rating", Number(data.rating ?? 0));
  appendIfPresent(formData, "is_published", data.isPublished ?? data.is_published ?? true ? "1" : "0");

  if (data.imageFile instanceof File) {
    formData.append("image", data.imageFile);
  }

  includes
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .forEach((item, index) => {
      formData.append(`includes[${index}]`, item);
    });

  schedules
    .filter((item) => item && (item.title || item.activity || item.evening || item.day || item.dayNumber))
    .forEach((item, index) => {
      const dayNumber = Number(item.day_number ?? item.dayNumber ?? String(item.day || "").replace(/[^0-9]/g, "") ?? index + 1) || index + 1;
      formData.append(`schedules[${index}][day_number]`, dayNumber);
      formData.append(`schedules[${index}][title]`, item.title || `Day ${dayNumber}`);
      formData.append(`schedules[${index}][activity]`, [item.activity, item.evening].filter(Boolean).join("\n"));
    });

  return formData;
}

export async function getPackages() {
  const response = await api.get("/packages", { headers: authHeaders() });
  const items = Array.isArray(response.data?.data)
    ? response.data.data
    : Array.isArray(response.data)
    ? response.data
    : [];

  return items.map(normalizePackage);
}

export async function getPackageById(packageId) {
  const response = await api.get(`/packages/${packageId}`, { headers: authHeaders() });
  const item = response.data?.data || response.data;
  return item ? normalizePackage(item) : null;
}

export async function createPackage(data) {
  const payload = toMultipartPackagePayload(data);
  const response = await api.post("/admin/packages", payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function updatePackage(packageId, data) {
  const payload = toMultipartPackagePayload(data);
  const response = await api.post(`/admin/packages/${packageId}?_method=PUT`, payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deletePackage(packageId) {
  const response = await api.delete(`/admin/packages/${packageId}`, {
    headers: authHeaders(),
  });

  return response.data;
}

export async function getCustomerTours() {
  return getPackages();
}

export async function getCustomerTourById(id) {
  try {
    return await getPackageById(id);
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}
