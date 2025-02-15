import React from "react";

const SlotList = ({ slots, onDelete, onUpdate }) => {
  const handleEdit = (slot) => {
    const newStart = prompt("Enter new start time (HH:MM)", slot.start);
    const newEnd = prompt("Enter new end time (HH:MM)", slot.end);
    if (
      newStart &&
      newEnd &&
      (newStart !== slot.start || newEnd !== slot.end)
    ) {
      onUpdate(slot.start, slot.end, newStart, newEnd);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Your Slots
      </h3>
      {slots.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-200">
          No slots available for this day.
        </p>
      ) : (
        <ul>
          {slots.map((slot, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-600"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {slot.start} - {slot.end}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(slot)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(slot.start, slot.end)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SlotList;
