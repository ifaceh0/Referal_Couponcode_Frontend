// import React, { useState, useEffect } from "react";
// import QrScanner from "react-qr-scanner";
// import { motion } from "framer-motion";
// import { FaSyncAlt } from "react-icons/fa";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { getCurrentUser } from "../../api/signin";
// import { userInfo } from "../../api/validateCode";
// import CustomerDetailsDialog from "./CustomerDetailsDialog";

// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [errorDialogOpen, setErrorDialogOpen] = useState(false);
//   const [errorDialogMessage, setErrorDialogMessage] = useState("");
//   const [successDialogOpen, setSuccessDialogOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [cameraFacingMode, setCameraFacingMode] = useState("environment");
//   const [hasCameraPermission, setHasCameraPermission] = useState(true);
//   const [applications, setApplications] = useState([]);
//   const [couponError, setCouponError] = useState("");
//   const [referralError, setReferralError] = useState("");

//   const [couponLoading, setCouponLoading] = useState(false);
//   const [referralLoading, setReferralLoading] = useState(false);

//   const [couponAmount, setCouponAmount] = useState("");
//   const [referralAmount, setReferralAmount] = useState("");

//   const [isProcessing, setIsProcessing] = useState(false);

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

//   const handleScan = async (data) => {

//     if (!data || isProcessing) return;

//     setIsProcessing(true);

//     try {

//       const parsedData = JSON.parse(data.text);

//       if (!userDetails) {
//         toast.error("User details not loaded.");
//         setIsProcessing(false);
//         return;
//       }

//       if (String(parsedData.shopID) !== String(userDetails.id)) {
//         setErrorDialogMessage(
//           "Invalid scan code. This customer does not belong to your shop."
//         );
//         setErrorDialogOpen(true);
//         setIsProcessing(false);
//         return;
//       }

//       const freshInfo = await userInfo("", parsedData.phone);

//       const firstCoupon = freshInfo?.coupons?.[0] || null;

//       const updatedScannedData = {
//         ...parsedData,
//         availableBalance: freshInfo?.availableBalance ?? 0,
//         couponCode: firstCoupon?.couponCode || null,
//         couponAmount: firstCoupon?.couponAmount || 0,
//         couponUsageLimit: firstCoupon?.couponUsageLimit || 0,
//         usageLeft: firstCoupon?.usageLeft || 0,
//         referralCode: freshInfo?.referralCode || null,
//       };

//       setScannedData(updatedScannedData);
//       navigator.vibrate(200);
//       setOpen(true);

//     } catch (error) {
//       console.error(error);
//     } finally {
//       setTimeout(() => {
//         setIsProcessing(false);
//       }, 1500);
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//     if (err.name === "NotAllowedError") {
//       setHasCameraPermission(false);
//     }
//   };

//   const toggleCamera = () => {
//     setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
//   };

//   const handleRedeemClick = async () => {

//     if (!referralAmount) {
//       setReferralError("Please enter redeem amount.");
//       return;
//     }

//     const amount = parseFloat(referralAmount);

//     const availableBalance = parseFloat(
//       scannedData?.availableBalance || 0
//     );

//     if (amount > availableBalance) {
//       setReferralError("Amount exceeds available balance.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setReferralError("Authentication token missing.");
//       return;
//     }

//     setReferralError("");

//     try {

//       setReferralLoading(true);

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//         {
//           customerId: scannedData.customerId,
//           referralCode:
//             scannedData.referralCode &&
//             scannedData.referralCode !== "None"
//               ? scannedData.referralCode
//               : null,
//           discountAmount: amount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Discount redeemed successfully!");

//       setOpen(false);

//       setReferralAmount("");
//       setReferralError("");

//     } catch (err) {

//       const backendMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.details ||
//         err?.response?.data ||
//         err.message ||
//         "Redeem failed";

//       setReferralError(
//         typeof backendMessage === "string"
//           ? backendMessage
//           : JSON.stringify(backendMessage)
//       );

//     } finally {
//       setReferralLoading(false);
//     }
//   };

//   const handleApplyCoupon = async () => {

//     if (!couponAmount) {
//       setCouponError("Please enter purchase amount.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setCouponError("Authentication token missing.");
//       return;
//     }

//     setCouponError("");

//     try {

//       setCouponLoading(true);

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: scannedData.customerId,
//           couponCode: scannedData.couponCode,
//           purchaseAmount: parseFloat(couponAmount),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Coupon applied successfully!");

//       setOpen(false);

//       setCouponAmount("");
//       setCouponError("");

//     } catch (err) {

//       const backendMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.details ||
//         err?.response?.data ||
//         err.message ||
//         "Coupon apply failed";

//       setCouponError(
//         typeof backendMessage === "string"
//           ? backendMessage
//           : JSON.stringify(backendMessage)
//       );

