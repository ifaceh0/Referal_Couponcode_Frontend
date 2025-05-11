// import React, { useState } from "react";

// const initialEmployees = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     phone: "123-456-7890",
//     email: "john.doe@example.com",
//     creationDate: "2023-06-01",
//     updatedDate: "2024-03-15",
//     isNew: false, // Added
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     phone: "987-654-3210",
//     email: "jane.smith@example.com",
//     creationDate: "2023-07-20",
//     updatedDate: "2024-04-02",
//     isNew: false, // Added
//   },
// ];

// const Employee = () => {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [editingEmployee, setEditingEmployee] = useState(null);

//   const handleDelete = (id) => {
//     setEmployees((prev) => prev.filter((emp) => emp.id !== id));
//   };

//   const handleAdd = () => {
//     const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
//     const today = new Date().toISOString().split("T")[0];
//     const newEmployee = {
//       id: newId,
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       creationDate: today,
//       updatedDate: today,
//       isNew: true, // Marking as new employee
//     };
//     setEmployees((prev) => [...prev, newEmployee]);
//     setEditingEmployee(newEmployee); // Open the modal for the new employee
//   };

//   const handleEdit = (employee) => {
//     setEditingEmployee({ ...employee, isNew: false }); // Marking as editing mode
//   };

//   const handleModalChange = (e) => {
//     const { name, value } = e.target;
//     setEditingEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setEmployees((prev) =>
//       prev.map((emp) =>
//         emp.id === editingEmployee.id
//           ? { ...editingEmployee, updatedDate: new Date().toISOString().split("T")[0] }
//           : emp
//       )
//     );
//     setEditingEmployee(null);
//   };

//   const handleClose = () => {
//     setEditingEmployee(null);
//   };

//   return (
//     <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6  mx-auto">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-2xl font-bold text-blue-700">Current Employee</h1>
//         <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//         >
//           + Add Employee
//         </button>
//       </div>

//       <div className="overflow-hidden">
//         <table className="min-w-full bg-white border border-gray-200 text-sm">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">First Name</th>
//               <th className="px-4 py-2 text-left">Last Name</th>
//               <th className="px-4 py-2 text-left">Phone Number</th>
//               <th className="px-4 py-2 text-left">Email Address</th>
//               <th className="px-4 py-2 text-left">Created</th>
//               <th className="px-4 py-2 text-left">expired</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{emp.firstName}</td>
//                 <td className="px-4 py-2">{emp.lastName}</td>
//                 <td className="px-4 py-2">{emp.phone}</td>
//                 <td className="px-4 py-2">{emp.email}</td>
//                 <td className="px-4 py-2">{emp.creationDate}</td>
//                 <td className="px-4 py-2">{emp.updatedDate}</td>
//                 <td className="px-4 py-2 space-x-2 whitespace-nowrap">
//                   {/* <button
//                     onClick={() => handleEdit(emp)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   >
//                     Edit
//                   </button> */}
//                   <button
//                     onClick={() => handleDelete(emp.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit/Add Modal */}
//       {editingEmployee && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
//             <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
//               {editingEmployee.isNew ? "➕ Add Employee" : "✏️ Edit Employee"}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">First Name</label>
//                 <input
//                   name="firstName"
//                   value={editingEmployee.firstName}
//                   onChange={handleModalChange}
//                   placeholder="First Name"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//                 <input
//                   name="lastName"
//                   value={editingEmployee.lastName}
//                   onChange={handleModalChange}
//                   placeholder="Last Name"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
//                 <input
//                   name="phone"
//                   value={editingEmployee.phone}
//                   onChange={handleModalChange}
//                   placeholder="Phone Number"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//                 <input
//                   name="email"
//                   value={editingEmployee.email}
//                   onChange={handleModalChange}
//                   placeholder="Email Address"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={handleClose}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 ✅ OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Employee;

// import React, { useState } from "react";

