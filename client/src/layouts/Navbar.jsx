import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  UserCircle,
  LogOut,
  Home,
  LogIn,
  Zap,
  icons,
  Compass,
  Users,
  Briefcase,
  Bookmark,
  GraduationCap,
} from "lucide-react";

import { useAuth } from "../hooks/AuthContext";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: clear tokens/session data if needed before redirect
    navigate("/");
  };

  const hideOnRoutes = ["/signin", "/signup"];

  // hide nav entirely on auth pages
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  // empty placeholder to prevent layout shift while checking auth
  if (loading) return <div className="h-16 bg-[#4A044E] w-full"></div>;

  // build route config based on user role
  const navLinks = user
    ? [
        { label: "Mentors", to: "/search-mentors", icon: Compass },
        { label: "Mentorships", to: "/search-mentorships", icon: Users },
        { label: "Opportunities", to: "/search-opportunites", icon: Briefcase },
        { label: "Students", to: "/search-students", icon: GraduationCap },
      ]
    : [
        // unauthenticated visitors
        { label: "Sign In", to: "/signin", icon: LogIn },
        { label: "Get Started", to: "/signup", icon: Zap },
      ];

  return (
    <>
      {/* --- Desktop Nav --- */}
      <nav className="bg-[#4A044E] px-4 md:px-6 py-3 md:py-4 shadow-md w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-white tracking-widest cursor-pointer">
              LOGO
            </span>
          </Link>

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
                        : "text-purple-200 border-transparent hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {user && (
            <div className="flex items-center gap-2 md:gap-4 md:border-l md:border-purple-800 md:pl-6">
              <Link
                to="/profile"
                className="p-2 rounded-full text-purple-200 hover:bg-[#6B116E] hover:text-white transition-colors"
                title="Profile"
              >
                <UserCircle size={24} strokeWidth={2} />
              </Link>

              <button
                className="p-2 rounded-full text-purple-200 hover:bg-[#6B116E] hover:text-white transition-colors"
                title="Logout"
                onClick={handleLogout}
              >
                <LogOut size={24} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- Mobile Bottom Nav --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#4A044E] shadow-[0_-4px_10px_rgba(0,0,0,0.2)] z-50 flex justify-around items-center h-16 px-2 border-t border-[#6B116E]">
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full gap-1 transition-colors ${
                  isActive ? "text-white" : "text-purple-200 hover:text-white"
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