//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//     setScannedData(null);
//     setError("");
//   };

//   const handleCloseErrorDialog = () => {
//     setErrorDialogOpen(false);
//     setErrorDialogMessage("");
//   };

//   const handleCloseSuccessDialog = () => {
//     setSuccessDialogOpen(false);
//   };

//   const handleRedeemAmountChange = (e) => {
//     const raw = e.target.value.substring(1);
//     const value = raw.replace(/[^0-9.]/g, "");
//     if (/^\d*\.?\d{0,4}$/.test(value)) {
//       setRedeemAmount(value);
//       setError("");
//     }
//   };

//   {isProcessing && (
//     <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
//       <div className="bg-white px-4 py-2 rounded-lg font-semibold">
//         Processing...
//       </div>
//     </div>
//   )}

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-3xl font-bold mb-8 text-gray-800"
//       >
//         QR Code Scanner
//       </motion.h1>

//       {!hasCameraPermission && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md w-full">
//           <p>Camera permission denied. Please allow camera access in your browser settings.</p>
//         </div>
//       )}

//       <div className="w-full max-w-2xl flex flex-col items-center">
//         {userDetails && !open ? (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="relative w-full rounded-lg overflow-hidden shadow-lg"
//             style={{ height: "70vh", maxHeight: "600px", minHeight: "300px" }}
//           >
//             <QrScanner
//               key={cameraFacingMode}
//               delay={300}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: "100%", height: "100%" }}
//               constraints={{
//                 video: {
//                   facingMode: cameraFacingMode,
//                   width: 640,
//                   height: 640,
//                 }
//               }}
//             />
//             <button
//               onClick={toggleCamera}
//               className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-3 z-10"
//               aria-label="Switch camera"
//             >
//               <FaSyncAlt className="text-lg" />
//             </button>
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="border-4 border-yellow-400 rounded-xl w-64 h-64 md:w-72 md:h-72 relative">
//                 <div className="absolute -top-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
//                 <div className="absolute -bottom-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <p className="text-gray-600 mt-4">Loading scanner...</p>
//         )}
//       </div>

//       <div className="mt-3 text-gray-600 text-sm">
//         {cameraFacingMode === "environment" ? "Using back camera" : "Using front camera"}
//       </div>

//       <CustomerDetailsDialog
//         open={open}
//         onClose={handleCloseDialog}
//         scannedData={scannedData}
//         couponAmount={couponAmount}
//         setCouponAmount={setCouponAmount}

//         referralAmount={referralAmount}
//         setReferralAmount={setReferralAmount}

//         couponError={couponError}
//         referralError={referralError}
//         onRedeemClick={handleRedeemClick}
//         onApplyCoupon={handleApplyCoupon}
//         applications={applications}
//         couponLoading={couponLoading}
//         referralLoading={referralLoading}
//       />

//       {/* Error Modal */}
//       {errorDialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-red-300 shadow-xl">
//             <h2 className="text-xl font-bold text-center text-red-600 mb-4">Error</h2>
//             <p className="text-gray-700 text-center">{errorDialogMessage}</p>
//             <button
//               onClick={handleCloseErrorDialog}
//               className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {successDialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-green-300 shadow-xl">
//             <h2 className="text-xl font-bold text-center text-green-600 mb-4">Success</h2>
//             <p className="text-gray-700 text-center">{successMessage}</p>
//             <button
//               onClick={handleCloseSuccessDialog}
//               className="mt-6 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Scanner;













// import React, { useState, useEffect } from "react";
// import QrScanner from "react-qr-scanner";
// import { motion } from "framer-motion";
// import { FaSyncAlt } from "react-icons/fa";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { getCurrentUser } from "../../api/signin";
// import { userInfo } from "../../api/validateCode";
// import CustomerDetailsDialog from "./CustomerDetailsDialog";
// import { getCurrentCurrency } from "../../utils/currencyUtils";
// import SuccessPopup from "../shopkeeper/SuccessPopup";

// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setUserDetails] = useState(null);
//   const [errorDialogOpen, setErrorDialogOpen] = useState(false);
//   const [errorDialogMessage, setErrorDialogMessage] = useState("");
//   const [successDialogOpen, setSuccessDialogOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [cameraFacingMode, setCameraFacingMode] = useState("environment");
//   const [hasCameraPermission, setHasCameraPermission] = useState(true);
//   const [applications, setApplications] = useState([]);
//   const [couponError, setCouponError] = useState("");
//   const [referralError, setReferralError] = useState("");

//   const [couponLoading, setCouponLoading] = useState(false);
//   const [referralLoading, setReferralLoading] = useState(false);

//   const [couponPurchaseAmount, setCouponPurchaseAmount] = useState("");
//   const [referralPurchaseAmount, setReferralPurchaseAmount] = useState("");
//   const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

