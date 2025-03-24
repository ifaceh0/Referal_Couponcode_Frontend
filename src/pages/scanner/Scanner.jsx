import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [error, setError] = useState("");


  const handleScan = (data) => {
    if (data) {
      try {
        console.log(data)
        const parsedData = JSON.parse(data.text); // Parse the scanned JSON string
        console.log(parsedData)
        setScannedData(parsedData);
        setOpen(true);
        setError(""); // Clear any previous errors
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
    const availableBalance = parseFloat(scannedData.availableBalance);

    if (amount > availableBalance) {
      setError("Amount cannot exceed available balance.");
      return;
    }

    console.log("Sending data to backend:", { scannedData, redeemAmount });
    setOpen(false);
    setRedeemAmount("");
    setError("");
  };

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
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            borderRadius: "12px",
            width: "400px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
          Customer Details
        </DialogTitle>
        <DialogContent className="p-6 bg-white">
  {scannedData && (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-gray-600">Customer ID</p>
        <p className="text-lg text-gray-800">{scannedData.customerId}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Name</p>
        <p className="text-lg text-gray-800">{scannedData.name}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Phone</p>
        <p className="text-lg text-gray-800">{scannedData.phone}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Available Balance</p>
        <p className="text-lg text-gray-800">${scannedData.availableBalance}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Coupon Code</p>
        <p className="text-lg text-gray-800">{scannedData.couponCode}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Coupon Amount</p>
        <p className="text-lg text-gray-800">${scannedData.couponAmount}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Coupon Usage Limit</p>
        <p className="text-lg text-gray-800">{scannedData.couponUsageLimit}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600">Referral Code</p>
        <p className="text-lg text-gray-800">{scannedData.referralCode}</p>
      </div>

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
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>

      <button
        onClick={handleRedeemClick}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
      >
        Redeem
      </button>
    </div>
  )}
</DialogContent>
      </Dialog>
    </div>
  );
};

export default Scanner;

// import React, { useState, useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import { Dialog, DialogTitle, DialogContent } from "@mui/material";
// import { motion } from "framer-motion";

// const Scanner = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [redeemAmount, setRedeemAmount] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       "qr-scanner", // Container ID
//       {
//         qrbox: 250, // Size of the QR scanning box
//         fps: 5, // Frames per second
//       },
//       false // Verbose mode
//     );

//     scanner.render(
//       (data) => {
//         try {
//           const parsedData = JSON.parse(data); // Parse the scanned JSON string
//           setScannedData(parsedData);
//           setOpen(true);
//           setError(""); // Clear any previous errors
//           scanner.clear(); // Stop the scanner after successful scan
//         } catch (error) {
//           console.error("Invalid JSON data:", error);
//           setError("Invalid QR code. Please scan a valid code.");
//         }
//       },
//       (err) => {
//         console.error("QR Scan Error:", err);
//         setError("Failed to scan QR code. Please try again.");
//       }
//     );

//     return () => {
//       scanner.clear(); // Clean up the scanner on unmount
//     };
//   }, []);

//   const handleRedeemClick = () => {
//     if (!redeemAmount) {
//       setError("Please enter an amount.");
//       return;
//     }

//     const amount = parseFloat(redeemAmount);
//     const availableBalance = parseFloat(scannedData.availableBalance);

//     if (amount > availableBalance) {
//       setError("Amount cannot exceed available balance.");
//       return;
//     }

//     console.log("Sending data to backend:", { scannedData, redeemAmount });
//     setOpen(false);
//     setRedeemAmount("");
//     setError("");
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

//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//         className="w-96 h-96 border-4 border-gray-300 rounded-lg overflow-hidden shadow-lg"
//       >
//         <div id="qr-scanner" className="w-full h-full"></div>
//       </motion.div>

//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           style: {
//             borderRadius: "12px",
//             width: "400px",
//             maxWidth: "90%",
//           },
//         }}
//       >
//         <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </DialogTitle>
//         <DialogContent className="p-6 bg-white">
//           {scannedData && (
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Account ID</p>
//                 <p className="text-lg text-gray-800">{scannedData.accountId}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Name</p>
//                 <p className="text-lg text-gray-800">{scannedData.name}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Phone</p>
//                 <p className="text-lg text-gray-800">{scannedData.phone}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Available Balance</p>
//                 <p className="text-lg text-gray-800">${scannedData.availableBalance}</p>
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-gray-600">Referral Code</p>
//                 <p className="text-lg text-gray-800">{scannedData.referralCode}</p>
//               </div>

//               <div className="mt-6">
//                 <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
//                 <input
//                   type="text"
//                   value={redeemAmount ? `$${redeemAmount}` : `$`}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
//                     setRedeemAmount(value);
//                     setError(""); // Clear error when user types
//                   }}
//                   className={`w-full p-3 border ${
//                     error ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   placeholder="Enter amount"
//                 />
//                 {error && (
//                   <p className="text-sm text-red-500 mt-2">{error}</p>
//                 )}
//               </div>

//               <button
//                 onClick={handleRedeemClick}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
//               >
//                 Redeem
//               </button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Scanner;