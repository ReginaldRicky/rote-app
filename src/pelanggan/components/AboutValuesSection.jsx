import AboutValueCard from "./AboutValueCard";

const values = [
  {
    icon: "🌍",
    title: "Explore More",
    description:
      "We help customers discover beautiful places and unique activities around the world.",
  },
  {
    icon: "🛡️",
    title: "Safe Travel",
    description:
      "We prioritize comfort, safety, and clear information for every travel activity.",
  },
  {
    icon: "🤝",
    title: "Trusted Service",
    description:
      "We provide reliable tour information to help customers plan their journey easily.",
  },
  {
    icon: "✨",
    title: "Memorable Experience",
    description:
      "We want every customer to enjoy a meaningful and unforgettable travel moment.",
  },
];

export default function AboutValuesSection() {
  return (
    <section className="about-values-section">
      <div className="about-section-header">
        <span className="about-mini-title">OUR VALUES</span>

        <h2>
          Why Travelers Choose Nick&apos;s Holiday
        </h2>

        <p>
          We focus on service quality, customer comfort, and trusted travel
          experiences.
        </p>
      </div>

      <div className="about-values-grid">
        {values.map((item) => (
          <AboutValueCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}