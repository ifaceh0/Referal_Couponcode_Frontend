// import React, { useState, useEffect } from "react";

// const ResponsiveTable = ({
//   columns,
//   data,
//   onRefresh,
//   enableSearch = true,
//   enableRefresh = true,
// }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [expiryDate, setExpiryDate] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [uniqueStatuses, setUniqueStatuses] = useState([]);
//   const [refreshDisabled, setRefreshDisabled] = useState(false);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     setFilteredData(data);
//     setUniqueStatuses([...new Set(data.map((item) => item.status))]);
//   }, [data]);

//   useEffect(() => {
//     let tempData = [...data];

//     if (sortConfig) {
//       tempData.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];
//         if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     if (searchQuery) {
//       tempData = tempData.filter((row) =>
//         Object.values(row)
//           .join(" ")
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       );
//     }

//     if (expiryDate) {
//       tempData = tempData.filter((row) => row.expiryDate === expiryDate);
//     }

//     if (statusFilter) {
//       tempData = tempData.filter((row) => row.status === statusFilter);
//     }

//     setFilteredData(tempData);
//     setCurrentPage(1);
//   }, [searchQuery, sortConfig, expiryDate, statusFilter, data]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (!prev || prev.key !== key) return { key, direction: "asc" };
//       if (prev.direction === "asc") return { key, direction: "desc" };
//       return null;
//     });
//   };

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleExpiryChange = (e) => setExpiryDate(e.target.value);
//   const handleStatusChange = (e) => setStatusFilter(e.target.value);
//   const handleRefresh = () => {
//     if (!refreshDisabled) {
//       if (onRefresh) onRefresh();
//     }
//   };
//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setExpiryDate("");
//     setStatusFilter("");
//   };

//   const toggleRowSelection = (rowData) => {
//     setSelectedRows((prev) =>
//       prev.some((row) => row.id === rowData.id)
//         ? prev.filter((row) => row.id !== rowData.id)
//         : [...prev, rowData]
//     );
//     console.log("Selected Rows:", selectedRows);
//   };

//   const renderPageNumbers = () => {
//     let pages = [];
//     if (totalPages <= 7) {
//       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       pages = [1, 2];
//       if (currentPage > 4) pages.push("...");
//       const start = Math.max(3, currentPage - 1);
//       const end = Math.min(totalPages - 2, currentPage + 1);
//       for (let i = start; i <= end; i++) pages.push(i);
//       if (currentPage < totalPages - 3) pages.push("...");
//       pages.push(totalPages - 1, totalPages);
//     }

//     return pages.map((page, index) => (
//       <button
//         key={index}
//         className={`px-3 py-1 mx-1 rounded ${
//           currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={() => typeof page === "number" && setCurrentPage(page)}
//         disabled={page === "..."}
//       >
//         {page}
//       </button>
//     ));
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
//         <button onClick={handleClearFilters} className="px-4 py-2 bg-gray-400 text-white rounded">Clear Filters</button>
//         <button onClick={handleRefresh} className={`px-4 py-2 rounded ${refreshDisabled ? "bg-gray-300" : "bg-blue-500 text-white"}`} disabled={refreshDisabled}>Refresh</button>
//       </div>

//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">#</th>
//             <th className="border p-2">
//               <input type="checkbox" onChange={(e) => setSelectedRows(e.target.checked ? paginatedData : [])} />
//             </th>
//             {columns.map((col) => (
//               <th key={col.accessor} className="border p-2 cursor-pointer" onClick={() => handleSort(col.accessor)}>
//                 {col.header} {sortConfig?.key === col.accessor && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((row, index) => (
//             <tr key={row.id} className="hover:bg-gray-100">
//               <td className="border p-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
//               <td className="border p-2">
//                 <input type="checkbox" checked={selectedRows.some(selected => selected.id === row.id)} onChange={() => toggleRowSelection(row)} />
//               </td>
//               {columns.map((col) => (
//                 <td key={col.accessor} className="border p-2">{row[col.accessor] || "N/A"}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center items-center mt-4">{renderPageNumbers()}</div>
//     </div>
//   );
// };

// export default ResponsiveTable;


// // import React, { useState, useEffect } from "react";

// // const ResponsiveTable = ({
// //   columns,
// //   data,
// //   onRefresh,
// //   enableSearch = true,
// //   enableRefresh = true,
// // }) => {
// //   const [filteredData, setFilteredData] = useState(data);
// //   const [defaultData, setDefaultData] = useState(data);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortConfig, setSortConfig] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [expiryDate, setExpiryDate] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");
// //   const [uniqueStatuses, setUniqueStatuses] = useState([]);
// //   const [refreshDisabled, setRefreshDisabled] = useState(false);
// //   const rowsPerPage = 10;

// //   useEffect(() => {
// //     setFilteredData(data);
// //     setDefaultData(data);
// //     setUniqueStatuses([...new Set(data.map((item) => item.status))]);
// //   }, [data]);

// //   useEffect(() => {
// //     let tempData = [...data];

