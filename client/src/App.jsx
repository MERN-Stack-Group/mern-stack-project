import MentorDashboard from "./pages/MentorDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MentorshipMonitor from "./pages/MentorshipMonitor";
import AccountManagement from "./pages/AccountManagement";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import { Profile } from "./pages/Profile";
import MentorshipDetail from "./pages/MentorshipDetail";
import OpportunityDetail from "./pages/OpportunityDetail";

import { AuthProvider } from "./hooks/AuthContext";
import { ThemeProvider } from "./hooks/ThemeContext";

import UnderApproval from "./pages/UnderApproval";
import PendingApproval from "./pages/PendingApproval";
import { MentorshipModel } from "./components/MentorshipModel";
import ProtectedRoot from "./pages/ProtectedRoot";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { Navbar } from "./layouts/Navbar";

/**
 * Main Application Router
 * Defines core routing, auth state, theme provider, and view rendering.
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* ---------- Protected Home ---------- */}
            <Route path="/" element={<ProtectedRoot />} />

            {/* ---------- Authentication ---------- */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/under-approval" element={<UnderApproval />} />
            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* ---------- Profiles ---------- */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />

            {/* ---------- Student Mentorships ---------- */}
            <Route
              path="/profile/mentorships-active"
              element={<MentorshipModel viewType="active" />}
            />
            <Route
              path="/profile/mentorships-completed"
              element={<MentorshipModel viewType="completed" />}
            />
            <Route
              path="/profile/mentorships-reviews"
              element={<MentorshipModel viewType="reviews" />}
            />

            {/* ---------- Viewing Another User ---------- */}
            <Route
              path="/profile/:userId/mentorships-active"
              element={<MentorshipModel viewType="active" />}
            />
            <Route
              path="/profile/:userId/mentorships-completed"
              element={<MentorshipModel viewType="completed" />}
            />
            <Route
              path="/profile/:userId/mentorships-reviews"
              element={<MentorshipModel viewType="reviews" />}
            />

            {/* ---------- Mentor Dashboard ---------- */}
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
              path="/mentor-dashboard/mentorships/reviews"
              element={
                <MentorDashboard mainTab="mentorship" mentorSub="reviews" />
              }
            />

            {/* ---------- Admin ---------- */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* ---------- Mentorship Monitor ---------- */}
            <Route path="/mentorship-monitor" element={<MentorshipMonitor />} />

            {/* ---------- Account Management ---------- */}
            <Route path="/account-management" element={<AccountManagement />} />

            {/* ---------- Search ---------- */}
            <Route
              path="/search/mentors"
              element={<Search categoryType="mentors" />}
            />
            <Route
              path="/search/students"
              element={<Search categoryType="students" />}
            />
            <Route
              path="/search/mentorships"
              element={<Search categoryType="mentorships" />}
            />
            <Route
              path="/search/opportunites"
              element={<Search categoryType="opportunities" />}
            />

            {/* ---------- Details ---------- */}
            <Route path="/mentorship/:id" element={<MentorshipDetail />} />
            <Route path="/opportunity/:id" element={<OpportunityDetail />} />

            {/* ---------- Testing ---------- */}
            <Route path="/loadingScreen" element={<LoadingScreen />} />

            {/* ---------- 404 ---------- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
