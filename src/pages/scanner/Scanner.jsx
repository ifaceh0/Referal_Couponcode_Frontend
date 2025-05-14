// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QrScanner from "react-qr-scanner";
// import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa";

// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [redeemAmount, setRedeemAmount] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleScan = (data) => {
//     if (data) {
//       try {
//         console.log(data);
//         const parsedData = JSON.parse(data.text);
//         setScannedData(parsedData);
//         setOpen(true);
//         setError("");
//       } catch (error) {
//         console.error("Invalid JSON data:", error);
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//   };

//   const handleRedeemClick = () => {
//     if (!redeemAmount) {
//       setError("Please enter an amount.");
//       return;
//     }

//     const amount = parseFloat(redeemAmount);
//     const availableBalance = parseFloat(scannedData?.availableBalance || 0);

//     if (amount > availableBalance) {
//       setError("Amount cannot exceed available balance.");
//       return;
//     }

//     console.log("Sending data to backend:", { scannedData, redeemAmount });

//     // Close dialog and refresh page
//     setOpen(false);
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       {/* Back Button */}
//       <div className="w-full max-w-4xl mb-4">
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//       </div>

//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-3xl font-bold mb-8 text-gray-800"
//       >
//         QR Code Scanner
//       </motion.h1>

//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//         className="w-96 h-96 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"
//       >
//         <QrScanner
//           delay={100}
//           onScan={handleScan}
//           onError={handleError}
//           style={{ width: "100%", height: "100%" }}
//         />
//       </motion.div>

//       <Dialog
//         open={open}
//         onClose={handleCloseDialog}
//         PaperProps={{
//           style: {
//             borderRadius: "12px",
//             width: "600px",
//             maxWidth: "90%",
//           },
//         }}
//       >
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="p-6 bg-white">
//           {scannedData && (
//             <div className="flex flex-col md:flex-row">
//               {/* Right side - Available Balance (shown first on mobile) */}
//               <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
//                 <div className="text-center">
//                   <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
//                   <div className="text-4xl font-bold text-blue-600 mb-4">
//                     ${scannedData.availableBalance}
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${scannedData.couponAmount}</p>
//                     <p className="text-sm text-gray-600">Usage Limit: {scannedData.couponUsageLimit}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Left side - Customer Details (shown second on mobile) */}
//               <div className="w-full md:w-1/2 md:pr-4 md:order-1">
//                 <table className="w-full border-collapse border border-gray-300 text-left">
//                   <tbody>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Redeem Amount Input */}
//           <div className="mt-6">
//             <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
//             <input
//               type="text"
//               value={redeemAmount ? `$${redeemAmount}` : `$`}
//               onChange={(e) => {
//                 const value = e.target.value.substring(1).replace(/\D/g, "");
//                 setRedeemAmount(value);
//                 setError("");
//               }}
//               className={`w-full p-3 border ${
//                 error ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               placeholder="Enter amount"
//             />
//             {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//           </div>

//           {/* Redeem Button */}
//           <button
//             onClick={handleRedeemClick}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
//           >
//             Redeem
//           </button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Scanner;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QrScanner from "react-qr-scanner";
// import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import {  toast } from "react-toastify";

// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [redeemAmount, setRedeemAmount] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleScan = (data) => {
//     if (data) {
//       try {
//         console.log(data);
//         const parsedData = JSON.parse(data.text);
//         setScannedData(parsedData);
//         setOpen(true);
//         setError("");
//       } catch (error) {
//         console.error("Invalid JSON data:", error);
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//   };

//   const handleRedeemClick = async () => {
//     if (!redeemAmount) {
//       setError("Please enter an amount.");
//       return;
//     }
  
//     const amount = parseFloat(redeemAmount);
//     const availableBalance = parseFloat(scannedData?.availableBalance || 0);
  
//     if (amount > availableBalance) {
//       setError("Amount cannot exceed available balance.");
//       return;
//     }
  
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       setError("Authentication token not found.");
//       return;
//     }
  
