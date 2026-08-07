import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Compass,
  Users,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  UserCircle,
  LogOut,
  LogIn,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import logoImg from "../assets/gradbridge_logo.png";

export const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const hideOnRoutes = [
  "/signin", 
  "/signup",
  "/admin-login",
  "/admin-dashboard",
  "/pending-approval",
  "/mentorship-monitor",
  "/account-management",];

  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  if (loading)
    return <div className="h-16 bg-slate-200 dark:bg-[#080b11] w-full"></div>;

  const navLinks = user
    ? [
        { label: "Mentors", to: "/search/mentors", icon: Compass },
        { label: "Mentorships", to: "/search/mentorships", icon: Users },
        { label: "Opportunities", to: "/search/opportunites", icon: Briefcase },
        { label: "Students", to: "/search/students", icon: GraduationCap },
        ...(user?.role?.includes("alumni")
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
        { label: "Sign In", to: "/signin", icon: LogIn, isButton: false },
        { label: "Get Started", to: "/signup", icon: Zap, isButton: true },
      ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="bg-slate-200/90 dark:bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 py-3.5 sticky top-0 z-50 w-full transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoImg}
              alt="GradBridge Logo"
              className="h-12 w-auto object-contain hover:scale-105 transition"
            />
          </Link>

          {/* Centered Nav Links (Desktop) */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              if (link.isButton) {
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 shadow-md shadow-sky-600/20"
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              }

              return (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-colors ${
                      isActive
                        ? "text-sky-600 dark:text-sky-400 bg-slate-200 dark:bg-sky-950/40"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/40"
                    }`
                  }
                >
                  <Icon size={18} />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-amber-500 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800/60 transition cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user && (
              <div className="flex items-center gap-2 border-l border-slate-300 dark:border-slate-800 pl-4 ml-1">
                <Link
                  to="/profile"
                  className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800/60 transition"
                  title="Profile"
                >
                  <UserCircle size={22} />
                </Link>

                <button
                  className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-800/60 transition cursor-pointer"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <LogOut size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-200 dark:bg-[#0b0f17] border-t border-slate-200 dark:border-slate-800 z-50 flex justify-around items-center h-14 px-2">
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 ${
                  isActive
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-slate-500 dark:text-slate-400"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium leading-none">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
