// import React, { useState } from "react";
// import { validateCode } from "../../api/validateCode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const InteractionPanel = () => {
//   const [code, setCode] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [flashMessage, setFlashMessage] = useState("");
//   const [isCouponCode, setIsCouponCode] = useState(false);

//   const handleSearchCode = async () => {
//     if (!code.trim()) {
//       toast.error("Please enter a valid code.");
//       return;
//     }

//     const response = await toast.promise(validateCode(code.trim()), {
//       pending: "Validating code...",
//       success: "Code validated successfully!",
//       error: "Failed to validate code. Please try again.",
//     });

//     if (response.success) {
//       setCodeDetails(response.data);
//       setIsCouponCode(response.type === "coupon");
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       setValidationMessage(response.message);
//     }
//   };

//   const handleUseCouponCode = () => {
//     toast.success("Coupon code used successfully!");
//     setCodeDetails(null);
//     setIsCouponCode(false);
//   };

//   return (
//     <div className="min-h-screen p-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-3xl font-bold mb-6">Unified Interaction Panel</h1>

//       {/* Search Code */}
//       <div className="mb-6">
//         <h2 className="text-xl mb-2">Search Code</h2>
//         <input
//           type="text"
//           placeholder="Enter Referral or Coupon Code"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={handleSearchCode}
//           className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Display Code Details */}
//       {codeDetails && (
//         <div className="bg-gray-100 p-4 rounded mt-4">
//           <h3 className="text-lg font-bold">Code Details</h3>
//           <p><strong>Code:</strong> {codeDetails.code}</p>
//           <p><strong>Status:</strong> {codeDetails.status}</p>
//           <p><strong>Expiry Date:</strong> {codeDetails.expiryDate}</p>

//           {/* User Details */}
//           {codeDetails.user && (
//             <>
//               <h3 className="text-lg font-bold mt-3">User Details</h3>
//               <p><strong>Name:</strong> {codeDetails.user.name}</p>
//               <p><strong>Email:</strong> {codeDetails.user.email}</p>
//               <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
//             </>
//           )}

//           {/* Referral Code Details */}
//           {!isCouponCode && (
//             <>
//               <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
//               <p><strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}</p>
//             </>
//           )}

//           {/* Coupon Code Details */}
//           {isCouponCode && (
//             <>
//               <p><strong>Discount Amount:</strong> ${codeDetails.amount}</p>
//               <p><strong>Usage Left:</strong> {codeDetails.usageLimitLeft}</p>
//               <button
//                 onClick={handleUseCouponCode}
//                 className="py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2"
//               >
//                 Use Coupon Code
//               </button>
//             </>
//           )}
//         </div>
//       )}

//       {/* Flash Message */}
//       {flashMessage && (
//         <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded">
//           {flashMessage}
//         </div>
//       )}

//       {/* Validation/Error Message */}
//       {validationMessage && (
//         <p className="text-red-600 mt-4">{validationMessage}</p>
//       )}
//     </div>
//   );
// };

// export default InteractionPanel;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { validateCode } from "../../api/validateCode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaQrcode, FaArrowLeft } from "react-icons/fa";

// const InteractionPanel = () => {
//   const [code, setCode] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [flashMessage, setFlashMessage] = useState("");
//   const [isCouponCode, setIsCouponCode] = useState(false);
//   const navigate = useNavigate();

//   const handleSearchCode = async () => {
//     if (!code.trim()) {
//       toast.error("Please enter a valid code.");
//       return;
//     }

//     const response = await toast.promise(validateCode(code.trim()), {
//       pending: "Validating code...",
//       success: "Code validated successfully!",
//       error: "Failed to validate code. Please try again.",
//     });

//     if (response.success) {
//       setCodeDetails(response.data);
//       setIsCouponCode(response.type === "coupon");
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       setValidationMessage(response.message);
//     }
//   };

//   const handleUseCouponCode = () => {
//     toast.success("Coupon code used successfully!");
//     setCodeDetails(null);
//     setIsCouponCode(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />

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

