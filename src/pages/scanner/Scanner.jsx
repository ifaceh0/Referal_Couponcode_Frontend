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
//             width: "500px",
//             maxWidth: "90%",
//           },
//         }}
//       >
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="p-6 bg-white">
//           {scannedData && (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border border-gray-300 text-left">
//                 <tbody>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Available Balance:</td>
//                     <td className="py-2 px-4 text-gray-600">${scannedData.availableBalance}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Coupon Amount:</td>
//                     <td className="py-2 px-4 text-gray-600">${scannedData.couponAmount}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Coupon Usage Limit:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.couponUsageLimit}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                   </tr>
//                 </tbody>
//               </table>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      try {
        console.log(data);
        const parsedData = JSON.parse(data.text);
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

  const handleRedeemClick = () => {
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

    console.log("Sending data to backend:", { scannedData, redeemAmount });

    // Close dialog and refresh page
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Back Button */}
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

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: "12px",
            width: "600px", // Increased width to accommodate two columns
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
          Customer Details
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
          {scannedData && (
            <div className="flex">
              {/* Left side - Customer Details */}
              <div className="w-1/2 pr-4">
                <table className="w-full border-collapse border border-gray-300 text-left">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
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

              {/* Right side - Available Balance */}
              <div className="w-1/2 pl-4 flex flex-col items-center justify-center border-l border-gray-200">
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
            </div>
          )}

          {/* Redeem Amount Input */}
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

          {/* Redeem Button */}
          <button
            onClick={handleRedeemClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
          >
            Redeem
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scanner;