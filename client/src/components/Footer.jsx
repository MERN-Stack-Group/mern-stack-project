import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/gradbridge_logo.png";

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#080b11] py-10 px-4 text-center mt-auto transition-colors">
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* GradBridge Logo Image only */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="GradBridge Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition"
          />
        </Link>

        <p className="text-slate-600 dark:text-slate-400 text-xs max-w-md">
          Connecting students with experienced alumni, industry mentors, and research opportunities.
        </p>
      </div>
    </footer>
  );
}

export default Footer;