import { BrowserRouter, Routes, Route } from "react-router-dom";
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