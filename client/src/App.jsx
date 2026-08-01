import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import { Profile } from "./pages/Profile";

import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";

import { MentorshipModel } from "./components/MentorshipModel";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          {/* Home */}
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

          {/* Search */}
          <Route path="/search" element={<Search />} />

          {/* Authentication */}
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/signin"
            element={
              <Signin
                setIsLoggedIn={setIsLoggedIn}
                setRole={setRole}
              />
            }
          />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Mentorship */}
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