import { useMemo } from "react";
import { Link } from "react-router-dom";

const colors = ["#AAB700", "#c9d46a", "#e2e9a9", "#f1f5d4"];

function getItemsWithPercent(items) {
  const total = items.reduce((sum, item) => {
    return sum + Number(item.value || item.participants || 0);
  }, 0);

  return items.map((item) => {
    const value = Number(item.value || item.participants || 0);
    const percent = item.percent ?? (total ? Math.round((value / total) * 100) : 0);

    return {
      ...item,
      name: item.name || item.title || "Unknown Destination",
      value,
      percent,
    };
  });
}

export default function TopDestinations({ items = [] }) {
  const chartData = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      return Number(b.value || b.participants || 0) - Number(a.value || a.participants || 0);
    });

    return getItemsWithPercent(sorted);
  }, [items]);

  const data = chartData.slice(0, 2);

  let start = 0;

  const segments = chartData.map((item, index) => {
    const end = start + item.percent;
    const segment = `${colors[index % colors.length]} ${start}% ${end}%`;
    start = end;
    return segment;
  });

  const donutStyle = {
    background: segments.length
      ? `conic-gradient(${segments.join(", ")})`
      : "#f1f5f9",
  };

  return (
    <section className="h-full overflow-hidden rounded-[18px] border border-[#dfe7ef] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-[20px] font-bold text-[#111827]">
          Top Destinations
        </h2>

        <p className="mt-1 text-[13px] text-[#94a3b8]">
          Berdasarkan total participants dari booking.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="flex justify-center lg:justify-start lg:translate-y-2">
          <div className="relative h-[190px] w-[190px]">
            <div
              className="h-full w-full rounded-full"
              style={donutStyle}
            />

            <div className="absolute inset-[52px] rounded-full bg-white" />
          </div>
        </div>

        <div className="space-y-3.5 pt-1">
          {data.map((item, index) => (
            <Link
              key={item.id || item.name}
              to={item.id ? `/admin/packages/${item.id}` : "/admin/packages"}
              className="flex items-start gap-4 rounded-xl p-1 transition hover:bg-[#AAB700]/10"
            >
              <span
                className="mt-[7px] h-[13px] w-[13px] shrink-0 rounded-[4px]"
                style={{ backgroundColor: colors[index % colors.length] }}
              />

              <div className="min-w-0">
                <p className="text-[17px] font-bold leading-[22px] text-[#111827]">
                  {item.name} ({item.percent}%)
                </p>

                <p className="text-[14px] leading-[19px] text-[#94a3b8]">
                  {Number(item.value || 0).toLocaleString("id-ID")} Participants
                </p>
              </div>
            </Link>
          ))}

          {data.length === 0 && (
            <p className="text-sm text-[#94a3b8]">
              Belum ada data destination.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}