export function parseNumericValue(value, fallback = 0) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  let normalized = String(value)
    .trim()
    .replace(/[^0-9,.-]/g, "");

  if (!normalized) return fallback;

  const negative = normalized.startsWith("-");
  normalized = normalized.replace(/-/g, "");

  const commaCount = (normalized.match(/,/g) || []).length;
  const dotCount = (normalized.match(/\./g) || []).length;

  if (commaCount > 0 && dotCount > 0) {
    const lastComma = normalized.lastIndexOf(",");
    const lastDot = normalized.lastIndexOf(".");
    const decimalSeparator = lastComma > lastDot ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? "." : ",";

    normalized = normalized.split(thousandsSeparator).join("");
    normalized = normalized.replace(decimalSeparator, ".");
  } else if (commaCount > 0 || dotCount > 0) {
    const separator = commaCount > 0 ? "," : ".";
    const parts = normalized.split(separator);

    if (parts.length > 2) {
      // Contoh: 1.500.000 atau 1,500,000.
      normalized = parts.join("");
    } else {
      const integerPart = parts[0] || "0";
      const fractionPart = parts[1] || "";

      // Tiga digit setelah separator lebih umum berarti pemisah ribuan pada nilai rupiah.
      normalized = fractionPart.length === 3
        ? `${integerPart}${fractionPart}`
        : `${integerPart}.${fractionPart}`;
    }
  }

  const parsed = Number(`${negative ? "-" : ""}${normalized}`);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formatIDR(value) {
  const number = parseNumericValue(value, 0);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

export function formatNumber(value) {
  const number = parseNumericValue(value, 0);

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(number);
}

export function formatDateID(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
