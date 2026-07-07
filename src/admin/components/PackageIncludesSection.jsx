import { FiPlus, FiTrash2 } from "react-icons/fi";

import { inputClass } from "./packageFormUtils";

export default function PackageIncludesSection({
  includes,
  updateInclude,
  addInclude,
  removeInclude,
}) {
  return (
    <section className="rounded-[20px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#edf1f6] pb-4">
        <div>
          <h2 className="text-[16px] font-extrabold text-[#111827]">
            Includes
          </h2>

          <p className="mt-1 text-[12px] text-[#94a3b8]">
            Facilities or benefits included in this package.
          </p>
        </div>

        <button
          type="button"
          onClick={addInclude}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-[#AAB700]/10 px-4 text-[12px] font-bold text-[#AAB700] transition hover:bg-[#AAB700] hover:text-white"
        >
          <FiPlus size={14} />
          Add
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {includes.map((include, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={include}
              onChange={(event) => updateInclude(index, event.target.value)}
              className={inputClass}
              placeholder={`Include item ${index + 1}`}
            />

            <button
              type="button"
              onClick={() => removeInclude(index)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#fee2e2] bg-white text-[#ef4444] transition hover:bg-[#ef4444] hover:text-white"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}