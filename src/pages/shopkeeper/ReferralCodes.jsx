// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
// import { colorPalette } from "../../utils/demoData";
// import { registerUser, uploadBulkReferralCodes, getAllReferralCodeByShopkeeper } from "../../api/registerUser";
// import PhoneInputField from "../../components/ui/PhoneInputField";
// import { getCurrentUser } from "../../api/signin";
// import { getSettingsAction } from "../../api/settingPageApi";


// const ReferralManagement = () => {
//   const [codes, setCodes] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showFailedModal, setShowFailedModal] = useState(false);

//   // Individual Registration
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [referralAmount, setReferralAmount] = useState("");
//   const [referrerAmount, setReferrerAmount] = useState("");
//   const [failedUsers, setFailedUsers] = useState([]);


//   // Bulk Upload
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkExpiryDate, setBulkExpiryDate] = useState("");
//   const [bulkReferralAmount, setBulkReferralAmount] = useState("");
//   const [bulkReferrerAmount, setBulkReferrerAmount] = useState("");
//   const [failedUsersPage, setFailedUsersPage] = useState(1);
//   const [referralAmountReadOnly, setReferralAmountReadOnly] = useState(false);
//   const [referrerAmountReadOnly, setReferrerAmountReadOnly] = useState(false);
//   const [referralPromotionEndDateReadOnly, setReferralPromotionEndDateReadOnly] = useState(false);
//   const [expiryReadOnly, setExpiryReadOnly] = useState(false);


//   const failedUsersPerPage = 5;

//   const [type, setType] = useState("R");
//   // const shopkeeperId = localStorage.getItem("shopkeeperId");
//   const [userDetails, setUserDetails] = useState(null);
//   const [settingDetails, setSettingDetails] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = await getCurrentUser();
//         console.log("Fetched user:", user.id);
//         setUserDetails(user);
//       } catch (error) {
//         console.error("Error fetching monthly data:", error);
//       }
//     };

//     fetchData();
//   }, []);
//   const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId"); // Replace with actual shopkeeper ID
//   useEffect(() => {
//     const fetchSettingData = async () => {
//       try {
//         const setting = await getSettingsAction(shopkeeperId);
//         console.log("Fetched user:", shopkeeperId);
//         setSettingDetails(setting);
//         if (setting?.referralAmount != null) {
//           setReferralAmount(setting.referralAmount);
//           setReferralAmountReadOnly(true);
//           setBulkReferralAmount(setting.referralAmount);
//         }
//         if (setting?.referrerAmount != null) {
//           setReferrerAmount(setting.referrerAmount);
//           setReferrerAmountReadOnly(true);
//           setBulkReferrerAmount(setting.referrerAmount);
//         }
//         if (setting?.referralPromotionEndDate != null) {
//           // setReferralPromotionEndDate(setting.referralPromotionEndDate);
//           // setReferralPromotionEndDateReadOnly(true); 
//           const formattedDate = setting.referralPromotionEndDate.split("T")[0]; // ensures YYYY-MM-DD
//           setExpiryDate(formattedDate);
//           setBulkExpiryDate(formattedDate);
//           setExpiryReadOnly(true);
//         }
//       } catch (error) {
//         console.error("Error fetching monthly data:", error);
//       }
//     };

//     fetchSettingData();
//   }, []);

//   useEffect(() => {
//     const fetchCodes = async () => {
//       setIsLoading(true);
//       const toastId = toast.loading("Fetching referral codes...");
//       try {
//         const result = await getAllReferralCodeByShopkeeper(shopkeeperId);
//         setCodes(result);
//         toast.update(toastId, { render: result.message || "Referral codes fetched successfully!", type: "success", isLoading: false, autoClose: 3000 });
//       } catch (error) {
//         toast.update(toastId, { render: error.message || "Failed to fetch referral codes.", type: "error", isLoading: false, autoClose: 3000 });
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCodes();
//   }, []);

//   const handleRegister = async () => {
//     if (!name || !email || !phone || !expiryDate || !referralAmount || !referrerAmount) {
//       toast.warn("Please fill in all fields.");
//       return;
//     }
//     // email validation
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         toast.error("Invalid email format.");
//         return;
//        }

//     const userData = { name, email, phone, expiryDate, referralAmount, referrerAmount, type };
//     const toastId = toast.loading("Registering user...");