//       {/* Responsive Layout */}
//       <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Search Code Card - Appears First in Mobile View */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Search Code</h2>
//           <input
//             type="text"
//             placeholder="Enter Referral or Coupon Code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="w-full p-2 border rounded mb-2"
//           />
//           <div className="flex justify-center">
//             <button
//               onClick={handleSearchCode}
//               className="w-full max-w-sm py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition mt-16"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Scanner Card - Appears Below Search Card in Mobile View */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2 text-center">Scan Code</h2>
//           <div className="flex flex-col items-center">
//             <div 
//               className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-blue-200 transition"
//               onClick={() => navigate("../scanner")}
//             >
//               <FaQrcode className="text-blue-600 text-3xl" />
//             </div>
//             <p className="text-sm text-gray-600 mb-3 text-center">
//               Scan QR codes or barcodes quickly with your camera
//             </p>
//             <div className="flex justify-center w-full">
//               <button
//                 onClick={() => navigate("../scanner")}
//                 className="w-full max-w-sm py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
//               >
//                 <FaQrcode className="mr-2" />
//                 Open Scanner
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Display Code Details */}
//       {codeDetails && (
//         <div className="max-w-4xl w-full bg-gray-50 p-6 rounded-lg shadow mt-6">
//           <h3 className="text-lg font-bold">Code Details</h3>
//           <p><strong>Code:</strong> {codeDetails.code}</p>
//           <p><strong>Status:</strong> {codeDetails.status}</p>
//           <p><strong>Expiry Date:</strong> {codeDetails.expiryDate}</p>

//           {codeDetails.user && (
//             <>
//               <h3 className="text-lg font-bold mt-3">User Details</h3>
//               <p><strong>Name:</strong> {codeDetails.user.name}</p>
//               <p><strong>Email:</strong> {codeDetails.user.email}</p>
//               <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
//             </>
//           )}

//           {!isCouponCode && (
//             <>
//               <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
//               <p><strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}</p>
//             </>
//           )}

//           {isCouponCode && (
//             <>
//               <p><strong>Discount Amount:</strong> ${codeDetails.amount}</p>
//               <p><strong>Usage Left:</strong> {codeDetails.usageLimitLeft}</p>
//               <div className="flex justify-center">
//                 <button
//                   onClick={handleUseCouponCode}
//                   className="w-full max-w-sm py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2 transition"
//                 >
//                   Use Coupon Code
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Flash Message */}
//       {flashMessage && (
//         <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded">
//           {flashMessage}
//         </div>
//       )}

//       {/* Validation/Error Message */}
//       {validationMessage && (
//         <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
//       )}
//     </div>
//   );
// };

// export default InteractionPanel;


// import React, { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { validateCode } from "../../api/validateCode";
// import { useCouponCode } from "../../api/validateCode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaQrcode, FaArrowLeft, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
// import { getCurrentUser } from "../../api/signin";

// const InteractionPanel = () => {
//   const [code, setCode] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   // const [flashMessage, setFlashMessage] = useState("");
//   const [flashMessage] = useState("");
//   const [isCouponCode, setIsCouponCode] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//          useEffect(() => {
//                 const fetchData = async () => {
//                     try {
//                         const user = await getCurrentUser();
//                         console.log("Fetched user:", user.id);
//                         setUserDetails(user);
//                     } catch (error) {
//                         console.error("Error fetching monthly data:", error);
//                     }
//                 };

//                 fetchData();
//             }, []);
//             const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId") ;
//   const navigate = useNavigate();

//   const handleVerifyPhone = () => {
//     if (!phoneNumber.trim()) {
//       toast.error("Please enter a phone number");
//       return;
//     }
//     setPhoneVerified(true);
//     toast.success("Phone number verified!");
//   };

//   const handleVerifyEmail = () => {
//     if (!email.trim()) {
//       toast.error("Please enter an email address");
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }
//     setEmailVerified(true);
//     toast.success("Email verified!");
//   };

//   const handleSearchCode = async () => {
//     if (!code.trim()) {
//       toast.error("Please enter a valid code.");
//       return;
//     }

//     const response = await toast.promise(validateCode({
//       code: code.trim(),
//       phoneNumber: phoneNumber.trim(),
//       email: email.trim(),
//       shopkeeperId:shopkeeperId,
//     }), {
//       pending: "Validating code...",
//       success: "Code validated successfully!",
//       error: "Failed to validate code. Please try again.",
//     });

//     if (response.success) {
//       setCodeDetails(response.data);
//       setIsCouponCode(response.type === "coupon");
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       setValidationMessage(response.message);
//     }
//   };

//   const handleUseCouponCode = async () => {
//     if (!code.trim()) {
//       toast.error("Please enter a valid code.");
//       return;
//     }