//   const [showRedeemChoiceModal, setShowRedeemChoiceModal] = useState(false);
//   const [redeemOption, setRedeemOption] = useState(""); // "full" or "partial"
//   const [tempPurchaseAmount, setTempPurchaseAmount] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successData, setSuccessData] = useState({});

//   const [isProcessing, setIsProcessing] = useState(false);

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

//   const handleScan = async (data) => {

//     if (!data || isProcessing) return;

//     setIsProcessing(true);

//     try {

//       const parsedData = JSON.parse(data.text);

//       if (!userDetails) {
//         toast.error("User details not loaded.");
//         setIsProcessing(false);
//         return;
//       }

//       if (String(parsedData.shopID) !== String(userDetails.id)) {
//         setErrorDialogMessage(
//           "Invalid scan code. This customer does not belong to your shop."
//         );
//         setErrorDialogOpen(true);
//         setIsProcessing(false);
//         return;
//       }

//       const freshInfo = await userInfo("", parsedData.phone);

//       const firstCoupon = freshInfo?.coupons?.[0] || null;

//       const updatedScannedData = {
//         ...parsedData,
//         availableBalance: freshInfo?.availableBalance ?? 0,
//         couponCode: firstCoupon?.couponCode || null,
//         couponAmount: firstCoupon?.couponAmount || 0,
//         couponUsageLimit: firstCoupon?.couponUsageLimit || 0,
//         usageLeft: firstCoupon?.usageLeft || 0,
//         referralCode: freshInfo?.referralCode || null,
//       };

//       setScannedData(updatedScannedData);
//       navigator.vibrate(200);
//       setOpen(true);

//     } catch (error) {
//       console.error(error);
//     } finally {
//       setTimeout(() => {
//         setIsProcessing(false);
//       }, 1500);
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan Error:", err);
//     if (err.name === "NotAllowedError") {
//       setHasCameraPermission(false);
//     }
//   };

//   const toggleCamera = () => {
//     setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
//   };

//   // const handleRedeemClick = async () => {

//   //   if (!referralAmount) {
//   //     setReferralError("Please enter redeem amount.");
//   //     return;
//   //   }

//   //   const amount = parseFloat(referralAmount);

//   //   const availableBalance = parseFloat(
//   //     scannedData?.availableBalance || 0
//   //   );

//   //   if (amount > availableBalance) {
//   //     setReferralError("Amount exceeds available balance.");
//   //     return;
//   //   }

//   //   const token = localStorage.getItem("token");

//   //   if (!token) {
//   //     setReferralError("Authentication token missing.");
//   //     return;
//   //   }

//   //   setReferralError("");

//   //   try {

//   //     setReferralLoading(true);

//   //     await axios.post(
//   //       `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//   //       {
//   //         customerId: scannedData.customerId,
//   //         referralCode:
//   //           scannedData.referralCode &&
//   //           scannedData.referralCode !== "None"
//   //             ? scannedData.referralCode
//   //             : null,
//   //         discountAmount: amount,
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     toast.success("Discount redeemed successfully!");

//   //     setOpen(false);

//   //     setReferralAmount("");
//   //     setReferralError("");

//   //   } catch (err) {

//   //     const backendMessage =
//   //       err?.response?.data?.message ||
//   //       err?.response?.data?.details ||
//   //       err?.response?.data ||
//   //       err.message ||
//   //       "Redeem failed";

//   //     setReferralError(
//   //       typeof backendMessage === "string"
//   //         ? backendMessage
//   //         : JSON.stringify(backendMessage)
//   //     );

//   //   } finally {
//   //     setReferralLoading(false);
//   //   }
//   // };

//   const handleCouponSubmit = () => {
//     if (!couponPurchaseAmount || Number(couponPurchaseAmount) <= 0) {
//       setCouponError("Please enter valid purchase amount.");
//       return;
//     }

//     if (applications.includes("Referral") && scannedData?.referralCode) {
//       setTempPurchaseAmount(couponPurchaseAmount);
//       setShowRedeemChoiceModal(true);
//     } else {
//       // Only Coupon → Directly apply coupon (no redeem)
//       handleDirectCouponApply();
//     }
//   };

//   const handleCombinedCouponRedeem = async () => {
//     let finalRedeemAmount = 0;

//     if (redeemOption === "full") {
//       finalRedeemAmount = scannedData.availableBalance;
//     } else if (redeemOption === "partial") {
//       finalRedeemAmount = Number(referralRedeemAmount || 0);
//       if (finalRedeemAmount > scannedData.availableBalance) {
//         setReferralError("Redeem amount exceeds available balance.");
//         return;
//       }
//       if (finalRedeemAmount > Number(tempPurchaseAmount)) {
//         setReferralError("Redeem amount cannot exceed purchase amount.");
//         return;
//       }
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication token missing.");
//       return;
//     }