//     // try {
//     //   const result = await registerUser(userData, shopkeeperId);
//     //   toast.update(toastId, { render: result.message || "User registered successfully!", type: "success", isLoading: false, autoClose: 3000 });
//     //   // window.location.reload();
//     // } catch (error) {
//     //   toast.update(toastId, { render: error || "Failed to register user.", type: "error", isLoading: false, autoClose: 3000 });
//     // }
//     try {
//       const result = await registerUser(userData, shopkeeperId);
//       toast.update(toastId, {
//         render: typeof result === "string" ? result : "User registered successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//       });
//       setTimeout(() => {
//         window.location.reload();
//       }, 3000);
//     } catch (error) {
//       toast.update(toastId, {
//         render: error.message || "Failed to register user.",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//     setTimeout(() => {
//       window.location.reload();
//     }, 3000);
//   };

//   const handleBulkUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     setBulkFile(file);
//   };

//   const handleBulkGenerate = async () => {
//     if (!bulkFile || !bulkExpiryDate || !bulkReferralAmount || !bulkReferrerAmount) {
//       toast.warn("All fields are required for bulk upload.");
//       return;
//     }

//     const toastId = toast.loading("Generating bulk referral codes...");
//     try {
//       const result = await uploadBulkReferralCodes(
//         bulkFile,
//         bulkExpiryDate,
//         bulkReferralAmount,
//         bulkReferrerAmount,
//         0,
//         shopkeeperId,
//         "R"
//       );
//       setFailedUsers(result.failedUsers || []);
//       if (result.failedUsers?.length > 0) {
//         toast.update(toastId, {
//           render: `Upload completed. ${result.failedUsers.length} failed.`,
//           type: "error",
//           isLoading: false,
//           // autoClose: false,
//           // closeOnClick: true,
//           autoClose: 3000,
//         });
//         setShowFailedModal(true);
//       } else {
//         toast.update(toastId, {
//           render: result.message || "Bulk referral codes generated successfully.",
//           type: "success",
//           isLoading: false,
//           autoClose: 3000,
//         });
//         setTimeout(() => {
//       window.location.reload();
//     }, 3000);
//       }
//       // Add delayed page reload here (10 seconds)
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 15000);

//     } catch (error) {
//       toast.update(toastId, {
//         render: error.message || "Failed to generate bulk referral codes.",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     }
//   };

//   //  Edit Function
//   const handleEdit = (row) => {
//     console.log("Editing:", row);
//     // Add your edit logic here
//   };

//   //  Delete Function
//   const handleDelete = (row) => {
//     console.log("Deleting:", row);
//     setCodes((prev) => prev.filter((code) => code.code !== row.code));
//   };

//   // Bulk Edit/Delete Function
//   const handleBulkAction = (action, selectedRows) => {
//     console.log(`${action.toUpperCase()} Selected Rows:`, selectedRows);

//     if (action === "delete") {
//       setCodes((prev) => prev.filter((code) => !selectedRows.some((row) => row.code === code.code)));
//     }
//   };

//   const handleDownloadCSV = () => {
//     const headers = ["Name", "Email", "Phone", "Reason"];
//     const rows = failedUsers.map(user =>
//       [user.name, user.email, user.phone, user.reason].join(",")
//     );
//     const csvContent = [headers.join(","), ...rows].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "Referral_failed_users.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   const paginatedFailedUsers = failedUsers.slice(
//     (failedUsersPage - 1) * failedUsersPerPage,
//     failedUsersPage * failedUsersPerPage
//   );
//   const failedUsersTotalPages = Math.ceil(failedUsers.length / failedUsersPerPage);

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="min-h-screen p-8" style={{ backgroundColor: colorPalette.primaryLight }}>
//         <h1 className="text-3xl font-bold text-white mb-6">Manage Referral Codes</h1>

//         {/* Individual Referral Code Generation */}
//         <section className="mb-8 bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
//             Individual Referral Code Generation
//           </h2>
//           {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//             {/* <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded p-2" /> */}

//             {/* Full Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             {/* <div className="flex flex-col">
//             <input 
//               type="email" 
//               placeholder="Email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               className={`border rounded p-2 w-full ${
//                 email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : ''
//               }`} 
//             />
//             {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
//               <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
//               )}
//             </div> */}

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="example@domain.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : ''
//                 }`}
//               />
//               {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
//                 <p className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
//               )}
//             </div>
            


//             {/* <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded p-2" /> */}
//             {/* <PhoneInputField
//               label=""
//               name="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               containerClass="w-full"
//               wrapperClass="flex flex-col"
//               inputClass="border rounded p-2 w-full"
//             /> */}
            
