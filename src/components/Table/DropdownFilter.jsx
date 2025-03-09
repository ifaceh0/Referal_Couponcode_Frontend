// components/DropdownFilter.jsx
import React from "react";

const DropdownFilter = ({ column, data, onFilter }) => {
  const uniqueValues = [...new Set(data.map((row) => row[column]))];

  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">Select {column}</option>
      {uniqueValues.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default DropdownFilter;