//     setReferralLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: scannedData.customerId,
//           couponCode: scannedData.couponCode,
//           purchaseAmount: Number(tempPurchaseAmount),
//           redeemAmount: finalRedeemAmount,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: tempPurchaseAmount,
//         couponAmount: scannedData.couponAmount,
//         redeemAmount: finalRedeemAmount,
//       });
//       setShowSuccessPopup(true);
//       setShowRedeemChoiceModal(false);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//       setReferralError(msg);
//     } finally {
//       setReferralLoading(false);
//     }
//   };

//   const handleDirectCouponApply = async () => {
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
//           customerId: scannedData.customerId,
//           couponCode: scannedData.couponCode,
//           purchaseAmount: Number(couponPurchaseAmount),
//           redeemAmount: 0,   // No redeem
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: couponPurchaseAmount,
//         couponAmount: scannedData.couponAmount,
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
//     if (!referralPurchaseAmount || Number(referralPurchaseAmount) <= 0) {
//       setReferralError("Please enter purchase amount.");
//       return;
//     }
//     if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
//       setReferralError("Please enter redeem amount.");
//       return;
//     }
//     if (Number(referralRedeemAmount) > (scannedData?.availableBalance || 0)) {
//       setReferralError("Amount exceeds available balance.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setReferralError("Authentication token missing.");
//       return;
//     }

//     setReferralLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//         {
//           customerId: scannedData.customerId,
//           referralCode: scannedData.referralCode && scannedData.referralCode !== "None"
//             ? scannedData.referralCode : null,
//           purchaseAmount: Number(referralPurchaseAmount),
//           discountAmount: Number(referralRedeemAmount),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: referralPurchaseAmount,
//         couponAmount: 0,
//         redeemAmount: referralRedeemAmount,
//       });
//       setShowSuccessPopup(true);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       setReferralError(msg);
//       toast.error(msg);
//     } finally {
//       setReferralLoading(false);
//     }
//   };

//   // const handleApplyCoupon = async () => {

//   //   if (!couponAmount) {
//   //     setCouponError("Please enter purchase amount.");
//   //     return;
//   //   }

//   //   const token = localStorage.getItem("token");

//   //   if (!token) {
//   //     setCouponError("Authentication token missing.");
//   //     return;
//   //   }

//   //   setCouponError("");

//   //   try {

//   //     setCouponLoading(true);

//   //     await axios.post(
//   //       `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//   //       {
//   //         customerId: scannedData.customerId,
//   //         couponCode: scannedData.couponCode,
//   //         purchaseAmount: parseFloat(couponAmount),
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     toast.success("Coupon applied successfully!");

//   //     setOpen(false);

//   //     setCouponAmount("");
//   //     setCouponError("");

//   //   } catch (err) {

//   //     const backendMessage =
//   //       err?.response?.data?.message ||
//   //       err?.response?.data?.details ||
//   //       err?.response?.data ||
//   //       err.message ||
//   //       "Coupon apply failed";

//   //     setCouponError(
//   //       typeof backendMessage === "string"
//   //         ? backendMessage
//   //         : JSON.stringify(backendMessage)
//   //     );

//   //   } finally {
//   //     setCouponLoading(false);
//   //   }
//   // };

//   const resetForm = () => {
//     setCouponPurchaseAmount("");
//     setReferralPurchaseAmount("");
//     setReferralRedeemAmount("");
//     setCouponError("");
//     setReferralError("");
//     setShowRedeemChoiceModal(false);
//     setRedeemOption("");
//     setTempPurchaseAmount("");
//     setShowSuccessPopup(false);
//   };

//   const handleCloseDialog = () => {
//     setOpen(false);
//     setScannedData(null);
//     resetForm();
//   };

//   const handleCloseErrorDialog = () => {
//     setErrorDialogOpen(false);
//     setErrorDialogMessage("");
//   };

//   const handleCloseSuccessDialog = () => {
//     setSuccessDialogOpen(false);
//   };

//   const handleRedeemAmountChange = (e) => {
//     const raw = e.target.value.substring(1);
//     const value = raw.replace(/[^0-9.]/g, "");
//     if (/^\d*\.?\d{0,4}$/.test(value)) {
//       setRedeemAmount(value);
//       setError("");
//     }
//   };

//   const currency = getCurrentCurrency();

//   {isProcessing && (
//     <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
//       <div className="bg-white px-4 py-2 rounded-lg font-semibold">
//         Processing...
//       </div>
//     </div>
//   )}

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-3xl font-bold mb-8 text-gray-800"
//       >
//         QR Code Scanner
//       </motion.h1>

//       {!hasCameraPermission && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md w-full">
//           <p>Camera permission denied. Please allow camera access in your browser settings.</p>
//         </div>
//       )}

