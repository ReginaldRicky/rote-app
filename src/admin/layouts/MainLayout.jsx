import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <main className="p-6 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}