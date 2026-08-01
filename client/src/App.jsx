import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Profile } from "./pages/Profile";
import { MentorshipModel } from "./components/MentorshipModel";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";

import Search from "./pages/Search";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
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
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                role={role}
                setRole={setRole}
              />
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/signin"
            element={<Signin setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
          />

          {/* Your main profile page */}
          <Route path="/profile" element={<Profile />} />

          <Route
            path="/mentorships-completed"
            element={<MentorshipModel viewType="completed" />}
          />

          <Route
            path="/mentorships-active"
            element={<MentorshipModel viewType="active" />}
          />

          <Route
            path="/search-mentors"
            element={<Search categoryType="mentors" />}
          />

          <Route
            path="/search-opportunites"
            element={<Search categoryType="opportunities" />}
          />

          <Route
            path="/search-students"
            element={<Search categoryType="students" />}
          />

          <Route
            path="/search-mentorships"
            element={<Search categoryType="mentorships" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