//       <div className="w-full max-w-2xl flex flex-col items-center">
//         {userDetails && !open ? (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="relative w-full rounded-lg overflow-hidden shadow-lg"
//             style={{ height: "70vh", maxHeight: "600px", minHeight: "300px" }}
//           >
//             <QrScanner
//               key={cameraFacingMode}
//               delay={300}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: "100%", height: "100%" }}
//               constraints={{
//                 video: {
//                   facingMode: cameraFacingMode,
//                   width: 640,
//                   height: 640,
//                 }
//               }}
//             />
//             <button
//               onClick={toggleCamera}
//               className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-3 z-10"
//               aria-label="Switch camera"
//             >
//               <FaSyncAlt className="text-lg" />
//             </button>
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="border-4 border-yellow-400 rounded-xl w-64 h-64 md:w-72 md:h-72 relative">
//                 <div className="absolute -top-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
//                 <div className="absolute -bottom-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
//               </div>
//             </div>
//           </motion.div>
//         ) : (
//           <p className="text-gray-600 mt-4">Loading scanner...</p>
//         )}
//       </div>

//       <div className="mt-3 text-gray-600 text-sm">
//         {cameraFacingMode === "environment" ? "Using back camera" : "Using front camera"}
//       </div>

//       <CustomerDetailsDialog
//         open={open}
//         onClose={handleCloseDialog}
//         scannedData={scannedData}
//         couponPurchaseAmount={couponPurchaseAmount}
//         setCouponPurchaseAmount={setCouponPurchaseAmount}
//         referralPurchaseAmount={referralPurchaseAmount}
//         setReferralPurchaseAmount={setReferralPurchaseAmount}
//         referralRedeemAmount={referralRedeemAmount}
//         setReferralRedeemAmount={setReferralRedeemAmount}
//         couponError={couponError}
//         referralError={referralError}
//         onCouponSubmit={handleCouponSubmit}
//         onReferralSubmit={handleReferralSubmit}
//         applications={applications}
//         couponLoading={couponLoading}
//         referralLoading={referralLoading}
//       />

//       {/* Redeem Choice Modal for Coupon */}
//       {showRedeemChoiceModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
//             <h2 className="text-xl font-bold text-center mb-5">Complete Transaction</h2>

//             <div className="bg-yellow-50 p-4 rounded-xl mb-6">
//               <p className="font-semibold">Coupon Discount: {currency.symbol}{scannedData?.couponAmount || 0}</p>
//               <p>Purchase Amount: {currency.symbol}{tempPurchaseAmount}</p>
//             </div>

//             <p className="font-semibold mb-3">Redeem from Referral Balance</p>

//             <div
//               onClick={() => setRedeemOption("full")}
//               className={`p-4 border-2 rounded-xl mb-3 cursor-pointer ${redeemOption === "full" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
//             >
//               Use Full Available Balance ({currency.symbol}{scannedData?.availableBalance || 0})
//             </div>

//             <div
//               onClick={() => setRedeemOption("partial")}
//               className={`p-4 border-2 rounded-xl cursor-pointer ${redeemOption === "partial" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
//             >
//               Use Partial Amount
//               {redeemOption === "partial" && (
//                 <input
//                   type="number"
//                   value={referralRedeemAmount}
//                   onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                   placeholder="Enter redeem amount"
//                   className="w-full mt-3 p-3 border rounded-lg"
//                 />
//               )}
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button onClick={() => setShowRedeemChoiceModal(false)} className="flex-1 py-3 bg-gray-200 rounded-full font-semibold">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCombinedCouponRedeem}
//                 disabled={referralLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}
//                 className="flex-1 py-3 bg-green-600 text-white rounded-full font-bold disabled:bg-gray-400"
//               >
//                 {referralLoading ? "Processing..." : "Confirm Transaction"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Modal */}
//       {errorDialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-red-300 shadow-xl">
//             <h2 className="text-xl font-bold text-center text-red-600 mb-4">Error</h2>
//             <p className="text-gray-700 text-center">{errorDialogMessage}</p>
//             <button
//               onClick={handleCloseErrorDialog}
//               className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {successDialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-green-300 shadow-xl">
//             <h2 className="text-xl font-bold text-center text-green-600 mb-4">Success</h2>
//             <p className="text-gray-700 text-center">{successMessage}</p>
//             <button
//               onClick={handleCloseSuccessDialog}
//               className="mt-6 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       <SuccessPopup
//         isOpen={showSuccessPopup}
//         onClose={() => {
//           setShowSuccessPopup(false);
//           handleCloseDialog();
//         }}
//         purchaseAmount={successData.purchaseAmount}
//         couponAmount={successData.couponAmount}
//         redeemAmount={successData.redeemAmount}
//       />

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default Scanner;