// const initialEmployees = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     phone: "123-456-7890",
//     email: "john.doe@example.com",
//     creationDate: "2023-06-01",
//     updatedDate: "2024-03-15",
//     isNew: false,
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     phone: "987-654-3210",
//     email: "jane.smith@example.com",
//     creationDate: "2023-07-20",
//     updatedDate: "2024-04-02",
//     isNew: false,
//   },
// ];

// const initialInvites = [
//   {
//     id: 1,
//     email: "new.user1@example.com",
//     creationDate: "2024-01-10",
//     expiredDate: "2024-02-10",
//   },
//   {
//     id: 2,
//     email: "new.user2@example.com",
//     creationDate: "2024-03-15",
//     expiredDate: "2024-04-15",
//   },
// ];

// const Employee = () => {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [invites, setInvites] = useState(initialInvites);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [inviteEmail, setInviteEmail] = useState("");

//   const handleDelete = (id) => {
//     setEmployees((prev) => prev.filter((emp) => emp.id !== id));
//   };

//   const handleDeleteInvite = (id) => {
//     setInvites((prev) => prev.filter((invite) => invite.id !== id));
//   };

//   const handleAdd = () => {
//     const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
//     const today = new Date().toISOString().split("T")[0];
//     const newEmployee = {
//       id: newId,
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       creationDate: today,
//       updatedDate: today,
//       isNew: true,
//     };
//     setEmployees((prev) => [...prev, newEmployee]);
//     setEditingEmployee(newEmployee);
//   };

//   const handleInvite = () => {
//     setShowInviteModal(true);
//   };

//   const handleSendInvite = () => {
//     if (!inviteEmail) return;
    
//     const newId = invites.length ? Math.max(...invites.map((i) => i.id)) + 1 : 1;
//     const today = new Date().toISOString().split("T")[0];
//     const expiredDate = new Date();
//     expiredDate.setMonth(expiredDate.getMonth() + 1);
//     const formattedExpiredDate = expiredDate.toISOString().split("T")[0];
    
//     const newInvite = {
//       id: newId,
//       email: inviteEmail,
//       creationDate: today,
//       expiredDate: formattedExpiredDate,
//     };
    
//     setInvites((prev) => [...prev, newInvite]);
//     setInviteEmail("");
//     setShowInviteModal(false);
//   };

//   const handleEdit = (employee) => {
//     setEditingEmployee({ ...employee, isNew: false });
//   };

//   const handleModalChange = (e) => {
//     const { name, value } = e.target;
//     setEditingEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setEmployees((prev) =>
//       prev.map((emp) =>
//         emp.id === editingEmployee.id
//           ? { ...editingEmployee, updatedDate: new Date().toISOString().split("T")[0] }
//           : emp
//       )
//     );
//     setEditingEmployee(null);
//   };

//   const handleClose = () => {
//     setEditingEmployee(null);
//   };

//   return (
//     <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 mx-auto">
//       {/* Current Employees Table */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-2xl font-bold text-blue-700">Current Employee</h1>
//         {/* <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//         >
//           + Add Employee
//         </button> */}
//       </div>

//       <div className="overflow-hidden mb-10">
//         <table className="min-w-full bg-white border border-gray-200 text-sm">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">First Name</th>
//               <th className="px-4 py-2 text-left">Last Name</th>
//               <th className="px-4 py-2 text-left">Phone Number</th>
//               <th className="px-4 py-2 text-left">Email Address</th>
//               <th className="px-4 py-2 text-left">Created</th>
//               <th className="px-4 py-2 text-left">Expired</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => (
//               <tr key={emp.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{emp.firstName}</td>
//                 <td className="px-4 py-2">{emp.lastName}</td>
//                 <td className="px-4 py-2">{emp.phone}</td>
//                 <td className="px-4 py-2">{emp.email}</td>
//                 <td className="px-4 py-2">{emp.creationDate}</td>
//                 <td className="px-4 py-2">{emp.updatedDate}</td>
//                 <td className="px-4 py-2 space-x-2 whitespace-nowrap">
//                   <button
//                     onClick={() => handleDelete(emp.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Invite Employees Table */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-2xl font-bold text-blue-700">Add Employee</h1>
//         <button
//           onClick={handleInvite}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//         >
//           + Invite Employee
//         </button>
//       </div>

