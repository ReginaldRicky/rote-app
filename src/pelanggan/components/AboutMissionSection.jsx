import missionImage from "../../assets/gallery8.jpg";

const missionItems = [
  "Easy destination discovery",
  "Clear tour information",
  "Customer-friendly booking process",
  "Comfortable and memorable travel experience",
];

export default function AboutMissionSection() {
  return (
    <section className="about-mission-section">
      <div className="about-mission-image">
        <img src={missionImage} alt="Our Mission" />
      </div>

      <div className="about-mission-content">
        <span className="about-mini-title">OUR MISSION</span>

        <h2>
          Making Every Trip Easier, Safer, And More Enjoyable
        </h2>

        <p>
          Our mission is to provide a simple and reliable travel booking
          experience for every customer. We want travelers to feel confident
          when choosing destinations and activities through our website.
        </p>

        <div className="about-check-list">
          {missionItems.map((item) => (
            <p key={item}>✓ {item}</p>
          ))}
        </div>
      </div>
    </section>
  );
}