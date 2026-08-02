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

        // --- 1. Mock Data: Student (Active) ---
        setUser({
          _id: "123",
          name: "Kalana",
          userType: "student",
          degree: "B.Sc. Information and Communication Technology",
          faculty: "Faculty of Computing",
          location: "Western Province, Sri Lanka",
          aboutText:
            "Undergraduate student focusing on information technology and cybersecurity. Highly interested in bridging operational efficiency with technical solutions. I have a strong passion for learning new technologies, developing secure web applications, and participating in hackathons. My recent projects include building a chess engine in Java and simulating operating system algorithms. I am constantly looking for opportunities to grow and contribute to impactful tech initiatives.",
          skills: [
            "Java",
            "Python",
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Express.js",
            "HTML",
            "CSS",
            "SQL",
            "MongoDB",
            "Git",
            "Docker",
            "AWS",
            "Spring Boot",
          ],
        });

        // --- 2. Mock Data: Alumni (Commented Out for Testing) ---
        /*
        setUser({
          _id: "124",
          name: "John Doe",
          userType: "alumni",
          degree: "B.Sc. Computer Science",
          faculty: "Faculty of Computing",
          location: "Colombo, Sri Lanka",
          aboutText:
            "Experienced software engineer with a track record of building scalable web applications. Passionate about mentoring the next generation of tech leaders.",
          skills: [
            "Java",
            "Spring Boot",
            "AWS",
            "System Design",
            "Microservices",
            "React",
          ],
          companyName: "Tech Innovations Inc.",
          jobTitle: "Senior Software Engineer",
          jobLocation: "Colombo, Sri Lanka",
        });
        */
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
