import React, { useState, useEffect } from "react";
import {
  getAllShopEmployee,
  getAllInviteEmployee,
  deleteInvitation,
  employeeInvitation
} from "../../api/employee";
import { getCurrentUser } from "../../api/signin";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [invites, setInvites] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const shopkeeperId = userDetails?.id;

  const validateEmailFormat = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        console.log("Fetched user:", user.id);
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!shopkeeperId) return;
    const fetchData = async () => {
      try {
        const empData = await getAllShopEmployee(shopkeeperId);
        setEmployees(empData);
        console.log(empData)

        const inviteData = await getAllInviteEmployee(shopkeeperId);
        setInvites(inviteData);
        console.log(inviteData)
        // setInvites(Array.isArray(inviteData) ? inviteData : []);

      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchData();
  }, [shopkeeperId]);

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleDeleteInvite = async (id) => {
    // setInvites((prev) => prev.filter((invite) => invite.id !== id));
    const confirmDelete = window.confirm("Do you want to delete this invitation?");
    if (!confirmDelete) return;
    try {
      await deleteInvitation(id);
      setInvites((prev) => prev.filter((invite) => invite.id !== id));
    } catch (error) {
      console.error("Failed to delete invite", error);
    }
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
      isNew: true,
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setEditingEmployee(newEmployee);
  };

  const handleInvite = () => {
    setShowInviteModal(true);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setInviteEmail(email);

    if (!email) {
      setEmailError("");
    } else if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address (e.g., user@example.com)");
    } else {
      setEmailError("");
    }
  };

  const handleSendInvite = async () => {
    if (!inviteEmail) return;
    setLoading(true);

    const toastId = toast.loading("Processing...");

    try {
      const response = await employeeInvitation(inviteEmail);
      console.log(response);

      const updatedInvites = await getAllInviteEmployee(shopkeeperId);
      setInvites(updatedInvites);

      toast.update(toastId, {
        render: response || "Invitation sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        position: "top-right",
      });

      setInviteEmail("");
      setShowInviteModal(false); //  Close modal here
    } catch (error) {
      console.error("Failed to send invite", error);
      toast.update(toastId, {
        render: error.message || "Failed to send invitation.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendInvite = async (id, inviteEmail) => {
    // if (!inviteEmail) return;
    // setLoading(true);

    const toastId = toast.loading("Processing...");

    try {
      //  Find invite by ID
      const existingInvite = invites.find(
        (invite) => invite.id === id && invite.email === inviteEmail
      );

      if (!existingInvite) {
        throw new Error("No matching invitation found for this email and ID.");
      }

      //  Proceed with sending
      const response = await employeeInvitation(inviteEmail, id);
      console.log(response);

      const updatedInvites = await getAllInviteEmployee(shopkeeperId);
      setInvites(updatedInvites);

      toast.update(toastId, {
        render: response || "Invitation sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        position: "top-right",
      });

      setInviteEmail("");
      setShowInviteModal(false); // Close modal
    } catch (error) {
      console.error("Failed to send invite", error);
      toast.update(toastId, {
        render: error.message || "Failed to send invitation.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (employee) => {
    setEditingEmployee({ ...employee, isNew: false });
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
    <>
      <ToastContainer />
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 mx-auto">
        {/* Current Employees Table */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Current Employee</h1>
        </div>

        <div className="overflow-hidden mb-10">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                {/* <th className="px-4 py-2 text-left">Last Name</th> */}
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Email Address</th>
                <th className="px-4 py-2 text-left">Created</th>
                {/* <th className="px-4 py-2 text-left">Expired</th> */}
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id || `${emp.email}-${emp.phone}`} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{emp.name}</td>
                    {/* <td className="px-4 py-2">{emp.lastName}</td> */}
                    <td className="px-4 py-2">{emp.phone}</td>
                    <td className="px-4 py-2">{emp.email}</td>
                    <td className="px-4 py-2">{formatDate(emp.createdDate)}</td>
                    {/* <td className="px-4 py-2">{emp.expiredDate ? formatDate(emp.expiredDate) : "—"}</td> */}
                    {/* <td className="px-4 py-2">{emp.updatedDate}</td> */}
                    {/* <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td> */}
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {/* Invite Employees Table */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-blue-700">New Employee</h1>
          <button
            onClick={handleInvite}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Add Employee
          </button>
        </div>

        <div className="overflow-hidden">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Created Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invites.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No employees Invitation found.
                  </td>
                </tr>
              ) : (
                invites.map((invite) => (
                  <tr key={invite.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{invite.email}</td>
                    <td className="px-4 py-2">{formatDate(invite.createdDate)}</td>
                    {/* <td className="px-4 py-2">{formatDate(invite.expiryDate)}</td> */}
                    <td className="px-4 py-2">{invite.status || "Pending"}</td>
                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteInvite(invite.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleResendInvite(invite.id, invite.email)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Resend
                      </button>
                    </td>
                  </tr>
                )))}
            </tbody>
          </table>
        </div>

        {/* Edit/Add Employee Modal */}
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
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Employee Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
              <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                ➕ Add Employee
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email to invite"
                    className={`w-full border ${inviteEmail && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(inviteEmail)
                        ? "border-red-500"
                        : "border-gray-300"
                      } focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none`}
                  />
                  {/* Add the validation message here */}
                  {inviteEmail && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(inviteEmail) && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvite}
                  // className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={!inviteEmail || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(inviteEmail)}
                  className={`px-4 py-2 rounded-lg transition text-white ${!inviteEmail || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(inviteEmail)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                  Invite to Sign-Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Employee;


