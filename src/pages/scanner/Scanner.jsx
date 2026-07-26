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

//   const [redeemLoading, setRedeemLoading] = useState(false);

//   const [purchaseAmount, setPurchaseAmount] = useState("");
//   const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

//   const [showRedeemChoiceModal, setShowRedeemChoiceModal] = useState(false);
//   const [redeemOption, setRedeemOption] = useState("");
//   const [tempPurchaseAmount, setTempPurchaseAmount] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successData, setSuccessData] = useState({});

//   const [showTransactionTypeModal, setShowTransactionTypeModal] = useState(false);
//   const [selectedTransactionType, setSelectedTransactionType] = useState("");
//   const [showReferralPopup, setShowReferralPopup] = useState(false);

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

//   const handleContinueTransaction = () => {
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//       toast.error("Please enter purchase amount");
//       return;
//     }
//     setShowTransactionTypeModal(true);
//   };

//   const handleTransactionSelection = () => {
//     if (!selectedTransactionType) {
//       toast.error("Select transaction type");
//       return;
//     }

//     setShowTransactionTypeModal(false);

//     if (selectedTransactionType === "referral") {
//       setShowReferralPopup(true);
//     } else {
//       setTempPurchaseAmount(purchaseAmount);
//       setShowRedeemChoiceModal(true);
//     }
//   };

//   const handleCouponSubmit = () => {
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
//       setCouponError("Please enter valid purchase amount.");
//       return;
//     }

//     if (applications.includes("Referral") && scannedData?.referralCode) {
//       setTempPurchaseAmount(purchaseAmount);
//       setShowRedeemChoiceModal(true);
//     } else {
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
//           purchaseAmount: Number(purchaseAmount),
//           redeemAmount: 0,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
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
//     if (!purchaseAmount || Number(purchaseAmount) <= 0) {
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
//           purchaseAmount: Number(purchaseAmount),
//           discountAmount: Number(referralRedeemAmount),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: purchaseAmount,
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

//   const resetForm = () => {
//     setPurchaseAmount("");
//     setReferralRedeemAmount("");
//     setCouponError("");
//     setReferralError("");
//     setShowRedeemChoiceModal(false);
//     setRedeemOption("");
//     setTempPurchaseAmount("");
//     setShowTransactionTypeModal(false);
//     setSelectedTransactionType("");
//     setShowReferralPopup(false);
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

//   const currency = getCurrentCurrency();