//     const response = await toast.promise(useCouponCode({
//       code: code.trim(),
//       // phoneNumber: phoneNumber.trim(),
//       // email: email.trim(),
//       // shopkeeperId:shopkeeperId,
//     }), {
//       pending: "Validating code...",
//       success: "Coupon code used successfully!",
//       error: "Failed to validate code. Please try again.",
//     });

//     if (response.success) {
//       setCodeDetails(null);
//       setIsCouponCode(false);
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       // setValidationMessage(response.message);
//     }
//     // toast.success("Coupon code used successfully!");
//     // setCodeDetails(null);
//     // setIsCouponCode(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Back Button */}
//       <div className="w-full max-w-6xl mb-4">
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back
//         </button>
//       </div>

//       {/* Header Section */}
//       <div className="w-full max-w-6xl flex justify-center items-center mb-6 bg-white p-4 rounded shadow">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800">{userDetails?.name || "Shop Name"}</h1>
//           <p className="text-sm text-gray-500">Shop ID: {userDetails?.id || shopkeeperId}</p>
//         </div>
//       </div>

//       {/* Responsive Layout */}
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Search Code Card */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2">Search Code</h2>
//           <input
//             type="text"
//             placeholder="Enter Referral or Coupon Code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="w-full p-2 border rounded mb-2"
//           />
//           <div className="flex justify-center">
//             <button
//               onClick={handleSearchCode}
//               className="w-full max-w-sm py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition mt-16"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Phone Number Card */}
//         <div className="bg-purple-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2 flex items-center">
//             <FaPhone className="mr-2 text-purple-600" />
//             Phone Number
//           </h2>
//           <div className="flex items-center">
//             <input
//               type="tel"
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChange={(e) => {
//                 setPhoneNumber(e.target.value);
//                 setPhoneVerified(false);
//               }}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={handleVerifyPhone}
//               disabled={phoneVerified}
//               className={`ml-2 p-2 rounded-full ${phoneVerified ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'} hover:bg-purple-200 transition`}
//             >
//               <FaCheck />
//             </button>
//           </div>
//           <p className="text-xs text-gray-500">
//             {phoneVerified ? "Verified!" : "We'll use this to verify your identity"}
//           </p>
//         </div>

//         {/* Email Card */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2 flex items-center">
//             <FaEnvelope className="mr-2 text-blue-600" />
//             Email Address
//           </h2>
//           <div className="flex items-center">
//             <input
//               type="email"
//               placeholder="Enter email address"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailVerified(false);
//               }}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={handleVerifyEmail}
//               disabled={emailVerified}
//               className={`ml-2 p-2 rounded-full ${emailVerified ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} hover:bg-blue-200 transition`}
//             >
//               <FaCheck />
//             </button>
//           </div>
//           <p className="text-xs text-gray-500">
//             {emailVerified ? "Verified!" : "We'll send verification to this email"}
//           </p>
//         </div>

//         {/* Scanner Card */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-2 text-center">Scan Code</h2>
//           <div className="flex flex-col items-center">
//             <div 
//               className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-blue-200 transition"
//               onClick={() => navigate("../scanner")}
//             >
//               <FaQrcode className="text-blue-600 text-3xl" />
//             </div>
//             <p className="text-sm text-gray-600 mb-3 text-center">
//               Scan QR codes or barcodes quickly with your camera
//             </p>
//             <div className="flex justify-center w-full">
//               <button
//                 onClick={() => navigate("../scanner")}
//                 className="w-full max-w-sm py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
//               >
//                 <FaQrcode className="mr-2" />
//                 Open Scanner
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Display Code Details */}
//       {codeDetails && (
//         <div className="max-w-6xl w-full bg-gray-50 p-6 rounded-lg shadow mt-6">
//           <h3 className="text-lg font-bold">Code Details</h3>
//           <p><strong>Code:</strong> {codeDetails.code}</p>
//           <p><strong>Status:</strong> {codeDetails.status}</p>
//           <p><strong>Expiry Date:</strong> {codeDetails.expiryDate}</p>

//           {codeDetails.user && (
//             <>
//               <h3 className="text-lg font-bold mt-3">User Details</h3>
//               <p><strong>Name:</strong> {codeDetails.user.name}</p>
//               <p><strong>Email:</strong> {codeDetails.user.email}</p>
//               <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
//             </>
//           )}

//           {!isCouponCode && (
//             <>
//               <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
//               <p><strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}</p>
//             </>
//           )}

//           {isCouponCode && (
//             <>
//               <p><strong>Discount Amount:</strong> ${codeDetails.amount}</p>
//               <p><strong>Usage Left:</strong> {codeDetails.usageLimitLeft}</p>
//               <div className="flex justify-center">
//                 <button
//                   onClick={handleUseCouponCode}
//                   className="w-full max-w-sm py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2 transition"
//                 >
//                   Use Coupon Code
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Flash Message */}
//       {flashMessage && (
//         <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded">
//           {flashMessage}
//         </div>
//       )}

