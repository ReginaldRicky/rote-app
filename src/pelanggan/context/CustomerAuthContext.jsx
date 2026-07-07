import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  clearCustomerSession,
  getCurrentCustomer,
  getCustomerToken,
  getStoredCustomer,
} from "../services/customerAuthService";

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(() =>
    getStoredCustomer()
  );

  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const token = getCustomerToken();

    if (!token) {
      setCustomer(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const currentCustomer =
        await getCurrentCustomer();

      setCustomer(currentCustomer);
    } catch (error) {
      console.error(
        "Sesi pelanggan tidak valid:",
        error
      );

      clearCustomerSession();
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    function handleAuthChange() {
      refreshSession();
    }

    function handleStorage(event) {
      if (
        event.key === "accessToken" ||
        event.key === "currentCustomer"
      ) {
        refreshSession();
      }
    }

    window.addEventListener(
      "auth-change",
      handleAuthChange
    );

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      customer,
      loading,
      isAuthenticated: Boolean(customer),
      refreshSession,
      setCustomer,
    }),
    [
      customer,
      loading,
      refreshSession,
    ]
  );

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(
    CustomerAuthContext
  );

  if (!context) {
    throw new Error(
      "useCustomerAuth harus digunakan di dalam CustomerAuthProvider."
    );
  }

  return context;
}