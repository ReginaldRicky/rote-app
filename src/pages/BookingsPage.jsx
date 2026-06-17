import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import activity1 from "../assets/activity1.jpg";
import activity2 from "../assets/activity2.jpg";
import activity3 from "../assets/activity3.jpg";
import activity4 from "../assets/activity4.jpg";
import activity5 from "../assets/activity5.jpg";
import activity6 from "../assets/activity6.jpg";

const packages = [
  { id: 1, image: activity1, title: "Chiang Mai", location: "Thailand", price: "$ 490", days: "7 Days" },
  { id: 2, image: activity2, title: "Cao Phaya", location: "Thailand", price: "$ 98", days: "6 Days" },
  { id: 3, image: activity3, title: "Bangkok", location: "Thailand", price: "$ 1000", days: "10 Days" },
  { id: 4, image: activity4, title: "Nara", location: "Japan", price: "$ 890", days: "10 Days" },
  { id: 5, image: activity5, title: "Tokyo", location: "Japan", price: "$ 480", days: "12 Days" },
  { id: 6, image: activity6, title: "Malibu", location: "California", price: "$ 500", days: "10 Days" },
  { id: 7, image: activity1, title: "Santa Monica", location: "California", price: "$ 650", days: "8 Days" },
  { id: 8, image: activity2, title: "Azure Coast", location: "France", price: "$ 400", days: "12 Days" },
  { id: 9, image: activity3, title: "Rocamadour", location: "France", price: "$ 280", days: "11 Days" },
];

export default function BookingsPage() {
  return (
    <div className="packages-page">
      <Navbar />

      <section className="packages-hero">
        <h1>Our Packages</h1>
      </section>

      <section className="packages-container">
        <div className="packages-grid">
          {packages.map((item) => (
            <div className="package-card" key={item.id}>
              <div className="package-image-wrapper">
                <img src={item.image} alt={item.title} />
                <span className="package-days">{item.days}</span>
              </div>

              <div className="package-content">
                <h3>{item.title}</h3>
                <p className="package-location">📍 {item.location}</p>

                <p className="package-desc">
                  Visit beautiful places and enjoy unforgettable travel
                  experiences with Nick&apos;s Holiday.
                </p>

                <div className="package-footer">
                  <div>
                    <span>From</span>
                    <h4>{item.price}</h4>
                  </div>

                  <Link
                    to={`/detail/${item.id}`}
                    className="package-detail-btn"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}