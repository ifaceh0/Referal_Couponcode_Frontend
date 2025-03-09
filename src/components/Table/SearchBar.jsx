// components/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onSearch }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onSearch(e.target.value)}
    placeholder="Search..."
    className="p-2 border rounded w-full max-w-sm"
  />
);

export default SearchBar;
