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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCode } from "../../api/validateCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaQrcode, FaArrowLeft } from "react-icons/fa";

const InteractionPanel = () => {
  const [code, setCode] = useState("");
  const [codeDetails, setCodeDetails] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [isCouponCode, setIsCouponCode] = useState(false);
  const navigate = useNavigate();

  const handleSearchCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter a valid code.");
      return;
    }

    const response = await toast.promise(validateCode(code.trim()), {
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

  const handleUseCouponCode = () => {
    toast.success("Coupon code used successfully!");
    setCodeDetails(null);
    setIsCouponCode(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

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

      {/* Two-column layout */}
      <div className="max-w-4xl w-full grid grid-cols-2 gap-6">
        {/* Search Code Card - Left Side */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Search Code</h2>
          <input
            type="text"
            placeholder="Enter Referral or Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleSearchCode}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center justify-center mt-16"
          >
            Search
          </button>
        </div>

        {/* Scanner Card - Right Side */}
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
            <button
              onClick={() => navigate("../scanner")}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FaQrcode className="mr-2" />
              Open Scanner
            </button>
          </div>
        </div>
      </div>

      {/* Display Code Details */}
      {codeDetails && (
        <div className="max-w-4xl w-full bg-gray-50 p-6 rounded-lg shadow mt-6">
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
              <button
                onClick={handleUseCouponCode}
                className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2 transition"
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
        <p className="text-red-600 mt-4 text-center">{validationMessage}</p>
      )}
    </div>
  );
};

export default InteractionPanel;
