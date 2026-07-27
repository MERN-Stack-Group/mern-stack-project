import React from "react";
import { MentorshipModel } from "../components/MentorshipModel";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const completedMentorships = () => {
    navigate("/mentorships-completed");
  };

  const activeMentorships = () => {
    navigate("/mentorships-active");
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-[5vh] w-full min-h-screen bg-gray-100 justify-center">
      {/* Main Content Container (Left Side) */}
      <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4 max-w-4xl">
        {/* Hero Section */}
        <div className="relative bg-white rounded-lg border border-gray-300 overflow-visible pb-6 shadow-sm">
          {/* Banner Image Placeholder */}
          <div className="h-48 w-full bg-blue-400 rounded-t-lg flex items-center justify-center text-white font-bold tracking-widest">
            BANNER IMAGE
          </div>

          {/* Profile Picture Placeholder */}
          <div className="absolute top-28 left-6 w-36 h-36 border-4 border-white rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-center z-10 shadow-sm">
            PROFILE PIC
          </div>

          {/* Profile Details */}
          <div className="pt-20 px-6 flex flex-col md:flex-row justify-between gap-4">
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

            {/* University/Company Link (Always visible) */}
            <div className="flex flex-row items-center md:items-start md:justify-end gap-3 w-full md:w-auto">
              <div className="w-8 h-8 bg-purple-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] rounded shadow-sm">
                LOGO
              </div>
              <span className="text-sm font-semibold hover:underline hover:text-blue-700 cursor-pointer">
                Faculty of Applied Science
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Undergraduate student focusing on information technology and
            cybersecurity. Highly interested in bridging operational efficiency
            with technical solutions.
          </p>
        </div>
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
      </div>
    </div>
  );
};
