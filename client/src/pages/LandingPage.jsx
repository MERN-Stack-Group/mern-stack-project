import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

function Home({ isLoggedIn, role }) {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Hero />
      <InfoSection />
      <Footer />
    </div>
  );
}

export default Home;
