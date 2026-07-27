import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-900 px-8 py-4 text-white shadow-md w-full">
      {/* Brand / Logo */}
      <div className="text-2xl font-bold">
        <a href="/">BrandLogo</a>
      </div>

      {/* Horizontal Links */}
      <ul className="flex items-center space-x-8">
        <li>
          <a
            href="/"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/features"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="/pricing"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
