// Shopkeepers.jsx
import React from "react";
import ResponsiveTable from "../../components/Table/ResponsiveTable";
import { FaHome, FaToggleOn, FaCogs } from "react-icons/fa";

const Shopkeepers = () => {
  const shopkeepers = [
    { name: "Shopkeeper 1", status: "Active", date: "2023-12-01" },
    { name: "Shopkeeper 2", status: "Inactive", date: "2023-12-05" },
    { name: "Shopkeeper 3", status: "Active", date: "2023-12-07" },
  ];

  const actions = [
    {
      icon: <FaHome className="text-blue-500" />,
      handler: (row) => console.log("Access Dashboard:", row),
      className: "p-2 bg-blue-500 text-white rounded",
    },
    {
      icon: <FaToggleOn className="text-green-500" />,
      handler: (row) => console.log("Toggle Status:", row),
      className: "p-2 bg-gray-200 text-gray-700 rounded",
    },
    {
      icon: <FaCogs className="text-gray-700" />,
      handler: (row) => console.log("Change Subscription:", row),
      className: "p-2 bg-gray-200 text-gray-700 rounded",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopkeepers</h2>
      <div className="space-y-8">
        <ResponsiveTable
          headers={["Name", "Status", "Date"]}
          data={shopkeepers}
          actions={actions}
          searchableColumns={["name"]}
          filterableColumns={["status","name"]}
          dateFilterColumn="date"
          variant="default"
        />
        <ResponsiveTable
          headers={["Name", "Status", "Date"]}
          data={shopkeepers}
          actions={actions}
          searchableColumns={["name"]}
          filterableColumns={["status"]}
          dateFilterColumn="date"
          variant="minimal"
        />
        <ResponsiveTable
          headers={["Name", "Status", "Date"]}
          data={shopkeepers}
          actions={actions}
          searchableColumns={["name"]}
          filterableColumns={["status"]}
          dateFilterColumn="date"
          variant="modern"
        />
      </div>
    </div>
  );
};

export default Shopkeepers;
