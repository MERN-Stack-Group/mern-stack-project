import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
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

        <Route 
        path="/signup" 
        element={
            <Signup />
        } />

        <Route 
        path="/signin" 
        element={
            <Signin 
              setIsLoggedIn={setIsLoggedIn}
              setRole={setRole}/>
        } />
      </Routes>
    </BrowserRouter>
import { Profile } from "./pages/Profile";
import { MentorshipModel } from "./components/MentorshipModel";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";
import StudentSearch from "./pages/StudentSearch";
import MentorSearch from "./pages/MentorSearch";
import MentorshipProgramSearch from "./pages/MentorshipProgramSearch";
import OpportunityBoard from "./pages/OpportunityBoard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
         <Route path="/" element={<StudentSearch />} />
        
         <Route path="/mentor-search" element={<MentorSearch />} />
          
          <Route 
             path="/mentorship-programs" 
             element={<MentorshipProgramSearch />} 
          />

          <Route 
               path="/opportunities" 
               element={<OpportunityBoard />} 
          />

          <Route
            path="/mentorships-completed"
            element={<MentorshipModel viewType="completed" />}
          />

          <Route
            path="/mentorships-active"
            element={<MentorshipModel viewType="active" />}
          />

          {/* Your page */}
          <Route path="/student-search" element={<StudentSearch />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;