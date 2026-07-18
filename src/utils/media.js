import { getApiOrigin } from "../lib/api";

function isLocalHostname(hostname = "") {
  return ["localhost", "127.0.0.1", "::1"].includes(String(hostname).toLowerCase());
}

export function resolveMediaUrl(value) {
  if (!value) return "";

  const mediaValue = String(value).trim();
  if (!mediaValue) return "";

  const apiOrigin = getApiOrigin();

  try {
    if (/^https?:\/\//i.test(mediaValue)) {
      const parsed = new URL(mediaValue);

      // Perbaiki URL lama yang tersimpan memakai localhost milik komputer pembuat data.
      if (parsed.pathname.includes("/storage/") && isLocalHostname(parsed.hostname) && apiOrigin) {
        return new URL(`${parsed.pathname}${parsed.search}`, apiOrigin).toString();
      }

      return parsed.toString();
    }

    if (mediaValue.startsWith("/storage/")) {
      return apiOrigin ? new URL(mediaValue, apiOrigin).toString() : mediaValue;
    }

    if (mediaValue.startsWith("storage/")) {
      const path = `/${mediaValue}`;
      return apiOrigin ? new URL(path, apiOrigin).toString() : path;
    }

    if (mediaValue.startsWith("packages/") || mediaValue.startsWith("admins/")) {
      const path = `/storage/${mediaValue}`;
      return apiOrigin ? new URL(path, apiOrigin).toString() : path;
    }

    return mediaValue;
  } catch {
    return mediaValue;
  }
}