//       {/* Validation/Error Message */}
//       {validationMessage && (
//         <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
//       )}
//     </div>
//   );
// };

// export default InteractionPanel;

              
// import React, { useState, useEffect } from "react"; 
// import Scanner from "../scanner/Scanner";
// import { validateCode, useCouponCode, userInfo } from "../../api/validateCode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaQrcode, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
// import { getCurrentUser } from "../../api/signin";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const InteractionPanel = () => {
//   const [code, setCode] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [isCouponCode, setIsCouponCode] = useState(false);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
//   const [verificationData, setVerificationData] = useState(null);
//   const [redeemAmount, setRedeemAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = await getCurrentUser();
//         setUserDetails(user);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const shopkeeperId = userDetails?.shopkeeperId || localStorage.getItem("shopkeeperId");

//   const handleVerifyPhone = async () => {
//     if (!phoneNumber.trim()) return toast.error("Please enter a phone number");

//     try {
//       const data = await userInfo("", phoneNumber);
//       if (data?.phone) {
//         setVerificationData({
//           customerId: data.customerId || "Unknown",
//           name: data.name,
//           phone: data.phone,
//           email: data.email,
//           availableBalance: data.availableBalance || 0,
//           couponAmount: data.couponAmount || 0,
//           couponUsageLimit: data.couponUsageLimit || 0,
//           couponCode: data.couponCode || "",
//           referralCode: data.referralCode || "",
//           shopName: userDetails?.name || "Default Shop"
//         });
//         setVerificationDialogOpen(false);
//         setPhoneVerified(true);
//       } else toast.error("No user found with this phone number.");
//     } catch (error) {
//       toast.error(error.message || "Verification failed.");
//     }
//   };

//   const handleVerifyEmail = async () => {
//     if (!email.trim()) return toast.error("Please enter an email address");
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Invalid email format");

//     try {
//       const data = await userInfo(email, "");
//       if (data?.email) {
//         setVerificationData({
//           customerId: data.customerId || "Unknown",
//           name: data.name,
//           phone: data.phone || "",
//           email: data.email,
//           availableBalance: data.availableBalance || 0,
//           couponAmount: data.couponAmount || 0,
//           couponUsageLimit: data.couponUsageLimit || 0,
//           couponCode: data.couponCode || "",
//           referralCode: data.referralCode || "",
//           shopName: userDetails?.name || "Default Shop"
//         });
//         setVerificationDialogOpen(false);
//         setEmailVerified(true);
//       } else toast.error("No user found with this email.");
//     } catch (error) {
//       toast.error(error.message || "Verification failed.");
//     }
//   };

//   const handleCloseVerificationDialog = () => {
//     setVerificationDialogOpen(false);
//     setRedeemAmount("");
//     setError("");
//     setTimeout(() => window.location.reload(), 3000);
//   };

//   const handleRedeemClick = async () => {
//     const amount = parseFloat(redeemAmount);

//     if (!redeemAmount) return setError("Please enter an amount");
//     if (isNaN(amount) || amount <= 0) return setError("Enter a valid positive amount");
//     if (amount > verificationData?.availableBalance) return setError("Exceeds available balance");

//     const token = localStorage.getItem("token");
//     if (!token) return setError("Authentication token not found.");

//     const payload = {
//       customerId: verificationData.customerId,
//       referralCode: verificationData.referralCode,
//       discountAmount: amount,
//     };

//     setLoading(true);
//     const toastId = toast.loading("Processing...");

//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.update(toastId, {
//         render: "Redeemed successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//       });

