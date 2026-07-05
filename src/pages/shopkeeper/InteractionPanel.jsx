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
//   // const [redeemAmount, setRedeemAmount] = useState("");
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState("");
//   const [applications, setApplications] = useState([]);
//   const [purchaseAmount, setPurchaseAmount] = useState("");
//   const [referralRedeemAmount, setReferralRedeemAmount] = useState("");
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [redeemLoading, setRedeemLoading] = useState(false);
//   const [couponError, setCouponError] = useState("");
//   const [redeemError, setRedeemError] = useState("");

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

//   const shopkeeperId =
//     userDetails?.shopkeeperId || localStorage.getItem("shopkeeperId");

//   const handleVerifyPhone = async () => {
//     if (!phoneNumber.trim()) return toast.error("Please enter a phone number");

//     try {
//       const data = await userInfo("", phoneNumber);
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

//   // const handleCloseVerificationDialog = () => {
//   //   setVerificationDialogOpen(false);
//   //   setRedeemAmount("");
//   //   setError("");
//   // };

//   const handleCloseVerificationDialog = () => {
//     setVerificationDialogOpen(false);

//     setReferralRedeemAmount("");
//     setPurchaseAmount("");

//     setCouponError("");
//     setRedeemError("");
//   };

//   const handleRedeemClick = async () => {
//     const amount = parseFloat(referralRedeemAmount);

//     if (!referralRedeemAmount) return setRedeemError("Please enter an amount");
//     if (isNaN(amount) || amount <= 0)
//       return setRedeemError("Enter a valid positive amount");
//     if (amount > verificationData?.availableBalance)
//       return setRedeemError("Exceeds available balance");

//     const token = localStorage.getItem("token");
//     if (!token) return setRedeemError("Authentication token not found.");

//     const payload = {
//       customerId: verificationData.customerId,
//       // referralCode: verificationData.referralCode,
//       referralCode:
//         verificationData.referralCode &&
//         verificationData.referralCode !== "None"
//           ? verificationData.referralCode
//           : null,
//       discountAmount: amount,
//       // purchaseAmount: amount,
//     };

