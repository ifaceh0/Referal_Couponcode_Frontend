// import React, { useState } from "react";
// import { shopkeeperDemoData1, discountData } from "../../utils/demoData";

// const InteractionPanel = () => {
//   const [referralCode, setReferralCode] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [flashMessage, setFlashMessage] = useState("");
//   const [showDiscountSection, setShowDiscountSection] = useState(false);
//   const [selectedDiscounts, setSelectedDiscounts] = useState([]);
//   const [transactions, setTransactions] = useState([]);

//   const handleSearchCode = () => {
//     const codeData = shopkeeperDemoData1.referralCodes.find(
//       (code) => code.code === referralCode.trim()
//     );
//     if (codeData) {
//       setCodeDetails({
//         ...codeData.customer,
//         points: codeData.customer?.points || 0,
//       });
//       setValidationMessage("");
//     } else {
//       setCodeDetails(null);
//       setValidationMessage("Referral code not found.");
//     }
//   };

//   const handleUseReferralCode = async () => {
//     try {
//       // Replace with your backend API call
//       const response = await fetch("/api/use-referral-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ referralCode }),
//       });

//       if (response.ok) {
//         setFlashMessage("Referral code used successfully!");
//         setCodeDetails((prev) => ({
//           ...prev,
//           points: (prev?.points || 0) - 10, // Example deduction of points
//         }));
//       } else {
//         setFlashMessage("Failed to use referral code. Please try again.");
//       }
//     } catch (error) {
//       setFlashMessage("An error occurred. Please try again later.");
//     }
//   };

//   const toggleDiscountSelection = (discount) => {
//     setSelectedDiscounts((prev) =>
//       prev.includes(discount)
//         ? prev.filter((d) => d !== discount)
//         : [...prev, discount]
//     );
//   };

//   const clearSelections = () => {
//     setSelectedDiscounts([]);
//   };

//   const availDiscounts = () => {
//     if (!codeDetails || selectedDiscounts.length === 0) return;

//     const totalPointsRequired = selectedDiscounts.reduce(
//       (sum, discount) => sum + discount.points,
//       0
//     );

//     if (codeDetails.points >= totalPointsRequired) {
//       const updatedPoints = codeDetails.points - totalPointsRequired;

//       setCodeDetails((prev) => ({
//         ...prev,
//         points: updatedPoints,
//       }));

//       const newTransactions = selectedDiscounts.map((discount) => ({
//         name: discount.name,
//         pointsUsed: discount.points,
//         timestamp: new Date().toLocaleString(),
//       }));

//       setTransactions((prev) => [...prev, ...newTransactions]);
//       setValidationMessage("Discounts availed successfully!");
//       clearSelections();
//     } else {
//       setValidationMessage("Insufficient points to avail selected discounts.");
//     }
//   };

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl font-bold mb-6">Unified Interaction Panel</h1>

//       {/* Search Referral Code */}
//       <div className="mb-6">
//         <h2 className="text-xl mb-2">Search Referral Code</h2>
//         <input
//           type="text"
//           placeholder="Enter Referral Code"
//           value={referralCode}
//           onChange={(e) => setReferralCode(e.target.value)}
//           className="w-full p-2 border rounded mb-2"
//         />
//         <button
//           onClick={handleSearchCode}
//           className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
//         >
//           Search
//         </button>
//         {codeDetails && (
//           <button
//             onClick={handleUseReferralCode}
//             className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600"
//           >
//             Use Referral Code
//           </button>
//         )}
//       </div>

//       {/* Display Referral Code Details */}
//       {codeDetails && (
//         <div className="bg-gray-100 p-4 rounded mt-4 relative">
//           <h3 className="text-lg font-bold">Referral Code Details</h3>
//           <p><strong>Name:</strong> {codeDetails.name || "N/A"}</p>
//           <p><strong>Email:</strong> {codeDetails.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {codeDetails.phone || "N/A"}</p>
//           <p><strong>Points:</strong> {codeDetails.points}</p>
//           <button
//             onClick={() => setShowDiscountSection(!showDiscountSection)}
//             className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
//           >
//             {showDiscountSection ? "Close Discounts" : "View Discounts"}
//           </button>
//         </div>
//       )}