//       setVerificationData(prev => ({
//         ...prev,
//         availableBalance: prev.availableBalance - amount,
//       }));
//       setRedeemAmount("");
//       setError("");
//       setVerificationDialogOpen(false);
//       setTimeout(() => window.location.reload(), 3000);
//     } catch (err) {
//       toast.update(toastId, {
//         render: err?.response?.data?.message || err.message || "Redemption failed",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//       setError("Redemption failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchCode = async () => {
//     if (!code.trim()) return toast.error("Please enter a valid code");

//     const response = await toast.promise(validateCode({
//       code: code.trim(),
//       phoneNumber: phoneNumber.trim(),
//       email: email.trim(),
//       shopkeeperId,
//     }), {
//       pending: "Validating code...",
//       success: "Code valid!",
//       error: "Failed to validate code",
//     });

//     if (response.success) {
//       setCodeDetails(response.data);
//       setIsCouponCode(response.type === "coupon");
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       setValidationMessage(response.message);
//     }
//   };

//   const handleUseCouponCode = async () => {
//     if (!code.trim()) return toast.error("Enter a valid code");

//     const response = await toast.promise(useCouponCode({ code: code.trim() }), {
//       pending: "Using code...",
//       success: "Coupon used!",
//       error: "Failed to apply coupon",
//     });

//     if (response.success) {
//       setCodeDetails(null);
//       setIsCouponCode(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="w-full max-w-6xl mb-6 bg-white p-4 rounded shadow text-center">
//         <h1 className="text-2xl font-bold text-gray-800">{userDetails?.name || "Shop Name"}</h1>
//         <p className="text-sm text-gray-500">Shop ID: {userDetails?.id || shopkeeperId}</p>
//       </div>

//       {/*{/* Verification Dialog 
//       <Dialog open={verificationDialogOpen} onClose={handleCloseVerificationDialog} maxWidth="md" fullWidth>
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl text-center py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="bg-white p-6">
//           {/* ... verification content ... 
//         </DialogContent>
//       </Dialog> */}
//       {/* Inline Customer Details Section */}
//       {verificationDialogOpen && verificationData && (
//       <div className="max-w-6xl w-full bg-white mt-6 p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
//           <p><strong>Name:</strong> {verificationData.name}</p>
//           <p><strong>Phone:</strong> {verificationData.phone}</p>
//           <p><strong>Email:</strong> {verificationData.email}</p>
//           <p><strong>Customer ID:</strong> {verificationData.customerId}</p>
//           <p><strong>Available Balance:</strong> ₹{verificationData.availableBalance}</p>
//           <p><strong>Coupon Amount:</strong> ₹{verificationData.couponAmount}</p>
//           <p><strong>Coupon Usage Limit:</strong> {verificationData.couponUsageLimit}</p>
//           <p><strong>Referral Code:</strong> {verificationData.referralCode}</p>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Redeem Discount</h3>
//           <div className="flex items-center gap-2">
//             <input
//               type="number"
//               value={redeemAmount}
//               onChange={(e) => setRedeemAmount(e.target.value)}
//               placeholder="Enter amount"
//               className="p-2 border rounded w-40"
//             />
//             <button
//               onClick={handleRedeemClick}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//               disabled={loading}
//             >
//             {loading ? "Processing..." : "Redeem"}
//             </button>
//         </div>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//     )}

//       {/* Main Form */}
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Code Entry */}
//         <div className="bg-gray-50 p-6 rounded shadow">
//           <h2 className="font-semibold mb-2">Search Code</h2>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Enter Referral or Coupon Code"
//             className="w-full p-2 border rounded mb-4"
//           />
//           <button onClick={handleSearchCode} className="bg-green-500 text-white py-2 px-4 rounded w-full">
//             Search
//           </button>
//         </div>

//         {/* Phone */}
//         <div className="bg-purple-50 p-6 rounded shadow">
//           <h2 className="font-semibold flex items-center mb-2"><FaPhone className="mr-2" /> Phone Number</h2>
//           <div className="flex items-center">
//             <input
//               type="tel"
//               value={phoneNumber}
//               onChange={(e) => {
//                 setPhoneNumber(e.target.value);
//                 setPhoneVerified(false);
//               }}
//               placeholder="Enter phone"
//               className="w-full p-2 border rounded"
//             />
//             <button
//               onClick={handleVerifyPhone}
//               disabled={phoneVerified}
//               className={`ml-2 p-2 rounded-full ${phoneVerified ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}
//             >
//               <FaCheck />
//             </button>
//           </div>
//           <p className="text-xs">{phoneVerified ? "Verified!" : "We’ll use this to identify user"}</p>
//         </div>

