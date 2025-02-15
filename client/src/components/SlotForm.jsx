import React, { useState, useEffect } from "react";

const SlotForm = ({ selectedDate, onSave, existingSlots }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStart("");
    setEnd("");
    setError(null);
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!start.trim() || !end.trim()) {
      setError("Both start and end times are required");
      return;
    }
    // Check that start time is before end time (in HH:mm format)
    if (start >= end) {
      setError("Start time must be before end time");
      return;
    }
    onSave(start, end);
    setStart("");
    setEnd("");
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Add Slot for {selectedDate.toDateString()}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-2"
      >
        <input
          type="time"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            setError(null);
          }}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white"
          placeholder="Start Time"
        />
        <input
          type="time"
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
            setError(null);
          }}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white"
          placeholder="End Time"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Slot
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {existingSlots && existingSlots.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-800 dark:text-gray-100">
            Existing Slots:
          </h4>
          <ul className="list-disc list-inside">
            {existingSlots.map((slot, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-200">
                {slot.start} - {slot.end}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SlotForm;
