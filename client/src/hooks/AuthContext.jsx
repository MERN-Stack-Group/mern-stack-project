import React, { createContext, useState, useEffect, useContext } from "react";

//Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate DB/API call to get user details
    const fetchUser = async () => {
      try {
        // const response = await api.getUser();
        // setUser(response.data);

        // Mock Data for now
        setUser({ name: "Kalana", userType: "student" });
      } catch (error) {
        console.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
