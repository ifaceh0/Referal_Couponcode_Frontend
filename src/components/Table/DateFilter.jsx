// components/DateFilter.jsx
import React, { useState } from "react";

const DateFilter = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onDateChange(startDate, endDate);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 border rounded"
      />
      <span>to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleFilter}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Filter
      </button>
    </div>
  );
};

export default DateFilter;
