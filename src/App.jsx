import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import './App.css'

const LoginPage = lazy(() =>
  import("./pages/LoginPage")
);

const ForgotPasswordPage = lazy(() =>
  import("./pages/ForgotPasswordPage")
);

const RegisterPage = lazy(() =>
  import("./pages/RegisterPage")
);

const DashboardPage = lazy(() =>
  import("./pages/Home")
);

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-poppins-medium text-gray-500">
        Loading...
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

