import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiX,
} from "react-icons/fi";

import { ToastContext } from "./toastContext";

const TOAST_META = {
  success: {
    label: "Berhasil",
    icon: FiCheckCircle,
  },
  error: {
    label: "Gagal",
    icon: FiAlertCircle,
  },
  warning: {
    label: "Perhatian",
    icon: FiAlertTriangle,
  },
  info: {
    label: "Informasi",
    icon: FiInfo,
  },
};

function ToastItem({ toast, onClose }) {
  const meta = TOAST_META[toast.type] || TOAST_META.info;
  const Icon = meta.icon;

  return (
    <div
      className={`app-toast app-toast-${toast.type}`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      <div className="app-toast-icon">
        <Icon size={19} />
      </div>

      <div className="app-toast-content">
        <strong>{toast.title || meta.label}</strong>
        <p>{toast.message}</p>
      </div>

      <button
        type="button"
        className="app-toast-close"
        onClick={() => onClose(toast.id)}
        aria-label="Tutup notifikasi"
      >
        <FiX size={17} />
      </button>

      <span
        className="app-toast-progress"
        style={{ animationDuration: `${toast.duration}ms` }}
      />
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id)
    );

    const timer = timersRef.current.get(id);

    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, options = {}) => {
      const id = `${Date.now()}-${Math.random()}`;
      const duration = options.duration || 4200;

      const toast = {
        id,
        message: String(message || "Terjadi sesuatu."),
        title: options.title || "",
        type: options.type || "info",
        duration,
      };

      setToasts((current) => [...current, toast]);

      const timer = window.setTimeout(() => {
        removeToast(id);
      }, duration);

      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = {
    showToast,

    success: (message, options = {}) =>
      showToast(message, { ...options, type: "success" }),

    error: (message, options = {}) =>
      showToast(message, { ...options, type: "error" }),

    warning: (message, options = {}) =>
      showToast(message, { ...options, type: "warning" }),

    info: (message, options = {}) =>
      showToast(message, { ...options, type: "info" }),

    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="app-toast-viewport"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}