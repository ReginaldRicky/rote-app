import { Link } from "react-router-dom";
import alaskaImage from "../../assets/alaska.jpg";

export default function AboutCTASection() {
  return (
    <section className="about-cta-section">
      <img src={alaskaImage} alt="Explore destinations" />

      <div className="about-cta-overlay"></div>

      <div className="about-cta-content">
        <h2>Ready To Start Your Next Journey?</h2>

        <p>
          Explore our destinations and find the perfect tour for your next
          holiday.
        </p>

        <Link to="/destinations" className="about-cta-btn">
          Explore Destinations
        </Link>
      </div>
    </section>
  );
}