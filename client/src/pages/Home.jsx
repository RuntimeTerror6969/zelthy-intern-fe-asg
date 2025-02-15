import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import CalendarView from "../components/CalendarView";
import SlotForm from "../components/SlotForm";
import SlotList from "../components/SlotList";
import TimezoneSelector from "../components/TimezoneSelector";
import {
  getUser,
  addSlot,
  deleteSlot,
  updateSlot,
  copyAvailability,
} from "../utils/api";

const Home = ({ user, updateUserTimezone }) => {
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timezone, setTimezone] = useState(user.timezone || "UTC");

  useEffect(() => {
    if (user) {
      getUser(user.username)
        .then((data) => {
          setAvailability(data.availability || {});
          setTimezone(data.timezone || "UTC");
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleSaveSlot = async (start, end) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    try {
      const data = await addSlot(user.username, dateKey, start, end);
      setAvailability(data.availability);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSlot = async (start, end) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    try {
      const data = await deleteSlot(user.username, dateKey, start, end);
      setAvailability(data.availability);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSlot = async (oldStart, oldEnd, newStart, newEnd) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    try {
      const data = await updateSlot(
        user.username,
        dateKey,
        oldStart,
        oldEnd,
        newStart,
        newEnd
      );
      setAvailability(data.availability);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyAvailability = async () => {
    const sourceDateKey = format(selectedDate, "yyyy-MM-dd");
    const sourceSlots = availability[sourceDateKey] || [];
    if (sourceSlots.length === 0) {
      alert("No availability to copy from selected day.");
      return;
    }
    const targetDateInput = prompt("Enter target date (YYYY-MM-DD):");
    if (!targetDateInput) return;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDateInput)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }
    try {
      const data = await copyAvailability(
        user.username,
        sourceDateKey,
        targetDateInput
      );
      setAvailability(data.availability);
      alert(`Availability copied to ${targetDateInput}`);
    } catch (err) {
      console.error(err);
    }
  };

  const existingSlots = availability[format(selectedDate, "yyyy-MM-dd")] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Booking Slots for: {user.username}
      </h1>
      <TimezoneSelector
        user={user}
        timezone={timezone}
        setTimezone={setTimezone}
        updateUserTimezone={updateUserTimezone}
      />
      <CalendarView
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        availabilityData={availability}
        onCopyAvailability={handleCopyAvailability}
      />
      <SlotForm
        selectedDate={selectedDate}
        onSave={handleSaveSlot}
        existingSlots={existingSlots}
      />
      <SlotList
        slots={existingSlots}
        onDelete={handleDeleteSlot}
        onUpdate={handleUpdateSlot}
      />
    </motion.div>
  );
};

export default Home;
