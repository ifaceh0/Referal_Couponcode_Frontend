import React, { useState, useEffect } from "react";

const ResponsiveTable = ({
  columns,
  data,
  onRefresh,
  enableSearch = true,
  enableRefresh = true,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [defaultData, setDefaultData] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    setFilteredData(data);
    setDefaultData(data);
  }, [data]);

  // Apply sorting and search
  useEffect(() => {
    let tempData = [...data];

    // Apply sorting
    if (sortConfig) {
      tempData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply search query
    if (searchQuery) {
      tempData = tempData.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(tempData);
    setCurrentPage(1); // Reset to first page when search or sorting changes
  }, [data, searchQuery, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle sorting (asc -> desc -> reset)
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: "asc" };
      } else if (prev.direction === "asc") {
        return { key, direction: "desc" };
      } else {
        return null; // Reset to default order
      }
    });

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
      setFilteredData(defaultData); // Restore original order
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle refresh action
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    else{
      window.location.reload();
    }
  };

  // Render page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const visibleRange = 2;
    const startRange = Math.max(1, currentPage - visibleRange);
    const endRange = Math.min(totalPages, currentPage + visibleRange);

    if (startRange > 1) pages.push(1);
    if (startRange > 2) pages.push("...");

    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    if (endRange < totalPages - 1) pages.push("...");
    if (endRange < totalPages) pages.push(totalPages);

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`px-2 py-1 mx-1 ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="mx-1">
          ...
        </span>
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        {enableSearch && (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded p-2"
          />
        )}
        {enableRefresh && (
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {columns?.map((col) => (
              <th
                key={col.accessor}
                className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort(col.accessor)}
              >
                {col.header}
                {sortConfig?.key === col.accessor && (
                  <span>
                    {sortConfig.direction === "asc" ? " 🔼" : " 🔽"}
                  </span>
                )}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {columns?.map((col) => (
                <td
                  key={col.accessor}
                  className="border border-gray-300 px-4 py-2"
                  style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {row[col.accessor] || "N/A"}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                {/* Add your action buttons/icons here */}
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded mx-1 ${
            currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded mx-1 ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResponsiveTable;


// import React, { useState, useEffect } from "react";

// const ResponsiveTable = ({
//   columns,
//   data,
//   onRefresh,
//   enableSearch = true,
//   enableRefresh = true,
// }) => {
//   const [filteredData, setFilteredData] = useState(data);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({});
//   const [sortConfig, setSortConfig] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10; // Number of rows per page

//   // Apply filters, search, and sorting
//   useEffect(() => {
//     let tempData = [...data];

//     // Apply column filters
//     Object.keys(filters).forEach((key) => {
//       if (filters[key]) {
//         tempData = tempData.filter((row) =>
//           row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
//         );
//       }
//     });

//     // Apply search query
//     if (searchQuery) {
//       tempData = tempData.filter((row) =>
//         Object.values(row)
//           .join(" ")
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply sorting
//     if (sortConfig) {
//       tempData.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredData(tempData);
//     setCurrentPage(1); // Reset to first page when filters, search, or sorting changes
//   }, [data, filters, searchQuery, sortConfig]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // Handle sorting
//   const handleSort = (key) => {
//     setSortConfig((prev) =>
//       prev && prev.key === key
//         ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
//         : { key, direction: "asc" }
//     );
//   };

//   // Handle filter input changes
//   const handleFilterChange = (key, value) => {
//     setFilters({ ...filters, [key]: value });
//   };

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Handle refresh action
//   const handleRefresh = () => {
//     if (onRefresh) {
//       onRefresh();
//     }
//   };

//   // Render page numbers
//   const renderPageNumbers = () => {
//     const pages = [];
//     const visibleRange = 2;
//     const startRange = Math.max(1, currentPage - visibleRange);
//     const endRange = Math.min(totalPages, currentPage + visibleRange);

//     if (startRange > 1) pages.push(1);
//     if (startRange > 2) pages.push("...");

//     for (let i = startRange; i <= endRange; i++) {
//       pages.push(i);
//     }

//     if (endRange < totalPages - 1) pages.push("...");
//     if (endRange < totalPages) pages.push(totalPages);

//     return pages.map((page, index) =>
//       typeof page === "number" ? (
//         <button
//           key={index}
//           onClick={() => setCurrentPage(page)}
//           className={`px-2 py-1 mx-1 ${
//             page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
//           } rounded`}
//         >
//           {page}
//         </button>
//       ) : (
//         <span key={index} className="mx-1">
//           ...
//         </span>
//       )
//     );
//   };

//   return (
//     <div className="overflow-x-auto">
//       <div className="flex justify-between items-center mb-4">
//         {enableSearch && (
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="border rounded p-2"
//           />
//         )}
//         {enableRefresh && (
//           <button
//             onClick={handleRefresh}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Refresh
//           </button>
//         )}
//       </div>

//       {/* Table */}
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             {columns?.map((col) => (
//               <th
//                 key={col.accessor}
//                 className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
//                 onClick={() => handleSort(col.accessor)}
//               >
//                 {col.header}
//                 {sortConfig?.key === col.accessor && (
//                   <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
//                 )}
//                 <div>
//                   <input
//                     type="text"
//                     placeholder={`Filter ${col.header}`}
//                     value={filters[col.accessor] || ""}
//                     onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
//                     className="border rounded p-1 mt-1 w-full"
//                   />
//                 </div>
//               </th>
//             ))}
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((row, rowIndex) => (
//             <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//               {columns?.map((col) => (
//                 <td
//                   key={col.accessor}
//                   className="border border-gray-300 px-4 py-2"
//                   style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}
//                 >
//                   {row[col.accessor] || "N/A"}
//                 </td>
//               ))}
//               <td className="border border-gray-300 px-4 py-2">
//                 {/* Add your action buttons/icons here */}
//                 <button className="text-blue-500">Edit</button>
//                 <button className="text-red-500 ml-2">Delete</button>
//               </td>
//             </tr>
//           ))}
//           {paginatedData.length === 0 && (
//             <tr>
//               <td colSpan={columns.length + 1} className="text-center py-4">
//                 No data found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center mt-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded mx-1 ${
//             currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
//           }`}
//         >
//           Previous
//         </button>
//         {renderPageNumbers()}
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded mx-1 ${
//             currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResponsiveTable;
