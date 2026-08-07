import { useAuth } from "../hooks/AuthContext";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";

function ProtectedRoot() {
  const { user, loading } = useAuth();
  const showLoading = useMinLoading(loading);

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading..." />;
  }

  return user ? <Home /> : <LandingPage />;
}

export default ProtectedRoot;