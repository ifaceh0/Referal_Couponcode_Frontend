
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
//   // const [redeemAmount, setRedeemAmount] = useState("");
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
//     if (data) {
//       try {
//         const parsedData = JSON.parse(data.text);

//         if (!userDetails) {
//           toast.error("User details not loaded yet. Please try again.");
//           return;
//         }

//         if (String(parsedData.shopID) !== String(userDetails.id)) {
//           setErrorDialogMessage("Invalid scan code. This customer does not belong to your shop.");
//           setErrorDialogOpen(true);
//           return;
//         }

//         const freshInfo = await userInfo("", parsedData.phone);

//         const firstCoupon = freshInfo?.coupons?.[0] || null;

//         const updatedScannedData = {
//           ...parsedData,
//         //   availableBalance: freshInfo?.availableBalance ?? parsedData.availableBalance,
//         // };
//           availableBalance:
//             freshInfo?.availableBalance ?? 0,

//           couponCode:
//             firstCoupon?.couponCode || null,

//           couponAmount:
//             firstCoupon?.couponAmount || 0,

//           couponUsageLimit:
//             firstCoupon?.couponUsageLimit || 0,

//           usageLeft:
//             firstCoupon?.usageLeft || 0,

//           referralCode:
//             freshInfo?.referralCode || null,
//         };

//         setScannedData(updatedScannedData);
//         setOpen(true);
//         setError("");
//       } catch (error) {
//         console.error("Invalid JSON data:", error);
//       }
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
//   //     setReferralError("Please enter an amount.");
//   //     return;
//   //   }

//   //   const amount = parseFloat(referralAmount);
//   //   const availableBalance = parseFloat(scannedData?.availableBalance || 0);

//   //   if (amount > availableBalance) {
//   //     setReferralError("Amount cannot exceed available balance.");
//   //     return;
//   //   }

//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     setReferralError("Authentication token not found.");
//   //     return;
//   //   }

//   //   const payload = {
//   //     customerId: scannedData.customerId,
//   //     referralCode: scannedData.referralCode,
//   //     discountAmount: amount,
//   //     purchaseAmount: amount,
//   //   };

//   //   setLoading(true);
//   //   const toastId = toast.loading("Processing redemption...");

//   //   try {
//   //     await axios.post(
//   //       `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//   //       payload,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     toast.update(toastId, {
//   //       render: "Discount redeemed successfully!",
//   //       type: "success",
//   //       isLoading: false,
//   //       autoClose: true,
//   //       closeOnClick: true,
//   //       position: "top-right",
//   //     });

//   //     setSuccessMessage(`$${amount} redeemed successfully!`);
//   //     setSuccessDialogOpen(true);
//   //     setOpen(false);
//   //     setScannedData(null);
//   //     setRedeemAmount("");
//   //     setError("");
//   //   } catch (err) {
//   //     toast.update(toastId, {
//   //       render: err.response?.data || "Redemption failed. Please try again.",
//   //       type: "error",
//   //       isLoading: false,
//   //       autoClose: true,
//   //       closeOnClick: true,
//   //       position: "top-right",
//   //     });
//   //     setError(err.response?.data || "Redemption failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
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
//           referralCode: scannedData.referralCode,
//           discountAmount: amount,
//           // purchaseAmount: amount,
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
//     setRedeemAmount("");
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
//         {userDetails ? (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="relative w-full rounded-lg overflow-hidden shadow-lg"
//             style={{ height: "70vh", maxHeight: "600px", minHeight: "300px" }}
//           >
//             <QrScanner
//               key={cameraFacingMode}
//               delay={100}
//               onScan={handleScan}
//               onError={handleError}
//               style={{ width: "100%", height: "100%" }}
//               constraints={{ video: { facingMode: cameraFacingMode, aspectRatio: 1 } }}
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

