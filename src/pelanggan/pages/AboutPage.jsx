import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

import AboutIntroSection from "../components/AboutIntroSection";
import AboutStatsSection from "../components/AboutStatsSection";
import AboutMissionSection from "../components/AboutMissionSection";
import AboutValuesSection from "../components/AboutValuesSection";
import AboutCTASection from "../components/AboutCTASection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <PageHeader
        title="About Us"
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "About Us" },
        ]}
      />

      <AboutIntroSection />
      <AboutStatsSection />
      <AboutMissionSection />
      <AboutValuesSection />
      <AboutCTASection />

      <Footer />
    </div>
  );
}