//     setRedeemLoading(true);
//     const toastId = toast.loading("Processing...");

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.update(toastId, {
//         render: "Discount redeemed successfully!",
//         type: "success",
//         isLoading: false,
//         autoClose: 3000,
//       });

//       setVerificationData((prev) => ({
//         ...prev,
//         availableBalance: prev.availableBalance - amount,
//       }));
//       setReferralRedeemAmount("");
//       setRedeemError("");
//       setVerificationDialogOpen(false);
//     } catch (err) {
//       // const backendMessage =
//       //   err?.response?.data?.message ||
//       //   err?.response?.data ||
//       //   err.message ||
//       //   "Redemption failed";
//       const backendMessage =
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         err?.message ||
//         "Redemption failed";

//       toast.update(toastId, {
//         render: backendMessage,
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//       // setError("Redemption failed.");
//       // const backendMessage =
//       //   err?.response?.data || err?.response?.data?.message || err.message;

//       setRedeemError(backendMessage);
//     } finally {
//       setRedeemLoading(false);
//     }
//   };

//   const handleApplyCoupon = async () => {

//     if (!purchaseAmount || purchaseAmount <= 0) {
//       return setCouponError("Enter valid purchase amount");
//     }

//     const token = localStorage.getItem("token");

//     try {

//       setCouponLoading(true);

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: verificationData.customerId,
//           couponCode: verificationData.couponCode,
//           purchaseAmount: purchaseAmount,
//           redeemAmount: Number(referralRedeemAmount || 0),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(
//         `Coupon Applied Successfully. Discount: ${currency.symbol}${verificationData.couponAmount}`
//       );
//       setCouponError("");
//       setVerificationDialogOpen(false);

//     } catch (err) {

//       // setCouponError(
//       //   err?.response?.data ||
//       //   err?.response?.data?.message ||
//       //   err.message
//       // );
//       const errorMessage =
//       err?.response?.data?.message ||
//       err?.response?.data ||
//       err?.message ||
//       "Failed to apply coupon";

//     setCouponError(errorMessage);

//     } finally {

//       setCouponLoading(false);
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

//             <p className="text-sm text-gray-500 mb-6">
//               For security reasons, you cannot access shop data until your account is
//               reactivated.
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

//           {/* Verification Modal */}
//           {verificationDialogOpen && verificationData && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//               <div className="bg-white rounded-xl w-full max-w-[800px] p-6 shadow-xl">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-700">
//                   Customer Details
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
//                   <p>
//                     <strong>Name:</strong> {verificationData.name}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {verificationData.phone}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {verificationData.email}
//                   </p>
//                   <p>
//                     <strong>Customer ID:</strong> {verificationData.customerId}
//                   </p>
//                   {/* <p>
//                     <strong>Available Balance:</strong> {currency.symbol}
//                     {verificationData.availableBalance}
//                   </p> */}

//                   {/* <p>
//                     <strong>Coupon Amount:</strong> {currency.symbol}
//                     {verificationData.couponAmount}
//                   </p>
//                   <p>
//                     <strong>Coupon Usage Limit:</strong>{" "}
//                     {verificationData.couponUsageLimit}
//                   </p> */}

//                   {applications.includes("Coupon") && 
//                     verificationData?.couponCode && (
//                     <>
//                       <p>
//                         <strong>Coupon Code:</strong> {verificationData.couponCode}
//                       </p>

//                       <p>
//                         <strong>Coupon Amount:</strong> {currency.symbol}
//                         {verificationData.couponAmount}
//                       </p>

//                       <p>
//                         <strong>Coupon Usage Limit:</strong>{" "}
//                         {verificationData.couponUsageLimit}
//                       </p>

//                       <p>
//                         <strong>Coupon Usage Left:</strong>{" "}
//                         {verificationData.usageLeft}
//                       </p>
//                     </>
//                   )}

//                   {/* <p>
//                     <strong>Referral Code:</strong> {verificationData.referralCode}
//                   </p> */}

//                   {applications.includes("Referral") && 
//                     verificationData?.referralCode && (
//                     <>
//                       <p>
//                         <strong>Referred User Code:</strong>{" "}
//                         {/* {verificationData.referralCode} */}
//                         {verificationData?.referralCode === "None"
//                             ? "Shopkeeper"
//                             : verificationData?.referralCode || "N/A"}
//                       </p>

//                       <p>
//                         <strong>Available Balance:</strong> {currency.symbol}
//                         {verificationData.availableBalance}
//                       </p>
//                     </>
//                   )}
//                 </div>

//                 {/* <div className="mt-6">
//                   <h3 className="font-semibold mb-2">Redeem Discount</h3>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       value={redeemAmount}
//                       onChange={(e) => setRedeemAmount(e.target.value)}
//                       placeholder="Enter amount"
//                       className="p-2 border rounded w-40"
//                     />
//                     <button
//                       onClick={handleRedeemClick}
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                       disabled={loading}
//                     >
//                       {loading ? "Processing..." : "Redeem"}
//                     </button>
//                   </div>
//                   {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div> */}

//                 <div className="mt-6 flex flex-row gap-3">
//                   {/* Coupon Section */}
//                   {applications.includes("Coupon") && 
//                     verificationData?.couponCode && (
//                     <div className="border p-4 rounded-lg bg-yellow-50">
//                       <h3 className="font-semibold mb-2">Purchase amount</h3>

//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           value={purchaseAmount}
//                           onChange={(e) => setPurchaseAmount(e.target.value)}
//                           placeholder="Enter purchase amount"
//                           className="p-2 border rounded w-52"
//                         />

//                         <button
//                           onClick={handleApplyCoupon}
//                           className="bg-yellow-500 text-white px-4 py-1.5 rounded-full"
//                           disabled={couponLoading}
//                         >
//                           {couponLoading ? "Processing..." : "Apply Coupon"}
//                         </button>
//                       </div>

//                       {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
//                     </div>
//                   )}

//                   {/* Referral Section */}
//                   {applications.includes("Referral") && 
//                     verificationData?.referralCode && (
//                     <div className="border p-4 rounded-lg bg-green-50">
//                       <h3 className="font-semibold mb-2">Redeem Discount</h3>

//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           value={referralRedeemAmount}
//                           onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                           placeholder="Enter redeem amount"
//                           className="p-2 border rounded w-52"
//                         />

//                         <button
//                           onClick={handleRedeemClick}
//                           className="bg-green-500 text-white px-4 py-1.5 rounded-full"
//                           disabled={redeemLoading}
//                         >
//                           {redeemLoading ? "Processing..." : "Redeem"}
//                         </button>
//                       </div>

//                       {redeemError && <p className="text-red-500 mt-2">{redeemError}</p>}
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={handleCloseVerificationDialog}
//                   className="mt-6 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Main Form */}
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
//                     setPhoneNumber(e.target.value);
//                     setPhoneVerified(false);
//                   }}
//                   placeholder="Enter phone"
//                   className="w-full p-2 border rounded"
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

//           {/* Scanner Modal */}
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

//           {/* Code Result Display */}
//           {codeDetails && (
//             <div className="max-w-6xl w-full bg-gray-50 p-6 rounded shadow mt-6">
//               <h3 className="font-bold text-lg">Code Details</h3>
//               <p>
//                 <strong>Code:</strong> {codeDetails.code}
//               </p>
//               <p>
//                 <strong>Status:</strong> {codeDetails.status}
//               </p>
//               <p>
//                 <strong>Expiry:</strong> {codeDetails.expiryDate}
//               </p>

//               {codeDetails.user && (
//                 <>
//                   <h4 className="font-semibold mt-3">User Info</h4>
//                   <p>
//                     <strong>Name:</strong> {codeDetails.user.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {codeDetails.user.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {codeDetails.user.phone}
//                   </p>
//                 </>
//               )}

//               {isCouponCode ? (
//                 <>
//                   <p>
//                     <strong>Discount:</strong> ${codeDetails.amount}
//                   </p>
//                   <p>
//                     <strong>Uses Left:</strong> {codeDetails.usageLimitLeft}
//                   </p>
//                   <button
//                     onClick={handleUseCouponCode}
//                     className="mt-2 bg-orange-500 text-white py-2 px-4 rounded"
//                   >
//                     Use Coupon Code
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p>
//                     <strong>Referral Amount:</strong> {currency.symbol}{codeDetails.referralAmount}
//                   </p>
//                   <p>
//                     <strong>Referrer Amount:</strong> {currency.symbol}{codeDetails.referrerAmount}
//                   </p>
//                 </>
//               )}
//             </div>
//           )}

//           {validationMessage && (
//             <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
//           )}
//         </>
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

//   // States
//   const [couponPurchaseAmount, setCouponPurchaseAmount] = useState("");
//   const [referralPurchaseAmount, setReferralPurchaseAmount] = useState("");
//   const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

//   const [couponError, setCouponError] = useState("");
//   const [referralError, setReferralError] = useState("");

//   const [redeemLoading, setRedeemLoading] = useState(false);

//   // Popups
//   const [showRedeemChoiceModal, setShowRedeemChoiceModal] = useState(false);
//   const [redeemOption, setRedeemOption] = useState("");
//   const [tempPurchaseAmount, setTempPurchaseAmount] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [successData, setSuccessData] = useState({});

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

//     try {
//       const data = await userInfo("", phoneNumber);
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

//   const handleCouponSubmit = () => {
//     if (!couponPurchaseAmount || Number(couponPurchaseAmount) <= 0) {
//       setCouponError("Please enter valid purchase amount");
//       return;
//     }
//     if (applications.includes("Referral") && verificationData?.referralCode) {
//       setTempPurchaseAmount(couponPurchaseAmount);
//       setShowRedeemChoiceModal(true);
//     } else {
//       handleDirectCouponApply();
//     }
//   };

//   const handleCombinedTransaction = async () => {
//     let finalRedeemAmount = 0;
//     if (redeemOption === "full") finalRedeemAmount = verificationData.availableBalance;
//     else if (redeemOption === "partial") {
//       finalRedeemAmount = Number(referralRedeemAmount || 0);
//       if (finalRedeemAmount > verificationData.availableBalance) {
//         setReferralError("Redeem amount exceeds available balance");
//         return;
//       }
//     }

//     const token = localStorage.getItem("token");
//     setRedeemLoading(true);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
//         {
//           customerId: verificationData.customerId,
//           couponCode: verificationData.couponCode,
//           purchaseAmount: Number(tempPurchaseAmount),
//           redeemAmount: finalRedeemAmount,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: tempPurchaseAmount,
//         couponAmount: verificationData.couponAmount,
//         redeemAmount: finalRedeemAmount,
//       });
//       setShowSuccessPopup(true);
//       setShowRedeemChoiceModal(false);
//     } catch (err) {
//       const msg = err?.response?.data?.message || err.message;
//       toast.error(msg);
//     } finally {
//       setRedeemLoading(false);
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
//           customerId: verificationData.customerId,
//           couponCode: verificationData.couponCode,
//           purchaseAmount: Number(couponPurchaseAmount),
//           redeemAmount: 0,   // No redeem
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSuccessData({
//         purchaseAmount: couponPurchaseAmount,
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
//     if (!referralPurchaseAmount || Number(referralPurchaseAmount) <= 0) {
//       setReferralError("Please enter purchase amount");
//       return;
//     }
//     if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
//       setReferralError("Please enter redeem amount");
//       return;
//     }
//     if (Number(referralRedeemAmount) > verificationData.availableBalance) {
//       setReferralError("Redeem amount exceeds available balance");
//       return;
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
//       toast.error(msg);
//     } finally {
//       setRedeemLoading(false);
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

//             <p className="text-sm text-gray-500 mb-6">
//               For security reasons, you cannot access shop data until your account is
//               reactivated.
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

//           {/* Verification Modal */}
//           {verificationDialogOpen && verificationData && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//           <div className="bg-white rounded-xl w-full max-w-[800px] p-6 shadow-xl max-h-[90vh] overflow-auto">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 mb-8">
//               <p><strong>Name:</strong> {verificationData.name}</p>
//               <p><strong>Phone:</strong> {verificationData.phone}</p>
//               <p><strong>Email:</strong> {verificationData.email}</p>
//               {/* <p><strong>Customer ID:</strong> {verificationData.customerId}</p> */}
//               {applications.includes("Referral") && verificationData.referralCode && (
//                 <>
//                   <p><strong>Available Balance:</strong> {currency.symbol}{verificationData.availableBalance}</p>
//                   <p><strong>Referral Code:</strong> {verificationData.referralCode}</p>
//                 </>
//               )}
//               {applications.includes("Coupon") && verificationData.couponCode && (
//                 <>
//                   <p><strong>Coupon Code:</strong> {verificationData.couponCode}</p>
//                   <p><strong>Coupon Amount:</strong> {currency.symbol}{verificationData.couponAmount}</p>
//                   <p><strong>Coupon Usage Limit:</strong> {verificationData.couponUsageLimit}</p>
//                   <p><strong>Coupon Usage Left:</strong> {verificationData.usageLeft}</p>
//                 </>
//               )}
//             </div>

//             <div className="flex flex-col lg:flex-row gap-6">
//               {applications.includes("Referral") && verificationData?.referralCode && (
//                 <div className="flex-1 border-2 border-green-200 p-6 rounded-2xl bg-green-50">
//                   <h3 className="font-bold text-xl mb-4 text-green-800">Referral</h3>
                  
//                   <input
//                     type="number"
//                     value={referralPurchaseAmount}
//                     onChange={(e) => setReferralPurchaseAmount(e.target.value)}
//                     placeholder="Enter Purchase Amount"
//                     className="w-full p-4 border rounded-xl mb-4"
//                   />

//                   <input
//                     type="number"
//                     value={referralRedeemAmount}
//                     onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                     placeholder="Enter Redeem Amount"
//                     className="w-full p-4 border rounded-xl mb-4"
//                   />

//                   <button
//                     onClick={handleReferralSubmit}
//                     disabled={redeemLoading}
//                     className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl"
//                   >
//                     {redeemLoading ? "Processing..." : "Submit Referral"}
//                   </button>
//                 </div>
//               )}

//               {applications.includes("Coupon") && verificationData?.couponCode && (
//                 <div className="flex-1 border-2 border-yellow-200 p-6 rounded-2xl bg-yellow-50">
//                   <h3 className="font-bold text-xl mb-4 text-yellow-800">Coupon</h3>
                  
//                   <input
//                     type="number"
//                     value={couponPurchaseAmount}
//                     onChange={(e) => setCouponPurchaseAmount(e.target.value)}
//                     placeholder="Enter Purchase Amount"
//                     className="w-full p-4 border rounded-xl mb-4"
//                   />

//                   <button
//                     onClick={handleCouponSubmit}
//                     className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-2xl"
//                   >
//                     Submit Coupon
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button onClick={handleCloseVerificationDialog} className="mt-8 w-full py-4 bg-gray-200 hover:bg-gray-300 rounded-2xl font-semibold">
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//         {showRedeemChoiceModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
//             <h2 className="text-xl font-bold text-center mb-5">Complete Transaction</h2>

//             <div className="bg-yellow-50 p-4 rounded-xl mb-6">
//               <p className="font-semibold">Coupon Discount: {currency.symbol}{verificationData.couponAmount}</p>
//               <p>Purchase Amount: {currency.symbol}{tempPurchaseAmount}</p>
//             </div>

//             <p className="font-semibold mb-3">Redeem from Referral Balance</p>

//             <div
//               onClick={() => setRedeemOption("full")}
//               className={`p-4 border-2 rounded-xl mb-3 cursor-pointer ${redeemOption === "full" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
//             >
//               Use Full Available Balance ({currency.symbol}{verificationData.availableBalance})
//             </div>

//             <div
//               onClick={() => setRedeemOption("partial")}
//               className={`p-4 border-2 rounded-xl cursor-pointer ${redeemOption === "partial" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
//             >
//               Use Partial Amount
//               {redeemOption === "partial" && (
//                 <input
//                   type="number"
//                   value={referralRedeemAmount}           // ← Fixed
//                   onChange={(e) => setReferralRedeemAmount(e.target.value)}  // ← Fixed
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
//                 onClick={handleCombinedTransaction}
//                 disabled={redeemLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}  // ← Fixed
//                 className="flex-1 py-3 bg-green-600 text-white rounded-full font-bold disabled:bg-gray-400"
//               >
//                 {redeemLoading ? "Processing..." : "Confirm & Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//           {/* Main Form */}
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
//                     setPhoneNumber(e.target.value);
//                     setPhoneVerified(false);
//                   }}
//                   placeholder="Enter phone"
//                   className="w-full p-2 border rounded"
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

//           {/* Scanner Modal */}
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

//           {/* Code Result Display */}
//           {codeDetails && (
//             <div className="max-w-6xl w-full bg-gray-50 p-6 rounded shadow mt-6">
//               <h3 className="font-bold text-lg">Code Details</h3>
//               <p>
//                 <strong>Code:</strong> {codeDetails.code}
//               </p>
//               <p>
//                 <strong>Status:</strong> {codeDetails.status}
//               </p>
//               <p>
//                 <strong>Expiry:</strong> {codeDetails.expiryDate}
//               </p>

//               {codeDetails.user && (
//                 <>
//                   <h4 className="font-semibold mt-3">User Info</h4>
//                   <p>
//                     <strong>Name:</strong> {codeDetails.user.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {codeDetails.user.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {codeDetails.user.phone}
//                   </p>
//                 </>
//               )}

//               {isCouponCode ? (
//                 <>
//                   <p>
//                     <strong>Discount:</strong> ${codeDetails.amount}
//                   </p>
//                   <p>
//                     <strong>Uses Left:</strong> {codeDetails.usageLimitLeft}
//                   </p>
//                   <button
//                     onClick={handleUseCouponCode}
//                     className="mt-2 bg-orange-500 text-white py-2 px-4 rounded"
//                   >
//                     Use Coupon Code
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p>
//                     <strong>Referral Amount:</strong> {currency.symbol}{codeDetails.referralAmount}
//                   </p>
//                   <p>
//                     <strong>Referrer Amount:</strong> {currency.symbol}{codeDetails.referrerAmount}
//                   </p>
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

  // States
  const [couponPurchaseAmount, setCouponPurchaseAmount] = useState("");
  const [referralPurchaseAmount, setReferralPurchaseAmount] = useState("");
  const [referralRedeemAmount, setReferralRedeemAmount] = useState("");

  const [couponError, setCouponError] = useState("");
  const [referralError, setReferralError] = useState("");

  const [redeemLoading, setRedeemLoading] = useState(false);

  // Popups
  const [showRedeemChoiceModal, setShowRedeemChoiceModal] = useState(false);
  const [redeemOption, setRedeemOption] = useState("");
  const [tempPurchaseAmount, setTempPurchaseAmount] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState({});

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

    try {
      const data = await userInfo("", phoneNumber);
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
    setCouponPurchaseAmount("");
    setReferralPurchaseAmount("");
    setReferralRedeemAmount("");
    setCouponError("");
    setReferralError("");
    setShowRedeemChoiceModal(false);
    setRedeemOption("");
    setTempPurchaseAmount("");
    setShowSuccessPopup(false);
  };

  const handleCouponSubmit = () => {
    if (!couponPurchaseAmount || Number(couponPurchaseAmount) <= 0) {
      setCouponError("Please enter valid purchase amount");
      return;
    }
    if (applications.includes("Referral") && verificationData?.referralCode) {
      setTempPurchaseAmount(couponPurchaseAmount);
      setShowRedeemChoiceModal(true);
    } else {
      handleDirectCouponApply();
    }
  };

  const handleCombinedTransaction = async () => {
    let finalRedeemAmount = 0;
    if (redeemOption === "full") finalRedeemAmount = verificationData.availableBalance;
    else if (redeemOption === "partial") {
      finalRedeemAmount = Number(referralRedeemAmount || 0);
      if (finalRedeemAmount > verificationData.availableBalance) {
        setReferralError("Redeem amount exceeds available balance");
        return;
      }
    }

    const token = localStorage.getItem("token");
    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/apply-coupon`,
        {
          customerId: verificationData.customerId,
          couponCode: verificationData.couponCode,
          purchaseAmount: Number(tempPurchaseAmount),
          redeemAmount: finalRedeemAmount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: tempPurchaseAmount,
        couponAmount: verificationData.couponAmount,
        redeemAmount: finalRedeemAmount,
      });
      setShowSuccessPopup(true);
      setShowRedeemChoiceModal(false);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setRedeemLoading(false);
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
          customerId: verificationData.customerId,
          couponCode: verificationData.couponCode,
          purchaseAmount: Number(couponPurchaseAmount),
          redeemAmount: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: couponPurchaseAmount,
        couponAmount: verificationData.couponAmount,
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
    if (!referralPurchaseAmount || Number(referralPurchaseAmount) <= 0) {
      setReferralError("Please enter purchase amount");
      return;
    }
    if (!referralRedeemAmount || Number(referralRedeemAmount) <= 0) {
      setReferralError("Please enter redeem amount");
      return;
    }
    if (Number(referralRedeemAmount) > verificationData.availableBalance) {
      setReferralError("Redeem amount exceeds available balance");
      return;
    }

    const token = localStorage.getItem("token");
    setRedeemLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/redeem-discount`,
        {
          customerId: verificationData.customerId,
          referralCode: verificationData.referralCode && verificationData.referralCode !== "None" 
            ? verificationData.referralCode : null,
          purchaseAmount: Number(referralPurchaseAmount),
          discountAmount: Number(referralRedeemAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessData({
        purchaseAmount: referralPurchaseAmount,
        couponAmount: 0,
        redeemAmount: referralRedeemAmount,
      });
      setShowSuccessPopup(true);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setRedeemLoading(false);
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-white rounded-lg w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
                
                {/* Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer Profile Dashboard</h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Verify information and execute transaction actions</p>
                  </div>
                  <button 
                    onClick={handleCloseVerificationDialog}
                    className="text-slate-400 hover:text-slate-600 text-2xl transition p-1"
                  >
                    &times;
                  </button>
                </div>

                {/* Scrollable Container Workspace */}
                <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
                  
                  {/* Left Column: Visual Data Profile Card */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-6 relative overflow-hidden">
                      <div className="w-12 h-12 rounded-full bg-slate-200/60 flex items-center justify-center mb-4 text-slate-700 font-bold text-lg">
                        {verificationData.name ? verificationData.name.charAt(0).toUpperCase() : "C"}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">{verificationData.name || "N/A"}</h3>
                      
                      <div className="space-y-3.5 text-xs font-medium text-slate-600">
                        <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                          <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Phone Number</span>
                          <span className="text-slate-800 text-sm">{verificationData.phone || "—"}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                          <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Email Address</span>
                          <span className="text-slate-800 text-sm break-all">{verificationData.email || "—"}</span>
                        </div>
                      </div>
                    </div>

                    {/* App Context Metrics */}
                    <div className="space-y-3">
                      {applications.includes("Referral") && verificationData.referralCode && (
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider">Available Balance</span>
                            <span className="text-lg font-black text-emerald-800">{currency.symbol}{verificationData.availableBalance}</span>
                          </div>
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40">
                            {verificationData.referralCode}
                          </span>
                        </div>
                      )}

                      {applications.includes("Coupon") && verificationData.couponCode && (
                        <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-4 space-y-2.5">
                          <div className="flex justify-between items-center border-b border-amber-200/30 pb-2">
                            <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Active</span>
                            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                              {verificationData.couponCode}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                              <span className="block text-[9px] text-slate-400 uppercase font-bold">Discount</span>
                              <span className="font-extrabold text-amber-800">{currency.symbol}{verificationData.couponAmount}</span>
                            </div>
                            <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                              <span className="block text-[9px] text-slate-400 uppercase font-bold">Remaining Uses</span>
                              <span className="font-extrabold text-slate-800">{verificationData.usageLeft} / {verificationData.couponUsageLimit}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Action Desks */}
                  <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6">
                    
                    {/* Referral Card UI Desk */}
                    {applications.includes("Referral") && verificationData?.referralCode && (
                      <div className="flex-1 border border-slate-100 rounded-lg p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Referral Management</h3>
                          </div>
                          
                          <div className="space-y-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 mb-1">Purchase Amount</label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
                                <input
                                  type="number"
                                  value={referralPurchaseAmount}
                                  onChange={(e) => setReferralPurchaseAmount(e.target.value)}
                                  placeholder="0.00"
                                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-500 mb-1">Redeem Discount</label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
                                <input
                                  type="number"
                                  value={referralRedeemAmount}
                                  onChange={(e) => setReferralRedeemAmount(e.target.value)}
                                  placeholder="0.00"
                                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {referralError && <p className="text-xs font-semibold text-rose-500 mt-2">{referralError}</p>}

                        <button
                          onClick={handleReferralSubmit}
                          disabled={redeemLoading}
                          className="w-full mt-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-md shadow-slate-900/10 disabled:bg-slate-300"
                        >
                          {redeemLoading ? "Processing..." : "Submit Referral"}
                        </button>
                      </div>
                    )}

                    {/* Coupon Card UI Desk */}
                    {applications.includes("Coupon") && verificationData?.couponCode && (
                      <div className="flex-1 border border-slate-100 rounded-lg p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                            <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Coupon Processing</h3>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Purchase Amount</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
                              <input
                                type="number"
                                value={couponPurchaseAmount}
                                onChange={(e) => setCouponPurchaseAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                              />
                            </div>
                          </div>
                        </div>

                        {couponError && <p className="text-xs font-semibold text-rose-500 mt-2">{couponError}</p>}

                        <button
                          onClick={handleCouponSubmit}
                          className="w-full mt-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10"
                        >
                          Submit Coupon
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={handleCloseVerificationDialog} 
                    className="px-6 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-medium transition"
                  >
                    Dismiss Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RE-DESIGNED COMPLETE TRANSACTION POPUP MODAL (CHECKBOX/RADIO SYSTEM) */}
          {showRedeemChoiceModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-slate-100 transform scale-100 transition-all">
                
                <h2 className="text-xl font-black text-slate-900 tracking-tight text-center mb-1">Complete Transaction</h2>
                <p className="text-xs font-medium text-slate-500 text-center mb-5">Select a balance settlement configuration method</p>

                {/* Coupon Information Banner */}
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-5 flex justify-between items-center text-sm">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Discount Applied</span>
                    <span className="font-black text-amber-900 text-base">{currency.symbol}{verificationData.couponAmount}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Purchase Val</span>
                    <span className="font-bold text-slate-700">{currency.symbol}{tempPurchaseAmount}</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Redeem from Referral Balance</p>

                {/* Option 1: Full Balance Selection */}
                <div
                  onClick={() => setRedeemOption("full")}
                  className={`group p-3 border rounded-md mb-3 cursor-pointer transition-all flex items-start gap-3.5 ${
                    redeemOption === "full" 
                      ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  {/* Styled Checkbox/Radio Circle Container */}
                  <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    redeemOption === "full" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 group-hover:border-slate-400 bg-white"
                  }`}>
                    {redeemOption === "full" && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div className="text-sm">
                    <span className="block font-bold text-slate-800">Use Full Available Balance</span>
                    <span className="text-xs font-medium text-slate-500">Deduct max possible: <strong className="text-emerald-700 font-bold">{currency.symbol}{verificationData.availableBalance}</strong></span>
                  </div>
                </div>

                {/* Option 2: Partial Selection Row */}
                <div
                  onClick={() => setRedeemOption("partial")}
                  className={`group p-3 border rounded-md cursor-pointer transition-all ${
                    redeemOption === "partial" 
                      ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Styled Checkbox/Radio Circle Container */}
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

                  {/* Dynamic Inner input drawer panel */}
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

                {/* Bottom Control Actions */}
                <div className="flex gap-3.5 mt-6">
                  <button 
                    onClick={() => setShowRedeemChoiceModal(false)} 
                    className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCombinedTransaction}
                    disabled={redeemLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-lg shadow-slate-950/10 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                  >
                    {redeemLoading ? "Processing..." : "Confirm & Submit"}
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
              <p><strong>Code:</strong> {codeDetails.code}</p>
              <p><strong>Status:</strong> {codeDetails.status}</p>
              <p><strong>Expiry:</strong> {codeDetails.expiryDate}</p>

              {codeDetails.user && (
                <>
                  <h4 className="font-semibold mt-3">User Info</h4>
                  <p><strong>Name:</strong> {codeDetails.user.name}</p>
                  <p><strong>Email:</strong> {codeDetails.user.email}</p>
                  <p><strong>Phone:</strong> {codeDetails.user.phone}</p>
                </>
              )}

              {isCouponCode ? (
                <>
                  <p><strong>Discount:</strong> ${codeDetails.amount}</p>
                  <p><strong>Uses Left:</strong> {codeDetails.usageLimitLeft}</p>
                  <button
                    onClick={handleUseCouponCode}
                    className="mt-2 bg-orange-500 text-white py-2 px-4 rounded"
                  >
                    Use Coupon Code
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Referral Amount:</strong> {currency.symbol}{codeDetails.referralAmount}</p>
                  <p><strong>Referrer Amount:</strong> {currency.symbol}{codeDetails.referrerAmount}</p>
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