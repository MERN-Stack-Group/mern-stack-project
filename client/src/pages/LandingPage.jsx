import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Hero />
      <InfoSection />
      <Footer />
    </div>
  );
}

export default LandingPage;