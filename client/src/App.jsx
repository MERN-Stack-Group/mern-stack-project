import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // Load login state when app starts
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              role={role}
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
              setRole={setRole} />
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;