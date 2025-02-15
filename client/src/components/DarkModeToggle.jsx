import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <button
      onClick={toggleDarkMode}
      className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