//             {/* Phone */}
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number <span className="text-red-500">*</span>
//               </label>
//               <PhoneInputField
//                 id="phone"
//                 name="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 containerClass="w-full"
//                 inputClass="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="border rounded p-2"
//               title="Expire Date - mm/dd/yyyy"
//               readOnly={expiryReadOnly} min={new Date().toISOString().split("T")[0]} /> */}

//             {/* Expiry Date */}
//             <div>
//               <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
//                 Expiry Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="expiryDate"
//                 type="date"
//                 value={expiryDate}
//                 onChange={(e) => setExpiryDate(e.target.value)}
//                 min={new Date().toISOString().split("T")[0]}
//                 readOnly={expiryReadOnly}
//                 className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>  

//             {/* <input type="number" min={0} placeholder="Referral Amount ($)" value={referralAmount}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setReferralAmount(isNaN(value) ? '' : Math.max(0, value));
//               }}
//               className="border rounded p-2"
//               readOnly={referralAmountReadOnly} /> */}

//             {/* Referral Amount */}
//             <div>
//               <label htmlFor="referralAmount" className="block text-sm font-medium text-gray-700 mb-1">
//                 Referral Amount ($) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="referralAmount"
//                 type="number"
//                 min="0"
//                 placeholder="0.00"
//                 value={referralAmount}
//                 onChange={(e) => {
//                   const value = Number(e.target.value);
//                   setReferralAmount(isNaN(value) ? '' : Math.max(0, value));
//                 }}
//                 readOnly={referralAmountReadOnly}
//                 className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>


//             {/* <input type="number" min={0} placeholder="Referrer Amount ($)" value={referrerAmount}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
//               }}
//               className="border rounded p-2"
//               readOnly={referrerAmountReadOnly} /> */}

//             {/* Referrer Amount */}
//             <div>
//               <label htmlFor="block text-sm font-medium text-gray-700 mb-1">
//                 Referrer Amount ($) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="referrerAmount"
//                 type="number"
//                 min="0"
//                 placeholder="0.00"
//                 value={referrerAmount}
//                 onChange={(e) => {
//                   const value = Number(e.target.value);
//                   setReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
//                 }}
//                 readOnly={referrerAmountReadOnly}
//                 className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>  
//           </div>
//           {/* <button onClick={handleRegister} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
//             Generate Code
//           </button> */}
//           <button
//             onClick={handleRegister}
//             className="px-4 py-2 rounded text-white transition"
//             style={{ backgroundColor: colorPalette.accent }}
//           >
//             Generate Referral Code
//           </button>
//         </section>

//         {/* Bulk Upload Section */}
//         <section className="mb-8 bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
//             Bulk Referral Code Upload
//           </h2>
//           {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             {/* <input type="file" accept=".csv, .xls, .xlsx"
//               onChange={handleBulkUpload} className="border rounded p-2" /> */}

//             {/* File Upload */}
//             <div>
//               <label htmlFor="bulkFile" className="block text-sm font-medium text-gray-700 mb-1">
//                 Upload CSV/Excel File <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="bulkFile"
//                 type="file"
//                 accept=".csv, .xls, .xlsx"
//                 onChange={handleBulkUpload}
//                 className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//               {bulkFile && <p className="text-xs text-green-600 mt-1">Selected: {bulkFile.name}</p>}
//             </div> 

//             {/* <input type="date" value={bulkExpiryDate}
//               onChange={(e) => setBulkExpiryDate(e.target.value)} className="border rounded p-2"
//               title="Expire Date - mm/dd/yyyy"
//               readOnly={expiryReadOnly} min={new Date().toISOString().split("T")[0]} /> */}

//             {/* Bulk Expiry Date */}
//             <div>
//               <label htmlFor="bulkExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
//                 Expiry Date <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="bulkExpiryDate"
//                 type="date"
//                 value={bulkExpiryDate}
//                 onChange={(e) => setBulkExpiryDate(e.target.value)}
//                 min={new Date().toISOString().split("T")[0]}
//                 readOnly={expiryReadOnly}
//                 className="w-full border rounded px-3 py-2 bg-gray-50"
//               />
//             </div>  


//             {/* <input
//               type="number"
//               placeholder="Referral Amount ($)"
//               value={bulkReferralAmount}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
//               }}
//               className="border rounded p-2"
//               readOnly={referralAmountReadOnly}
//             /> */}

