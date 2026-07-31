import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { MentorshipModel } from "./components/MentorshipModel";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";

import Search from "./pages/Search";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Main Search Page */}
          <Route path="/" element={<Search />} />

          {/* Search Route */}
          <Route path="/search" element={<Search />} />


          {/* Profile */}
          <Route path="/profile" element={<Profile />} />


          {/* Existing Mentorship Pages */}
          <Route
            path="/mentorships-completed"
            element={<MentorshipModel viewType="completed" />}
          />

          <Route
            path="/mentorships-active"
            element={<MentorshipModel viewType="active" />}
          />

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;