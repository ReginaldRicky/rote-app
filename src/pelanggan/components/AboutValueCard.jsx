export default function AboutValueCard({ icon, title, description }) {
  return (
    <div className="about-value-card">
      <div className="about-value-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}