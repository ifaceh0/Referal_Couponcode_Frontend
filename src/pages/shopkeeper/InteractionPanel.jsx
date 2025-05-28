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


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateCode } from "../../api/validateCode";
import { useCouponCode, userInfo } from "../../api/validateCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaQrcode, FaArrowLeft, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
import { getCurrentUser } from "../../api/signin";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import axios from "axios";

const InteractionPanel = () => {
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [codeDetails, setCodeDetails] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [flashMessage] = useState("");
  const [isCouponCode, setIsCouponCode] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const shopkeeperId = userDetails?.id || localStorage.getItem("shopkeeperId");
  const navigate = useNavigate();

  const handleVerifyPhone = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a phone number");
      return;
    }

    try {
      // Call the real userInfo API with phone
      const data = await userInfo("", phoneNumber); // pass email as empty

      if (data && data.phone) {
        const verificationData = {
          customerId: data.customerId || "Unknown",  // Add customerId if returned
          name: data.name,
          phone: data.phone,
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: data.couponAmount || 0,
          couponUsageLimit: data.couponUsageLimit || 0,
          couponCode: data.couponCode || "",
          referralCode: data.referralCode || "",
          shopName: userDetails?.name || "Default Shop"
        };

        setVerificationData(verificationData);
        setVerificationDialogOpen(true);
        setPhoneVerified(true);
      } else {
        toast.error("No user found with this phone number.");
      }
    } catch (error) {
      toast.error(error.message || "Verification failed. Please try again.");
    }
  };


  const handleVerifyEmail = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const data = await userInfo(email, ""); // pass phone as empty

      if (data && data.email) {
        const verificationData = {
          customerId: data.customerId || "Unknown",
          name: data.name,
          phone: data.phone || "",
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: data.couponAmount || 0,
          couponUsageLimit: data.couponUsageLimit || 0,
          couponCode: data.couponCode || "",
          referralCode: data.referralCode || "",
          shopName: userDetails?.name || "Default Shop"
        };

        setVerificationData(verificationData);
        setVerificationDialogOpen(true);
        setEmailVerified(true);
      } else {
        toast.error("No user found with this email address.");
      }
    } catch (error) {
      toast.error(error.message || "Verification failed. Please try again.");
    }
  };

  const handleCloseVerificationDialog = () => {
    setVerificationDialogOpen(false);
    setRedeemAmount("");
    setError("");
  };

  const handleRedeemClick = async () => {
    if (!redeemAmount) {
      setError("Please enter an amount to redeem");
      return;
    }

    const amount = parseFloat(redeemAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }

    if (verificationData && amount > verificationData.availableBalance) {
      setError("Redeem amount cannot exceed available balance");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token not found.");
      return;
    }

    const payload = {
      customerId: verificationData.customerId,
      referralCode: verificationData.referralCode,
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
      setVerificationData({
        ...verificationData,
        availableBalance: verificationData.availableBalance - amount,
      });
      setRedeemAmount("");
      setError("");
      setVerificationDialogOpen(false);
      setTimeout(() => {
        window.location.reload(); //Refresh the entire page after showing success
      }, 3000);
    } catch (err) {
      console.error("Redemption failed:", err);
      toast.update(toastId, {
        render: err || "Redemption failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        position: "top-right",
      });
      setError("Redemption failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleSearchCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter a valid code.");
      return;
    }

    const response = await toast.promise(validateCode({
      code: code.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      shopkeeperId: shopkeeperId,
    }), {
      pending: "Validating code...",
      success: "Code validated successfully!",
      error: "Failed to validate code. Please try again.",
    });

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
    if (!code.trim()) {
      toast.error("Please enter a valid code.");
      return;
    }

    const response = await toast.promise(useCouponCode({
      code: code.trim(),
    }), {
      pending: "Validating code...",
      success: "Coupon code used successfully!",
      error: "Failed to validate code. Please try again.",
    });

    if (response.success) {
      setCodeDetails(null);
      setIsCouponCode(false);
      setValidationMessage("");
    } else {
      setCodeDetails(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Verification Dialog */}
      <Dialog open={verificationDialogOpen} onClose={handleCloseVerificationDialog} maxWidth="md" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
          Customer Details
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
          {verificationData && (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    ${verificationData.availableBalance.toFixed(2)}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${verificationData.couponAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Usage Limit: {verificationData.couponUsageLimit}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 md:pr-4 md:order-1">
                <table className="w-full border-collapse border border-gray-300 text-left">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.customerId}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.shopName}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.phone}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.couponCode}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
                      <td className="py-2 px-4 text-gray-600">{verificationData.referralCode}</td>
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
                // const value = e.target.value.substring(1).replace(/\D/g, "");
                // setRedeemAmount(value);
                // setError("");
                const raw = e.target.value.substring(1);
                const value = raw.replace(/[^0-9.]/g, "");

                if (/^\d*\.?\d{0,4}$/.test(value)) {
                  setRedeemAmount(value);
                  setError("");
                }
              }}
              className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter amount"
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleCloseVerificationDialog}
              className="w-1/3 max-w-xs py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleRedeemClick}
              disabled={loading}
              className={`w-1/3 max-w-xs py-2 px-4 rounded hover:bg-blue-600 transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                }`}
            >
              {loading ? "Processing..." : "Redeem"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <div className="w-full max-w-6xl mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-6xl flex justify-center items-center mb-6 bg-white p-4 rounded shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{userDetails?.name || "Shop Name"}</h1>
          <p className="text-sm text-gray-500">Shop ID: {userDetails?.id || shopkeeperId}</p>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Code Card */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Search Code</h2>
          <input
            type="text"
            placeholder="Enter Referral or Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-center">
            <button
              onClick={handleSearchCode}
              className="w-full max-w-sm py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition mt-16"
            >
              Search
            </button>
          </div>
        </div>

        {/* Phone Number Card */}
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <FaPhone className="mr-2 text-purple-600" />
            Phone Number
          </h2>
          <div className="flex items-center">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setPhoneVerified(false);
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleVerifyPhone}
              disabled={phoneVerified}
              className={`ml-2 p-2 rounded-full ${phoneVerified ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'} hover:bg-purple-200 transition`}
            >
              <FaCheck />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {phoneVerified ? "Verified!" : "We'll use this to verify your identity"}
          </p>
        </div>

        {/* Email Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <FaEnvelope className="mr-2 text-blue-600" />
            Email Address
          </h2>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerified(false);
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleVerifyEmail}
              disabled={emailVerified}
              className={`ml-2 p-2 rounded-full ${emailVerified ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} hover:bg-blue-200 transition`}
            >
              <FaCheck />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {emailVerified ? "Verified!" : "We'll send verification to this email"}
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-center">Scan Code</h2>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:bg-blue-200 transition"
              onClick={() => navigate("../scanner")}
            >
              <FaQrcode className="text-blue-600 text-3xl" />
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">
              Scan QR codes or barcodes quickly with your camera
            </p>
            <div className="flex justify-center w-full">
              <button
                onClick={() => navigate("../scanner")}
                className="w-full max-w-sm py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
              >
                <FaQrcode className="mr-2" />
                Open Scanner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Code Details */}
      {codeDetails && (
        <div className="max-w-6xl w-full bg-gray-50 p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-bold">Code Details</h3>
          <p><strong>Code:</strong> {codeDetails.code}</p>
          <p><strong>Status:</strong> {codeDetails.status}</p>
          <p><strong>Expiry Date:</strong> {codeDetails.expiryDate}</p>

          {codeDetails.user && (
            <>
              <h3 className="text-lg font-bold mt-3">User Details</h3>
              <p><strong>Name:</strong> {codeDetails.user.name}</p>
              <p><strong>Email:</strong> {codeDetails.user.email}</p>
              <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
            </>
          )}

          {!isCouponCode && (
            <>
              <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
              <p><strong>Referrer Amount:</strong> ${codeDetails.referrerAmount}</p>
            </>
          )}

          {isCouponCode && (
            <>
              <p><strong>Discount Amount:</strong> ${codeDetails.amount}</p>
              <p><strong>Usage Left:</strong> {codeDetails.usageLimitLeft}</p>
              <div className="flex justify-center">
                <button
                  onClick={handleUseCouponCode}
                  className="w-full max-w-sm py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2 transition"
                >
                  Use Coupon Code
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Flash Message */}
      {flashMessage && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded">
          {flashMessage}
        </div>
      )}

      {/* Validation/Error Message */}
      {validationMessage && (
        <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
      )}
    </div>
  );
};

export default InteractionPanel;