//       {/* Customer Details */}
//       {/* <CustomerDetailsDialog
//         open={open}
//         onClose={handleCloseDialog}
//         scannedData={scannedData}
//         redeemAmount={redeemAmount}
//         onRedeemAmountChange={handleRedeemAmountChange}
//         onRedeemClick={handleRedeemClick}
//         error={error}
//         loading={loading}
//       /> */}

//       <CustomerDetailsDialog
//         open={open}
//         onClose={handleCloseDialog}
//         scannedData={scannedData}
//         // redeemAmount={redeemAmount}
//         // onRedeemAmountChange={handleRedeemAmountChange}
//         couponAmount={couponAmount}
//         setCouponAmount={setCouponAmount}

//         referralAmount={referralAmount}
//         setReferralAmount={setReferralAmount}

//         couponError={couponError}
//         referralError={referralError}
//         onRedeemClick={handleRedeemClick}
//         onApplyCoupon={handleApplyCoupon}
//         applications={applications}
//         // error={error}
//         // loading={loading}
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











import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { motion } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser } from "../../api/signin";
import { userInfo } from "../../api/validateCode";
import CustomerDetailsDialog from "./CustomerDetailsDialog";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  // const [redeemAmount, setRedeemAmount] = useState("");
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

  const [couponAmount, setCouponAmount] = useState("");
  const [referralAmount, setReferralAmount] = useState("");

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

  // const handleScan = async (data) => {
  //   if (data) {
  //     try {
  //       const parsedData = JSON.parse(data.text);

  //       if (!userDetails) {
  //         toast.error("User details not loaded yet. Please try again.");
  //         return;
  //       }

  //       if (String(parsedData.shopID) !== String(userDetails.id)) {
  //         setErrorDialogMessage("Invalid scan code. This customer does not belong to your shop.");
  //         setErrorDialogOpen(true);
  //         return;
  //       }

  //       const freshInfo = await userInfo("", parsedData.phone);

  //       const firstCoupon = freshInfo?.coupons?.[0] || null;

  //       const updatedScannedData = {
  //         ...parsedData,
  //       //   availableBalance: freshInfo?.availableBalance ?? parsedData.availableBalance,
  //       // };
  //         availableBalance:
  //           freshInfo?.availableBalance ?? 0,

  //         couponCode:
  //           firstCoupon?.couponCode || null,

  //         couponAmount:
  //           firstCoupon?.couponAmount || 0,

  //         couponUsageLimit:
  //           firstCoupon?.couponUsageLimit || 0,

  //         usageLeft:
  //           firstCoupon?.usageLeft || 0,

  //         referralCode:
  //           freshInfo?.referralCode || null,
  //       };

  //       setScannedData(updatedScannedData);
  //       setOpen(true);
  //       setError("");
  //     } catch (error) {
  //       console.error("Invalid JSON data:", error);
  //     }
  //   }
  // };

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

  // const handleRedeemClick = async () => {
  //   if (!referralAmount) {
  //     setReferralError("Please enter an amount.");
  //     return;
  //   }

  //   const amount = parseFloat(referralAmount);
  //   const availableBalance = parseFloat(scannedData?.availableBalance || 0);

  //   if (amount > availableBalance) {
  //     setReferralError("Amount cannot exceed available balance.");
  //     return;
  //   }

  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setReferralError("Authentication token not found.");
  //     return;
  //   }

  //   const payload = {
  //     customerId: scannedData.customerId,
  //     referralCode: scannedData.referralCode,
  //     discountAmount: amount,
  //     purchaseAmount: amount,
  //   };

  //   setLoading(true);
  //   const toastId = toast.loading("Processing redemption...");

  //   try {
  //     await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     toast.update(toastId, {
  //       render: "Discount redeemed successfully!",
  //       type: "success",
  //       isLoading: false,
  //       autoClose: true,
  //       closeOnClick: true,
  //       position: "top-right",
  //     });

  //     setSuccessMessage(`$${amount} redeemed successfully!`);
  //     setSuccessDialogOpen(true);
  //     setOpen(false);
  //     setScannedData(null);
  //     setRedeemAmount("");
  //     setError("");
  //   } catch (err) {
  //     toast.update(toastId, {
  //       render: err.response?.data || "Redemption failed. Please try again.",
  //       type: "error",
  //       isLoading: false,
  //       autoClose: true,
  //       closeOnClick: true,
  //       position: "top-right",
  //     });
  //     setError(err.response?.data || "Redemption failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleRedeemClick = async () => {

    if (!referralAmount) {
      setReferralError("Please enter redeem amount.");
      return;
    }

    const amount = parseFloat(referralAmount);

    const availableBalance = parseFloat(
      scannedData?.availableBalance || 0
    );

    if (amount > availableBalance) {
      setReferralError("Amount exceeds available balance.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setReferralError("Authentication token missing.");
      return;
    }

    setReferralError("");

    try {

      setReferralLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
        {
          customerId: scannedData.customerId,
          // referralCode: scannedData.referralCode,
          referralCode:
            scannedData.referralCode &&
            scannedData.referralCode !== "None"
              ? scannedData.referralCode
              : null,
          discountAmount: amount,
          // purchaseAmount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Discount redeemed successfully!");

      setOpen(false);

      setReferralAmount("");
      setReferralError("");

    } catch (err) {

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.details ||
        err?.response?.data ||
        err.message ||
        "Redeem failed";

      setReferralError(
        typeof backendMessage === "string"
          ? backendMessage
          : JSON.stringify(backendMessage)
      );

    } finally {
      setReferralLoading(false);
    }
  };

  const handleApplyCoupon = async () => {

    if (!couponAmount) {
      setCouponError("Please enter purchase amount.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setCouponError("Authentication token missing.");
      return;
    }

    setCouponError("");

    try {

      setCouponLoading(true);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: scannedData.customerId,
          couponCode: scannedData.couponCode,
          purchaseAmount: parseFloat(couponAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Coupon applied successfully!");

      setOpen(false);

      setCouponAmount("");
      setCouponError("");

    } catch (err) {

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.details ||
        err?.response?.data ||
        err.message ||
        "Coupon apply failed";

      setCouponError(
        typeof backendMessage === "string"
          ? backendMessage
          : JSON.stringify(backendMessage)
      );

    } finally {
      setCouponLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setScannedData(null);
    // setRedeemAmount("");
    setError("");
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorDialogMessage("");
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleRedeemAmountChange = (e) => {
    const raw = e.target.value.substring(1);
    const value = raw.replace(/[^0-9.]/g, "");
    if (/^\d*\.?\d{0,4}$/.test(value)) {
      setRedeemAmount(value);
      setError("");
    }
  };

  {isProcessing && (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
      <div className="bg-white px-4 py-2 rounded-lg font-semibold">
        Processing...
      </div>
    </div>
  )}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
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
              // constraints={{ video: { facingMode: cameraFacingMode, aspectRatio: 1 } }}
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

      {/* Customer Details */}
      {/* <CustomerDetailsDialog
        open={open}
        onClose={handleCloseDialog}
        scannedData={scannedData}
        redeemAmount={redeemAmount}
        onRedeemAmountChange={handleRedeemAmountChange}
        onRedeemClick={handleRedeemClick}
        error={error}
        loading={loading}
      /> */}

      <CustomerDetailsDialog
        open={open}
        onClose={handleCloseDialog}
        scannedData={scannedData}
        // redeemAmount={redeemAmount}
        // onRedeemAmountChange={handleRedeemAmountChange}
        couponAmount={couponAmount}
        setCouponAmount={setCouponAmount}

        referralAmount={referralAmount}
        setReferralAmount={setReferralAmount}

        couponError={couponError}
        referralError={referralError}
        onRedeemClick={handleRedeemClick}
        onApplyCoupon={handleApplyCoupon}
        applications={applications}
        // error={error}
        // loading={loading}
        couponLoading={couponLoading}
        referralLoading={referralLoading}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Scanner;
