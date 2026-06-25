export default function AboutStatCard({ value, label }) {
  return (
    <div className="about-stat-card">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}