// //     if (sortConfig) {
// //       tempData.sort((a, b) => {
// //         const aValue = a[sortConfig.key];
// //         const bValue = b[sortConfig.key];
// //         if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
// //         if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
// //         return 0;
// //       });
// //     }

// //     if (searchQuery) {
// //       tempData = tempData.filter((row) =>
// //         Object.values(row)
// //           .join(" ")
// //           .toLowerCase()
// //           .includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     if (expiryDate) {
// //       tempData = tempData.filter((row) => row.expiryDate === expiryDate);
// //     }

// //     if (statusFilter) {
// //       tempData = tempData.filter((row) => row.status === statusFilter);
// //     }

// //     setFilteredData(tempData);
// //     setCurrentPage(1);
// //   }, [data, searchQuery, sortConfig, expiryDate, statusFilter]);

// //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// //   const paginatedData = filteredData.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   const handleSort = (key) => {
// //     setSortConfig((prev) => {
// //       if (!prev || prev.key !== key) return { key, direction: "asc" };
// //       if (prev.direction === "asc") return { key, direction: "desc" };
// //       return null;
// //     });
// //     if (sortConfig?.key === key && sortConfig.direction === "desc") {
// //       setFilteredData(defaultData);
// //     }
// //   };

// //   const handleSearchChange = (e) => setSearchQuery(e.target.value);
// //   const handleExpiryChange = (e) => setExpiryDate(e.target.value);
// //   const handleStatusChange = (e) => setStatusFilter(e.target.value);

// //   const handleRefresh = () => {
// //     if (!refreshDisabled) {
// //       if (onRefresh) onRefresh();
// //       else window.location.reload();
// //     }
// //   };

// //   const toggleRowSelection = (id) => {
// //     setSelectedRows((prev) =>
// //       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
// //     );
// //   };

// //   const clearFilters = () => {
// //     setSearchQuery("");
// //     setExpiryDate("");
// //     setStatusFilter("");
// //   };

// //   return (
// //     <div className="overflow-x-auto p-4">
// //       <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
// //         {enableSearch && (
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             value={searchQuery}
// //             onChange={handleSearchChange}
// //             className="border rounded p-2"
// //           />
// //         )}
// //         <input
// //           type="date"
// //           value={expiryDate}
// //           onChange={handleExpiryChange}
// //           className="border rounded p-2"
// //         />
// //         <select
// //           value={statusFilter}
// //           onChange={handleStatusChange}
// //           className="border rounded p-2"
// //         >
// //           <option value="">All Statuses</option>
// //           {uniqueStatuses.map((status) => (
// //             <option key={status} value={status}>
// //               {status}
// //             </option>
// //           ))}
// //         </select>
// //         <button
// //           onClick={clearFilters}
// //           className="bg-gray-500 text-white px-4 py-2 rounded"
// //         >
// //           Clear Filters
// //         </button>
// //         {enableRefresh && (
// //           <button
// //             onClick={handleRefresh}
// //             className={`px-4 py-2 rounded ${refreshDisabled ? "bg-gray-300" : "bg-blue-500 text-white"}`}
// //             disabled={refreshDisabled}
// //           >
// //             Refresh
// //           </button>
// //         )}
// //       </div>

// //       <table className="table-auto w-full border-collapse border border-gray-300">
// //         <thead>
// //           <tr className="bg-gray-200">
// //             <th className="border p-2">
// //               <input type="checkbox" onChange={() => setSelectedRows(selectedRows.length ? [] : data.map((d) => d.id))} />
// //             </th>
// //             {columns.map((col) => (
// //               <th key={col.accessor} className="border p-2 cursor-pointer" onClick={() => handleSort(col.accessor)}>
// //                 {col.header} {sortConfig?.key === col.accessor && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {paginatedData.map((row) => (
// //             <tr key={row.id} className="hover:bg-gray-100">
// //               <td className="border p-2">
// //                 <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRowSelection(row.id)} />
// //               </td>
// //               {columns.map((col) => (
// //                 <td key={col.accessor} className="border p-2">
// //                   {row[col.accessor] || "N/A"}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {selectedRows.length > 0 && (
// //         <div className="mt-4 flex gap-2">
// //           <button className="bg-green-500 text-white px-4 py-2 rounded">Renew</button>
// //           <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ResponsiveTable;


// // import React, { useState, useEffect } from "react";

// // const ResponsiveTable = ({
// //   columns,
// //   data,
// //   onRefresh,
// //   enableSearch = true,
// //   enableRefresh = true,
// // }) => {
// //   const [filteredData, setFilteredData] = useState(data);
// //   const [defaultData, setDefaultData] = useState(data);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [sortConfig, setSortConfig] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 10; // Number of rows per page

// //   useEffect(() => {
// //     setFilteredData(data);
// //     setDefaultData(data);
// //   }, [data]);

// //   // Apply sorting and search
// //   useEffect(() => {
// //     let tempData = [...data];

