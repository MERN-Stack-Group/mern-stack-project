import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/dp.jpg";
import banner from "../assets/banner.jpg";
import TagCard from "../components/TagCard";
import { useAuth } from "../hooks/AuthContext";

export const Profile = () => {
  const { user, loading } = useAuth(); // Instantly access DB user data

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const navigate = useNavigate();

  // Fallback while DB is loading
  if (loading) return <div className="h-16 bg-[#2C4C3B] w-full"></div>;

  const completedMentorships = () => {
    if (user.userType === "alumni") {
      navigate("/mentor-dashboard/mentorships/history");
    } else {
      navigate("/mentorships-completed");
    }
  };

  const activeMentorships = () => {
    if (user.userType === "alumni") {
      navigate("/mentor-dashboard/mentorships/active");
    } else {
      navigate("/mentorships-active");
    }
  };

  const viewAllReviews = () => {
    navigate("/mentor-dashboard/mentorships/reviews");
  };

  const aboutText =
    "Undergraduate student focusing on information technology and cybersecurity. Highly interested in bridging operational efficiency with technical solutions. I have a strong passion for learning new technologies, developing secure web applications, and participating in hackathons. My recent projects include building a chess engine in Java and simulating operating system algorithms. I am constantly looking for opportunities to grow and contribute to impactful tech initiatives.";

  const skills = [
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
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-[5vh] w-full min-h-screen bg-gray-100 justify-center">
      {/* Main Content Container (Left Side) */}
      <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4 max-w-4xl">
        {/* Hero Section */}
        <div className="relative bg-white rounded-lg border border-gray-300 overflow-visible pb-6 shadow-sm">
          {/* Banner Container */}
          <div className="relative h-48 w-full bg-blue-400 rounded-t-lg flex items-center justify-center text-white font-bold tracking-widest">
            <img
              src={banner}
              alt="Banner Image"
              className="w-full h-full object-cover rounded-t-lg"
            />

            {/* Banner Edit Button (Camera Icon) */}
            <button
              className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-md transition-colors cursor-pointer"
              aria-label="Edit Banner"
              title="Edit Banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Profile Picture Container */}
          <div className="absolute top-28 left-6 w-36 h-36 border-4 border-white rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-center z-10 shadow-sm overflow-hidden">
            <button className="w-full h-full rounded-full overflow-hidden hover:bg-black/20 transition-colors">
              <img
                src={heroImage}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Profile Details Container */}
          <div className="relative pt-20 px-6 flex flex-col md:flex-row justify-between gap-4">
            {/* Edit Profile Button (Pencil Icon) */}
            <button
              className="absolute top-4 right-4 md:right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              aria-label="Edit Profile"
              title="Edit Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </button>

            {/* Name & Bio */}
            <div className="w-full md:w-3/4">
              <h1 className="text-2xl font-bold text-gray-900">Kalana</h1>
              <p className="text-lg text-gray-700 mt-1">
                B.Sc. Information and Communication Technology
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Western Province, Sri Lanka •{" "}
                <button className="text-blue-600 font-semibold hover:underline">
                  Contact info
                </button>
              </p>
            </div>

            {/* University Link (Always visible) */}
            <div className="flex flex-row items-center md:items-start md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
              <div className="w-8 h-8 bg-purple-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] rounded shadow-sm">
                LOGO
              </div>
              <span className="text-sm font-semibold hover:underline hover:text-blue-700 cursor-pointer">
                Faculty of Applied Science
              </span>
            </div>
          </div>

          {/* Current Employer Section (Alumni Only) */}
          {user?.userType === "alumni" ? (
            <div className="mt-6 border-t border-gray-200 pt-6 px-6">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Current Employer
              </h2>
              <div className="flex items-start gap-4">
                {/* Company Logo Placeholder */}
                <div className="w-14 h-14 bg-slate-100 border border-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-gray-500 text-xs font-bold shadow-sm">
                  LOGO
                </div>

                {/* Employment Details */}
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    Tech Innovations Inc.
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">
                    Senior Software Engineer
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>

          <div className="relative">
            {/* The text dynamically clamps to 3 lines if not expanded */}
            <p
              className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${
                isAboutExpanded ? "" : "line-clamp-3"
              }`}
            >
              {aboutText}
            </p>

            {/* See more / See less button */}
            <div
              className={`flex justify-end mt-1 ${isAboutExpanded ? "mt-2" : ""}`}
            >
              <button
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="text-gray-500 hover:text-blue-700 hover:underline text-sm font-semibold cursor-pointer"
              >
                {isAboutExpanded ? "See less" : "...see more"}
              </button>
            </div>
          </div>
        </div>
        <TagCard topic="Skills and Interests" skills={skills} />
      </div>

      {/* Sidebar Container (Right Side - Full width on small screens, stacked on large) */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
        {/* Active Mentorships Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Active Mentorships
          </h2>

          <div className="flex flex-col gap-4">
            {/* Mentor Item 1 */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="w-12 h-12 bg-rose-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                IMG
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                  John Doe
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  Senior Production Manager at MAS Holdings
                </p>
              </div>
            </div>

            {/* Mentor Item 2 */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                IMG
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                  Jane Smith
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  Supply Chain & Logistics Specialist
                </p>
              </div>
            </div>
          </div>

          {/* Centered View All Button */}
          <div className="mt-5 border-t border-gray-200 pt-2">
            <button
              onClick={activeMentorships}
              className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>

        {/* Completed Mentorships Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Completed Mentorships
          </h2>

          <div className="flex flex-col gap-4">
            {/* Completed Mentor Item 1 */}
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-slate-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                IMG
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                  Dr. Alan Turing
                </h3>
                <p className="text-xs text-gray-600 line-clamp-1">
                  Lead Security Architect
                </p>
                <p className="text-[10px] font-semibold text-emerald-600 mt-1 uppercase tracking-wide">
                  Completed • Fall 2025
                </p>
              </div>
            </div>

            {/* Completed Mentor Item 2 */}
            <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-slate-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">
                IMG
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                  Sarah Connor
                </h3>
                <p className="text-xs text-gray-600 line-clamp-1">
                  Systems Analyst at CyberDyne
                </p>
                <p className="text-[10px] font-semibold text-emerald-600 mt-1 uppercase tracking-wide">
                  Completed • Spring 2025
                </p>
              </div>
            </div>
          </div>
          {/* Centered View All Button */}
          <div className="mt-5 border-t border-gray-200 pt-2">
            <button
              onClick={completedMentorships}
              className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
            >
              View All
            </button>
          </div>
        </div>

        {/* Mentorship Reviews Section (Alumni Only) */}
        {user?.userType === "alumni" ? (
          <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Mentee Reviews
            </h2>

            <div className="flex flex-col gap-4">
              {/* Review Item 1 */}
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    David Perera
                  </span>
                  <span className="text-sm font-bold text-yellow-500 tracking-widest">
                    ★★★★★
                  </span>
                </div>
                <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                  "Incredible mentorship experience. The deep dive into Agile
                  project management and sprint planning completely changed how
                  I approach software development."
                </p>
              </div>

              {/* Review Item 2 */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900">
                    Samantha Lee
                  </span>
                  <span className="text-sm font-bold text-yellow-500 tracking-widest">
                    ★★★★☆
                  </span>
                </div>
                <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                  "Very patient and knowledgeable. The guidance on Java concepts
                  and internship preparation was exactly what I needed to secure
                  a position."
                </p>
              </div>
            </div>

            {/* Centered View All Button */}
            <div className="mt-5 border-t border-gray-200 pt-2">
              <button
                onClick={viewAllReviews}
                className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
              >
                View All
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
