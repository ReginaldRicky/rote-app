import aboutImage from "../../assets/gallery4.jpg";

export default function AboutIntroSection() {
  return (
    <section className="about-intro-section">
      <div className="about-intro-content">
        <span className="about-mini-title">WHO WE ARE</span>

        <h2>
          We Help Travelers Discover Beautiful Places Around The World
        </h2>

        <p>
          Nick&apos;s Holiday is a tour guide platform created to help travelers
          find exciting destinations, comfortable activities, and unforgettable
          travel experiences.
        </p>

        <p>
          Through our platform, customers can explore destinations, view tour
          details, make bookings, and manage their travel plans in one place.
        </p>
      </div>

      <div className="about-intro-image-wrapper">
        <img src={aboutImage} alt="About Nick's Holiday" />
      </div>
    </section>
  );
}