//             {/* Bulk Referral Amount */}
//             <div>
//               <label htmlFor="bulkReferralAmount" className="block text-sm font-medium text-gray-700 mb-1">
//                 Referral Amount ($) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 id="bulkReferralAmount"
//                 type="number"
//                 min="0"
//                 placeholder="0.00"
//                 value={bulkReferralAmount}
//                 onChange={(e) => {
//                   const value = Number(e.target.value);
//                   setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
//                 }}
//                 readOnly={referralAmountReadOnly}
//                 className="w-full border rounded px-3 py-2 bg-gray-50"
//               />
//             </div>

//             {/* <input
//             type="number"
//             placeholder="Referrer Amount ($)"
//             value={bulkReferrerAmount}
//             onChange={(e) => {
//               const value = Number(e.target.value);
//               setBulkReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
//             }}
//             className="border rounded p-2"
//             readOnly={referrerAmountReadOnly}
//           /> */}
//           {/* Bulk Referrer Amount */}
//           <div>
//             <label htmlFor="bulkReferrerAmount" className="block text-sm font-medium text-gray-700 mb-1">
//               Referrer Amount ($) <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="bulkReferrerAmount"
//               type="number"
//               min="0"
//               placeholder="0.00"
//               value={bulkReferrerAmount}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setBulkReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
//               }}
//               readOnly={referrerAmountReadOnly}
//               className="w-full border rounded px-3 py-2 bg-gray-50"
//             />
//           </div>

//           </div>
//           {/* <button onClick={handleBulkGenerate} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
//             Generate Bulk Codes
//           </button> */}

//           <button
//             onClick={handleBulkGenerate}
//             className="px-4 py-2 rounded text-white transition"
//             style={{ backgroundColor: colorPalette.accent }}
//           >
//             Generate Bulk Codes
//           </button>
//         </section>

//         {showFailedModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
//               <h2 className="text-xl font-bold mb-4 text-red-700">Failed Users</h2>

