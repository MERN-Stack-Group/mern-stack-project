import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { MentorshipModel } from "./components/MentorshipModel";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";
import StudentSearch from "./pages/StudentSearch";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Profile />} />

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