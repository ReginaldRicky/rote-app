import { FiCheckCircle } from "react-icons/fi";

export default function PackageDetailIncludes({ includes = [] }) {
  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-6 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#94a3b8]">
        Includes
      </p>

      <h2 className="mt-2 text-[22px] font-extrabold text-[#111827]">
        What Travelers Get
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {includes.map((include) => (
          <div
            key={include}
            className="flex gap-3 rounded-2xl bg-[#f8fafc] p-4"
          >
            <FiCheckCircle
              size={16}
              className="mt-[2px] shrink-0 text-[#AAB700]"
            />

            <p className="text-[12px] leading-5 text-[#475569]">
              {include}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}