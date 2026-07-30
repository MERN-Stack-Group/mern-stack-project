import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { MentorshipModel } from "./components/MentorshipModel";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";
import PendingApproval from "./pages/PendingApproval";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Your main profile page */}
          <Route path="/" element={<Profile />} />

          {/* The separate mentorship history page */}
          <Route
            path="/mentorships-completed"
            element={<MentorshipModel viewType="completed" />}
          />
          <Route
            path="/mentorships-active"
            element={<MentorshipModel viewType="active" />}
          />
          <Route
           path="/pending-approval"
           element={<PendingApproval />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
