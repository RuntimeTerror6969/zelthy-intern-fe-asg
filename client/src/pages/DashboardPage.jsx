import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { getAllUsers } from "../utils/api";
import { SOCKET_URL } from "../utils/config";
import SearchBar from "../components/SearchBar";
import BookingsTable from "../components/BookingsTable";

const DashboardPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [userFilterInput, setUserFilterInput] = useState("");
  const [dateFilterInput, setDateFilterInput] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers();
      setAllUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    const socket = io(SOCKET_URL);
    socket.on("availabilityUpdated", fetchAllUsers);
    socket.on("timezoneUpdated", fetchAllUsers);
    return () => socket.disconnect();
  }, []);

  const handleSearch = () => {
    setUserFilter(userFilterInput.trim());
    setDateFilter(dateFilterInput);
  };

  // Filter users with partial matching (case-insensitive)
  const filteredUsers = allUsers.filter((user) => {
    return (
      !userFilter ||
      (user.username &&
        user.username.toLowerCase().includes(userFilter.toLowerCase()))
    );
  });

  // Convert availability map into an array of bookings
  const bookings = [];
  filteredUsers.forEach((user) => {
    if (user.availability) {
      Object.entries(user.availability).forEach(([date, slots]) => {
        slots.forEach((slot) => {
          if (dateFilter && date !== dateFilter) return;
          bookings.push({
            username: user.username,
            date,
            start: slot.start,
            end: slot.end,
          });
        });
      });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-md shadow"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Dashboard
      </h2>
      <SearchBar
        userFilterInput={userFilterInput}
        setUserFilterInput={setUserFilterInput}
        dateFilterInput={dateFilterInput}
        setDateFilterInput={setDateFilterInput}
        onSearch={handleSearch}
      />
      <BookingsTable bookings={bookings} />
    </motion.div>
  );
};

export default DashboardPage;