//     const payload = {
//       customerId: scannedData.customerId,
//       referralCode: scannedData.referralCode,
//       discountAmount: amount,
//     };
  
//     setLoading(true);
//     const toastId = toast.loading("Processing redemption...");
    
//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       toast.update(toastId, {
//         render: "Discount redeemed successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//         closeOnClick: true,
//       });
  
//       setOpen(false); // close dialog
//       setScannedData(null); 
//       setRedeemAmount(""); 
//       setError("");
      
//     } catch (err) {
//       console.error("Redemption failed:", err);
//       toast.update(toastId, {
//         render: err.response?.data?.message || "Redemption failed. Please try again.",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//         closeOnClick: true,
//       });
//       setError("Redemption failed. Please try again.");
//     } finally {
//       setLoading(false); // Always stop loading in both success and error
//     }
//   };
  

//   const handleCloseDialog = () => {
//     setOpen(false);
//     setScannedData(null);
//     setRedeemAmount("");
//     setError("");
//     // setTimeout(() => {
//     //   // window.location.reload();
//     // }, 500);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       {/* Back Button */}
//       <div className="w-full max-w-4xl mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//       </div>

//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-3xl font-bold mb-8 text-gray-800"
//       >
//         QR Code Scanner
//       </motion.h1>

//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//         className="w-96 h-96 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"
//       >
//         <QrScanner
//           delay={100}
//           onScan={handleScan}
//           onError={handleError}
//           style={{ width: "100%", height: "100%" }}
//         />
//       </motion.div>

//       <Dialog
//         open={open}
//         onClose={handleCloseDialog}
//         PaperProps={{
//           style: {
//             borderRadius: "12px",
//             width: "600px",
//             maxWidth: "90%",
//           },
//         }}
//       >
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="p-6 bg-white">
//           {scannedData && (
//             <div className="flex flex-col md:flex-row">
//               <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
//                 <div className="text-center">
//                   <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
//                   <div className="text-4xl font-bold text-blue-600 mb-4">
//                     ${scannedData.availableBalance}
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${scannedData.couponAmount}</p>
//                     <p className="text-sm text-gray-600">Usage Limit: {scannedData.couponUsageLimit}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full md:w-1/2 md:pr-4 md:order-1">
//                 <table className="w-full border-collapse border border-gray-300 text-left">
//                   <tbody>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <div className="mt-6">
//             <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
//             <input
//               type="text"
//               value={redeemAmount ? `$${redeemAmount}` : `$`}
//               onChange={(e) => {
//                 const value = e.target.value.substring(1).replace(/\D/g, "");
//                 setRedeemAmount(value);
//                 setError("");
//               }}
//               className={`w-full p-3 border ${
//                 error ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               placeholder="Enter amount"
//             />
//             {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//           </div>

//           <button
//             onClick={handleRedeemClick}
//             disabled={loading}
//             className={`w-full font-bold py-3 rounded-lg mt-4 transition-all ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
//             }`}
//           >
//             {loading ? "Processing..." : "Redeem"}
//           </button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Scanner;

// import React, { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import QrScanner from "react-qr-scanner";
// import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa";
// import axios from "axios";
// import { toast , ToastContainer } from "react-toastify";
// import { getCurrentUser } from "../../api/signin";



// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [redeemAmount, setRedeemAmount] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);

//   const [errorDialogOpen, setErrorDialogOpen] = useState(false);// for dialog box
//   const [errorMessage, setErrorMessage] = useState("");// for dialog box

//      useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const user = await getCurrentUser();
//                     console.log("Fetched user:", user.id);
//                     setUserDetails(user);
//                 } catch (error) {
//                     console.error("Error fetching monthly data:", error);
//                 }
//             };
    
//             fetchData();
//         }, []);

//   const handleScan = (data) => {
//     if (data) {
//       try {
//         console.log(data);
//         const parsedData = JSON.parse(data.text);
//         if (!userDetails) {
//           toast.error("User details not loaded yet. Please try again.");
//           return;
//         }
//         console.log("Scanned shopID:", parsedData.shopID);
//         console.log("Current userID:", userDetails.id);
//         // Validate shop ID
//         // if (String(parsedData.shopID) !== String(userDetails.id)) {
//         //   console.warn("Mismatch detected – IDs are not the same.");
//         //   toast.error("Invalid scan code. This customer does not belong to your shop.");
//         //   return;
//         // }

