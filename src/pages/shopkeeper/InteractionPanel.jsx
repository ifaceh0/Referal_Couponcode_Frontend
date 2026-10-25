// import React, { useState, useEffect } from "react";
// import Scanner from "../scanner/Scanner";
// import { validateCode, useCouponCode, userInfo } from "../../api/validateCode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaQrcode, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";
// import { getCurrentUser } from "../../api/signin";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { getCurrentCurrency } from "../../utils/currencyUtils";
// import SuccessPopup from "./SuccessPopup";

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
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
//   const [verificationData, setVerificationData] = useState(null);
//   const [applications, setApplications] = useState([]);

//   const [purchaseAmount, setPurchaseAmount] = useState("");
//   const [referralRedeemAmount, setReferralRedeemAmount] = useState("");
//   const [couponError, setCouponError] = useState("");
//   const [referralError, setReferralError] = useState("");

//   const [redeemLoading, setRedeemLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successData, setSuccessData] = useState({});

//   const [applyCoupon, setApplyCoupon] = useState(false);
//   const [applyReferral, setApplyReferral] = useState(false);
//   const [referralType, setReferralType] = useState("");

//   const currency = getCurrentCurrency();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = await getCurrentUser();
//         setUserDetails(user);
//         if (user.application_name && Array.isArray(user.application_name)) {
//           setApplications(user.application_name);
//         } else if (user.application_name) {
//           setApplications([user.application_name]);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const shopkeeperId = userDetails?.shopkeeperId || localStorage.getItem("shopkeeperId");

//   const handleVerifyPhone = async () => {
//     if (!phoneNumber.trim()) return toast.error("Please enter a phone number");

//     const cleanedPhone = phoneNumber.trim().replace(/\D/g, "");

//     if (cleanedPhone.length !== 10) {
//       return toast.error("Phone number must be exactly 10 digits");
//     }

//     try {
//       const data = await userInfo("", cleanedPhone);
//       if (data?.phone) {
//         const firstCoupon = data.coupons?.[0] || {};

//         setVerificationData({
//           customerId: data.customerId || "Unknown",
//           name: data.name,
//           phone: data.phone,
//           email: data.email,
//           availableBalance: data.availableBalance || 0,
//           couponAmount: firstCoupon.couponAmount || 0,
//           couponUsageLimit: firstCoupon.couponUsageLimit || 0,
//           usageLeft: firstCoupon.usageLeft || 0,
//           couponCode: firstCoupon.couponCode || "",
//           referralCode: data.referralCode || "",
//           shopName: userDetails?.name || "Default Shop",
//         });
//         setVerificationDialogOpen(true);
//         setPhoneVerified(true);
//       } else toast.error("No user found with this phone number.");
//     } catch (error) {
//       toast.error(error.message || "Verification failed.");
//     }
//   };

//   const handleVerifyEmail = async () => {
//     if (!email.trim()) return toast.error("Please enter an email address");
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       return toast.error("Invalid email format");

//     try {
//       const data = await userInfo(email, "");
//       if (data?.email) {
//         const firstCoupon = data.coupons?.[0] || {};

//         setVerificationData({
//           customerId: data.customerId || "Unknown",
//           name: data.name,
//           phone: data.phone || "",
//           email: data.email,
//           availableBalance: data.availableBalance || 0,
//           couponAmount: firstCoupon.couponAmount || 0,
//           couponUsageLimit: firstCoupon.couponUsageLimit || 0,
//           usageLeft: firstCoupon.usageLeft || 0,
//           couponCode: firstCoupon.couponCode || "",
//           referralCode: data.referralCode || "",
//           shopName: userDetails?.name || "Default Shop",
//         });
//         setVerificationDialogOpen(true);
//         setEmailVerified(true);
//       } else toast.error("No user found with this email.");
//     } catch (error) {
//       toast.error(error.message || "Verification failed.");
//     }
//   };

//   const handleCloseVerificationDialog = () => {
//     setVerificationDialogOpen(false);
//     resetAllStates();
//   };

//   const resetAllStates = () => {
//     setPhoneNumber("");
//     setEmail("");
//     setPurchaseAmount("");
//     setCouponError("");
//     setReferralError("");
//     setApplyCoupon(false);
//     setApplyReferral(false);
//     setReferralType("");
//     setReferralRedeemAmount("");
//     setShowSuccessPopup(false);
//     setPhoneVerified(false);
//     setEmailVerified(false);  
//   };

//   const handleCombinedTransaction = async () => {
//     if (applyReferral && !referralType) {
//         setReferralError("Select Full or Partial Balance Redemption");
//         return;
//     }
//     let finalRedeemAmount = 0;
//     if (referralType === "full") finalRedeemAmount = verificationData.availableBalance;
//     else if (referralType === "partial") {
//       finalRedeemAmount = Number(referralRedeemAmount || 0);
//       if (finalRedeemAmount > verificationData.availableBalance) {
//         setReferralError("Redeem amount exceeds available balance");
//         return;
//       }
//     }

//     const token = localStorage.getItem("token");
//     setRedeemLoading(true);

//     const couponDiscount = applyCoupon ? verificationData.couponAmount : 0;

//     const totalDiscount =
//         couponDiscount + finalRedeemAmount;

//     if (totalDiscount > Number(purchaseAmount)) {
//         toast.error("Total discount cannot exceed purchase amount.");
//         return;
//     }

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: verificationData.customerId,
//           couponCode: verificationData.couponCode,
//           purchaseAmount: Number(purchaseAmount),
//           redeemAmount: finalRedeemAmount,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
//         couponAmount: verificationData.couponAmount,
//         redeemAmount: finalRedeemAmount,
//       });
//       setShowSuccessPopup(true);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//     } finally {
//       setRedeemLoading(false);
//     }
//   };

//   const handleDirectCouponApply = async () => {
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//         setCouponError("Please enter purchase amount");
//         return;
//     }
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication token missing.");
//       return;
//     }

//     setCouponLoading(true); 

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: verificationData.customerId,
//           couponCode: verificationData.couponCode,
//           purchaseAmount: Number(purchaseAmount),
//           redeemAmount: 0,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
//         couponAmount: verificationData.couponAmount,
//         redeemAmount: 0,
//       });
//       setShowSuccessPopup(true);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleReferralSubmit = async () => {
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//         setReferralError("Please enter purchase amount");
//         return;
//     }

//     if (Number(verificationData.availableBalance) <= 0) {
//       await handlePlainPurchase();
//       return;
//     }

//     if (!referralType) {
//         setReferralError("Select Full or Partial");
//         return;
//     }

