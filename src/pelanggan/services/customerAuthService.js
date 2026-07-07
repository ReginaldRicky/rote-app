import api from "../../lib/api";

const TOKEN_KEY = "accessToken";
const CUSTOMER_KEY = "currentCustomer";

function saveCustomerSession(token, customer) {
  const displayName =
    customer?.nama ||
    customer?.name ||
    "";

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    CUSTOMER_KEY,
    JSON.stringify(customer)
  );

  localStorage.setItem(
    "currentUserId",
    String(customer.id)
  );

  localStorage.setItem(
    "username",
    displayName
  );

  localStorage.setItem(
    "email",
    customer.email || ""
  );
}

export async function registerCustomer(payload) {
  const response = await api.post(
    "/customer/register",
    payload
  );

  return response.data;
}

export async function loginCustomer(payload) {
  const response = await api.post(
    "/customer/login",
    payload
  );

  const data = response.data?.data;
  const token = data?.token;
  const customer = data?.pelanggan;

  if (!token || !customer) {
    throw new Error(
      "Respons login dari server tidak lengkap."
    );
  }

  saveCustomerSession(
    token,
    customer
  );

  window.dispatchEvent(
    new Event("auth-change")
  );

  return customer;
}

export async function getCurrentCustomer() {
  const response = await api.get(
    "/customer/me"
  );

  const customer =
    response.data?.data?.pelanggan;

  if (customer) {
    localStorage.setItem(
      CUSTOMER_KEY,
      JSON.stringify(customer)
    );
  }

  return customer;
}

export function getStoredCustomer() {
  try {
    return JSON.parse(
      localStorage.getItem(CUSTOMER_KEY)
    );
  } catch {
    return null;
  }
}

export function getCustomerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isCustomerAuthenticated() {
  return Boolean(getCustomerToken());
}

export async function logoutCustomer() {
  try {
    if (getCustomerToken()) {
      await api.post("/customer/logout");
    }
  } finally {
    clearCustomerSession();
  }
}

export function clearCustomerSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("currentCustomer");
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("avatar");

  window.dispatchEvent(
    new Event("auth-change")
  );
}
export async function verifyResetEmail(email) {
  const response = await api.post(
    "/forgot-password/verify",
    { email }
  );

  return response.data?.data || response.data;
}

export async function resetPassword(payload) {
  const response = await api.post(
    "/forgot-password/reset",
    payload
  );

  return response.data;
}
