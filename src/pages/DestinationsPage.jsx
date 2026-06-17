import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FilterSidebar from "../components/FilterSidebar";
import ActivityCard from "../components/ActivityCard";
import SpecialsCard from "../components/SpecialsCard";
import GallerySection from "../components/GallerySection";

import activity1 from "../assets/activity1.jpg";
import activity2 from "../assets/activity2.jpg";
import activity3 from "../assets/activity3.jpg";
import activity4 from "../assets/activity4.jpg";
import activity5 from "../assets/activity5.jpg";
import activity6 from "../assets/activity6.jpg";
import activity7 from "../assets/activity7.jpg";
import activity8 from "../assets/activity8.jpg";

import specials1 from "../assets/specials1.jpg";
import specials2 from "../assets/specials2.jpg";
import specials3 from "../assets/specials3.jpg";
import specials4 from "../assets/specials4.jpg";

const activities = [
  { id: 1, image: activity1, category: "WATER ACTIVITIES", title: "Westminster to Greenwich River Thames", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 2, image: activity2, category: "WATER ACTIVITIES", title: "London River Cruise Adventure", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 3, image: activity3, category: "WATER ACTIVITIES", title: "Greenwich Sightseeing Tour", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 4, image: activity4, category: "WATER ACTIVITIES", title: "Thames Family Holiday Trip", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 5, image: activity5, category: "WATER ACTIVITIES", title: "London Water Activity Package", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 6, image: activity6, category: "WATER ACTIVITIES", title: "Private River Tour London", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 7, image: activity7, category: "WATER ACTIVITIES", title: "City Cruise Travel Experience", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
  { id: 8, image: activity8, category: "WATER ACTIVITIES", title: "London Family River Tour", rating: 4.5, reviews: 584, duration: "2 hours", transport: "Transport", plan: "Family Plan", price: "$35.00" },
];

const categoryCards = [
  { label: "WATER ACTIVITIES", color: "#b6e8d6" },
  { label: "SPECIAL FOODS", color: "#b6e8d6" },
  { label: "RIVER ACTIVITY", color: "#f8c4c4" },
];

const cardItems = [
  { image: specials1, title: "Alaska: Westminster to Greenwich River Thames" },
  { image: specials2, title: "Alaska: Vintage Double Decker Bus Tour & Thames" },
  { image: specials3, title: "Alaska: Magic of London Tour with Afternoon Tea at" },
  { image: specials4, title: "Alaska: Magic of London Tour with Afternoon Tea at" },
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white destinations-page">
      <Navbar />
      <div className="navbar-spacer"></div>

      <section className="destinations-header">
        <div className="destinations-header-left">
          <h1 className="destinations-page-title">Things To Do In London</h1>
          <p className="destinations-count">49 Activities Found</p>
        </div>

        <div className="destinations-sort">
          <span>Sort by:</span>
          <select className="destinations-sort-select">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </section>

      <section className="destinations-listing">
        <FilterSidebar />

        <div className="destinations-results">
          {activities.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}

          <button className="load-more-btn">Load More</button>
        </div>
      </section>

      <section className="specials-section">
        <h2 className="specials-main-title">Outside The City Specials</h2>

        {categoryCards.map((cat) => (
          <div key={cat.label} className="specials-category">
            <div className="specials-category-header">
              <span
                className="specials-badge"
                style={{ backgroundColor: cat.color }}
              >
                {cat.label}
              </span>

              <div className="specials-nav-arrows">
                <button className="specials-arrow-btn">‹</button>
                <button className="specials-arrow-btn">›</button>
              </div>
            </div>

            <div className="specials-grid">
              {cardItems.map((item, i) => (
                <SpecialsCard key={i} item={item} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <GallerySection />
      <Footer />
    </div>
  );
}