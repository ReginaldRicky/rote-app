import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CustomerAuthProvider } from "./pelanggan/context/CustomerAuthContext";
import "./index.css";
import { ToastProvider } from "./components/ToastProvider";

createRoot(document.getElementById("root")).render(
  <CustomerAuthProvider>
<<<<<<< HEAD
    <ToastProvider>
      <App />
    </ToastProvider>
=======
    <App />
>>>>>>> 132b6f5e9be708d10b0a00edffb88ced9d0bd69f
  </CustomerAuthProvider>
);
