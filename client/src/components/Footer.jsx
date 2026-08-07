import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/gradbridge_logo.png";

function Footer() {
  const location = useLocation();
  const hiddenRoutes = [
    "/signin",
    "/signup",
    "/pending-approval",
    "/admin-login",
    "/account-management",
    "/mentorship-monitor",
    "/admin-dashboard",
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="hidden md:block border-t border-slate-300 dark:border-slate-800/80 bg-slate-200 dark:bg-[#080b11] pt-12 pb-8 px-6 mt-auto transition-colors z-40 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center mb-4 group">
            <img
              src={logoImg}
              alt="GradBridge Logo"
              className="h-10 w-auto object-contain group-hover:scale-105 transition"
            />
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
            Connecting students with experienced alumni, industry mentors, and
            research opportunities to bridge the gap between academia and
            industry.
          </p>
        </div>

        {/* Links Section 1 */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">
            Platform
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                to="/search/mentors"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Find Mentors
              </Link>
            </li>
            <li>
              <Link
                to="/search/opportunites"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Opportunities
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Section 2 */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link
                to="/privacy"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/guidelines"
                className="hover:text-sky-600 dark:hover:text-sky-400 transition"
              >
                Community Guidelines
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-300 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} GradBridge. All rights reserved.
        </p>
        <p className="mt-2 md:mt-0">Designed with passion for students.</p>
      </div>
    </footer>
  );
}

export default Footer;
