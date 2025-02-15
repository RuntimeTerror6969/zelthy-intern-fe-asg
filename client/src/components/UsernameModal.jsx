import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../utils/api";

const UsernameModal = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    try {
      const data = await loginUser(username);
      if (!data.username) {
        setError(data.message || "Error logging in");
      } else {
        onUsernameSubmit(data);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Enter your Username
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            className="w-full p-2 mb-2 border rounded-md"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default UsernameModal;
