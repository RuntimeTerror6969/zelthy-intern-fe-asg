import React from "react";
import { updateTimezone } from "../utils/api";

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Kolkata",
];

const TimezoneSelector = ({
  user,
  timezone,
  setTimezone,
  updateUserTimezone,
}) => {
  const handleChange = async (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    try {
      const data = await updateTimezone(user.username, newTimezone);
      if (data && data.user) {
        updateUserTimezone(data.user.timezone);
      } else {
        alert(data.message || "Error updating timezone");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Select Timezone:
      </label>
      <select
        value={timezone}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimezoneSelector;
