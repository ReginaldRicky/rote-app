import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import FilterSidebar from "../components/FilterSidebar";
import ActivityCard from "../components/ActivityCard";
import SpecialsCard from "../components/SpecialsCard";
import GallerySection from "../components/GallerySection";

import { tours } from "../data/tours";

import specials1 from "../../assets/specials1.jpg";
import specials2 from "../../assets/specials2.jpg";
import specials3 from "../../assets/specials3.jpg";
import specials4 from "../../assets/specials4.jpg";

const categoryCards = [
  { label: "WATER ACTIVITIES", color: "#b6e8d6" },
  { label: "SPECIAL FOODS", color: "#b6e8d6" },
  { label: "RIVER ACTIVITY", color: "#f8c4c4" },
];

const cardItems = [
  { image: specials1, title: "Alaska: Westminster to Greenwich River Thames" },
  { image: specials2, title: "Alaska: Vintage Double Decker Bus Tour & Thames" },
  { image: specials3, title: "Alaska: Magic of London Tour with Afternoon Tea" },
  { image: specials4, title: "Alaska: Private City Tour with Local Guide" },
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-white destinations-page">
      <Navbar />

      <PageHeader
        title="Things To Do In London"
        subtitle={`${tours.length} Activities Found`}
      >
        <div className="destinations-sort">
          <span>Sort by:</span>

          <select className="destinations-sort-select">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </PageHeader>

      <section className="destinations-listing">
        <FilterSidebar />

        <div className="destinations-results">
          {tours.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}

          <button type="button" className="load-more-btn">
            Load More
          </button>
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
                <button type="button" className="specials-arrow-btn">
                  ‹
                </button>

                <button type="button" className="specials-arrow-btn">
                  ›
                </button>
              </div>
            </div>

            <div className="specials-grid">
              {cardItems.map((item) => (
                <SpecialsCard key={`${cat.label}-${item.title}`} item={item} />
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