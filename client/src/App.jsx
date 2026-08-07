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

import { AuthProvider, useAuth } from "./hooks/AuthContext";
import { ThemeProvider } from "./hooks/ThemeContext";

import UnderApproval from "./pages/UnderApproval";
import PendingApproval from "./pages/PendingApproval";
import { MentorshipModel } from "./components/MentorshipModel";
import ProtectedRoot from "./pages/ProtectedRoot";
import LoadingScreen, { useMinLoading } from "./components/LoadingScreen";
import Footer from "./components/Footer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { Navbar } from "./layouts/Navbar";

// Route Guard for Regular Users
const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const showLoading = useMinLoading(loading);

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading..." />;
  }

  return user ? children : <Navigate to="/signin" replace />;
};

// Route Guard for Admin Panel
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("adminLogin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

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
            <Route path="/under-approval" element={<UserRoute><UnderApproval /></UserRoute>} />
            
            {/* ---------- Profiles ---------- */}
            <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
            <Route path="/profile/:userId" element={<UserRoute><Profile /></UserRoute>} />

            {/* ---------- Student Mentorships ---------- */}
            <Route
              path="/profile/mentorships-active"
              element={<UserRoute><MentorshipModel viewType="active" /></UserRoute>}
            />
            <Route
              path="/profile/mentorships-completed"
              element={<UserRoute><MentorshipModel viewType="completed" /></UserRoute>}
            />
            <Route
              path="/profile/mentorships-reviews"
              element={<UserRoute><MentorshipModel viewType="reviews" /></UserRoute>}
            />

            {/* ---------- Viewing Another User ---------- */}
            <Route
              path="/profile/:userId/mentorships-active"
              element={<UserRoute><MentorshipModel viewType="active" /></UserRoute>}
            />
            <Route
              path="/profile/:userId/mentorships-completed"
              element={<UserRoute><MentorshipModel viewType="completed" /></UserRoute>}
            />
            <Route
              path="/profile/:userId/mentorships-reviews"
              element={<UserRoute><MentorshipModel viewType="reviews" /></UserRoute>}
            />

            {/* ---------- Mentor Dashboard ---------- */}
            <Route path="/mentor-dashboard" element={<UserRoute><MentorDashboard /></UserRoute>} />
            <Route
              path="/mentor-dashboard/mentorships/active"
              element={
                <UserRoute><MentorDashboard mainTab="mentorship" mentorSub="active" /></UserRoute>
              }
            />
            <Route
              path="/mentor-dashboard/mentorships/history"
              element={
                <UserRoute><MentorDashboard mainTab="mentorship" mentorSub="history" /></UserRoute>
              }
            />
            <Route
              path="/mentor-dashboard/mentorships/reviews"
              element={
                <UserRoute><MentorDashboard mainTab="mentorship" mentorSub="reviews" /></UserRoute>
              }
            />

            {/* ---------- Admin ---------- */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/pending-approval" element={<AdminRoute><PendingApproval /></AdminRoute>} />
            <Route path="/mentorship-monitor" element={<AdminRoute><MentorshipMonitor /></AdminRoute>} />
            <Route path="/account-management" element={<AdminRoute><AccountManagement /></AdminRoute>} />

            {/* ---------- Search ---------- */}
            <Route
              path="/search/mentors"
              element={<UserRoute><Search categoryType="mentors" /></UserRoute>}
            />
            <Route
              path="/search/students"
              element={<UserRoute><Search categoryType="students" /></UserRoute>}
            />
            <Route
              path="/search/mentorships"
              element={<UserRoute><Search categoryType="mentorships" /></UserRoute>}
            />
            <Route
              path="/search/opportunites"
              element={<UserRoute><Search categoryType="opportunities" /></UserRoute>}
            />

            {/* ---------- Details ---------- */}
            <Route path="/mentorship/:id" element={<UserRoute><MentorshipDetail /></UserRoute>} />
            <Route path="/opportunity/:id" element={<UserRoute><OpportunityDetail /></UserRoute>} />

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
