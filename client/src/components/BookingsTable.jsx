import React from "react";
import { motion } from "framer-motion";

const BookingsTable = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-300">No bookings found.</p>
    );
  }

  return (
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full text-left border-collapse"
    >
      <thead>
        <tr>
          <th className="border p-2 text-gray-800 dark:text-gray-200">
            Username
          </th>
          <th className="border p-2 text-gray-800 dark:text-gray-200">Date</th>
          <th className="border p-2 text-gray-800 dark:text-gray-200">
            Start Time
          </th>
          <th className="border p-2 text-gray-800 dark:text-gray-200">
            End Time
          </th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, idx) => (
          <tr key={idx}>
            <td className="border p-2 text-gray-700 dark:text-gray-300">
              {booking.username}
            </td>
            <td className="border p-2 text-gray-700 dark:text-gray-300">
              {booking.date}
            </td>
            <td className="border p-2 text-gray-700 dark:text-gray-300">
              {booking.start}
            </td>
            <td className="border p-2 text-gray-700 dark:text-gray-300">
              {booking.end}
            </td>
          </tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default BookingsTable;
