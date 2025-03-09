import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Button,
  Paper,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete, Clear } from "@mui/icons-material";

const GlobalSearch = ({ filterValue, setFilterValue }) => (
  <TextField
    variant="outlined"
    size="small"
    placeholder="Search..."
    value={filterValue || ""}
    onChange={(e) => setFilterValue(e.target.value || undefined)}
    sx={{ width: "100%" }}
  />
);

const ResponsiveTable = ({
  rowData,
  columnDefs,
  filterableColumns = [],
  enableSorting = true,
  enableRowSelection = true,
  enableGlobalSearch = true,
  enableEdit = true,
  enableDelete = true,
  enableDateFilter = true,
  onEdit,
  onDelete,
  onBulkAction,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const [filters, setFilters] = useState({});
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const clearFilters = () => {
    setGlobalFilter("");
    setFilters({});
    setSelectedRows({});
    setDateFilter("");
  };

  const toggleSelectAll = () => {
    if (Object.keys(selectedRows).length === rowData.length) {
      setSelectedRows({});
    } else {
      const allSelected = {};
      rowData.forEach((row, index) => {
        allSelected[index] = true;
      });
      setSelectedRows(allSelected);
    }
  };

  const columns = useMemo(() => {
    const baseColumns = columnDefs.map((col) => ({
      header: col.headerName,
      accessorKey: col.field,
    }));

    if (enableEdit || enableDelete) {
      baseColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Box>
            {enableEdit && (
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(row.original)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {enableDelete && (
              <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(row.original)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ),
      });
    }

    // if (enableRowSelection) {
    //   baseColumns.unshift({
    //     id: "select",
    //     header: "",
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={selectedRows[row.id] || false}
    //         onChange={() =>
    //           setSelectedRows((prev) => ({
    //             ...prev,
    //             [row.id]: !prev[row.id],
    //           }))
    //         }
    //       />
    //     ),
    //   });
    if (enableRowSelection) {
      baseColumns.unshift({
        id: "select",
        header: (
          <Checkbox
            checked={Object.keys(selectedRows).length === rowData.length}
            indeterminate={
              Object.keys(selectedRows).length > 0 &&
              Object.keys(selectedRows).length < rowData.length
            }
            onChange={toggleSelectAll}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedRows[row.id] || false}
            onChange={() =>
              setSelectedRows((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              }))
            }
          />
        ),
      });
    }

    return baseColumns;
  }, [columnDefs, enableEdit, enableDelete, enableRowSelection, selectedRows, onEdit, onDelete]);

  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      for (const column of filterableColumns) {
        if (filters[column] && row[column] !== filters[column]) {
          return false;
        }
      }
      if (enableDateFilter && dateFilter) {
        return row.expiryDate?.includes(dateFilter);
      }
      return true;
    });
  }, [rowData, filters, dateFilter, enableDateFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Paper sx={{ padding: 2, width: "100%", overflow: "hidden" }}>
      <Toolbar sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
        {enableGlobalSearch && (
          <GlobalSearch filterValue={globalFilter} setFilterValue={setGlobalFilter} />
        )}
        {filterableColumns.map((column) => (
          <Box key={column} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">{column}:</Typography>
            <FormControl sx={{ width: 200 }}>
              <Select
                value={filters[column] || ""}
                onChange={(e) => handleFilterChange(column, e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All</MenuItem>
                {[...new Set(rowData.map((row) => row[column]))].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}
        {enableDateFilter && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Date:</Typography>
            <TextField
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              sx={{ width: 200 }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}
        <Button variant="outlined" onClick={clearFilters} startIcon={<Clear />}>
          Clear
        </Button>
      </Toolbar>

      {enableRowSelection && Object.keys(selectedRows).length > 0 && (
        <Button
          variant="contained"
          onClick={() => onBulkAction(Object.keys(selectedRows))}
          sx={{ mb: 2 }}
        >
          Perform Bulk Action
        </Button>
      )}

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header()
                      : header.column.columnDef.header}
                    {enableSorting &&
                      (header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(event, newPage) => table.setPageIndex(newPage)}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={(event) => table.setPageSize(Number(event.target.value))}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Paper>
  );
};

export default ResponsiveTable;
