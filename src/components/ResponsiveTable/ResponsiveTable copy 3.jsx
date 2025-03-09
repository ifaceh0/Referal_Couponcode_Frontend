// import React, { useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Checkbox,
//   IconButton,
//   TextField,
//   Toolbar,
//   Typography,
//   Tooltip,
//   Button,
//   Paper,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// // 🔍 Global Search Component
// const GlobalSearch = ({ filterValue, setFilterValue }) => (
//   <TextField
//     variant="outlined"
//     size="small"
//     placeholder="Search..."
//     value={filterValue || ""}
//     onChange={(e) => setFilterValue(e.target.value || undefined)}
//     sx={{ mb: 2, width: "100%" }}
//   />
// );

// const ResponsiveTable = ({
//   rowData,
//   columnDefs,
//   enableSorting = true,
//   enableRowSelection = true,
//   enableGlobalSearch = true,
//   enableEdit = true,
//   enableDelete = true,
//   onEdit,
//   onDelete,
//   onBulkAction,
// }) => {
//   const [globalFilter, setGlobalFilter] = useState("");

//   const columns = useMemo(() => {
//     const baseColumns = columnDefs.map((col) => ({
//       header: col.headerName,
//       accessorKey: col.field,
//     }));

//     if (enableEdit || enableDelete) {
//       baseColumns.push({
//         id: "actions",
//         header: "Actions",
//         cell: ({ row }) => (
//           <div>
//             {enableEdit && (
//               <Tooltip title="Edit">
//                 <IconButton onClick={() => onEdit(row.original)}>
//                   <Edit />
//                 </IconButton>
//               </Tooltip>
//             )}
//             {enableDelete && (
//               <Tooltip title="Delete">
//                 <IconButton onClick={() => onDelete(row.original)}>
//                   <Delete />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </div>
//         ),
//       });
//     }

//     return baseColumns;
//   }, [columnDefs, enableEdit, enableDelete, onEdit, onDelete]);

//   const table = useReactTable({
//     data: rowData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: { globalFilter },
//     onGlobalFilterChange: setGlobalFilter,
//   });

//   return (
//     <Paper sx={{ padding: 2, width: "100%", overflow: "hidden" }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
//           Generated Referral Codes
//         </Typography>
//         {enableGlobalSearch && <GlobalSearch filterValue={globalFilter} setFilterValue={setGlobalFilter} />}
//       </Toolbar>

//       {enableRowSelection && table.getFilteredSelectedRowModel().rows.length > 0 && (
//         <Button
//           variant="contained"
//           onClick={() => onBulkAction(table.getFilteredSelectedRowModel().rows.map((d) => d.original))}
//           sx={{ mb: 2 }}
//         >
//           Perform Bulk Action
//         </Button>
//       )}

//       <TableContainer>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
//                     {typeof header.column.columnDef.header === "function"
//                       ? header.column.columnDef.header()
//                       : header.column.columnDef.header}
//                     {enableSorting &&
//                       (header.column.getIsSorted() === "asc"
//                         ? " 🔼"
//                         : header.column.getIsSorted() === "desc"
//                         ? " 🔽"
//                         : " ↕")}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHead>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={rowData.length}
//         page={table.getState().pagination.pageIndex}
//         onPageChange={(event, newPage) => table.setPageIndex(newPage)}
//         rowsPerPage={table.getState().pagination.pageSize}
//         onRowsPerPageChange={(event) => table.setPageSize(Number(event.target.value))}
//         rowsPerPageOptions={[5, 10, 25, 50, 100]}
//       />
//     </Paper>
//   );
// };

// export default ResponsiveTable;