//       {/* Flash Message */}
//       {flashMessage && (
//         <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded">
//           {flashMessage}
//         </div>
//       )}

//       {/* Discount Section */}
//       {showDiscountSection && codeDetails && (
//         <div className="mt-6 p-4 bg-white shadow rounded">
//           <h3 className="text-lg font-bold mb-4">Available Discounts</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {discountData.discountMapping
//               .filter((discount) => discount.points <= codeDetails.points)
//               .map((discount) => (
//                 <div
//                   key={discount.name}
//                   className={`p-4 border rounded ${
//                     selectedDiscounts.includes(discount)
//                       ? "bg-green-100 border-green-500"
//                       : "bg-gray-50"
//                   }`}
//                   onClick={() => toggleDiscountSelection(discount)}
//                 >
//                   <h4 className="font-bold">{discount.name}</h4>
//                   <p>Points Required: {discount.points}</p>
//                   <p>Discount: {discount.discount}</p>
//                 </div>
//               ))}
//           </div>
//           <div className="mt-4 flex gap-4">
//             <button
//               onClick={clearSelections}
//               className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
//             >
//               Clear Selected
//             </button>
//             <button
//               onClick={availDiscounts}
//               className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Avail Discounts
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Transaction History */}
//       {transactions.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-4">Transaction History</h3>
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Name</th>
//                 <th className="border p-2">Points Used</th>
//                 <th className="border p-2">Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="border p-2">{transaction.name}</td>
//                   <td className="border p-2">{transaction.pointsUsed}</td>
//                   <td className="border p-2">{transaction.timestamp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
// import { shopkeeperDemoData1 } from "../../utils/demoData";

// const InteractionPanel = () => {
//   const [referralCode, setReferralCode] = useState("");
//   const [codeDetails, setCodeDetails] = useState(null);
//   const [validationMessage, setValidationMessage] = useState("");
//   const [flashMessage, setFlashMessage] = useState("");
//   const [showDiscountSection, setShowDiscountSection] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [isCouponCode, setIsCouponCode] = useState(false);

//   const handleSearchCode = () => {
//     // Check referral code in shopkeeperDemoData1
//     const referralData = shopkeeperDemoData1.referralCodes.find(
//       (code) => code.code === referralCode.trim()
//     );
//     if (referralData) {
//       setCodeDetails({
//         ...referralData.customer,
//         points: referralData.customer?.points || 0,
//       });
//       setIsCouponCode(false);
//       setValidationMessage("");
//       return;
//     }

//     // Check coupon code in localStorage
//     const storedCoupons = JSON.parse(localStorage.getItem("couponCodes")) || [];
//     const couponData = storedCoupons.find(
//       (code) => code.couponCode === referralCode.trim()
//     );
//     if (couponData) {
//       setCodeDetails({
//         name: couponData.name,
//         email: couponData.email,
//         phone: couponData.phone,
//         referralAmount: couponData.referralAmount,
//         expiryDate: couponData.expiryDate,
//       });
//       setIsCouponCode(true);
//       setValidationMessage("");
//       return;
//     }

//     // If no match found
//     setCodeDetails(null);
//     setValidationMessage("Code not found.");
//   };

//   const handleUseReferralCode = async () => {
//     try {
//       // Replace with your backend API call
//       const response = await fetch("/api/use-referral-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ referralCode }),
//       });

//       if (response.ok) {
//         setFlashMessage("Referral code used successfully!");
//         setCodeDetails((prev) => ({
//           ...prev,
//           points: (prev?.points || 0) - 10, // Example deduction of points
//         }));
//       } else {
//         setFlashMessage("Failed to use referral code. Please try again.");
//       }
//     } catch (error) {
//       setFlashMessage("An error occurred. Please try again later.");
//     }
//   };

//   const handleUseCouponCode = () => {
//     setFlashMessage("Coupon code used successfully!");
//     setCodeDetails(null); // Clear the details after using the coupon code
//     setIsCouponCode(false);
//   };

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl font-bold mb-6">Unified Interaction Panel</h1>

