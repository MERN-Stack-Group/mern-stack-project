import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

function Home({ isLoggedIn, role }) {
    return (
        <div className="bg-[#0f0d0b] min-h-screen">
            <Hero
                isLoggedIn={isLoggedIn}
                role={role}
            />
            <InfoSection />
            <Footer />

        </div>
    );
}

export default Home;