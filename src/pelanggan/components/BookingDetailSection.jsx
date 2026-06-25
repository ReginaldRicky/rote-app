export default function BookingDetailSection({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section
      className={`bg-white rounded-[26px] border border-gray-100 shadow-md p-7 ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#181e4b]">
          {title}
        </h2>

        {description && (
          <p className="text-gray-500 text-sm mt-1">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}