//       <div className="overflow-hidden">
//         <table className="min-w-full bg-white border border-gray-200 text-sm">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Created</th>
//               <th className="px-4 py-2 text-left">Expired</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invites.map((invite) => (
//               <tr key={invite.id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{invite.email}</td>
//                 <td className="px-4 py-2">{invite.creationDate}</td>
//                 <td className="px-4 py-2">{invite.expiredDate}</td>
//                 <td className="px-4 py-2 space-x-2 whitespace-nowrap">
//                   <button
//                     onClick={() => handleDeleteInvite(invite.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit/Add Employee Modal */}
//       {editingEmployee && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
//             <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
//               {editingEmployee.isNew ? "➕ Add Employee" : "✏️ Edit Employee"}
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">First Name</label>
//                 <input
//                   name="firstName"
//                   value={editingEmployee.firstName}
//                   onChange={handleModalChange}
//                   placeholder="First Name"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//                 <input
//                   name="lastName"
//                   value={editingEmployee.lastName}
//                   onChange={handleModalChange}
//                   placeholder="Last Name"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
//                 <input
//                   name="phone"
//                   value={editingEmployee.phone}
//                   onChange={handleModalChange}
//                   placeholder="Phone Number"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//                 <input
//                   name="email"
//                   value={editingEmployee.email}
//                   onChange={handleModalChange}
//                   placeholder="Email Address"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={handleClose}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 ✅ OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Invite Employee Modal */}
//       {showInviteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
//             <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
//               ➕ Add Employee
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   value={inviteEmail}
//                   onChange={(e) => setInviteEmail(e.target.value)}
//                   placeholder="Enter email to invite"
//                   className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowInviteModal(false)}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendInvite}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 Invite to Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Employee;

import React, { useState,useEffect } from "react";
import { getAllShopEmployee,
  getAllInviteEmployee,
  deleteInvitation,
  employeeInvitation
 } from "../../api/employee";
 import { getCurrentUser } from "../../api/signin";
 import { toast, ToastContainer } from "react-toastify";

const initialEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    creationDate: "2023-06-01",
    updatedDate: "2024-03-15",
    isNew: false,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    email: "jane.smith@example.com",
    creationDate: "2023-07-20",
    updatedDate: "2024-04-02",
    isNew: false,
  },
];

const initialInvites = [
  {
    id: 1,
    email: "new.user1@example.com",
    creationDate: "2024-01-10",
    expiredDate: "2024-02-10",
    status: "Pending",
  },
  {
    id: 2,
    email: "new.user2@example.com",
    creationDate: "2024-03-15",
    expiredDate: "2024-04-15",
    status: "Pending",
  },
];

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
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const shopkeeperId = userDetails?.id;
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

  const handleSendInvite = async () => {
    if (!inviteEmail) return;
    setLoading(true);
        const toastId = toast.loading("Processing ...");
      try {
        const response = await employeeInvitation(inviteEmail );
        console.log(response)
        const updatedInvites = await getAllInviteEmployee(shopkeeperId);
        toast.success(toastId, {
                render: response,
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
                position: "top-right",
              });
        setInvites(updatedInvites);
        setInviteEmail("");
        setShowInviteModal(false);
        window.location.reload();
      } catch (error) {
        console.error("Failed to send invite", error);
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
        <h1 className="text-2xl font-bold text-blue-700">Add Employee</h1>
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
                <td className="px-4 py-2">{formatDate(invite.expiryDate)}</td>
                <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteInvite(invite.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
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
                ✅ OK
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
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-3 py-2 rounded-lg outline-none"
                />
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Invite to Sign-Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;