import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";

const CalendarView = ({
  selectedDate,
  onDateSelect,
  availabilityData,
  onCopyAvailability,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Prev
        </button>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {format(currentMonth, dateFormat)}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    // Use abbreviated weekday names, e.g., "Sun", "Mon", "Tue", etc.
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="flex-1 text-center font-medium text-gray-700 dark:text-gray-300"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const fullDateStr = format(day, "yyyy-MM-dd");
        const hasAvailability =
          availabilityData[fullDateStr] &&
          availabilityData[fullDateStr].length > 0;

        days.push(
          <div
            key={day}
            className={`flex flex-col items-center justify-center p-2 border 
              ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-400"
                  : "text-gray-800 dark:text-gray-100"
              }
              ${
                isSameDay(day, selectedDate)
                  ? "bg-blue-200 dark:bg-blue-600 rounded-full"
                  : ""
              }
              ${hasAvailability ? "ring-2 ring-green-500" : ""} 
              cursor-pointer`}
            onClick={() => onDateSelect(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow mb-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="mt-4">
        <button
          onClick={onCopyAvailability}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Copy Availability from Selected Day
        </button>
      </div>
    </div>
  );
};

export default CalendarView;