//     let redeemAmount = 0;

//     if (referralType === "full") {
//         redeemAmount = verificationData.availableBalance;
//     }

//     if (referralType === "partial") {

//         if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
//             setReferralError("Please enter redeem amount");
//             return;
//         }

//         if (Number(referralRedeemAmount) > verificationData.availableBalance) {
//             setReferralError("Redeem amount exceeds available balance");
//             return;
//         }

//         redeemAmount = Number(referralRedeemAmount);
//     }

//     if (redeemAmount > Number(purchaseAmount)) {
//         setReferralError(
//             "Redeem amount cannot exceed purchase amount"
//         );
//         return;
//     }

//     const token = localStorage.getItem("token");
//     setRedeemLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//         {
//           customerId: verificationData.customerId,
//           referralCode: verificationData.referralCode && verificationData.referralCode !== "None" 
//             ? verificationData.referralCode : null,
//           purchaseAmount: Number(purchaseAmount),
//           discountAmount: redeemAmount,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
//         couponAmount: 0,
//         redeemAmount,
//       });
//       setShowSuccessPopup(true);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//     } finally {
//       setRedeemLoading(false);
//     }
//   };

//   const handlePlainPurchase = async () => {
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//       toast.error("Enter purchase amount");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication token missing.");
//       return;
//     }

//     setRedeemLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/record-purchase`,
//         {
//           customerId: verificationData.customerId,
//           purchaseAmount: Number(purchaseAmount),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
//         couponAmount: 0,
//         redeemAmount: 0,
//       });
//       setShowSuccessPopup(true);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//     } finally {
//       setRedeemLoading(false);
//     }
//   };

//   const handleSubmitTransaction = async () => {

//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//         toast.error("Enter purchase amount");
//         return;
//     }

//     if (!applyCoupon && !applyReferral) {
//       await handlePlainPurchase();
//       return;
//     }

//     if (applyCoupon && !applyReferral) {
//         await handleDirectCouponApply();
//         return;
//     }

//     if (!applyCoupon && applyReferral) {
//         await handleReferralSubmit();
//         return;
//     }

//     if (applyCoupon && applyReferral) {
//         await handleCombinedTransaction();
//     }
//   };

//   const handleSearchCode = async () => {
//     if (!code.trim()) return toast.error("Please enter a valid code");

//     const response = await toast.promise(
//       validateCode({
//         code: code.trim(),
//         phoneNumber: phoneNumber.trim(),
//         email: email.trim(),
//         shopkeeperId,
//       }),
//       {
//         pending: "Validating code...",
//         success: "Code valid!",
//         error: "Failed to validate code",
//       }
//     );

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

//   const hasReferral =
//     applications.includes("Referral") &&
//     verificationData?.referralCode;

//   const hasCoupon =
//     applications.includes("Coupon") &&
//     verificationData?.couponCode;

//   const hasBothApplications =
//     hasReferral && hasCoupon;

//   return (
//     <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {userDetails?.role === "SHOP_EMPLOYEE" && userDetails?.employeeActive === false ? (
//         <div className="w-full max-w-4xl mt-20 text-center">
//           <div className="bg-red-50 border border-red-200 rounded p-10 shadow-lg">
//             <h1 className="text-3xl font-bold text-red-700 mb-4">
//               Access Restricted
//             </h1>
//             <p className="text-lg text-gray-700 mb-4">
//               Your employee account has been deactivated.
//             </p>
//             <p className="text-md text-gray-600 mb-3">
//               This usually happens if:
//             </p>
//             <ul className="text-md text-gray-600 list-disc list-inside mb-6 text-left inline-block">
//               <li>Your employment with this shop has ended</li>
//               <li>Your access was temporarily disabled by the shop owner</li>
//             </ul>
//             <p className="text-md text-gray-600 mb-6">
//               If you believe this is a mistake or you are still working with this shop,
//               please contact the shop owner or administrator to reactivate your account.
//             </p>
//             <button
//               onClick={() => {
//                 localStorage.clear();
//                 navigate("/signin");
//               }}
//               className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="w-full max-w-6xl mb-6 bg-white p-4 rounded shadow text-center">
//             <h1 className="text-2xl font-bold text-gray-800">
//               {userDetails?.name || "Shop Name"}
//             </h1>
//             <p className="text-sm text-gray-500">
//               Shop ID: {userDetails?.id || shopkeeperId}
//             </p>
//           </div>

//           {/* RE-DESIGNED CUSTOMER DETAILS MODAL */}
//           {verificationDialogOpen && verificationData && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
//               <div className="bg-white rounded-xl w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
                
//                 {/* Header */}
//                 <div className="px-4 sm:px-6 md:px-8 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
//                   <div>
//                     <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
//                       Customer Profile Dashboard
//                     </h2>
//                     {/* <p className="text-xs font-medium text-slate-500 mt-0.5">Verify information and execute transaction actions</p> */}
//                   </div>
//                   <button 
//                     onClick={handleCloseVerificationDialog}
//                     className="text-slate-400 hover:text-slate-600 text-2xl transition p-1 leading-none"
//                   >
//                     &times;
//                   </button>
//                 </div>

//                 {/* Scrollable Container Workspace */}
//                 <div className="p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 bg-white flex-1">
                  
//                   {/* Left Column: Visual Data Profile Card */}
//                   <div className="col-span-1 lg:col-span-4 w-full space-y-4 sm:space-y-6">
//                     <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-4 sm:p-5 relative overflow-hidden">
//                       <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200/60 flex items-center justify-center shrink-0 text-slate-700 font-bold text-base sm:text-lg">
//                           {verificationData.name ? verificationData.name.charAt(0).toUpperCase() : "C"}
//                         </div>
//                         <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
//                           {verificationData.name || "N/A"}
//                         </h3>
//                       </div>
                      
//                       <div className="space-y-0 sm:space-y-3 gap-6 sm:gap-0 text-xs flex flex-row sm:flex-col font-medium text-slate-600">
//                         <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                           <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
//                             Phone Number
//                           </span>
//                           <span className="text-slate-800 text-sm truncate">
//                             {verificationData.phone || "—"}
//                           </span>
//                         </div>
//                         <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                           <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
//                             Email Address
//                           </span>
//                           <span className="text-slate-800 text-sm break-all">
//                             {verificationData.email || "—"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* App Context Metrics */}
//                     <div className="space-y-3">
//                       {applications.includes("Referral") && verificationData.referralCode && (
//                         <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3.5 sm:p-4 flex justify-between items-center gap-2">
//                           <div className="min-w-0">
//                             <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider truncate">
//                               Available Balance
//                             </span>
//                             <span className="text-base sm:text-lg font-black text-emerald-800 truncate block">
//                               {currency.symbol}{verificationData.availableBalance}
//                             </span>
//                           </div>
//                           <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40 shrink-0 ml-2">
//                             {verificationData.referralCode}
//                           </span>
//                         </div>
//                       )}