//   const hasReferral = applications.includes("Referral") && scannedData?.referralCode;
//   const hasCoupon = applications.includes("Coupon") && scannedData?.couponCode;
//   const hasBothApplications = hasReferral && hasCoupon;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
//       {isProcessing && (
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
//           <div className="bg-white px-4 py-2 rounded-lg font-semibold shadow-md">
//             Processing...
//           </div>
//         </div>
//       )}

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
//         purchaseAmount={purchaseAmount}
//         setPurchaseAmount={setPurchaseAmount}
//         referralRedeemAmount={referralRedeemAmount}
//         setReferralRedeemAmount={setReferralRedeemAmount}
//         couponError={couponError}
//         referralError={referralError}
//         onCouponSubmit={handleCouponSubmit}
//         onReferralSubmit={handleReferralSubmit}
//         applications={applications}
//         couponLoading={couponLoading}
//         referralLoading={referralLoading}
//         redeemLoading={redeemLoading}
//         hasBothApplications={hasBothApplications}
//         hasReferral={hasReferral}
//         hasCoupon={hasCoupon}
//         showTransactionTypeModal={showTransactionTypeModal}
//         setShowTransactionTypeModal={setShowTransactionTypeModal}
//         selectedTransactionType={selectedTransactionType}
//         setSelectedTransactionType={setSelectedTransactionType}
//         handleContinueTransaction={handleContinueTransaction}
//         handleTransactionSelection={handleTransactionSelection}
//         showReferralPopup={showReferralPopup}
//         setShowReferralPopup={setShowReferralPopup}
//         showRedeemChoiceModal={showRedeemChoiceModal}
//         setShowRedeemChoiceModal={setShowRedeemChoiceModal}
//         redeemOption={redeemOption}
//         setRedeemOption={setRedeemOption}
//         tempPurchaseAmount={tempPurchaseAmount}
//         handleCombinedCouponRedeem={handleCombinedCouponRedeem}
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
  const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState({});

  const [applyCoupon, setApplyCoupon] = useState(false);
  const [applyReferral, setApplyReferral] = useState(false);
  const [referralType, setReferralType] = useState("");

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

  const handleCombinedTransaction = async () => {
    if (applyReferral && !referralType) {
      setReferralError("Select Full or Partial Balance Redemption");
      return;
    }

    let finalRedeemAmount = 0;
    if (referralType === "full") {
      finalRedeemAmount = scannedData.availableBalance;
    } else if (referralType === "partial") {
      finalRedeemAmount = Number(referralRedeemAmount || 0);
      if (finalRedeemAmount > scannedData.availableBalance) {
        setReferralError("Redeem amount exceeds available balance");
        return;
      }
    }

    const couponDiscount = applyCoupon ? scannedData.couponAmount : 0;
    const totalDiscount = couponDiscount + finalRedeemAmount;

    if (totalDiscount > Number(purchaseAmount)) {
      toast.error("Total discount cannot exceed purchase amount.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: scannedData.customerId,
          couponCode: scannedData.couponCode,
          purchaseAmount: Number(purchaseAmount),
          redeemAmount: finalRedeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount,
        couponAmount: scannedData.couponAmount,
        redeemAmount: finalRedeemAmount,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
      setReferralError(msg);
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleDirectCouponApply = async () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setCouponError("Please enter purchase amount");
      return;
    }

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
          purchaseAmount: Number(purchaseAmount),
          redeemAmount: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount,
        couponAmount: scannedData.couponAmount,
        redeemAmount: 0,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
      setCouponError(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleReferralSubmit = async () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setReferralError("Please enter purchase amount");
      return;
    }

    if (Number(scannedData.availableBalance) <= 0) {
      await handlePlainPurchase();
      return;
    }

    if (!referralType) {
      setReferralError("Select Full or Partial");
      return;
    }

    let redeemAmount = 0;

    if (referralType === "full") {
      redeemAmount = scannedData.availableBalance;
    } else if (referralType === "partial") {
      if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
        setReferralError("Please enter redeem amount");
        return;
      }
      if (Number(referralRedeemAmount) > scannedData.availableBalance) {
        setReferralError("Redeem amount exceeds available balance");
        return;
      }
      redeemAmount = Number(referralRedeemAmount);
    }

    if (redeemAmount > Number(purchaseAmount)) {
      setReferralError("Redeem amount cannot exceed purchase amount");
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
          referralCode:
            scannedData.referralCode && scannedData.referralCode !== "None"
              ? scannedData.referralCode
              : null,
          purchaseAmount: Number(purchaseAmount),
          discountAmount: redeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount,
        couponAmount: 0,
        redeemAmount,
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

  const handlePlainPurchase = async () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      toast.error("Enter purchase amount");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/record-purchase`,
        {
          customerId: scannedData.customerId,
          purchaseAmount: Number(purchaseAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount,
        couponAmount: 0,
        redeemAmount: 0,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setRedeemLoading(false);
    }
  };

  const handleSubmitTransaction = async () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      toast.error("Enter purchase amount");
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

  const resetForm = () => {
    setPurchaseAmount("");
    setReferralRedeemAmount("");
    setCouponError("");
    setReferralError("");
    setApplyCoupon(false);
    setApplyReferral(false);
    setReferralType("");
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
        applications={applications}
        couponLoading={couponLoading}
        referralLoading={referralLoading}
        redeemLoading={redeemLoading}
        hasBothApplications={hasBothApplications}
        hasReferral={hasReferral}
        hasCoupon={hasCoupon}
        applyCoupon={applyCoupon}
        setApplyCoupon={setApplyCoupon}
        applyReferral={applyReferral}
        setApplyReferral={setApplyReferral}
        referralType={referralType}
        setReferralType={setReferralType}
        onSubmitTransaction={handleSubmitTransaction}
        onReferralSubmit={handleReferralSubmit}
        onCouponSubmit={handleDirectCouponApply}
      />

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