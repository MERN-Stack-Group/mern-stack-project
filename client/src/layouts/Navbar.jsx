import { Link, NavLink } from "react-router-dom";
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
  LayoutDashboard,
  SunMedium,
  MoonStar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

import { useAuth } from "../hooks/AuthContext";

export const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout ?")) {
      logout();
      navigate("/");
    }
  };

  const hideOnRoutes = ["/signin", "/signup"];

  // hide nav entirely on auth pages
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  // empty placeholder to prevent layout shift while checking auth
  if (loading)
    return (
      <div className="h-16 bg-surface w-full border-b border-border"></div>
    );

  // build route config based on user role
  const navLinks = user
    ? [
        { label: "Mentors", to: "/search/mentors", icon: Compass },
        { label: "Mentorships", to: "/search/mentorships", icon: Users },
        { label: "Opportunities", to: "/search/opportunites", icon: Briefcase },
        { label: "Students", to: "/search/students", icon: GraduationCap },
        ...(user?.role.includes("alumni")
          ? [
              {
                label: "Dashboard",
                to: "/mentor-dashboard",
                icon: LayoutDashboard,
              },
            ]
          : []),
      ]
    : [
        { label: "Sign In", to: "/signin", icon: LogIn },
        { label: "Get Started", to: "/signup", icon: Zap },
      ];

  return (
    <>
      {/* --- Desktop Nav --- */}
      {/* UI Update: Removed blur, solid surface for crisp academic look */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            {/* UI Update: Sharper corners on logo */}
            <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-bold text-lg">
              G
            </div>
            <span className="text-[22px] font-bold text-text-primary tracking-tight hidden sm:block">
              GradBridge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 h-full text-[15px] font-medium transition-colors group px-1 ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? "text-primary"
                            : "text-text-secondary group-hover:text-primary transition-colors"
                        }
                      />
                      {link.label}
                      {/* UI Update: Thicker, static-feeling bottom border for active tabs */}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[3px] bg-primary transform origin-left transition-transform duration-300 ease-out ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              {/* UI Update: Flatter buttons, softer hover backgrounds */}
              <button
                className="p-2 rounded text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors focus:outline-none"
                title="Toggle Theme"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? <SunMedium size={20} /> : <MoonStar size={20} />}
              </button>

              <div className="h-6 w-px bg-border hidden sm:block mx-1"></div>

              <Link
                to="/profile"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-hover border border-border text-text-secondary hover:text-primary hover:border-border transition-colors focus:outline-none"
                title="Profile"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={20} />
                )}
              </Link>
              <button
                className="flex items-center justify-center w-8 h-8 rounded bg-surface border border-transparent text-text-secondary hover:text-danger hover:bg-surface-hover transition-colors focus:outline-none"
                title="Logout"
                onClick={handleLogout}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                className="p-2 rounded text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors focus:outline-none"
                title="Toggle Theme"
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? <SunMedium size={20} /> : <MoonStar size={20} />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- Mobile Bottom Nav --- */}
      {/* UI Update: Solid background, subtle top border instead of shadow */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface z-50 flex justify-around items-center h-16 px-2 border-t border-border">
        {navLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `p-3 rounded transition-colors ${isActive ? "text-primary" : "text-text-secondary hover:bg-surface-hover"}`
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-16 w-full bg-background"></div>
    </>
  );
};
