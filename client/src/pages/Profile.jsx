import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUser } from "../utils/api";

const Profile = ({ user, onLogout }) => {
  const [profileData, setProfileData] = useState(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUser(user.username);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user.username]);

  if (!profileData) return <div>Loading...</div>;

  const bookings = [];
  if (profileData.availability) {
    Object.entries(profileData.availability).forEach(([date, slots]) => {
      slots.forEach((slot) => {
        bookings.push({
          date,
          start: slot.start,
          end: slot.end,
        });
      });
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-md shadow max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        User Profile
      </h2>
      <div className="mb-4">
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Username:
          </span>{" "}
          {profileData.username}
        </p>
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Timezone:
          </span>{" "}
          {profileData.timezone || "Not Set"}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
          Your Slots
        </h3>
        {bookings.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No slots available.
          </p>
        ) : (
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full text-left border-collapse"
          >
            <thead>
              <tr>
                <th className="border p-2 text-gray-800 dark:text-gray-200">
                  Date
                </th>
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
        )}
      </div>
      <button
        onClick={onLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Profile;
