import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";

const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [error, setError] = useState("");

  // Suppress defaultProps warning
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text); // Parse the scanned JSON string
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
                <p className="text-sm font-semibold text-gray-600">Account ID</p>
                <p className="text-lg text-gray-800">{scannedData.accountId}</p>
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
                <p className="text-sm font-semibold text-gray-600">Referral Code</p>
                <p className="text-lg text-gray-800">{scannedData.referralCode}</p>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
                <input
                  type="text"
                  value={redeemAmount ? `$${redeemAmount}` : `$`}
                  onChange={(e) => {
                    setRedeemAmount(e.target.value.substring(1,e.target.value.length));
                    setError(""); // Clear error when user types
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