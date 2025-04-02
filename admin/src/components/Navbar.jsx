import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ setToken }) => {
    const location = useLocation();
    const isHome = location.pathname === "/";
  return (
    <nav className={`w-full shadow-md z-50 ${isHome ? "absolute top-0" : ""}`}>
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-lg border-b border-gray-200">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          className="w-[max(12%,90px)] sm:w-[120px] h-auto transition-transform transform hover:scale-105"
          src="https://mitli.in/uploads/logo/Mitli%20Enterprises%20Private%20Limited%20Logo_8608.png"
          alt="Moody Logo"
        />
      </a>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gray-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:bg-gray-900 hover:scale-105 shadow-md"
      >
        Logout
      </button>
    </div>
    </nav>
  );
};

export default Navbar;
