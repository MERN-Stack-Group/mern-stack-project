import MentorDashboard from "./pages/MentorDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import { Profile } from "./pages/Profile";

import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";
import PendingApproval from "./pages/PendingApproval";

import { MentorshipModel } from "./components/MentorshipModel";

/**
 * Main Application Router
 * Defines core routing, auth state, and view rendering.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Core Pages */}
          <>
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
            <Route path="/profile" element={<Profile />} />
            
            {/* Added from thanushi branch */}
            <Route
              path="/pending-approval"
              element={<PendingApproval />}
            />
          </>

          {/* Authentication */}
          <>
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/signin"
              element={
                <Signin setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
              }
            />
          </>

          {/* Mentorship Views */}
          <>
            <Route
              path="/mentorships-completed"
              element={<MentorshipModel viewType="completed" />}
            />
            <Route
              path="/mentorships-active"
              element={<MentorshipModel viewType="active" />}
            />
          </>

          {/* Search Directories */}
          <>
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
          </>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;