//         {/* Email */}
//         <div className="bg-blue-50 p-6 rounded shadow">
//           <h2 className="font-semibold flex items-center mb-2"><FaEnvelope className="mr-2" /> Email Address</h2>
//           <div className="flex items-center">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailVerified(false);
//               }}
//               placeholder="Enter email"
//               className="w-full p-2 border rounded"
//             />
//             <button
//               onClick={handleVerifyEmail}
//               disabled={emailVerified}
//               className={`ml-2 p-2 rounded-full ${emailVerified ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
//             >
//               <FaCheck />
//             </button>
//           </div>
//           <p className="text-xs">{emailVerified ? "Verified!" : "We’ll use this to identify user"}</p>
//         </div>

//         {/* Scanner Trigger */}
//         <div className="bg-blue-50 p-6 rounded shadow">
//           <h2 className="font-semibold text-center mb-3">Scan Code</h2>
//           <div className="flex flex-col items-center">
//             <button
//               onClick={() => setShowScanner(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
//             >
//               <FaQrcode className="mr-2" />
//               Open Scanner
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Scanner Modal*/}
//       <Dialog
//         open={showScanner}
//         onClose={() => setShowScanner(false)}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{ style: { minHeight: "600px", borderRadius: "12px" } }}
//       >
//         <DialogTitle className="flex justify-between items-center bg-blue-600 text-white">
//           QR Code Scanner
//           <IconButton onClick={() => setShowScanner(false)} style={{ color: "white" }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent className="p-0">
//           <Scanner
//             onScan={(scannedCode) => {
//               setCode(scannedCode);
//               setShowScanner(false);
//             }}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Code Result Display */}
//       {codeDetails && (
//         <div className="max-w-6xl w-full bg-gray-50 p-6 rounded shadow mt-6">
//           <h3 className="font-bold text-lg">Code Details</h3>
//           <p><strong>Code:</strong> {codeDetails.code}</p>
//           <p><strong>Status:</strong> {codeDetails.status}</p>
//           <p><strong>Expiry:</strong> {codeDetails.expiryDate}</p>

//           {codeDetails.user && (
//             <>
//               <h4 className="font-semibold mt-3">User Info</h4>
//               <p><strong>Name:</strong> {codeDetails.user.name}</p>
//               <p><strong>Email:</strong> {codeDetails.user.email}</p>
//               <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
//             </>
//           )}

//           {isCouponCode ? (
//             <>
//               <p><strong>Discount:</strong> ${codeDetails.amount}</p>
//               <p><strong>Uses Left:</strong> {codeDetails.usageLimitLeft}</p>
//               <button onClick={handleUseCouponCode} className="mt-2 bg-orange-500 text-white py-2 px-4 rounded">
//                 Use Coupon Code
//               </button>
//             </>
//           ) : (
//             <>
//               <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
//               <p><strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}</p>
//             </>
//           )}
//         </div>
//       )}

//       {validationMessage && (
//         <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
//       )}
//     </div>
//   );
// };

// export default InteractionPanel;


