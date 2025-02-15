import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import UsernameModal from "./components/UsernameModal";

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleUsernameSubmit = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUserTimezone = (newTimezone) => {
    const updatedUser = { ...user, timezone: newTimezone };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar onLogout={handleLogout} />
          <div className="flex-1 p-4">
            <Routes>
              <Route
                path="/"
                element={
                  user ? (
                    <Home user={user} updateUserTimezone={updateUserTimezone} />
                  ) : (
                    <div>Loading...</div>
                  )
                }
              />
              <Route
                path="/dashboard"
                element={user ? <DashboardPage /> : <div>Loading...</div>}
              />
              <Route
                path="/profile"
                element={
                  user ? (
                    <Profile user={user} onLogout={handleLogout} />
                  ) : (
                    <div>Loading...</div>
                  )
                }
              />
            </Routes>
          </div>
          {!user && <UsernameModal onUsernameSubmit={handleUsernameSubmit} />}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
