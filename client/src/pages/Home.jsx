import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

function Home({isLoggedIn, role}) {
    return (
        <>
            <Navbar 
                isLoggedIn={isLoggedIn}
                role={role}
            />
            <Hero 
                isLoggedIn={isLoggedIn}
                role={role}
                />
            <InfoSection />
            <Footer />
        </>
    );
}

export default Home;