//                       {applications.includes("Coupon") && verificationData.couponCode && (
//                         <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5 sm:p-4 space-y-2.5">
//                           <div className="flex justify-between items-center border-b border-amber-200/30 pb-2 gap-2">
//                             <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider truncate">
//                               Coupon Active
//                             </span>
//                             <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
//                               {verificationData.couponCode}
//                             </span>
//                           </div>
//                           <div className="grid grid-cols-2 gap-2 text-center text-xs">
//                             <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                               <span className="block text-[9px] text-slate-400 uppercase font-bold">
//                                 Discount
//                               </span>
//                               <span className="font-extrabold text-amber-800 text-xs sm:text-sm truncate block">
//                                 {currency.symbol}{verificationData.couponAmount}
//                               </span>
//                             </div>
//                             <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                               <span className="block text-[9px] text-slate-400 uppercase font-bold">
//                                 Remaining Uses
//                               </span>
//                               <span className="font-extrabold text-slate-800 text-xs sm:text-sm truncate block">
//                                 {verificationData.usageLeft} / {verificationData.couponUsageLimit}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Right Column: Dynamic Action Desks */}
//                   <div className="col-span-1 lg:col-span-8 flex flex-col justify-start gap-4 sm:gap-6">

//                     {/* Both Applications Active Panel */}
//                     {hasBothApplications && (
//                       <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm flex flex-col justify-between">
//                         <div>
//                           <div className="flex items-center gap-3 mb-4 sm:mb-6">
//                             <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
//                             <div>
//                               <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
//                                 Transaction
//                               </h3>
//                               {/* <p className="text-xs text-slate-500">
//                                 Process coupon and referral in a single transaction.
//                               </p> */}
//                             </div>
//                           </div>

//                           {/* Purchase Amount */}
//                           <div className="mb-4 sm:mb-5">
//                             <label className="block text-xs sm:text-sm font-semibold text-slate-600 mb-1.5 sm:mb-2">
//                               Enter Purchase Amount
//                             </label>
//                             <div className="relative">
//                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                                 {currency.symbol}
//                               </span>
//                               <input
//                                 type="number"
//                                 value={purchaseAmount}
//                                 onChange={(e) => {
//                                   setPurchaseAmount(e.target.value);
//                                   setCouponError("");
//                                   setReferralError("");
//                                 }}
//                                 className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
//                                 placeholder="0.00"
//                                 min={0}
//                               />
//                             </div>
//                           </div>

//                           {/* Coupon */}
//                           <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 mb-3 sm:mb-4 bg-white">
//                             <label className="flex items-center gap-3 cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 checked={applyCoupon}
//                                 onChange={(e) => setApplyCoupon(e.target.checked)}
//                                 className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
//                               />
//                               <span className="font-semibold text-xs text-slate-800">
//                                 Apply Coupon
//                               </span>
//                             </label>
//                             {applyCoupon && (
//                               <div className="mt-2 bg-amber-50/80 border border-amber-100 rounded-md p-2 sm:p-2.5 text-xs">
//                                 <div className="flex justify-between items-center">
//                                   <span className="text-slate-600 font-medium">Coupon Discount</span>
//                                   <span className="font-bold text-amber-800">
//                                     {currency.symbol}{verificationData.couponAmount}
//                                   </span>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           {/* Referral */}
//                           <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 bg-white">
//                             <label className="flex items-center gap-3 cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 checked={applyReferral}
//                                 onChange={(e) => {
//                                   setApplyReferral(e.target.checked);
//                                   if (!e.target.checked) {
//                                     setReferralType("");
//                                     setReferralRedeemAmount("");
//                                   }
//                                 }}
//                                 className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
//                               />
//                               <span className="font-semibold text-xs text-slate-800">
//                                 Redeem Available Balance
//                               </span>
//                             </label>
//                             {applyReferral && (
//                               <>
//                                 <div className="mt-2 bg-emerald-50/80 border border-emerald-100 rounded-md p-2 sm:p-2.5 text-xs">
//                                   <div className="flex justify-between items-center">
//                                     <span className="text-slate-600 font-medium">Available Balance</span>
//                                     <span className="font-bold text-emerald-800">
//                                       {currency.symbol}{verificationData.availableBalance}
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="mt-3 flex flex-row gap-6 text-xs">
//                                   <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
//                                     <input
//                                       type="radio"
//                                       checked={referralType === "full"}
//                                       onChange={() => {
//                                         setReferralType("full");
//                                         setReferralError("");
//                                       }}
//                                       className="text-emerald-600 focus:ring-emerald-500"
//                                     />
//                                     <span>Use Full Balance</span>
//                                   </label>
//                                   <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
//                                     <input
//                                       type="radio"
//                                       checked={referralType === "partial"}
//                                       onChange={() => {
//                                         setReferralType("partial");
//                                         setReferralError("");
//                                       }}
//                                       className="text-emerald-600 focus:ring-emerald-500"
//                                     />
//                                     <span>Use Partial Balance</span>
//                                   </label>
//                                 </div>
//                                 {referralType === "partial" && (
//                                   <div className="mt-3">
//                                     <label className="block text-xs font-semibold text-slate-600 mb-1">
//                                       Enter Amount
//                                     </label>
//                                     <div className="relative">
//                                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
//                                         {currency.symbol}
//                                       </span>
//                                       <input
//                                         type="number"
//                                         value={referralRedeemAmount}
//                                         onChange={(e) => {
//                                           setReferralRedeemAmount(e.target.value);
//                                           setReferralError("");
//                                         }}
//                                         className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
//                                         placeholder="Enter amount"
//                                         min={0}
//                                       />
//                                     </div>
//                                   </div>
//                                 )}
//                               </>
//                             )}
//                           </div>

//                           <div className="mt-3 border-t border-slate-200 pt-4 text-xs sm:text-sm">
//                             <h4 className="font-bold text-slate-800 mb-2.5">
//                               Total Discount
//                             </h4>

//                             <div className="flex justify-between text-slate-600 mb-1.5">
//                               <span>Redeem Coupon</span>
//                               <span className="font-semibold text-slate-800">
//                                 {applyCoupon
//                                   ? `${currency.symbol}${verificationData.couponAmount}`
//                                   : `${currency.symbol}0`}
//                               </span>
//                             </div>

