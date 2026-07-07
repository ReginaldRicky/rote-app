import StatCard from "./StatCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {stats.map((item) => (
        <StatCard
          key={item.label}
          icon={item.icon}
          label={item.label}
          value={item.value}
          change={item.change}
          danger={item.danger}
        />
      ))}
    </div>
  );
}