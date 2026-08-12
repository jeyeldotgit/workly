import FeaturesSection from "../../features/Landing/components/FeaturesSection";
import Footer from "../../features/Landing/components/Footer";
import HeroSection from "../../features/Landing/components/HeroSection";
import PricingSection from "../../features/Landing/components/PricingSection";
import TopNav from "../../features/Landing/components/TopNav";

function LandingPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <main className="grow pt-24 md:pt-32">
        {/* Hero Section */}
        <HeroSection />
        {/* Features Section */}
        <FeaturesSection />

        {/* Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
