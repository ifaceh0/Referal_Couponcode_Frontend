import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaCog, FaBell } from "react-icons/fa";
import Cookies from "js-cookie";

const ShopkeeperDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Overlay to close sidebar when clicked outside */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg rounded-r-lg`}
      >
        <button
          onClick={closeSidebar}
          className="p-3 w-full text-center bg-blue-800 hover:bg-blue-700"
        >
          <FaTimes className="text-xl mx-auto" />
        </button>
        <nav className="mt-4 space-y-2 px-4">
          {[ 
            { to: "/shopkeeper/dashboard", label: "Dashboard" },
            { to: "/shopkeeper/referral-codes", label: "Referral Codes" },
            { to: "/shopkeeper/coupon-codes", label: "Coupon Codes" },
            { to: "/shopkeeper/interaction-panel", label: "Interaction Panel" },
            { to: "/shopkeeper/transaction", label: "Transaction" },
            { to: "/shopkeeper/subscription", label: "Subscription" },
            { to: "/shopkeeper/analytics", label: "Analytics" },
            { to: "/shopkeeper/settings", label: "Settings" },
            // { to: "/shopkeeper/generate-codes", label: "Generate Codes" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md hover:bg-blue-700 transition ${isActive ? "bg-blue-600" : ""}`
              }
              onClick={closeSidebar}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-2">
          <button onClick={toggleSidebar} className="text-blue-800 text-xl">
            <FaBars />
          </button>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative group">
              <button className="text-blue-800 text-lg focus:outline-none">
                <FaBell />
              </button>
              <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg border rounded-md p-2">
                <p className="text-sm">No new notifications</p>
              </div>
            </div>
            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <FaUser className="text-blue-800" />
                <span className="hidden lg:inline">Username</span>
              </button>
              <div className="hidden group-hover:block absolute top-full right-0 w-40 bg-white shadow-lg border rounded-md p-2">
                <NavLink to="/profile" className="block py-1 px-2 text-sm hover:bg-gray-100">
                  <FaUser className="inline mr-2" /> Profile
                </NavLink>
                <NavLink to="/settings" className="block py-1 px-2 text-sm hover:bg-gray-100">
                  <FaCog className="inline mr-2" /> Settings
                </NavLink>
                <button onClick={handleLogout} className="block py-1 px-2 text-sm hover:bg-gray-100 w-full text-left">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default ShopkeeperDashboardLayout;