import React, { useState, useEffect } from "react";
import Scanner from "../scanner/Scanner";
import { validateCode, useCouponCode, userInfo } from "../../api/validateCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaQrcode, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
import { getCurrentUser } from "../../api/signin";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InteractionPanel = () => {
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [codeDetails, setCodeDetails] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [isCouponCode, setIsCouponCode] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  const shopkeeperId =
    userDetails?.shopkeeperId || localStorage.getItem("shopkeeperId");

  const handleVerifyPhone = async () => {
    if (!phoneNumber.trim()) return toast.error("Please enter a phone number");

    try {
      const data = await userInfo("", phoneNumber);
      if (data?.phone) {
        setVerificationData({
          customerId: data.customerId || "Unknown",
          name: data.name,
          phone: data.phone,
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: data.couponAmount || 0,
          couponUsageLimit: data.couponUsageLimit || 0,
          couponCode: data.couponCode || "",
          referralCode: data.referralCode || "",
          shopName: userDetails?.name || "Default Shop",
        });
        setVerificationDialogOpen(true);
        setPhoneVerified(true);
      } else toast.error("No user found with this phone number.");
    } catch (error) {
      toast.error(error.message || "Verification failed.");
    }
  };

  const handleVerifyEmail = async () => {
    if (!email.trim()) return toast.error("Please enter an email address");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Invalid email format");

    try {
      const data = await userInfo(email, "");
      if (data?.email) {
        setVerificationData({
          customerId: data.customerId || "Unknown",
          name: data.name,
          phone: data.phone || "",
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: data.couponAmount || 0,
          couponUsageLimit: data.couponUsageLimit || 0,
          couponCode: data.couponCode || "",
          referralCode: data.referralCode || "",
          shopName: userDetails?.name || "Default Shop",
        });
        setVerificationDialogOpen(true);
        setEmailVerified(true);
      } else toast.error("No user found with this email.");
    } catch (error) {
      toast.error(error.message || "Verification failed.");
    }
  };

  const handleCloseVerificationDialog = () => {
    setVerificationDialogOpen(false);
    setRedeemAmount("");
    setError("");
  };

  const handleRedeemClick = async () => {
    const amount = parseFloat(redeemAmount);

    if (!redeemAmount) return setError("Please enter an amount");
    if (isNaN(amount) || amount <= 0)
      return setError("Enter a valid positive amount");
    if (amount > verificationData?.availableBalance)
      return setError("Exceeds available balance");

    const token = localStorage.getItem("token");
    if (!token) return setError("Authentication token not found.");

    const payload = {
      customerId: verificationData.customerId,
      referralCode: verificationData.referralCode,
      discountAmount: amount,
    };

    setLoading(true);
    const toastId = toast.loading("Processing...");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.update(toastId, {
        render: "Redeemed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setVerificationData((prev) => ({
        ...prev,
        availableBalance: prev.availableBalance - amount,
      }));
      setRedeemAmount("");
      setError("");
      setVerificationDialogOpen(false);
    } catch (err) {
      toast.update(toastId, {
        render:
          err?.response?.data?.message || err.message || "Redemption failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setError("Redemption failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCode = async () => {
    if (!code.trim()) return toast.error("Please enter a valid code");

    const response = await toast.promise(
      validateCode({
        code: code.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        shopkeeperId,
      }),
      {
        pending: "Validating code...",
        success: "Code valid!",
        error: "Failed to validate code",
      }
    );

    if (response.success) {
      setCodeDetails(response.data);
      setIsCouponCode(response.type === "coupon");
      setValidationMessage("");
    } else {
      setCodeDetails(null);
      setValidationMessage(response.message);
    }
  };

  const handleUseCouponCode = async () => {
    if (!code.trim()) return toast.error("Enter a valid code");

    const response = await toast.promise(useCouponCode({ code: code.trim() }), {
      pending: "Using code...",
      success: "Coupon used!",
      error: "Failed to apply coupon",
    });

    if (response.success) {
      setCodeDetails(null);
      setIsCouponCode(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {userDetails?.role === "SHOP_EMPLOYEE" && userDetails?.employeeActive === false ? (
        <div className="w-full max-w-4xl mt-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded p-10 shadow-lg">
            <h1 className="text-3xl font-bold text-red-700 mb-4">
              Access Restricted
            </h1>

            <p className="text-lg text-gray-700 mb-4">
              Your employee account has been deactivated.
            </p>

            <p className="text-md text-gray-600 mb-3">
              This usually happens if:
            </p>

            <ul className="text-md text-gray-600 list-disc list-inside mb-6 text-left inline-block">
              <li>Your employment with this shop has ended</li>
              <li>Your access was temporarily disabled by the shop owner</li>
            </ul>

            <p className="text-md text-gray-600 mb-6">
              If you believe this is a mistake or you are still working with this shop,
              please contact the shop owner or administrator to reactivate your account.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              For security reasons, you cannot access shop data until your account is
              reactivated.
            </p>

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/signin");
              }}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-6xl mb-6 bg-white p-4 rounded shadow text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {userDetails?.name || "Shop Name"}
            </h1>
            <p className="text-sm text-gray-500">
              Shop ID: {userDetails?.id || shopkeeperId}
            </p>
          </div>

          {/* Verification Modal */}
          {verificationDialogOpen && verificationData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl w-full max-w-[800px] p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                  <p>
                    <strong>Name:</strong> {verificationData.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {verificationData.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {verificationData.email}
                  </p>
                  <p>
                    <strong>Customer ID:</strong> {verificationData.customerId}
                  </p>
                  <p>
                    <strong>Available Balance:</strong> ₹
                    {verificationData.availableBalance}
                  </p>
                  <p>
                    <strong>Coupon Amount:</strong> ₹
                    {verificationData.couponAmount}
                  </p>
                  <p>
                    <strong>Coupon Usage Limit:</strong>{" "}
                    {verificationData.couponUsageLimit}
                  </p>
                  <p>
                    <strong>Referral Code:</strong> {verificationData.referralCode}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Redeem Discount</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={redeemAmount}
                      onChange={(e) => setRedeemAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="p-2 border rounded w-40"
                    />
                    <button
                      onClick={handleRedeemClick}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Redeem"}
                    </button>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                <button
                  onClick={handleCloseVerificationDialog}
                  className="mt-6 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Main Form */}
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Code Entry */}
            <div className="bg-gray-50 p-6 rounded shadow">
              <h2 className="font-semibold mb-2">Search Code</h2>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Referral or Coupon Code"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleSearchCode}
                className="bg-green-500 text-white py-2 px-4 rounded w-full"
              >
                Search
              </button>
            </div>

            {/* Phone */}
            <div className="bg-purple-50 p-6 rounded shadow">
              <h2 className="font-semibold flex items-center mb-2">
                <FaPhone className="mr-2" /> Phone Number
              </h2>
              <div className="flex items-center">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneVerified(false);
                  }}
                  placeholder="Enter phone"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleVerifyPhone}
                  disabled={phoneVerified}
                  className={`ml-2 p-2 rounded-full ${
                    phoneVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <FaCheck />
                </button>
              </div>
              <p className="text-xs">
                {phoneVerified
                  ? "Verified!"
                  : "We’ll use this to identify user"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-blue-50 p-6 rounded shadow">
              <h2 className="font-semibold flex items-center mb-2">
                <FaEnvelope className="mr-2" /> Email Address
              </h2>
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailVerified(false);
                  }}
                  placeholder="Enter email"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleVerifyEmail}
                  disabled={emailVerified}
                  className={`ml-2 p-2 rounded-full ${
                    emailVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <FaCheck />
                </button>
              </div>
              <p className="text-xs">
                {emailVerified
                  ? "Verified!"
                  : "We’ll use this to identify user"}
              </p>
            </div>

            {/* Scanner Trigger */}
            <div className="bg-blue-50 p-6 rounded shadow">
              <h2 className="font-semibold text-center mb-3">Scan Code</h2>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setShowScanner(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaQrcode className="mr-2" />
                  Open Scanner
                </button>
              </div>
            </div>
          </div>

          {/* Scanner Modal */}
          {showScanner && (
            <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm">
              <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3">
                <h2 className="text-lg font-bold">QR Code Scanner</h2>
                <button
                  onClick={() => setShowScanner(false)}
                  className="text-white hover:text-gray-300 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 bg-white overflow-hidden">
                <Scanner
                  onScan={(scannedCode) => {
                    setCode(scannedCode);
                    setShowScanner(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Code Result Display */}
          {codeDetails && (
            <div className="max-w-6xl w-full bg-gray-50 p-6 rounded shadow mt-6">
              <h3 className="font-bold text-lg">Code Details</h3>
              <p>
                <strong>Code:</strong> {codeDetails.code}
              </p>
              <p>
                <strong>Status:</strong> {codeDetails.status}
              </p>
              <p>
                <strong>Expiry:</strong> {codeDetails.expiryDate}
              </p>

              {codeDetails.user && (
                <>
                  <h4 className="font-semibold mt-3">User Info</h4>
                  <p>
                    <strong>Name:</strong> {codeDetails.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {codeDetails.user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {codeDetails.user.phone}
                  </p>
                </>
              )}

              {isCouponCode ? (
                <>
                  <p>
                    <strong>Discount:</strong> ${codeDetails.amount}
                  </p>
                  <p>
                    <strong>Uses Left:</strong> {codeDetails.usageLimitLeft}
                  </p>
                  <button
                    onClick={handleUseCouponCode}
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded"
                  >
                    Use Coupon Code
                  </button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Referral Amount:</strong> ${codeDetails.referralAmount}
                  </p>
                  <p>
                    <strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}
                  </p>
                </>
              )}
            </div>
          )}

          {validationMessage && (
            <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default InteractionPanel;
