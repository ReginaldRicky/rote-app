import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CustomerAuthProvider } from "./pelanggan/context/CustomerAuthContext";
import "./index.css";
import { ToastProvider } from "./components/ToastProvider";

createRoot(document.getElementById("root")).render(
  <CustomerAuthProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </CustomerAuthProvider>
);