//               {/* Paginated Data */}
//               <div className="overflow-x-auto max-h-96 overflow-y-auto mb-4">
//                 <table className="min-w-full text-sm border">
//                   <thead className="bg-red-100 text-red-800">
//                     <tr>
//                       <th className="border px-4 py-2">Name</th>
//                       <th className="border px-4 py-2">Email</th>
//                       <th className="border px-4 py-2">Phone</th>
//                       <th className="border px-4 py-2">Reason</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedFailedUsers.map((user, idx) => (
//                       <tr key={idx} className="bg-white hover:bg-red-50">
//                         <td className="border px-4 py-2">{user.name}</td>
//                         <td className="border px-4 py-2">{user.email}</td>
//                         <td className="border px-4 py-2">{user.phone}</td>
//                         <td className="border px-4 py-2 text-red-600">{user.reason}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination Controls */}
//               {failedUsersTotalPages > 1 && (
//                 <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
//                   <span>
//                     Page {failedUsersPage} of {failedUsersTotalPages}
//                   </span>
//                   <div className="space-x-2">
//                     <button
//                       onClick={() => setFailedUsersPage((prev) => Math.max(prev - 1, 1))}
//                       disabled={failedUsersPage === 1}
//                       className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setFailedUsersPage((prev) =>
//                           Math.min(prev + 1, failedUsersTotalPages)
//                         )
//                       }
//                       disabled={failedUsersPage === failedUsersTotalPages}
//                       className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={handleDownloadCSV}
//                 >
//                   Download CSV
//                 </button>
//                 <button
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                   onClick={() => {
//                     setShowFailedModal(false);
//                     setTimeout(() => window.location.reload(), 3000);
//                   }}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}


//         <section className="bg-white p-6 rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
//             Generated Referral Codes
//           </h2>

//           {isLoading ? (
//             <p>Loading...</p>
//           ) : codes.length > 0 ? (
//             <ResponsiveTable
//               rowData={codes.map((code) => ({
//                 name: code.user?.name || "N/A",
//                 email: code.user?.email || "N/A",
//                 phone: code.user?.phone || "N/A",
//                 expiryDate: code.expiryDate || "",
//                 referralAmount: `$${code.referralAmount || 0}`,
//                 referrerAmount: `$${code.referrerAmount || 0}`,
//                 code: code.code || "N/A",
//                 status: code.status || "N/A",
//                 createdDate: code.createdDate || "N/A",
//               }))}
//               columnDefs={[
//                 { headerName: "Name", field: "name" },
//                 { headerName: "Email", field: "email" },
//                 { headerName: "Phone", field: "phone" },
//                 { headerName: "Expiry Date", field: "expiryDate" },
//                 { headerName: "Referral Amount", field: "referralAmount" },
//                 { headerName: "Referrer Amount", field: "referrerAmount" },
//                 { headerName: "Code", field: "code" },
//                 { headerName: "Status", field: "status" },
//               ]}
//               filterableColumns={["status"]}
//               enableSorting={true}
//               enableRowSelection={true}
//               enableGlobalSearch={true}
//               enableDateFilter={true}
//               enableEdit={true}
//               enableDelete={false}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onBulkAction={handleBulkAction}
//             />
//           ) : (
//             <p>No referral codes found.</p>
//           )}
//         </section>

//       </div>
//     </>
//   );
// };

// export default ReferralManagement;

















import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import { colorPalette } from "../../utils/demoData";
import { registerUser, uploadBulkReferralCodes, getAllReferralCodeByShopkeeper } from "../../api/registerUser";
import PhoneInputField from "../../components/ui/PhoneInputField";
import { getCurrentUser } from "../../api/signin";
import { getSettingsAction } from "../../api/settingPageApi";


const ReferralManagement = () => {
  const [codes, setCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // Individual Registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [referralAmount, setReferralAmount] = useState("");
  const [referrerAmount, setReferrerAmount] = useState("");
  const [failedUsers, setFailedUsers] = useState([]);


  // Bulk Upload
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkExpiryDate, setBulkExpiryDate] = useState("");
  const [bulkReferralAmount, setBulkReferralAmount] = useState("");
  const [bulkReferrerAmount, setBulkReferrerAmount] = useState("");
  const [failedUsersPage, setFailedUsersPage] = useState(1);
  const [referralAmountReadOnly, setReferralAmountReadOnly] = useState(false);
  const [referrerAmountReadOnly, setReferrerAmountReadOnly] = useState(false);
  const [referralPromotionEndDateReadOnly, setReferralPromotionEndDateReadOnly] = useState(false);
  const [expiryReadOnly, setExpiryReadOnly] = useState(false);


  const failedUsersPerPage = 5;

  const [type, setType] = useState("R");
  // const shopkeeperId = localStorage.getItem("shopkeeperId");
  const [userDetails, setUserDetails] = useState(null);
  const [settingDetails, setSettingDetails] = useState(null);
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

  const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId"); // Replace with actual shopkeeper ID

  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const setting = await getSettingsAction(shopkeeperId);
        console.log("Fetched user:", shopkeeperId);
        setSettingDetails(setting);
        if (setting?.referralAmount != null) {
          setReferralAmount(setting.referralAmount);
          setReferralAmountReadOnly(true);
          setBulkReferralAmount(setting.referralAmount);
        }
        if (setting?.referrerAmount != null) {
          setReferrerAmount(setting.referrerAmount);
          setReferrerAmountReadOnly(true);
          setBulkReferrerAmount(setting.referrerAmount);
        }
        if (setting?.referralPromotionEndDate != null) {
          // setReferralPromotionEndDate(setting.referralPromotionEndDate);
          // setReferralPromotionEndDateReadOnly(true);
          const formattedDate = setting.referralPromotionEndDate.split("T")[0]; // ensures YYYY-MM-DD
          setExpiryDate(formattedDate);
          setBulkExpiryDate(formattedDate);
          setExpiryReadOnly(true);
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };
    fetchSettingData();
  }, []);

  useEffect(() => {
    const fetchCodes = async () => {
      setIsLoading(true);
      const toastId = toast.loading("Fetching referral codes...");
      try {
        const result = await getAllReferralCodeByShopkeeper(shopkeeperId);
        setCodes(result);
        toast.update(toastId, { render: result.message || "Referral codes fetched successfully!", type: "success", isLoading: false, autoClose: 3000 });
      } catch (error) {
        toast.update(toastId, { render: error.message || "Failed to fetch referral codes.", type: "error", isLoading: false, autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCodes();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !phone || !expiryDate || !referralAmount || !referrerAmount) {
      toast.warn("Please fill in all fields.");
      return;
    }
    // email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return;
       }
    const userData = { name, email, phone, expiryDate, referralAmount, referrerAmount, type };
    const toastId = toast.loading("Registering user...");
    // try {
    // const result = await registerUser(userData, shopkeeperId);
    // toast.update(toastId, { render: result.message || "User registered successfully!", type: "success", isLoading: false, autoClose: 3000 });
    // // window.location.reload();
    // } catch (error) {
    // toast.update(toastId, { render: error || "Failed to register user.", type: "error", isLoading: false, autoClose: 3000 });
    // }
    try {
      const result = await registerUser(userData, shopkeeperId);
      toast.update(toastId, {
        render: typeof result === "string" ? result : "User registered successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to register user.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setBulkFile(file);
  };

  const handleBulkGenerate = async () => {
    if (!bulkFile || !bulkExpiryDate || !bulkReferralAmount || !bulkReferrerAmount) {
      toast.warn("All fields are required for bulk upload.");
      return;
    }
    const toastId = toast.loading("Generating bulk referral codes...");
    try {
      const result = await uploadBulkReferralCodes(
        bulkFile,
        bulkExpiryDate,
        bulkReferralAmount,
        bulkReferrerAmount,
        0,
        shopkeeperId,
        "R"
      );
      setFailedUsers(result.failedUsers || []);
      if (result.failedUsers?.length > 0) {
        toast.update(toastId, {
          render: `Upload completed. ${result.failedUsers.length} failed.`,
          type: "error",
          isLoading: false,
          // autoClose: false,
          // closeOnClick: true,
          autoClose: 3000,
        });
        setShowFailedModal(true);
      } else {
        toast.update(toastId, {
          render: result.message || "Bulk referral codes generated successfully.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setTimeout(() => {
      window.location.reload();
    }, 3000);
      }
      // Add delayed page reload here (10 seconds)
      // setTimeout(() => {
      // window.location.reload();
      // }, 15000);
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to generate bulk referral codes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // Edit Function
  const handleEdit = (row) => {
    console.log("Editing:", row);
    // Add your edit logic here
  };

  // Delete Function
  const handleDelete = (row) => {
    console.log("Deleting:", row);
    setCodes((prev) => prev.filter((code) => code.code !== row.code));
  };

  // Bulk Edit/Delete Function
  const handleBulkAction = (action, selectedRows) => {
    console.log(`${action.toUpperCase()} Selected Rows:`, selectedRows);
    if (action === "delete") {
      setCodes((prev) => prev.filter((code) => !selectedRows.some((row) => row.code === code.code)));
    }
  };

  const handleDownloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Reason"];
    const rows = failedUsers.map(user =>
      [user.name, user.email, user.phone, user.reason].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Referral_failed_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTemplate = () => {
    const data = [
      ["!!! IMPORTANT - DO NOT CHANGE THIS ROW !!!", "", ""],
      ["name", "email", "phone"],                                                  
      ["Sample1", "Sample1@ifaceh.com", ""],
      ["Sample2", "Sample2@ifaceh.com", ""],
      ["Sample3", "Sample3@ifaceh.com", ""],
      ["Sample4", "Sample4@ifaceh.com", ""],
      ["Sample5", "Sample5@ifaceh.com", ""],
      ["Sample6", "Sample6@ifaceh.com", ""],
      ["", "", ""],
      ["INSTRUCTIONS (please read):", "", ""],
      ["→ Do NOT edit, delete or move the headers in row 2 (name, email, phone)", "", ""],
      ["→ Edit the sample values or delete them", "", ""],
      ["→ Add your own people starting from row 3", "", ""],
      ["→ You can add hundreds of rows - no limit", "", ""]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    const warningStyle = {
      font: { bold: true, sz: 14, color: { rgb: "FF0000" } }, 
      fill: { fgColor: { rgb: "FFFF00" } },                      
      alignment: { horizontal: "center", wrapText: true }
    };

    const headerStyle = {
      font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1F497D" } },                       
      alignment: { horizontal: "center" }
    };

    ws["A1"].s = warningStyle;
    ws["A2"].s = headerStyle;
    ws["B2"].s = headerStyle;
    ws["C2"].s = headerStyle;

    for (let r = 11; r <= 15; r++) {
      const addr = `A${r}`;
      if (ws[addr]) ws[addr].s = { font: { bold: true } };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");

    XLSX.writeFile(wb, "Template.xlsx");
  };

  const paginatedFailedUsers = failedUsers.slice(
    (failedUsersPage - 1) * failedUsersPerPage,
    failedUsersPage * failedUsersPerPage
  );
  const failedUsersTotalPages = Math.ceil(failedUsers.length / failedUsersPerPage);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen p-8" style={{ backgroundColor: colorPalette.primaryLight }}>
        <h1 className="text-3xl font-bold text-white mb-6">Manage Referral Codes</h1>
        {/* Individual Referral Code Generation */}
        <section className="mb-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
            Individual Referral Code Generation
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded p-2" /> */}
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded p-2 w-full ${
                email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : ''
              }`}
            />
            {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
              <p className="text-sm text-red-600 mt-1">Please enter a valid email address.</p>
              )}
            </div> */}
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'border-red-500' : ''
                }`}
              />
              {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <p className="text-xs text-red-600 mt-1">Please enter a valid email address.</p>
              )}
            </div>
           
            {/* <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded p-2" /> */}
            {/* <PhoneInputField
              label=""
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              containerClass="w-full"
              wrapperClass="flex flex-col"
              inputClass="border rounded p-2 w-full"
            /> */}
           
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInputField
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                containerClass="w-full"
                inputClass="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="border rounded p-2"
              title="Expire Date - mm/dd/yyyy"
              readOnly={expiryReadOnly} min={new Date().toISOString().split("T")[0]} /> */}
            {/* Expiry Date */}
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                readOnly={expiryReadOnly}
                className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <input type="number" min={0} placeholder="Referral Amount ($)" value={referralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setReferralAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referralAmountReadOnly} /> */}
            {/* Referral Amount */}
            <div>
              <label htmlFor="referralAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Referral Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="referralAmount"
                type="number"
                min="0"
                placeholder="0.00"
                value={referralAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setReferralAmount(isNaN(value) ? '' : Math.max(0, value));
                }}
                readOnly={referralAmountReadOnly}
                className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <input type="number" min={0} placeholder="Referrer Amount ($)" value={referrerAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referrerAmountReadOnly} /> */}
            {/* Referrer Amount */}
            <div>
              <label htmlFor="block text-sm font-medium text-gray-700 mb-1">
                Referrer Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="referrerAmount"
                type="number"
                min="0"
                placeholder="0.00"
                value={referrerAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
                }}
                readOnly={referrerAmountReadOnly}
                className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* <button onClick={handleRegister} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
            Generate Code
          </button> */}
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded text-white transition"
            style={{ backgroundColor: colorPalette.accent }}
          >
            Generate Referral Code
          </button>
        </section>
        {/* Bulk Upload Section */}
        <section className="mb-8 bg-white p-6 rounded shadow-md">
          {/* <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
            Bulk Referral Code Upload
          </h2> */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2
              className="text-xl font-semibold"
              style={{ color: colorPalette.primaryDark }}
            >
              Bulk Referral Code Upload
            </h2>

            <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
              <button
                onClick={handleDownloadTemplate}
                className="ml-4 px-4 py-2 rounded text-white transition"
                style={{ backgroundColor: colorPalette.primaryDark }}
                title="Download this template to see the correct bulk Referral Code upload format."
              >
                Download Template
              </button>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* <input type="file" accept=".csv, .xls, .xlsx"
              onChange={handleBulkUpload} className="border rounded p-2" /> */}
            {/* File Upload */}
            <div>
              <label htmlFor="bulkFile" className="block text-sm font-medium text-gray-700 mb-1">
                Upload CSV/Excel File <span className="text-red-500">*</span>
              </label>
              <input
                id="bulkFile"
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleBulkUpload}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {bulkFile && <p className="text-xs text-green-600 mt-1">Selected: {bulkFile.name}</p>}
            </div>
            {/* <input type="date" value={bulkExpiryDate}
              onChange={(e) => setBulkExpiryDate(e.target.value)} className="border rounded p-2"
              title="Expire Date - mm/dd/yyyy"
              readOnly={expiryReadOnly} min={new Date().toISOString().split("T")[0]} /> */}
            {/* Bulk Expiry Date */}
            <div>
              <label htmlFor="bulkExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="bulkExpiryDate"
                type="date"
                value={bulkExpiryDate}
                onChange={(e) => setBulkExpiryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                readOnly={expiryReadOnly}
                className="w-full border rounded px-3 py-2 bg-gray-50"
              />
            </div>
            {/* <input
              type="number"
              placeholder="Referral Amount ($)"
              value={bulkReferralAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              className="border rounded p-2"
              readOnly={referralAmountReadOnly}
            /> */}
            {/* Bulk Referral Amount */}
            <div>
              <label htmlFor="bulkReferralAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Referral Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="bulkReferralAmount"
                type="number"
                min="0"
                placeholder="0.00"
                value={bulkReferralAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setBulkReferralAmount(isNaN(value) ? '' : Math.max(0, value));
                }}
                readOnly={referralAmountReadOnly}
                className="w-full border rounded px-3 py-2 bg-gray-50"
              />
            </div>
            {/* <input
            type="number"
            placeholder="Referrer Amount ($)"
            value={bulkReferrerAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              setBulkReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
            }}
            className="border rounded p-2"
            readOnly={referrerAmountReadOnly}
          /> */}
          {/* Bulk Referrer Amount */}
          <div>
            <label htmlFor="bulkReferrerAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Referrer Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              id="bulkReferrerAmount"
              type="number"
              min="0"
              placeholder="0.00"
              value={bulkReferrerAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setBulkReferrerAmount(isNaN(value) ? '' : Math.max(0, value));
              }}
              readOnly={referrerAmountReadOnly}
              className="w-full border rounded px-3 py-2 bg-gray-50"
            />
          </div>
          </div>
          {/* <button onClick={handleBulkGenerate} className="px-4 py-2 rounded" style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}>
            Generate Bulk Codes
          </button> */}
          <button
            onClick={handleBulkGenerate}
            className="px-4 py-2 rounded text-white transition"
            style={{ backgroundColor: colorPalette.accent }}
          >
            Generate Bulk Codes
          </button>
          {/* <button
            onClick={handleDownloadTemplate}
            className="ml-4 px-4 py-2 rounded text-white transition"
            style={{ backgroundColor: colorPalette.primaryDark }}
            title="Download this template to see the correct bulk upload format. Headers (name, email, phone) are protected - you can only edit/add values."
          >
            Download Template (Protected)
          </button> */}
        </section>
        {showFailedModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full">
              <h2 className="text-xl font-bold mb-4 text-red-700">Failed Users</h2>
              {/* Paginated Data */}
              <div className="overflow-x-auto max-h-96 overflow-y-auto mb-4">
                <table className="min-w-full text-sm border">
                  <thead className="bg-red-100 text-red-800">
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Phone</th>
                      <th className="border px-4 py-2">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFailedUsers.map((user, idx) => (
                      <tr key={idx} className="bg-white hover:bg-red-50">
                        <td className="border px-4 py-2">{user.name}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">{user.phone}</td>
                        <td className="border px-4 py-2 text-red-600">{user.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              {failedUsersTotalPages > 1 && (
                <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
                  <span>
                    Page {failedUsersPage} of {failedUsersTotalPages}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setFailedUsersPage((prev) => Math.max(prev - 1, 1))}
                      disabled={failedUsersPage === 1}
                      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setFailedUsersPage((prev) =>
                          Math.min(prev + 1, failedUsersTotalPages)
                        )
                      }
                      disabled={failedUsersPage === failedUsersTotalPages}
                      className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => {
                    setShowFailedModal(false);
                    setTimeout(() => window.location.reload(), 3000);
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.primaryDark }}>
            Generated Referral Codes
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : codes.length > 0 ? (
            <ResponsiveTable
              rowData={codes.map((code) => ({
                name: code.user?.name || "N/A",
                email: code.user?.email || "N/A",
                phone: code.user?.phone || "N/A",
                expiryDate: code.expiryDate || "",
                referralAmount: `$${code.referralAmount || 0}`,
                referrerAmount: `$${code.referrerAmount || 0}`,
                code: code.code || "N/A",
                status: code.status || "N/A",
                createdDate: code.createdDate || "N/A",
              }))}
              columnDefs={[
                { headerName: "Name", field: "name" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Expiry Date", field: "expiryDate" },
                { headerName: "Referral Amount", field: "referralAmount" },
                { headerName: "Referrer Amount", field: "referrerAmount" },
                { headerName: "Code", field: "code" },
                { headerName: "Status", field: "status" },
              ]}
              filterableColumns={["status"]}
              enableSorting={true}
              enableRowSelection={true}
              enableGlobalSearch={true}
              enableDateFilter={true}
              enableEdit={true}
              enableDelete={false}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBulkAction={handleBulkAction}
            />
          ) : (
            <p>No referral codes found.</p>
          )}
        </section>

      </div>
    </>
  );
};

export default ReferralManagement;
