import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";
import TrendingSection from "../components/TrendingSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar transparent={true} />
      <Hero />
      <PopularCities />
      <TrendingSection />
      <GallerySection />
      <Footer />
    </div>
  );
}