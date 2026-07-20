import {
  getCustomerTourById,
  getCustomerTours,
} from "../../services/packageService";
import { parseNumericValue } from "../../utils/formatter";

export async function getTours() {
  return getCustomerTours();
}

export async function getTourById(id) {
  return getCustomerTourById(id);
}

export function parsePrice(price = "") {
  return parseNumericValue(price, 0);
}

export function formatUSD(value) {
  const amount = Number(value || 0);

  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}