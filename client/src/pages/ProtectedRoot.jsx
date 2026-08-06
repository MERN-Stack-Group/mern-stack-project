import { useAuth } from "../hooks/AuthContext";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import LoadingScreen from "../components/LoadingScreen";

function ProtectedRoot() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen fullScreen={true} message="Loading..." />;
  }

  return user ? <Home /> : <LandingPage />;
}

export default ProtectedRoot;