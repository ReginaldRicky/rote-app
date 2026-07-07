import { FiPlay } from "react-icons/fi";

export default function AdminLoginBrandPanel() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden lg:block">
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
        alt="Admin travel login"
        className="h-full min-h-screen w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white text-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition hover:scale-105"
        >
          <FiPlay size={30} fill="currentColor" className="ml-1" />
        </button>
      </div>
    </section>
  );
}