import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaCog, FaBell, FaQrcode, FaStore } from "react-icons/fa";
import Cookies from "js-cookie";
import { getCurrentUser } from '../api/signin';

const ShopkeeperDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    fetchUser();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserDetails(null);
    navigate('/signin');
  };

 const navItems = [
  {
    to: "/shopkeeper/dashboard",
    label: "Dashboard",
    roles: ["SHOPKEEPER", "SHOP_EMPLOYEE", "USER"],
  },
  {
    to: "/shopkeeper/referral-codes",
    label: "Referral Codes",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/coupon-codes",
    label: "Coupon Codes",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/interaction-panel",
    label: "Interaction Panel",
    icon: <FaQrcode />,
    roles: ["SHOPKEEPER", "SHOP_EMPLOYEE"],
  },
  {
    to: "/shopkeeper/shop",
    label: "Shop",
    icon: <FaStore />,
    roles: ["USER"], // excluded from SHOPKEEPER
  },
  {
    to: "/shopkeeper/transaction",
    label: "Transaction",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/subscription",
    label: "Subscription",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/analytics",
    label: "Analytics",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/settings",
    label: "Settings",
    roles: ["SHOPKEEPER"],
  },
  {
    to: "/shopkeeper/employee",
    label: "Employee",
    roles: ["SHOPKEEPER"], // excluded from USER
  },
];


  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true; // visible to all if roles not defined
    return item.roles.includes(userDetails?.role); // only show if role matches
  });

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
        {/* <nav className="mt-4 space-y-2 px-4">
          {[ 
            { to: "/shopkeeper/dashboard", label: "Dashboard" },
            { to: "/shopkeeper/referral-codes", label: "Referral Codes" },
            { to: "/shopkeeper/coupon-codes", label: "Coupon Codes" },
            { to: "/shopkeeper/interaction-panel", label: "Interaction Panel", icon: <FaQrcode /> },
            { to: "/shopkeeper/shop", label: "Shop", icon: <FaStore /> },
            { to: "/shopkeeper/transaction", label: "Transaction" },
            { to: "/shopkeeper/subscription", label: "Subscription" },
            { to: "/shopkeeper/analytics", label: "Analytics" },
            { to: "/shopkeeper/settings", label: "Settings" },
            { to: "/shopkeeper/employee", label: "Employee" },

      ].map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-blue-700 transition
           ${isActive ? "bg-blue-600" : ""}`
          }
          onClick={closeSidebar}
        >
          {icon && <span className="text-xl">{icon}</span>}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav> */}
    <nav className="mt-4 space-y-2 px-4">
          {filteredNavItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-blue-700 transition ${
                  isActive ? "bg-blue-600" : ""
                }`
              }
              onClick={closeSidebar}
            >
              {icon && <span className="text-xl">{icon}</span>}
              <span>{label}</span>
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
                <span className="hidden lg:inline">{userDetails?.name ? userDetails.name : "Username"}</span>
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