//         // display error in the dialog
//         if (String(parsedData.shopID) !== String(userDetails.id)) {
//           console.warn("Mismatch detected – IDs are not the same.");
//           setErrorMessage("Invalid scan code. This customer does not belong to your shop.");
//           setErrorDialogOpen(true);
//           return;
//         }

//         setScannedData(parsedData);
//         setOpen(true);
//         setError("");
//       } catch (error) {
//         console.error("Invalid JSON data:", error);
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//   };

//   const handleRedeemClick = async () => {
//     if (!redeemAmount) {
//       setError("Please enter an amount.");
//       return;
//     }

//     const amount = parseFloat(redeemAmount);
//     const availableBalance = parseFloat(scannedData?.availableBalance || 0);

//     if (amount > availableBalance) {
//       setError("Amount cannot exceed available balance.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("Authentication token not found.");
//       return;
//     }

//     const payload = {
//       customerId: scannedData.customerId,
//       referralCode: scannedData.referralCode,
//       discountAmount: amount,
//     };

//     setLoading(true);
//     const toastId = toast.loading("Processing redemption...");

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.update(toastId, {
//         render: "Discount redeemed successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//         closeOnClick: true,
//         position: "top-right",
//       });

//       setOpen(false);
//       setScannedData(null);
//       setRedeemAmount("");
//       setError("");

//       // Allow toast to show before navigating
//       setTimeout(() => {
//         navigate("/shopkeeper/interaction-panel");
//       }, 500);
//     } catch (err) {
//       console.error("Redemption failed:", err);
//       toast.update(toastId, {
//         render: err.response?.data?.message || "Redemption failed. Please try again.",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//         closeOnClick: true,
//         position: "top-right",
//       });
//       setError("Redemption failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//     setScannedData(null);
//     setRedeemAmount("");
//     setError("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       <div className="w-full max-w-4xl mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//       </div>

//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-3xl font-bold mb-8 text-gray-800"
//       >
//         QR Code Scanner
//       </motion.h1>

//       {userDetails ? (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="w-96 h-96 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"
//           >
//             <QrScanner
//               delay={100}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </motion.div>
//         ) : (
//           <p className="text-gray-600 mt-4">Loading ...</p>
//         )}

//       <Dialog
//         open={open}
//         onClose={handleCloseDialog}
//         PaperProps={{
//           style: {
//             borderRadius: "12px",
//             width: "600px",
//             maxWidth: "90%",
//           },
//         }}
//       >
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="p-6 bg-white">
//           {scannedData && (
//             <div className="flex flex-col md:flex-row">
//               <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
//                 <div className="text-center">
//                   <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
//                   <div className="text-4xl font-bold text-blue-600 mb-4">
//                     ${scannedData.availableBalance}
//                   </div>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${scannedData.couponAmount}</p>
//                     <p className="text-sm text-gray-600">Usage Limit: {scannedData.couponUsageLimit}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full md:w-1/2 md:pr-4 md:order-1">
//                 <table className="w-full border-collapse border border-gray-300 text-left">
//                   <tbody>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <div className="mt-6">
//             <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
//             <input
//               type="text"
//               value={redeemAmount ? `$${redeemAmount}` : `$`}
//               onChange={(e) => {
//                 const value = e.target.value.substring(1).replace(/\D/g, "");
//                 setRedeemAmount(value);
//                 setError("");
//               }}
//               className={`w-full p-3 border ${
//                 error ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               placeholder="Enter amount"
//             />
//             {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//           </div>

//           <button
//             onClick={handleRedeemClick}
//             disabled={loading}
//             className={`w-full font-bold py-3 rounded-lg mt-4 transition-all ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
//             }`}
//           >
//             {loading ? "Processing..." : "Redeem"}
//           </button>
//         </DialogContent>
//       </Dialog>
//       {/* ToastContainer for notifications */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Scanner;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../../api/signin";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleScan = (data) => {
    if (data) {
      try {
        console.log(data);
        const parsedData = JSON.parse(data.text);
        if (!userDetails) {
          toast.error("User details not loaded yet. Please try again.");
          return;
        }
        console.log("Scanned shopID:", parsedData.shopID);
        console.log("Current userID:", userDetails.id);

        // Validate shop ID
        if (String(parsedData.shopID) !== String(userDetails.id)) {
          console.warn("Mismatch detected – IDs are not the same.");
          setErrorDialogMessage("Invalid scan code. This customer does not belong to your shop.");
          setErrorDialogOpen(true);
          return;
        }

        setScannedData(parsedData);
        setOpen(true);
        setError("");
      } catch (error) {
        console.error("Invalid JSON data:", error);
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  const handleRedeemClick = async () => {
    if (!redeemAmount) {
      setError("Please enter an amount.");
      return;
    }

    const amount = parseFloat(redeemAmount);
    const availableBalance = parseFloat(scannedData?.availableBalance || 0);

    if (amount > availableBalance) {
      setError("Amount cannot exceed available balance.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token not found.");
      return;
    }

    const payload = {
      customerId: scannedData.customerId,
      referralCode: scannedData.referralCode,
      discountAmount: amount,
    };

    setLoading(true);
    const toastId = toast.loading("Processing redemption...");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.update(toastId, {
        render: "Discount redeemed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        position: "top-right",
      });

      // Set success message and open dialog
      setSuccessMessage(`$${amount} redeemed successfully!`);
      setSuccessDialogOpen(true);

      setOpen(false);
      setScannedData(null);
      setRedeemAmount("");
      setError("");

      // Allow toast to show before navigating
      setTimeout(() => {
        navigate("/shopkeeper/interaction-panel");
      }, 500);
    } catch (err) {
      console.error("Redemption failed:", err);
      toast.update(toastId, {
        render: err.response?.data || "Redemption failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        position: "top-right",
      });
      setError(err.response?.data || "Redemption failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setScannedData(null);
    setRedeemAmount("");
    setError("");
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorDialogMessage("");
    navigate("/shopkeeper/interaction-panel"); // Added navigation here
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate("/shopkeeper/interaction-panel");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        QR Code Scanner
      </motion.h1>

      {userDetails ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-96 h-96 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"
        >
          <QrScanner
            delay={100}
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      ) : (
        <p className="text-gray-600 mt-4">Loading ...</p>
      )}

      {/* Customer Details Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: "12px",
            width: "600px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
          Customer Details
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
          {scannedData && (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    ${scannedData.availableBalance}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${scannedData.couponAmount}</p>
                    <p className="text-sm text-gray-600">Usage Limit: {scannedData.couponUsageLimit}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 md:pr-4 md:order-1">
                <table className="w-full border-collapse border border-gray-300 text-left">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
            <input
              type="text"
              value={redeemAmount ? `$${redeemAmount}` : `$`}
              onChange={(e) => {
                const value = e.target.value.substring(1).replace(/\D/g, "");
                setRedeemAmount(value);
                setError("");
              }}
              className={`w-full p-3 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter amount"
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          <button
            onClick={handleRedeemClick}
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg mt-4 transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {loading ? "Processing..." : "Redeem"}
          </button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        PaperProps={{
          style: {
            borderRadius: "12px",
            width: "400px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle className="bg-red-500 text-white text-center text-xl font-bold py-4">
          Error
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
          <p className="text-gray-700">{errorDialogMessage}</p>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button
            onClick={handleCloseErrorDialog}
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        PaperProps={{
          style: {
            borderRadius: "12px",
            width: "400px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle className="bg-green-500 text-white text-center text-xl font-bold py-4">
          Success
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
          <p className="text-gray-700 text-center">{successMessage}</p>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            color="primary"
            fullWidth
            className="bg-green-600 hover:bg-green-700"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* ToastContainer for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Scanner;
