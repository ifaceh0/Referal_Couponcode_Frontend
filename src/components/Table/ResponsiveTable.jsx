// components/ResponsiveTable.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import DropdownFilter from "./DropdownFilter";
import DateFilter from "./DateFilter";

const ResponsiveTable = ({
  headers,
  data,
  actions,
  variant = "default",
  searchableColumns = [],
  filterableColumns = [],
  dateFilterColumn,
  onFilter,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((row) =>
      searchableColumns.some((col) =>
        row[col]?.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  // Filter handling
  const handleFilter = (column, value) => {
    const filtered = data.filter((row) => row[column] === value);
    setFilteredData(filtered);
    if (onFilter) onFilter(filtered);
  };

  // Date Filter handling
  const handleDateFilter = (startDate, endDate) => {
    const filtered = data.filter((row) => {
      const date = new Date(row[dateFilterColumn]);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
    setFilteredData(filtered);
  };

  const tableClass = {
    default: "border border-gray-300 text-left",
    minimal: "border-collapse text-left text-sm",
    modern:
      "text-left bg-gray-50 border-separate rounded-lg shadow overflow-hidden",
  };

  const rowClass = {
    default: "border-b border-gray-300",
    minimal: "hover:bg-gray-100",
    modern: "hover:bg-gray-100 even:bg-gray-50",
  };

  const cellClass = {
    default: "p-3 border-r border-gray-300",
    minimal: "p-2",
    modern: "p-3",
  };

  return (
    <div className="space-y-4">
      {/* Addons: Search, Filters */}
      <div className="flex flex-wrap gap-4">
        {searchableColumns.length > 0 && (
          <SearchBar value={searchQuery} onSearch={handleSearch} />
        )}
        {filterableColumns.map((col, index) => (
          <DropdownFilter
            key={index}
            column={col}
            data={data}
            onFilter={(value) => handleFilter(col, value)}
          />
        ))}
        {dateFilterColumn && (
          <DateFilter onDateChange={handleDateFilter} />
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className={`w-full ${tableClass[variant]}`}>
          <thead>
            <tr className="bg-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="p-3 text-sm font-medium">
                  {header}
                </th>
              ))}
              {actions && <th className="p-3 text-sm font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowClass[variant]}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} className={cellClass[variant]}>
                    {value}
                  </td>
                ))}
                {actions && (
                  <td className={cellClass[variant]}>
                    <div className="flex gap-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.handler(row)}
                          className={action.className}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
