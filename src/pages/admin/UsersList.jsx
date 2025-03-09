import React, { useState } from "react";
import { FaToggleOn, FaToggleOff, FaSearch } from "react-icons/fa";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
  ]);

  const handleStatusChange = (id) => {
    // Toggle user status
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      {/* Search Bar */}
      <div className="relative w-full md:w-1/2 mb-4">
        <FaSearch className="absolute top-3 left-3 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition-colors duration-200">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleStatusChange(user.id)}
                    className="relative group">
                    {user.status === "Active" ? (
                      <FaToggleOn
                        size={24}
                        className="text-green-500 transition-transform duration-300 transform group-hover:scale-110"
                      />
                    ) : (
                      <FaToggleOff
                        size={24}
                        className="text-gray-500 transition-transform duration-300 transform group-hover:scale-110"
                      />
                    )}
                    <span className="absolute left-8 -top-1 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100">
                      Change Status
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
