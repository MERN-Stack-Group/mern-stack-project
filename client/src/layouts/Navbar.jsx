import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Compass,
  Users,
  Briefcase,
  Bookmark,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";

export const Navbar = () => {
  const { user, loading } = useAuth(); // Instantly access DB user data
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Fallback while DB is loading
  if (loading) return <div className="h-16 bg-[#2C4C3B] w-full"></div>;

  // Navigation Data Mapped by Role with corresponding Icons
  const navLinks =
    user?.userType === "student"
      ? [
          {
            label: "Discover Mentors",
            to: "/discover-mentors",
            icon: Compass,
          },
          {
            label: "Network",
            to: "/mentorship-discovering",
            icon: Users,
          },
          {
            label: "Opportunities",
            to: "/opportunity-board",
            icon: Briefcase,
          },
          { 
            label: "Saved", 
            to: "/saved", 
            icon: Bookmark 
          },
          
        ]
      : [
          { label: "Mentorships", to: "/mentorships", icon: Users },
          { label: "Opportunities", to: "/opportunities", icon: Briefcase },
          { label: "Pending Approval", to: "/pending-approval", icon: Users},
        ];

  return (
    <>
      {/* TOP NAVBAR (Always visible, handles Desktop Links) */}
      <nav className="bg-[#2C4C3B] px-4 md:px-6 py-3 md:py-4 shadow-md w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-white tracking-widest cursor-pointer">
              LOGO
            </span>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 pb-1 border-b-2 transition-colors ${
                      isActive
                        ? "text-white border-white font-semibold"
                        : "text-[#A9C4A6] border-transparent hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Action Icons (Profile & Logout) */}
          <div className="flex items-center gap-2 md:gap-4 md:border-l md:border-[#446A50] md:pl-6">
            {/* Profile Icon */}
            <Link
              to="/profile"
              className="p-2 rounded-full text-[#A9C4A6] hover:bg-[#446A50] hover:text-white transition-colors"
              title="Profile"
            >
              <UserCircle size={24} strokeWidth={2} />
            </Link>


            {/* Logout Icon */}
            <button
              className="p-2 rounded-full text-[#A9C4A6] hover:bg-rose-700 hover:text-white transition-colors"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#2C4C3B] shadow-[0_-4px_10px_rgba(0,0,0,0.2)] z-50 flex justify-around items-center h-16 px-2 border-t border-[#446A50]">
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full gap-1 transition-colors ${
                  isActive ? "text-white" : "text-[#A9C4A6] hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium text-center leading-tight px-1">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};