//       {/* Search Code */}
//       <div className="mb-6">
//         <h2 className="text-xl mb-2">Search Code</h2>
//         <input
//           type="text"
//           placeholder="Enter Referral or Coupon Code"
//           value={referralCode}
//           onChange={(e) => setReferralCode(e.target.value)}
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
//           <p><strong>Name:</strong> {codeDetails.name || "N/A"}</p>
//           <p><strong>Email:</strong> {codeDetails.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {codeDetails.phone || "N/A"}</p>

//           {/* Referral Code Details */}
//           {!isCouponCode && (
//             <>
//               <p><strong>Points:</strong> {codeDetails.points}</p>
//               <button
//                 onClick={handleUseReferralCode}
//                 className="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 mt-2"
//               >
//                 Use Referral Code
//               </button>
//               <button
//                 onClick={() => setShowDiscountSection(!showDiscountSection)}
//                 className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
//               >
//                 {showDiscountSection ? "Close Discounts" : "View Discounts"}
//               </button>
//             </>
//           )}

//           {/* Coupon Code Details */}
//           {isCouponCode && (
//             <>
//               <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
//               <p><strong>Expiry Date:</strong> {codeDetails.expiryDate || "N/A"}</p>
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


import React, { useState } from "react";
import { shopkeeperDemoData1 } from "../../utils/demoData";

const InteractionPanel = () => {
  const [referralCode, setReferralCode] = useState("");
  const [codeDetails, setCodeDetails] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [showDiscountSection, setShowDiscountSection] = useState(false);
  const [isCouponCode, setIsCouponCode] = useState(false);

  const handleSearchCode = () => {
    const storedCoupons = JSON.parse(localStorage.getItem("couponCodes")) || [];
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Check referral code in demo data
    const referralData = shopkeeperDemoData1.referralCodes.find(
      (code) => code.code === referralCode.trim()
    );
    if (referralData) {
      setCodeDetails({
        ...referralData.customer,
        points: referralData.customer?.points || 0,
      });
      setIsCouponCode(false);
      setValidationMessage("");
      return;
    }

    // Check coupon code in localStorage
    const couponData = storedCoupons.find(
      (code) => code.couponCode === referralCode.trim()
    );
    if (couponData) {
      setCodeDetails({
        name: couponData.name,
        email: couponData.email,
        phone: couponData.phone,
        referralAmount: couponData.referralAmount,
        expiryDate: couponData.expiryDate,
      });
      setIsCouponCode(true);
      setValidationMessage("");

      // Store transaction when coupon is found
      const newTransaction = {
        couponCode: couponData.couponCode,
        name: couponData.name,
        email: couponData.email,
        phone: couponData.phone,
        referralAmount: couponData.referralAmount,
        expiryDate: couponData.expiryDate,
      };
      storedTransactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(storedTransactions)); // Save transactions

      return;
    }

    // If no match found
    setCodeDetails(null);
    setValidationMessage("Code not found.");
  };

  const handleUseCouponCode = () => {
    setFlashMessage("Coupon code used successfully!");
    setCodeDetails(null); // Clear the details after using the coupon code
    setIsCouponCode(false);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Unified Interaction Panel</h1>

      {/* Search Code */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Search Code</h2>
        <input
          type="text"
          placeholder="Enter Referral or Coupon Code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleSearchCode}
          className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Display Code Details */}
      {codeDetails && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="text-lg font-bold">Code Details</h3>
          <p><strong>Name:</strong> {codeDetails.name || "N/A"}</p>
          <p><strong>Email:</strong> {codeDetails.email || "N/A"}</p>
          <p><strong>Phone:</strong> {codeDetails.phone || "N/A"}</p>

          {/* Referral Code Details */}
          {!isCouponCode && (
            <>
              <p><strong>Points:</strong> {codeDetails.points}</p>
            </>
          )}

          {/* Coupon Code Details */}
          {isCouponCode && (
            <>
              <p><strong>Referral Amount:</strong> ${codeDetails.referralAmount}</p>
              <p><strong>Expiry Date:</strong> {codeDetails.expiryDate || "N/A"}</p>
              <button
                onClick={handleUseCouponCode}
                className="py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2"
              >
                Use Coupon Code
              </button>
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
        <p className="text-red-600 mt-4">{validationMessage}</p>
      )}
    </div>
  );
};

export default InteractionPanel;