//                             <div className="flex justify-between text-slate-600">
//                               <span>Redeem Balance</span>
//                               <span className="font-semibold text-slate-800">
//                                 {applyReferral
//                                   ? referralType === "full"
//                                     ? `${currency.symbol}${verificationData.availableBalance}`
//                                     : `${currency.symbol}${referralRedeemAmount || 0}`
//                                   : `${currency.symbol}0`}
//                               </span>
//                             </div>
//                           </div>

//                           {(couponError || referralError) && (
//                             <p className="text-rose-500 text-xs font-semibold mt-3">
//                               {couponError || referralError}
//                             </p>
//                           )}
//                         </div>

//                         <button
//                           onClick={handleSubmitTransaction}
//                           disabled={redeemLoading || couponLoading}
//                           className="w-auto self-end px-8 py-2.5 mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
//                         >
//                           {redeemLoading || couponLoading
//                             ? "Processing..."
//                             : "Submit Transaction"}
//                         </button>
//                       </div>
//                     )}
                    
//                     {/* Referral Card UI Desk */}
//                     {hasReferral && !hasCoupon && (
//                       <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
//                         <div>
//                           <div className="flex items-center gap-2 mb-4">
//                             <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
//                             <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
//                               Transaction
//                             </h3>
//                           </div>
                          
//                           <div className="space-y-3.5">
//                             <div>
//                               <label className="block text-xs font-bold text-slate-500 mb-1">
//                                 Enter Purchase Amount
//                               </label>
//                               <div className="relative">
//                                 <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                                   {currency.symbol}
//                                 </span>
//                                 <input
//                                   type="number"
//                                   value={purchaseAmount}
//                                   onChange={(e) => setPurchaseAmount(e.target.value)}
//                                   placeholder="0.00"
//                                   className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
//                                   min={0}
//                                 />
//                               </div>
//                             </div>