// //     // Apply sorting
// //     if (sortConfig) {
// //       tempData.sort((a, b) => {
// //         const aValue = a[sortConfig.key];
// //         const bValue = b[sortConfig.key];

// //         if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
// //         if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
// //         return 0;
// //       });
// //     }

// //     // Apply search query
// //     if (searchQuery) {
// //       tempData = tempData.filter((row) =>
// //         Object.values(row)
// //           .join(" ")
// //           .toLowerCase()
// //           .includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     setFilteredData(tempData);
// //     setCurrentPage(1); // Reset to first page when search or sorting changes
// //   }, [data, searchQuery, sortConfig]);

// //   // Pagination logic
// //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// //   const paginatedData = filteredData.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   // Handle sorting (asc -> desc -> reset)
// //   const handleSort = (key) => {
// //     setSortConfig((prev) => {
// //       if (!prev || prev.key !== key) {
// //         return { key, direction: "asc" };
// //       } else if (prev.direction === "asc") {
// //         return { key, direction: "desc" };
// //       } else {
// //         return null; // Reset to default order
// //       }
// //     });

// //     if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
// //       setFilteredData(defaultData); // Restore original order
// //     }
// //   };

// //   // Handle search input change
// //   const handleSearchChange = (event) => {
// //     setSearchQuery(event.target.value);
// //   };

// //   // Handle refresh action
// //   const handleRefresh = () => {
// //     if (onRefresh) {
// //       onRefresh();
// //     }
// //     else{
// //       window.location.reload();
// //     }
// //   };

// //   // Render page numbers
// //   const renderPageNumbers = () => {
// //     const pages = [];
// //     const visibleRange = 2;
// //     const startRange = Math.max(1, currentPage - visibleRange);
// //     const endRange = Math.min(totalPages, currentPage + visibleRange);

// //     if (startRange > 1) pages.push(1);
// //     if (startRange > 2) pages.push("...");

// //     for (let i = startRange; i <= endRange; i++) {
// //       pages.push(i);
// //     }

// //     if (endRange < totalPages - 1) pages.push("...");
// //     if (endRange < totalPages) pages.push(totalPages);

// //     return pages.map((page, index) =>
// //       typeof page === "number" ? (
// //         <button
// //           key={index}
// //           onClick={() => setCurrentPage(page)}
// //           className={`px-2 py-1 mx-1 ${
// //             page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
// //           } rounded`}
// //         >
// //           {page}
// //         </button>
// //       ) : (
// //         <span key={index} className="mx-1">
// //           ...
// //         </span>
// //       )
// //     );
// //   };

// //   return (
// //     <div className="overflow-x-auto">
// //       <div className="flex justify-between items-center mb-4">
// //         {enableSearch && (
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             value={searchQuery}
// //             onChange={handleSearchChange}
// //             className="border rounded p-2"
// //           />
// //         )}
// //         {enableRefresh && (
// //           <button
// //             onClick={handleRefresh}
// //             className="bg-blue-500 text-white px-4 py-2 rounded"
// //           >
// //             Refresh
// //           </button>
// //         )}
// //       </div>

// //       {/* Table */}
// //       <table className="table-auto w-full border-collapse border border-gray-300">
// //         <thead>
// //           <tr className="bg-gray-200">
// //             {columns?.map((col) => (
// //               <th
// //                 key={col.accessor}
// //                 className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
// //                 onClick={() => handleSort(col.accessor)}
// //               >
// //                 {col.header}
// //                 {sortConfig?.key === col.accessor && (
// //                   <span>
// //                     {sortConfig.direction === "asc" ? " 🔼" : " 🔽"}
// //                   </span>
// //                 )}
// //               </th>
// //             ))}
// //             <th className="border border-gray-300 px-4 py-2">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {paginatedData.map((row, rowIndex) => (
// //             <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// //               {columns?.map((col) => (
// //                 <td
// //                   key={col.accessor}
// //                   className="border border-gray-300 px-4 py-2"
// //                   style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}
// //                 >
// //                   {row[col.accessor] || "N/A"}
// //                 </td>
// //               ))}
// //               <td className="border border-gray-300 px-4 py-2">
// //                 {/* Add your action buttons/icons here */}
// //                 <button className="text-blue-500">Edit</button>
// //                 <button className="text-red-500 ml-2">Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //           {paginatedData.length === 0 && (
// //             <tr>
// //               <td colSpan={columns.length + 1} className="text-center py-4">
// //                 No data found.
// //               </td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>

// //       {/* Pagination Controls */}
// //       <div className="flex justify-center items-center mt-4">
// //         <button
// //           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //           disabled={currentPage === 1}
// //           className={`px-4 py-2 rounded mx-1 ${
// //             currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
// //           }`}
// //         >
// //           Previous
// //         </button>
// //         {renderPageNumbers()}
// //         <button
// //           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
// //           disabled={currentPage === totalPages}
// //           className={`px-4 py-2 rounded mx-1 ${
// //             currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
// //           }`}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResponsiveTable;