import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic for logout
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold">Admin Panel</div>
        <nav className="mt-4">
        <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/shopkeepers"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }>
            Shopkeepers
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }>
            Users
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }>
            Analytics
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }>
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center">
            <span className="mr-4">Admin Name</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
