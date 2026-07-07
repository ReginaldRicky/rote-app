export default function NotificationsStats({ total, unread }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article className="rounded-[18px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <p className="text-[12px] font-semibold text-[#94a3b8]">
          Total Notifications
        </p>

        <h2 className="mt-2 text-[30px] font-extrabold text-[#111827]">
          {total}
        </h2>
      </article>

      <article className="rounded-[18px] border border-[#e7edf4] bg-[#fbfcf2] p-5 shadow-sm">
        <p className="text-[12px] font-semibold text-[#94a3b8]">
          Unread
        </p>

        <h2 className="mt-2 text-[30px] font-extrabold text-[#AAB700]">
          {unread}
        </h2>
      </article>

      <article className="rounded-[18px] border border-[#e7edf4] bg-white p-5 shadow-sm">
        <p className="text-[12px] font-semibold text-[#94a3b8]">
          Read
        </p>

        <h2 className="mt-2 text-[30px] font-extrabold text-[#111827]">
          {total - unread}
        </h2>
      </article>
    </section>
  );
}