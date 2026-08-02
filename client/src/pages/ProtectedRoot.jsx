import { useAuth } from "../hooks/AuthContext";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";

function ProtectedRoot() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Home /> : <LandingPage />;
}

export default ProtectedRoot;