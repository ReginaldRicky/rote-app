import AboutStatCard from "./AboutStatCard";

const stats = [
  {
    value: "25K+",
    label: "Happy Travelers",
  },
  {
    value: "120+",
    label: "Tour Destinations",
  },
  {
    value: "4.9",
    label: "Average Rating",
  },
  {
    value: "8+",
    label: "Years Experience",
  },
];

export default function AboutStatsSection() {
  return (
    <section className="about-stats-section">
      {stats.map((item) => (
        <AboutStatCard
          key={item.label}
          value={item.value}
          label={item.label}
        />
      ))}
    </section>
  );
}