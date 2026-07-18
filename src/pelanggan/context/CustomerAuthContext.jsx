import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  const [customer, setCustomer] = useState(() => getStoredCustomer());
  const [loading, setLoading] = useState(() =>
    Boolean(getCustomerToken() && !getStoredCustomer())
  );
  const refreshRequestRef = useRef(null);

  const refreshSession = useCallback(async ({ blocking = false } = {}) => {
    const token = getCustomerToken();
    const storedCustomer = getStoredCustomer();

    if (!token) {
      setCustomer(null);
      setLoading(false);
      return null;
    }

    // Tampilkan sesi tersimpan seketika. Validasi server berjalan di belakang
    // sehingga reload tidak tertahan oleh request /customer/me.
    if (storedCustomer) {
      setCustomer(storedCustomer);
    }

    if (blocking || !storedCustomer) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (refreshRequestRef.current) {
      return refreshRequestRef.current;
    }

    refreshRequestRef.current = getCurrentCustomer()
      .then((currentCustomer) => {
        if (currentCustomer) {
          setCustomer(currentCustomer);
        }
        return currentCustomer;
      })
      .catch((error) => {
        console.error("Sesi pelanggan tidak valid:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          clearCustomerSession();
          setCustomer(null);
        }

        return null;
      })
      .finally(() => {
        refreshRequestRef.current = null;
        setLoading(false);
      });

    return refreshRequestRef.current;
  }, []);

  useEffect(() => {
    refreshSession({ blocking: !getStoredCustomer() });
  }, [refreshSession]);

  useEffect(() => {
    function handleAuthChange() {
      const storedCustomer = getStoredCustomer();
      setCustomer(storedCustomer);
      refreshSession({ blocking: !storedCustomer });
    }

    function handleStorage(event) {
      if (event.key === "accessToken" || event.key === "currentCustomer") {
        handleAuthChange();
      }
    }

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      customer,
      loading,
      isAuthenticated: Boolean(customer && getCustomerToken()),
      refreshSession,
      setCustomer,
    }),
    [customer, loading, refreshSession]
  );

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);

  if (!context) {
    throw new Error("useCustomerAuth harus digunakan di dalam CustomerAuthProvider.");
  }

  return context;
}