import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { motion } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../../api/signin";
import { userInfo } from "../../api/validateCode";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import { getCurrentCurrency } from "../../utils/currencyUtils";
import SuccessPopup from "../shopkeeper/SuccessPopup";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cameraFacingMode, setCameraFacingMode] = useState("environment");
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [applications, setApplications] = useState([]);
  const [couponError, setCouponError] = useState("");
  const [referralError, setReferralError] = useState("");

  const [couponLoading, setCouponLoading] = useState(false);
  const [referralLoading, setReferralLoading] = useState(false);

  const [redeemLoading, setRedeemLoading] = useState(false);

  const [purchaseAmount, setPurchaseAmount] = useState("");
  // const [couponPurchaseAmount, setCouponPurchaseAmount] = useState("");
  // const [referralPurchaseAmount, setReferralPurchaseAmount] = useState("");
  const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

  const [showRedeemChoiceModal, setShowRedeemChoiceModal] = useState(false);
  const [redeemOption, setRedeemOption] = useState(""); // "full" or "partial"
  const [tempPurchaseAmount, setTempPurchaseAmount] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState({});

  const [showTransactionTypeModal, setShowTransactionTypeModal] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [showReferralPopup, setShowReferralPopup] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleScan = async (data) => {
    if (!data || isProcessing) return;

    setIsProcessing(true);

    try {
      const parsedData = JSON.parse(data.text);

      if (!userDetails) {
        toast.error("User details not loaded.");
        setIsProcessing(false);
        return;
      }

      if (String(parsedData.shopID) !== String(userDetails.id)) {
        setErrorDialogMessage(
          "Invalid scan code. This customer does not belong to your shop."
        );
        setErrorDialogOpen(true);
        setIsProcessing(false);
        return;
      }

      const freshInfo = await userInfo("", parsedData.phone);
      const firstCoupon = freshInfo?.coupons?.[0] || null;

      const updatedScannedData = {
        ...parsedData,
        availableBalance: freshInfo?.availableBalance ?? 0,
        couponCode: firstCoupon?.couponCode || null,
        couponAmount: firstCoupon?.couponAmount || 0,
        couponUsageLimit: firstCoupon?.couponUsageLimit || 0,
        usageLeft: firstCoupon?.usageLeft || 0,
        referralCode: freshInfo?.referralCode || null,
      };

      setScannedData(updatedScannedData);
      navigator.vibrate(200);
      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1500);
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
    if (err.name === "NotAllowedError") {
      setHasCameraPermission(false);
    }
  };

  const toggleCamera = () => {
    setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleContinueTransaction = () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      toast.error("Please enter purchase amount");
      return;
    }
    setShowTransactionTypeModal(true);
  };

  const handleTransactionSelection = () => {
    if (!selectedTransactionType) {
      toast.error("Select transaction type");
      return;
    }

    setShowTransactionTypeModal(false);

    if (selectedTransactionType === "referral") {
      setShowReferralPopup(true);
    } else {
      setTempPurchaseAmount(purchaseAmount);
      setShowRedeemChoiceModal(true);
    }
  };

  const handleCouponSubmit = () => {
    // if (!couponPurchaseAmount || Number(couponPurchaseAmount) <= 0) {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setCouponError("Please enter valid purchase amount.");
      return;
    }

    if (applications.includes("Referral") && scannedData?.referralCode) {
      // setTempPurchaseAmount(couponPurchaseAmount);
      setTempPurchaseAmount(purchaseAmount);
      setShowRedeemChoiceModal(true);
    } else {
      handleDirectCouponApply();
    }
  };

  const handleCombinedCouponRedeem = async () => {
    let finalRedeemAmount = 0;

    if (redeemOption === "full") {
      finalRedeemAmount = scannedData.availableBalance;
    } else if (redeemOption === "partial") {
      finalRedeemAmount = Number(referralRedeemAmount || 0);
      if (finalRedeemAmount > scannedData.availableBalance) {
        setReferralError("Redeem amount exceeds available balance.");
        return;
      }
      if (finalRedeemAmount > Number(tempPurchaseAmount)) {
        setReferralError("Redeem amount cannot exceed purchase amount.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    setReferralLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: scannedData.customerId,
          couponCode: scannedData.couponCode,
          purchaseAmount: Number(tempPurchaseAmount),
          redeemAmount: finalRedeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: tempPurchaseAmount,
        couponAmount: scannedData.couponAmount,
        redeemAmount: finalRedeemAmount,
      });
      setShowSuccessPopup(true);
      setShowRedeemChoiceModal(false);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
      setReferralError(msg);
    } finally {
      setReferralLoading(false);
    }
  };

  const handleDirectCouponApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    setCouponLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: scannedData.customerId,
          couponCode: scannedData.couponCode,
          // purchaseAmount: Number(couponPurchaseAmount),
          purchaseAmount: Number(purchaseAmount),
          redeemAmount: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        // purchaseAmount: couponPurchaseAmount,
        purchaseAmount: purchaseAmount,
        couponAmount: scannedData.couponAmount,
        redeemAmount: 0,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleReferralSubmit = async () => {
    // if (!referralPurchaseAmount || Number(referralPurchaseAmount) <= 0) {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setReferralError("Please enter purchase amount.");
      return;
    }
    if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
      setReferralError("Please enter redeem amount.");
      return;
    }
    if (Number(referralRedeemAmount) > (scannedData?.availableBalance || 0)) {
      setReferralError("Amount exceeds available balance.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setReferralError("Authentication token missing.");
      return;
    }

    setReferralLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
        {
          customerId: scannedData.customerId,
          referralCode: scannedData.referralCode && scannedData.referralCode !== "None"
            ? scannedData.referralCode : null,
          // purchaseAmount: Number(referralPurchaseAmount),
          purchaseAmount: Number(purchaseAmount),
          discountAmount: Number(referralRedeemAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        // purchaseAmount: referralPurchaseAmount,
        purchaseAmount: purchaseAmount,
        couponAmount: 0,
        redeemAmount: referralRedeemAmount,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      setReferralError(msg);
      toast.error(msg);
    } finally {
      setReferralLoading(false);
    }
  };

  // const resetForm = () => {
  //   setCouponPurchaseAmount("");
  //   setReferralPurchaseAmount("");
  //   setReferralRedeemAmount("");
  //   setCouponError("");
  //   setReferralError("");
  //   setShowRedeemChoiceModal(false);
  //   setRedeemOption("");
  //   setTempPurchaseAmount("");
  //   setShowSuccessPopup(false);
  // };
  const resetForm = () => {
    setPurchaseAmount("");
    setReferralRedeemAmount("");
    setCouponError("");
    setReferralError("");
    setShowRedeemChoiceModal(false);
    setRedeemOption("");
    setTempPurchaseAmount("");
    setShowTransactionTypeModal(false);
    setSelectedTransactionType("");
    setShowReferralPopup(false);
    setShowSuccessPopup(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setScannedData(null);
    resetForm();
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorDialogMessage("");
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const currency = getCurrentCurrency();

  const hasReferral = applications.includes("Referral") && scannedData?.referralCode;
  const hasCoupon = applications.includes("Coupon") && scannedData?.couponCode;
  const hasBothApplications = hasReferral && hasCoupon;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      {isProcessing && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
          <div className="bg-white px-4 py-2 rounded-lg font-semibold shadow-md">
            Processing...
          </div>
        </div>
      )}

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        QR Code Scanner
      </motion.h1>

      {!hasCameraPermission && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md w-full">
          <p>Camera permission denied. Please allow camera access in your browser settings.</p>
        </div>
      )}

      <div className="w-full max-w-2xl flex flex-col items-center">
        {userDetails && !open ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative w-full rounded-lg overflow-hidden shadow-lg"
            style={{ height: "70vh", maxHeight: "600px", minHeight: "300px" }}
          >
            <QrScanner
              key={cameraFacingMode}
              delay={300}
              onScan={handleScan}
              onError={handleError}
              style={{ width: "100%", height: "100%" }}
              constraints={{
                video: {
                  facingMode: cameraFacingMode,
                  width: 640,
                  height: 640,
                }
              }}
            />
            <button
              onClick={toggleCamera}
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-3 z-10"
              aria-label="Switch camera"
            >
              <FaSyncAlt className="text-lg" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-yellow-400 rounded-xl w-64 h-64 md:w-72 md:h-72 relative">
                <div className="absolute -top-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
                <div className="absolute -bottom-1 left-1/4 w-1/2 h-1 bg-yellow-400"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <p className="text-gray-600 mt-4">Loading scanner...</p>
        )}
      </div>

      <div className="mt-3 text-gray-600 text-sm">
        {cameraFacingMode === "environment" ? "Using back camera" : "Using front camera"}
      </div>

      {/* <CustomerDetailsDialog
        open={open}
        onClose={handleCloseDialog}
        scannedData={scannedData}
        couponPurchaseAmount={couponPurchaseAmount}
        setCouponPurchaseAmount={setCouponPurchaseAmount}
        referralPurchaseAmount={referralPurchaseAmount}
        setReferralPurchaseAmount={setReferralPurchaseAmount}
        referralRedeemAmount={referralRedeemAmount}
        setReferralRedeemAmount={setReferralRedeemAmount}
        couponError={couponError}
        referralError={referralError}
        onCouponSubmit={handleCouponSubmit}
        onReferralSubmit={handleReferralSubmit}
        applications={applications}
        couponLoading={couponLoading}
        referralLoading={referralLoading}
      /> */}
      <CustomerDetailsDialog
        open={open}
        onClose={handleCloseDialog}
        scannedData={scannedData}
        purchaseAmount={purchaseAmount}
        setPurchaseAmount={setPurchaseAmount}
        referralRedeemAmount={referralRedeemAmount}
        setReferralRedeemAmount={setReferralRedeemAmount}
        couponError={couponError}
        referralError={referralError}
        onCouponSubmit={handleCouponSubmit}
        onReferralSubmit={handleReferralSubmit}
        applications={applications}
        couponLoading={couponLoading}
        referralLoading={referralLoading}
        redeemLoading={redeemLoading}
        hasBothApplications={hasBothApplications}
        hasReferral={hasReferral}
        hasCoupon={hasCoupon}
        showTransactionTypeModal={showTransactionTypeModal}
        setShowTransactionTypeModal={setShowTransactionTypeModal}
        selectedTransactionType={selectedTransactionType}
        setSelectedTransactionType={setSelectedTransactionType}
        handleContinueTransaction={handleContinueTransaction}
        handleTransactionSelection={handleTransactionSelection}
        showReferralPopup={showReferralPopup}
        setShowReferralPopup={setShowReferralPopup}
        showRedeemChoiceModal={showRedeemChoiceModal}
        setShowRedeemChoiceModal={setShowRedeemChoiceModal}
        redeemOption={redeemOption}
        setRedeemOption={setRedeemOption}
        tempPurchaseAmount={tempPurchaseAmount}
        handleCombinedCouponRedeem={handleCombinedCouponRedeem}
        // currency={currency}
      />

      {/* RE-DESIGNED COMPLETE TRANSACTION POPUP MODAL (CHECKBOX/RADIO SYSTEM) */}
      {/* {showRedeemChoiceModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-slate-100 transform scale-100 transition-all">
            
            <h2 className="text-xl font-black text-slate-900 tracking-tight text-center mb-1">Complete Transaction</h2>
            <p className="text-xs font-medium text-slate-500 text-center mb-5">Select a balance settlement configuration method</p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-5 flex justify-between items-center text-sm">
              <div>
                <span className="block text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Discount Applied</span>
                <span className="font-black text-amber-900 text-base">{currency.symbol}{scannedData?.couponAmount || 0}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Purchase Val</span>
                <span className="font-bold text-slate-700">{currency.symbol}{tempPurchaseAmount}</span>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Redeem from Referral Balance</p>

            <div
              onClick={() => setRedeemOption("full")}
              className={`group p-3 border rounded-md mb-3 cursor-pointer transition-all flex items-start gap-3.5 ${
                redeemOption === "full" 
                  ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                redeemOption === "full" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 group-hover:border-slate-400 bg-white"
              }`}>
                {redeemOption === "full" && <span className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div className="text-sm">
                <span className="block font-bold text-slate-800">Use Full Available Balance</span>
                <span className="text-xs font-medium text-slate-500">Deduct max possible: <strong className="text-emerald-700 font-bold">{currency.symbol}{scannedData?.availableBalance || 0}</strong></span>
              </div>
            </div>

            <div
              onClick={() => setRedeemOption("partial")}
              className={`group p-3 border rounded-md cursor-pointer transition-all ${
                redeemOption === "partial" 
                  ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-3.5">
                
                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  redeemOption === "partial" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 group-hover:border-slate-400 bg-white"
                }`}>
                  {redeemOption === "partial" && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-slate-800">Use Partial Amount</span>
                  <span className="text-xs font-medium text-slate-500">Enter a specific customizable value subset</span>
                </div>
              </div>

              {redeemOption === "partial" && (
                <div className="mt-3.5 pt-3.5 border-t border-emerald-200/40" onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
                    <input
                      type="number"
                      value={referralRedeemAmount}
                      onChange={(e) => setReferralRedeemAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {referralError && <p className="text-xs font-semibold text-rose-500 mt-3">{referralError}</p>}

            <div className="flex gap-3.5 mt-6">
              <button 
                onClick={() => setShowRedeemChoiceModal(false)} 
                className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCombinedCouponRedeem}
                disabled={referralLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-lg shadow-slate-950/10 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                {referralLoading ? "Processing..." : "Confirm Transaction"}
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Error Modal */}
      {errorDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-red-300 shadow-xl">
            <h2 className="text-xl font-bold text-center text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 text-center">{errorDialogMessage}</p>
            <button
              onClick={handleCloseErrorDialog}
              className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 border border-green-300 shadow-xl">
            <h2 className="text-xl font-bold text-center text-green-600 mb-4">Success</h2>
            <p className="text-gray-700 text-center">{successMessage}</p>
            <button
              onClick={handleCloseSuccessDialog}
              className="mt-6 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          handleCloseDialog();
        }}
        purchaseAmount={successData.purchaseAmount}
        couponAmount={successData.couponAmount}
        redeemAmount={successData.redeemAmount}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Scanner;