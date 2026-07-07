export default function AdminProfileField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-bold text-[#334155]">
        {label}
      </label>

      {children}
    </div>
  );
}