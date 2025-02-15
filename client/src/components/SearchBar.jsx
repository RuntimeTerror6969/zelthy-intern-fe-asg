import React from "react";

const SearchBar = ({
  userFilterInput,
  setUserFilterInput,
  dateFilterInput,
  setDateFilterInput,
  onSearch,
}) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <div>
        <label className="block text-gray-800 dark:text-gray-200 mb-1">
          Filter by Username:
        </label>
        <input
          type="text"
          value={userFilterInput}
          onChange={(e) => setUserFilterInput(e.target.value)}
          placeholder="Enter username"
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-gray-800 dark:text-gray-200 mb-1">
          Filter by Date:
        </label>
        <input
          type="date"
          value={dateFilterInput}
          onChange={(e) => setDateFilterInput(e.target.value)}
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-200"
        />
      </div>
      <div className="self-end">
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