//                             {Number(verificationData.availableBalance) > 0 && (
//                               <div>
//                                 <div className="mt-4 flex flex-row gap-6">
//                                   <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
//                                     <input
//                                       type="radio"
//                                       checked={referralType === "full"}
//                                       onChange={() => {
//                                         setReferralType("full");
//                                         setReferralError("");
//                                       }}
//                                       className="text-emerald-600 focus:ring-emerald-500"
//                                     />
//                                     <span>Use Full Balance</span>
//                                   </label>
//                                   <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
//                                     <input
//                                       type="radio"
//                                       checked={referralType === "partial"}
//                                       onChange={() => {
//                                         setReferralType("partial");
//                                         setReferralError("");
//                                       }}
//                                       className="text-emerald-600 focus:ring-emerald-500"
//                                     />
//                                     <span>Use Partial Balance</span>
//                                   </label>
//                                 </div>
//                                 {referralType === "partial" && (
//                                   <div className="mt-3">
//                                     <label className="block text-xs font-bold text-slate-500 mb-1">
//                                       Enter Redeem Balance
//                                     </label>
//                                     <div className="relative">
//                                       <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                                         {currency.symbol}
//                                       </span>
//                                       <input
//                                         type="number"
//                                         value={referralRedeemAmount}
//                                         onChange={(e) => {
//                                           setReferralRedeemAmount(e.target.value);
//                                           setReferralError("");
//                                         }}
//                                         className="w-full pl-8 pr-4 border border-slate-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
//                                         placeholder="0.00"
//                                         min={0}
//                                       />
//                                     </div>  
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {referralError && (
//                           <p className="text-xs font-semibold text-rose-500 mt-2">
//                             {referralError}
//                           </p>
//                         )}

//                         <button
//                           onClick={handleReferralSubmit}
//                           disabled={redeemLoading}
//                           className="w-auto self-end px-8 py-2.5 mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
//                         >
//                           {redeemLoading ? "Processing..." : "Submit"}
//                         </button>
//                       </div>
//                     )}

//                     {/* Coupon Card UI Desk */}
//                     {hasCoupon && !hasReferral && (
//                       <div className="border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col gap-3">
//                         <div className="flex items-center gap-2 shrink-0">
//                           <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
//                           <h3 className="font-extrabold text-base text-slate-800 tracking-tight whitespace-nowrap">
//                             Transaction
//                           </h3>
//                         </div>

//                         <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full">
//                           <div className="flex-1 w-full">
//                             <label className="block text-xs font-bold text-slate-500 mb-1">
//                               Enter Purchase Amount
//                             </label>
//                             <div className="relative">
//                               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                                 {currency.symbol}
//                               </span>
//                               <input
//                                 type="number"
//                                 value={purchaseAmount}
//                                 onChange={(e) => {
//                                   setPurchaseAmount(e.target.value);
//                                   setCouponError("");
//                                 }}
//                                 placeholder="0.00"
//                                 className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//                                 min={0}
//                               />
//                             </div>
//                           </div>

//                           <button
//                             onClick={handleDirectCouponApply}
//                             disabled={couponLoading}
//                             className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10 shrink-0 h-[38px] flex items-center justify-center"
//                           >
//                             {couponLoading ? "Processing..." : "Submit"}
//                           </button>
//                         </div>

//                         {couponError && (
//                           <p className="text-xs font-semibold text-rose-500 mt-1">
//                             {couponError}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Footer Controls */}
//                 <div className="px-4 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
//                   <button 
//                     onClick={handleCloseVerificationDialog} 
//                     className="w-full sm:w-auto px-6 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* Main Form Dashboard Grid layout panels */}
//           <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Code Entry */}
//             <div className="bg-gray-50 p-6 rounded shadow">
//               <h2 className="font-semibold mb-2">Search Code</h2>
//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Enter Referral or Coupon Code"
//                 className="w-full p-2 border rounded mb-4"
//               />
//               <button
//                 onClick={handleSearchCode}
//                 className="bg-green-500 text-white py-2 px-4 rounded w-full"
//               >
//                 Search
//               </button>
//             </div>

//             {/* Phone */}
//             <div className="bg-purple-50 p-6 rounded shadow">
//               <h2 className="font-semibold flex items-center mb-2">
//                 <FaPhone className="mr-2" /> Phone Number
//               </h2>
//               <div className="flex items-center">
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//                     setPhoneNumber(value);
//                     setPhoneVerified(false);
//                   }}
//                   placeholder="Enter phone"
//                   className="w-full p-2 border rounded"
//                   maxLength={10}
//                 />
//                 <button
//                   onClick={handleVerifyPhone}
//                   disabled={phoneVerified}
//                   className={`ml-2 p-2 rounded-full ${
//                     phoneVerified
//                       ? "bg-green-100 text-green-600"
//                       : "bg-purple-100 text-purple-600"
//                   }`}
//                 >
//                   <FaCheck />
//                 </button>
//               </div>
//               <p className="text-xs">
//                 {phoneVerified
//                   ? "Verified!"
//                   : "We’ll use this to identify user"}
//               </p>
//             </div>

//             {/* Email */}
//             <div className="bg-blue-50 p-6 rounded shadow">
//               <h2 className="font-semibold flex items-center mb-2">
//                 <FaEnvelope className="mr-2" /> Email Address
//               </h2>
//               <div className="flex items-center">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setEmailVerified(false);
//                   }}
//                   placeholder="Enter email"
//                   className="w-full p-2 border rounded"
//                 />
//                 <button
//                   onClick={handleVerifyEmail}
//                   disabled={emailVerified}
//                   className={`ml-2 p-2 rounded-full ${
//                     emailVerified
//                       ? "bg-green-100 text-green-600"
//                       : "bg-blue-100 text-blue-600"
//                   }`}
//                 >
//                   <FaCheck />
//                 </button>
//               </div>
//               <p className="text-xs">
//                 {emailVerified
//                   ? "Verified!"
//                   : "We’ll use this to identify user"}
//               </p>
//             </div>

//             {/* Scanner Trigger */}
//             <div className="bg-blue-50 p-6 rounded shadow">
//               <h2 className="font-semibold text-center mb-3">Scan Code</h2>
//               <div className="flex flex-col items-center">
//                 <button
//                   onClick={() => setShowScanner(true)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
//                 >
//                   <FaQrcode className="mr-2" />
//                   Open Scanner
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Scanner Modal Container */}
//           {showScanner && (
//             <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm">
//               <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-3">
//                 <h2 className="text-lg font-bold">QR Code Scanner</h2>
//                 <button
//                   onClick={() => setShowScanner(false)}
//                   className="text-white hover:text-gray-300 text-2xl leading-none"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="flex-1 bg-white overflow-hidden">
//                 <Scanner
//                   onScan={(scannedCode) => {
//                     setCode(scannedCode);
//                     setShowScanner(false);
//                   }}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Code Result Display Row view blocks */}
//           {codeDetails && (
//             <div className="max-w-6xl w-full bg-gray-50 p-6 rounded shadow mt-6">
//               <h3 className="font-bold text-lg">Code Details</h3>
//               <p><strong>Code:</strong> {codeDetails.code}</p>
//               <p><strong>Status:</strong> {codeDetails.status}</p>
//               <p><strong>Expiry:</strong> {codeDetails.expiryDate}</p>

//               {codeDetails.user && (
//                 <>
//                   <h4 className="font-semibold mt-3">User Info</h4>
//                   <p><strong>Name:</strong> {codeDetails.user.name}</p>
//                   <p><strong>Email:</strong> {codeDetails.user.email}</p>
//                   <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
//                 </>
//               )}

//               {isCouponCode ? (
//                 <>
//                   <p><strong>Discount:</strong> ${codeDetails.amount}</p>
//                   <p><strong>Uses Left:</strong> {codeDetails.usageLimitLeft}</p>
//                   <button
//                     onClick={handleUseCouponCode}
//                     className="mt-2 bg-orange-500 text-white py-2 px-4 rounded"
//                   >
//                     Use Coupon Code
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p><strong>Referral Amount:</strong> {currency.symbol}{codeDetails.referralAmount}</p>
//                   <p><strong>Referrer Amount:</strong> {currency.symbol}{codeDetails.referrerAmount}</p>
//                 </>
//               )}
//             </div>
//           )}

//           {validationMessage && (
//             <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
//           )}
//         </>
//       )}

//       <SuccessPopup
//         isOpen={showSuccessPopup}
//         onClose={() => {
//           setShowSuccessPopup(false);
//           handleCloseVerificationDialog();
//         }}
//         purchaseAmount={successData.purchaseAmount}
//         couponAmount={successData.couponAmount}
//         redeemAmount={successData.redeemAmount}
//       />
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
import { getCurrentCurrency } from "../../utils/currencyUtils";
import SuccessPopup from "./SuccessPopup";

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
  const [couponLoading, setCouponLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [applications, setApplications] = useState([]);

  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [referralRedeemAmount, setReferralRedeemAmount] = useState("");
  const [couponError, setCouponError] = useState("");
  const [referralError, setReferralError] = useState("");
  // Unified transaction error shown below Total Discount (backend + client validation)
  const [transactionError, setTransactionError] = useState("");

  const [redeemLoading, setRedeemLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState({});

  const [applyCoupon, setApplyCoupon] = useState(false);
  const [applyReferral, setApplyReferral] = useState(false);
  const [referralType, setReferralType] = useState("");

  const currency = getCurrentCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserDetails(user);
        if (user.application_name && Array.isArray(user.application_name)) {
          setApplications(user.application_name);
        } else if (user.application_name) {
          setApplications([user.application_name]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  const shopkeeperId = userDetails?.shopkeeperId || localStorage.getItem("shopkeeperId");

  const handleVerifyPhone = async () => {
    if (!phoneNumber.trim()) return toast.error("Please enter a phone number");

    const cleanedPhone = phoneNumber.trim().replace(/\D/g, "");

    if (cleanedPhone.length !== 10) {
      return toast.error("Phone number must be exactly 10 digits");
    }

    try {
      const data = await userInfo("", cleanedPhone);
      if (data?.phone) {
        const firstCoupon = data.coupons?.[0] || {};

        setVerificationData({
          customerId: data.customerId || "Unknown",
          name: data.name,
          phone: data.phone,
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: firstCoupon.couponAmount || 0,
          couponUsageLimit: firstCoupon.couponUsageLimit || 0,
          usageLeft: firstCoupon.usageLeft || 0,
          couponCode: firstCoupon.couponCode || "",
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
        const firstCoupon = data.coupons?.[0] || {};

        setVerificationData({
          customerId: data.customerId || "Unknown",
          name: data.name,
          phone: data.phone || "",
          email: data.email,
          availableBalance: data.availableBalance || 0,
          couponAmount: firstCoupon.couponAmount || 0,
          couponUsageLimit: firstCoupon.couponUsageLimit || 0,
          usageLeft: firstCoupon.usageLeft || 0,
          couponCode: firstCoupon.couponCode || "",
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
    resetAllStates();
  };

  const resetAllStates = () => {
    setPhoneNumber("");
    setEmail("");
    setPurchaseAmount("");
    setCouponError("");
    setReferralError("");
    setTransactionError("");
    setApplyCoupon(false);
    setApplyReferral(false);
    setReferralType("");
    setReferralRedeemAmount("");
    setShowSuccessPopup(false);
    setPhoneVerified(false);
    setEmailVerified(false);
    setRedeemLoading(false);
    setCouponLoading(false);
  };

  // Helper: compute redeem amount based on referralType
  const getFinalRedeemAmount = () => {
    if (!applyReferral || !referralType) return 0;
    if (referralType === "full") return Number(verificationData.availableBalance) || 0;
    if (referralType === "partial") return Number(referralRedeemAmount || 0);
    if (referralType === "purchase") {
      // Use purchase amount, capped by available balance
      const purchase = Number(purchaseAmount || 0);
      const balance = Number(verificationData.availableBalance) || 0;
      return Math.min(purchase, balance);
    }
    return 0;
  };

  const handleCombinedTransaction = async () => {
    setTransactionError("");
    setCouponError("");
    setReferralError("");

    if (applyReferral && !referralType) {
      setReferralError("Select Full, Partial, or Purchase Amount redemption");
      return;
    }

    let finalRedeemAmount = getFinalRedeemAmount();

    if (referralType === "partial") {
      if (finalRedeemAmount > Number(verificationData.availableBalance)) {
        setReferralError("Redeem amount exceeds available balance");
        return;
      }
      if (finalRedeemAmount <= 0) {
        setReferralError("Please enter a valid redeem amount");
        return;
      }
    }

    if (referralType === "purchase") {
      if (!purchaseAmount || Number(purchaseAmount) <= 0) {
        setReferralError("Please enter purchase amount first");
        return;
      }
    }

    const couponDiscount = applyCoupon ? Number(verificationData.couponAmount) || 0 : 0;
    const totalDiscount = couponDiscount + finalRedeemAmount;

    if (totalDiscount > Number(purchaseAmount)) {
      setTransactionError("Total discount cannot exceed purchase amount.");
      return;
    }

    const token = localStorage.getItem("token");
    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: verificationData.customerId,
          couponCode: verificationData.couponCode,
          purchaseAmount: Number(purchaseAmount),
          redeemAmount: finalRedeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: purchaseAmount,
        couponAmount: verificationData.couponAmount,
        redeemAmount: finalRedeemAmount,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Transaction failed";
      setTransactionError(msg);
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleDirectCouponApply = async () => {
    setTransactionError("");
    setCouponError("");

    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setCouponError("Please enter purchase amount");
      return;
    }

    // Client-side guard so we can show message under Total Discount
    const couponAmt = Number(verificationData.couponAmount) || 0;
    if (couponAmt > Number(purchaseAmount)) {
      setTransactionError("Total discount cannot exceed purchase amount.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setTransactionError("Authentication token missing.");
      return;
    }

    setCouponLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: verificationData.customerId,
          couponCode: verificationData.couponCode,
          purchaseAmount: Number(purchaseAmount),
          redeemAmount: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: purchaseAmount,
        couponAmount: verificationData.couponAmount,
        redeemAmount: 0,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Failed to apply coupon";
      setTransactionError(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleReferralSubmit = async () => {
    setTransactionError("");
    setReferralError("");

    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setReferralError("Please enter purchase amount");
      return;
    }

    if (Number(verificationData.availableBalance) <= 0) {
      await handlePlainPurchase();
      return;
    }

    if (!referralType) {
      setReferralError("Select Full, Partial, or Purchase Amount");
      return;
    }

    let redeemAmount = getFinalRedeemAmount();

    if (referralType === "partial") {
      if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
        setReferralError("Please enter redeem amount");
        return;
      }
      if (Number(referralRedeemAmount) > verificationData.availableBalance) {
        setReferralError("Redeem amount exceeds available balance");
        return;
      }
      redeemAmount = Number(referralRedeemAmount);
    }

    if (referralType === "purchase") {
      if (!purchaseAmount || Number(purchaseAmount) <= 0) {
        setReferralError("Please enter purchase amount first");
        return;
      }
      // already capped in getFinalRedeemAmount
    }

    if (redeemAmount > Number(purchaseAmount)) {
      setReferralError("Redeem amount cannot exceed purchase amount");
      return;
    }

    const token = localStorage.getItem("token");
    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
        {
          customerId: verificationData.customerId,
          referralCode:
            verificationData.referralCode && verificationData.referralCode !== "None"
              ? verificationData.referralCode
              : null,
          purchaseAmount: Number(purchaseAmount),
          discountAmount: redeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: purchaseAmount,
        couponAmount: 0,
        redeemAmount,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Redeem failed";
      setTransactionError(msg);
    } finally {
      setRedeemLoading(false);
    }
  };

  const handlePlainPurchase = async () => {
    setTransactionError("");

    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setTransactionError("Enter purchase amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setTransactionError("Authentication token missing.");
      return;
    }

    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/record-purchase`,
        {
          customerId: verificationData.customerId,
          purchaseAmount: Number(purchaseAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: purchaseAmount,
        couponAmount: 0,
        redeemAmount: 0,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err.message ||
        "Purchase recording failed";
      setTransactionError(msg);
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleSubmitTransaction = async () => {
    setTransactionError("");
    setCouponError("");
    setReferralError("");

    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setTransactionError("Enter purchase amount");
      return;
    }

    if (!applyCoupon && !applyReferral) {
      await handlePlainPurchase();
      return;
    }

    if (applyCoupon && !applyReferral) {
      await handleDirectCouponApply();
      return;
    }

    if (!applyCoupon && applyReferral) {
      await handleReferralSubmit();
      return;
    }

    if (applyCoupon && applyReferral) {
      await handleCombinedTransaction();
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

  const hasReferral =
    applications.includes("Referral") && verificationData?.referralCode;

  const hasCoupon =
    applications.includes("Coupon") && verificationData?.couponCode;

  const hasBothApplications = hasReferral && hasCoupon;

  // Display value for redeem balance in Total Discount section
  const displayRedeemBalance = () => {
    if (!applyReferral) return `${currency.symbol}0`;
    if (referralType === "full")
      return `${currency.symbol}${verificationData.availableBalance}`;
    if (referralType === "partial")
      return `${currency.symbol}${referralRedeemAmount || 0}`;
    if (referralType === "purchase") {
      const purchase = Number(purchaseAmount || 0);
      const balance = Number(verificationData.availableBalance) || 0;
      return `${currency.symbol}${Math.min(purchase, balance)}`;
    }
    return `${currency.symbol}0`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {userDetails?.role === "SHOP_EMPLOYEE" && userDetails?.employeeActive === false ? (
        <div className="w-full max-w-4xl mt-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded p-10 shadow-lg">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Access Restricted</h1>
            <p className="text-lg text-gray-700 mb-4">
              Your employee account has been deactivated.
            </p>
            <p className="text-md text-gray-600 mb-3">This usually happens if:</p>
            <ul className="text-md text-gray-600 list-disc list-inside mb-6 text-left inline-block">
              <li>Your employment with this shop has ended</li>
              <li>Your access was temporarily disabled by the shop owner</li>
            </ul>
            <p className="text-md text-gray-600 mb-6">
              If you believe this is a mistake or you are still working with this shop, please
              contact the shop owner or administrator to reactivate your account.
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

          {/* RE-DESIGNED CUSTOMER DETAILS MODAL */}
          {verificationDialogOpen && verificationData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
              <div className="bg-white rounded-xl w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
                {/* Header */}
                <div className="px-4 sm:px-6 md:px-8 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                      Customer Profile Dashboard
                    </h2>
                  </div>
                  <button
                    onClick={handleCloseVerificationDialog}
                    className="text-slate-400 hover:text-slate-600 text-2xl transition p-1 leading-none"
                  >
                    &times;
                  </button>
                </div>

                {/* Scrollable Container Workspace */}
                <div className="p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 bg-white flex-1">
                  {/* Left Column: Visual Data Profile Card */}
                  <div className="col-span-1 lg:col-span-4 w-full space-y-4 sm:space-y-6">
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-4 sm:p-5 relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200/60 flex items-center justify-center shrink-0 text-slate-700 font-bold text-base sm:text-lg">
                          {verificationData.name
                            ? verificationData.name.charAt(0).toUpperCase()
                            : "C"}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                          {verificationData.name || "N/A"}
                        </h3>
                      </div>

                      <div className="space-y-0 sm:space-y-3 gap-6 sm:gap-0 text-xs flex flex-row sm:flex-col font-medium text-slate-600">
                        <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                          <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                            Phone Number
                          </span>
                          <span className="text-slate-800 text-sm truncate">
                            {verificationData.phone || "—"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                          <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                            Email Address
                          </span>
                          <span className="text-slate-800 text-sm break-all">
                            {verificationData.email || "—"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* App Context Metrics */}
                    <div className="space-y-3">
                      {applications.includes("Referral") && verificationData.referralCode && (
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3.5 sm:p-4 flex justify-between items-center gap-2">
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider truncate">
                              Available Balance
                            </span>
                            <span className="text-base sm:text-lg font-black text-emerald-800 truncate block">
                              {currency.symbol}
                              {verificationData.availableBalance}
                            </span>
                          </div>
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40 shrink-0 ml-2">
                            {verificationData.referralCode}
                          </span>
                        </div>
                      )}

                      {applications.includes("Coupon") && verificationData.couponCode && (
                        <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5 sm:p-4 space-y-2.5">
                          <div className="flex justify-between items-center border-b border-amber-200/30 pb-2 gap-2">
                            <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider truncate">
                              Coupon Active
                            </span>
                            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
                              {verificationData.couponCode}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                              <span className="block text-[9px] text-slate-400 uppercase font-bold">
                                Discount
                              </span>
                              <span className="font-extrabold text-amber-800 text-xs sm:text-sm truncate block">
                                {currency.symbol}
                                {verificationData.couponAmount}
                              </span>
                            </div>
                            <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                              <span className="block text-[9px] text-slate-400 uppercase font-bold">
                                Remaining Uses
                              </span>
                              <span className="font-extrabold text-slate-800 text-xs sm:text-sm truncate block">
                                {verificationData.usageLeft} / {verificationData.couponUsageLimit}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Action Desks */}
                  <div className="col-span-1 lg:col-span-8 flex flex-col justify-start gap-4 sm:gap-6">
                    {/* Both Applications Active Panel */}
                    {hasBothApplications && (
                      <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
                            <div>
                              <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                                Transaction
                              </h3>
                            </div>
                          </div>

                          {/* Purchase Amount */}
                          <div className="mb-4 sm:mb-5">
                            <label className="block text-xs sm:text-sm font-semibold text-slate-600 mb-1.5 sm:mb-2">
                              Enter Purchase Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={purchaseAmount}
                                onChange={(e) => {
                                  setPurchaseAmount(e.target.value);
                                  setCouponError("");
                                  setReferralError("");
                                  setTransactionError("");
                                }}
                                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                placeholder="0.00"
                                min={0}
                              />
                            </div>
                          </div>

                          {/* Coupon */}
                          <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 mb-3 sm:mb-4 bg-white">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={applyCoupon}
                                onChange={(e) => {
                                  setApplyCoupon(e.target.checked);
                                  setTransactionError("");
                                }}
                                className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                              />
                              <span className="font-semibold text-xs text-slate-800">
                                Apply Coupon
                              </span>
                            </label>
                            {applyCoupon && (
                              <div className="mt-2 bg-amber-50/80 border border-amber-100 rounded-md p-2 sm:p-2.5 text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600 font-medium">
                                    Coupon Discount
                                  </span>
                                  <span className="font-bold text-amber-800">
                                    {currency.symbol}
                                    {verificationData.couponAmount}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Referral */}
                          <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 bg-white">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={applyReferral}
                                onChange={(e) => {
                                  setApplyReferral(e.target.checked);
                                  if (!e.target.checked) {
                                    setReferralType("");
                                    setReferralRedeemAmount("");
                                  }
                                  setTransactionError("");
                                }}
                                className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                              />
                              <span className="font-semibold text-xs text-slate-800">
                                Redeem Amount
                              </span>
                            </label>
                            {applyReferral && (
                              <>
                                <div className="mt-2 bg-emerald-50/80 border border-emerald-100 rounded-md p-2 sm:p-2.5 text-xs">
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-600 font-medium">
                                      Available Balance
                                    </span>
                                    <span className="font-bold text-emerald-800">
                                      {currency.symbol}
                                      {verificationData.availableBalance}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                                    <input
                                      type="radio"
                                      checked={referralType === "purchase"}
                                      onChange={() => {
                                        setReferralType("purchase");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Purchase Amount</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                                    <input
                                      type="radio"
                                      checked={referralType === "partial"}
                                      onChange={() => {
                                        setReferralType("partial");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Partial Available Balance</span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                                    <input
                                      type="radio"
                                      checked={referralType === "full"}
                                      onChange={() => {
                                        setReferralType("full");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Full Available Balance</span>
                                  </label>
                                </div>
                                {referralType === "partial" && (
                                  <div className="mt-3">
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                      Enter Amount
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                                        {currency.symbol}
                                      </span>
                                      <input
                                        type="number"
                                        value={referralRedeemAmount}
                                        onChange={(e) => {
                                          setReferralRedeemAmount(e.target.value);
                                          setReferralError("");
                                          setTransactionError("");
                                        }}
                                        className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="Enter amount"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                )}
                                {referralType === "purchase" && (
                                  <div className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-600">
                                    Will redeem{" "}
                                    <span className="font-bold text-emerald-700">
                                      {currency.symbol}
                                      {Math.min(
                                        Number(purchaseAmount || 0),
                                        Number(verificationData.availableBalance) || 0
                                      )}
                                    </span>{" "}
                                    (min of purchase amount & available balance)
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          <div className="mt-3 border-t border-slate-200 pt-4 text-xs sm:text-sm">
                            <h4 className="font-bold text-slate-800 mb-2.5">Total Discount</h4>

                            <div className="flex justify-between text-slate-600 mb-1.5">
                              <span>Redeem Coupon</span>
                              <span className="font-semibold text-slate-800">
                                {applyCoupon
                                  ? `${currency.symbol}${verificationData.couponAmount}`
                                  : `${currency.symbol}0`}
                              </span>
                            </div>

                            <div className="flex justify-between text-slate-600">
                              <span>Redeem Balance</span>
                              <span className="font-semibold text-slate-800">
                                {displayRedeemBalance()}
                              </span>
                            </div>
                          </div>

                          {(couponError || referralError || transactionError) && (
                            <p className="text-rose-500 text-xs font-semibold mt-3">
                              {couponError || referralError || transactionError}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={handleSubmitTransaction}
                          disabled={redeemLoading || couponLoading}
                          className="w-auto self-end px-8 py-2.5 mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
                        >
                          {redeemLoading || couponLoading ? "Processing..." : "Submit Transaction"}
                        </button>
                      </div>
                    )}

                    {/* Referral Card UI Desk */}
                    {hasReferral && !hasCoupon && (
                      <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
                              Transaction
                            </h3>
                          </div>

                          <div className="space-y-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 mb-1">
                                Enter Purchase Amount
                              </label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                  {currency.symbol}
                                </span>
                                <input
                                  type="number"
                                  value={purchaseAmount}
                                  onChange={(e) => {
                                    setPurchaseAmount(e.target.value);
                                    setReferralError("");
                                    setTransactionError("");
                                  }}
                                  placeholder="0.00"
                                  className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                  min={0}
                                />
                              </div>
                            </div>

                            {Number(verificationData.availableBalance) > 0 && (
                              <div>
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      checked={referralType === "purchase"}
                                      onChange={() => {
                                        setReferralType("purchase");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Purchase Amount</span>
                                  </label>
                                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      checked={referralType === "partial"}
                                      onChange={() => {
                                        setReferralType("partial");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Partial Available Balance</span>
                                  </label>
                                  <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
                                    <input
                                      type="radio"
                                      checked={referralType === "full"}
                                      onChange={() => {
                                        setReferralType("full");
                                        setReferralError("");
                                        setTransactionError("");
                                      }}
                                      className="text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span>Full Available Balance</span>
                                  </label>
                                </div>
                                {referralType === "partial" && (
                                  <div className="mt-3">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      Enter Amount
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                        {currency.symbol}
                                      </span>
                                      <input
                                        type="number"
                                        value={referralRedeemAmount}
                                        onChange={(e) => {
                                          setReferralRedeemAmount(e.target.value);
                                          setReferralError("");
                                          setTransactionError("");
                                        }}
                                        className="w-full pl-8 pr-4 border border-slate-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        placeholder="0.00"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                )}
                                {referralType === "purchase" && (
                                  <div className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-600">
                                    Will redeem{" "}
                                    <span className="font-bold text-emerald-700">
                                      {currency.symbol}
                                      {Math.min(
                                        Number(purchaseAmount || 0),
                                        Number(verificationData.availableBalance) || 0
                                      )}
                                    </span>{" "}
                                    (min of purchase amount & available balance)
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {(referralError || transactionError) && (
                          <p className="text-xs font-semibold text-rose-500 mt-2">
                            {referralError || transactionError}
                          </p>
                        )}

                        <button
                          onClick={handleReferralSubmit}
                          disabled={redeemLoading}
                          className="w-auto self-end px-8 py-2.5 mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
                        >
                          {redeemLoading ? "Processing..." : "Submit"}
                        </button>
                      </div>
                    )}

                    {/* Coupon Card UI Desk */}
                    {hasCoupon && !hasReferral && (
                      <div className="border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                          <h3 className="font-extrabold text-base text-slate-800 tracking-tight whitespace-nowrap">
                            Transaction
                          </h3>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full">
                          <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              Enter Purchase Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={purchaseAmount}
                                onChange={(e) => {
                                  setPurchaseAmount(e.target.value);
                                  setCouponError("");
                                  setTransactionError("");
                                }}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                                min={0}
                              />
                            </div>
                          </div>

                          <button
                            onClick={handleDirectCouponApply}
                            disabled={couponLoading}
                            className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10 shrink-0 h-[38px] flex items-center justify-center"
                          >
                            {couponLoading ? "Processing..." : "Submit"}
                          </button>
                        </div>

                        {(couponError || transactionError) && (
                          <p className="text-xs font-semibold text-rose-500 mt-1">
                            {couponError || transactionError}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-4 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
                  <button
                    onClick={handleCloseVerificationDialog}
                    className="w-full sm:w-auto px-6 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Form Dashboard Grid layout panels */}
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
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhoneNumber(value);
                    setPhoneVerified(false);
                  }}
                  placeholder="Enter phone"
                  className="w-full p-2 border rounded"
                  maxLength={10}
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
                {phoneVerified ? "Verified!" : "We’ll use this to identify user"}
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
                {emailVerified ? "Verified!" : "We’ll use this to identify user"}
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

          {/* Scanner Modal Container */}
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

          {/* Code Result Display Row view blocks */}
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
                    <strong>Referral Amount:</strong> {currency.symbol}
                    {codeDetails.referralAmount}
                  </p>
                  <p>
                    <strong>Referrer Amount:</strong> {currency.symbol}
                    {codeDetails.referrerAmount}
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

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          handleCloseVerificationDialog();
        }}
        purchaseAmount={successData.purchaseAmount}
        couponAmount={successData.couponAmount}
        redeemAmount={successData.redeemAmount}
      />
    </div>
  );
};

export default InteractionPanel;