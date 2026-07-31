import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Navbar } from "./layouts/Navbar";
import { AuthProvider } from "./hooks/AuthContext";

import Search from "./pages/Search";


function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Search />} />

          <Route path="/search" element={<Search />} />

          <Route path="/profile" element={<Profile />} />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}


export default App;