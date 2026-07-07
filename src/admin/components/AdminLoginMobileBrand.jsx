import { FiMapPin } from "react-icons/fi";

export default function AdminLoginMobileBrand() {
  return (
    <div className="mb-10 flex items-center gap-3 lg:hidden">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#AAB700] text-white">
        <FiMapPin size={20} />
      </div>

      <h1 className="text-[23px] font-extrabold text-[#111827]">
        Nick&apos;s Holiday
      </h1>
    </div>
  );
}