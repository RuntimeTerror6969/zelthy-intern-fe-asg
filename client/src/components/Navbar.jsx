import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-blue-300 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Left side: Hamburger + Desktop navigation */}
        <div className="flex items-center space-x-4">
          {/* Hamburger icon (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-700 dark:text-gray-300 hover:text-white hover:bg-blue-300 focus:outline-none p-2 rounded-md"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Desktop navigation links (left side) */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/profile" className={navLinkClass("/profile")}>
              Profile
            </Link>
          </div>
        </div>
        {/* Right side: Dark mode toggle & Logout */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile drawer: Navigation links */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className={navLinkClass("/")}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/dashboard"
            className={navLinkClass("/dashboard")}
          >
            Dashboard
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/profile"
            className={navLinkClass("/profile")}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
