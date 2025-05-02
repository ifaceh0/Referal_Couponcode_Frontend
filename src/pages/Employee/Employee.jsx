import React, { useState } from "react";

const initialEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    creationDate: "2023-06-01",
    updatedDate: "2024-03-15",
    isNew: false, // Added
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    creationDate: "2023-07-20",
    updatedDate: "2024-04-02",
    isNew: false, // Added
  },
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleAdd = () => {
    const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    const today = new Date().toISOString().split("T")[0];
    const newEmployee = {
      id: newId,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      creationDate: today,
      updatedDate: today,
      isNew: true, // Marking as new employee
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setEditingEmployee(newEmployee); // Open the modal for the new employee
  };

  const handleEdit = (employee) => {
    setEditingEmployee({ ...employee, isNew: false }); // Marking as editing mode
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee.id
          ? { ...editingEmployee, updatedDate: new Date().toISOString().split("T")[0] }
          : emp
      )
    );
    setEditingEmployee(null);
  };

  const handleClose = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6  mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Employee List</h1>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          + Add Employee
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Email Address</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Updated</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{emp.firstName}</td>
                <td className="px-4 py-2">{emp.lastName}</td>
                <td className="px-4 py-2">{emp.phone}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.creationDate}</td>
                <td className="px-4 py-2">{emp.updatedDate}</td>
                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
              {editingEmployee.isNew ? "➕ Add Employee" : "✏️ Edit Employee"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  name="firstName"
                  value={editingEmployee.firstName}
                  onChange={handleModalChange}
                  placeholder="First Name"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={editingEmployee.lastName}
                  onChange={handleModalChange}
                  placeholder="Last Name"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                  name="phone"
                  value={editingEmployee.phone}
                  onChange={handleModalChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  name="email"
                  value={editingEmployee.email}
                  onChange={handleModalChange}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                ✅ OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
