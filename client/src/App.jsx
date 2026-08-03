import MentorDashboard from "./pages/MentorDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import { Profile } from "./pages/Profile";

import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";
import PendingApproval from "./pages/PendingApproval";

import { MentorshipModel } from "./components/MentorshipModel";

import ProtectedRoot from "./pages/ProtectedRoot";

import AdminLogin from "./pages/AdminLogin";

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
            <Route path="/" element={<ProtectedRoot />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:userId/profile" element={<Profile />} />
            {/* Added from thanushi branch */}
            <Route path="/pending-approval" element={<PendingApproval />} />
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
              path="/:userId/profile/mentorships-completed"
              element={<MentorshipModel viewType="completed" />}
            />
            <Route
              path="/mentorships-active"
              element={<MentorshipModel viewType="active" />}
            />
            <Route
              path="/:userId/profile/mentorships-active"
              element={<MentorshipModel viewType="active" />}
            />
          </>

          {/* Search Directories */}
          <>
            <Route
              path="/search/mentors"
              element={<Search categoryType="mentors" />}
            />
            <Route
              path="/search/opportunites"
              element={<Search categoryType="opportunities" />}
            />
            <Route
              path="/search/students"
              element={<Search categoryType="students" />}
            />
            <Route
              path="/search/mentorships"
              element={<Search categoryType="mentorships" />}
            />

            <Route path="/mentor-dashboard" element={<MentorDashboard />} />

            <Route
              path="/mentor-dashboard/mentorships/active"
              element={
                <MentorDashboard mainTab="mentorship" mentorSub="active" />
              }
            />
            <Route
              path="/mentor-dashboard/mentorships/history"
              element={
                <MentorDashboard mainTab="mentorship" mentorSub="history" />
              }
            />
            <Route 
            path="/admin-login" 
            element={<AdminLogin />} 
            />
            <Route
              path="/mentor-dashboard/mentorships/reviews"
              element={
                <MentorDashboard mainTab="mentorship" mentorSub="reviews" />
              }
            />
          </>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
