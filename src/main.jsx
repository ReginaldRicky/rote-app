import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CustomerAuthProvider } from "./pelanggan/context/CustomerAuthContext";
import "./index.css";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <CustomerAuthProvider>
      <App />
    </CustomerAuthProvider>
  </StrictMode>
);