// import React from 'react';
// import { Dialog, DialogTitle, DialogContent } from '@mui/material';

// const CustomerDetailsDialog = ({ 
//   open, 
//   onClose, 
//   scannedData, 
//   redeemAmount, 
//   onRedeemAmountChange, 
//   onRedeemClick, 
//   error, 
//   loading 
// }) => {
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         style: {
//           borderRadius: "12px",
//           width: "600px",
//           maxWidth: "90%",
//         },
//       }}
//     >
//       <DialogTitle className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//         Customer Details
//       </DialogTitle>
//       <DialogContent className="p-6 bg-white">
//         {scannedData && (
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
//               <div className="text-center">
//                 <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
//                 <div className="text-4xl font-bold text-blue-600 mb-4">
//                   ${scannedData.availableBalance.toFixed(2)}
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Coupon Amount: ${scannedData.couponAmount}</p>
//                   <p className="text-sm text-gray-600">Usage Limit: {scannedData.couponUsageLimit}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="w-full md:w-1/2 md:pr-4 md:order-1">
//               <table className="w-full border-collapse border border-gray-300 text-left">
//                 <tbody>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
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
//                     <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                   </tr>
//                   <tr className="border-b border-gray-300">
//                     <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                     <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <div className="mt-6">
//           <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
//           <input
//             type="text"
//             value={redeemAmount ? `$${redeemAmount}` : `$`}
//             onChange={onRedeemAmountChange}
//             className={`w-full p-3 border ${
//               error ? "border-red-500" : "border-gray-300"
//             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             placeholder="Enter amount"
//           />
//           {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//         </div>

//         <button
//           onClick={onRedeemClick}
//           disabled={loading}
//           className={`w-full font-bold py-3 rounded-lg mt-4 transition-all ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
//           }`}
//         >
//           {loading ? "Processing..." : "Redeem"}
//         </button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CustomerDetailsDialog;  

import React from 'react';
import { getCurrentCurrency } from "../../utils/currencyUtils";

// const CustomerDetailsDialog = ({
//   open,
//   onClose,
//   scannedData,
//   redeemAmount,
//   onRedeemAmountChange,
//   onRedeemClick,
//   error,
//   loading,
// }) => {
  const CustomerDetailsDialog = ({
    open,
    onClose,
    scannedData,
    // redeemAmount,
    // onRedeemAmountChange,
    couponAmount,
    setCouponAmount,
    referralAmount,
    setReferralAmount,
    couponError,
    referralError,
    onRedeemClick,
    onApplyCoupon,
    applications,
    // error,
    couponLoading,
    referralLoading,
  }) => {
  if (!open) return null; // Prevent rendering when not open
  const currency = getCurrentCurrency();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* <div className="bg-white rounded-2xl w-full max-w-[600px] border border-purple-300 shadow-xl p-0 overflow-hidden"> */}
      <div className="bg-white rounded-2xl w-full max-w-[600px] h-[90vh] border border-purple-300 shadow-xl p-0 overflow-hidden flex flex-col">
        
        {/* Title */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
          Customer Details
        </div>

        {/* Content */}
        {/* <div className="p-6 bg-white"> */}
        <div className="p-6 bg-white overflow-y-auto flex-1">
          {scannedData && (
            <div className="flex flex-col md:flex-row">
              
              {/* Right Section - Balance */}
              <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
                <div className="text-center">
                  {/* <p className="text-lg font-semibold text-gray-700 mb-2">Available Balance</p>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
                    {currency.symbol}{scannedData.availableBalance.toFixed(2)}
                  </div> */}
                  {applications.includes("Referral") && 
                    scannedData?.referralCode &&
                    scannedData?.referralCode !== "None" && (
                    <>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Available Balance
                      </p>

                      <div className="text-4xl font-bold text-blue-600 mb-4">
                        {currency.symbol}
                        {scannedData.availableBalance.toFixed(2)}
                      </div>
                    </>
                  )}
                  {/* <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Coupon Amount: {currency.symbol}{scannedData.couponAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      Usage Limit: {scannedData.couponUsageLimit}
                    </p>
                  </div> */}
                  {applications.includes("Coupon") && 
                    scannedData?.couponCode && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        Coupon Amount: {currency.symbol}
                        {scannedData.couponAmount}
                      </p>

                      <p className="text-sm text-gray-600">
                        Usage Limit: {scannedData.couponUsageLimit}
                      </p>
                      <p className="text-sm text-gray-600">
                        Usage Left: {scannedData.usageLeft}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Left Section - Table */}
              <div className="w-full md:w-1/2 md:pr-4 md:order-1">
                <table className="w-full border-collapse border border-gray-300 text-left">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
                    </tr>
                    {/* <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
                      <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
                    </tr> */}
                    {applications.includes("Coupon") && 
                      scannedData?.couponCode && (
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4 font-semibold text-gray-700">
                          Coupon Code:
                        </td>

                        <td className="py-2 px-4 text-gray-600">
                          {scannedData.couponCode || "N/A"}
                        </td>
                      </tr>
                    )}

                    {applications.includes("Referral") && 
                      scannedData?.referralCode &&
                      scannedData?.referralCode !== "None" && (
                      <tr className="border-b border-gray-300">
                        <td className="py-2 px-4 font-semibold text-gray-700">
                          Referral Code:
                        </td>

                        <td className="py-2 px-4 text-gray-600">
                          {scannedData.referralCode || "N/A"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Redeem Amount */}
          {/* <div className="mt-6">
            <p className="text-sm font-semibold text-gray-600">Redeem Amount</p>
            <input
              type="text"
              value={redeemAmount ? `${currency.symbol}${redeemAmount}` : `${currency.symbol}`}
              onChange={onRedeemAmountChange}
              className={`w-full p-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter amount"
            />
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          <button
            onClick={onRedeemClick}
            disabled={loading}
            className={`w-full font-bold py-3 rounded-lg mt-4 transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {loading ? 'Processing...' : 'Redeem'}
          </button> */}

          <div className="mt-6 flex flex-row gap-3">

            {/* Coupon Section */}
            {applications.includes("Coupon") && 
              scannedData?.couponCode && (
              <div className="border p-4 rounded-lg bg-yellow-50">

                <h3 className="font-semibold mb-2">
                  Apply Coupon
                </h3>

                <input
                  type="text"
                  // value={
                  //   redeemAmount
                  //     ? `${currency.symbol}${redeemAmount}`
                  //     : `${currency.symbol}`
                  // }
                  // onChange={onRedeemAmountChange}
                  value={couponAmount}
                  onChange={(e) => setCouponAmount(e.target.value)}
                  className={`w-full p-2 border ${
                    couponError ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  placeholder="Enter purchase amount"
                />

                <button
                  onClick={onApplyCoupon}
                  disabled={couponLoading}
                  className="w-full font-bold py-1.5 rounded-full mt-4 bg-yellow-500 text-white"
                >
                  {couponLoading ? "Processing..." : "Apply Coupon"}
                </button>
                {couponError && (
                  <p className="text-sm text-red-500 mt-2">
                    {couponError}
                  </p>
                )}
              </div>
            )}

            {/* Referral Section */}
            {applications.includes("Referral") && 
              scannedData?.referralCode &&
              scannedData?.referralCode !== "None" && (
              <div className="border p-4 rounded-lg bg-green-50">

                <h3 className="font-semibold mb-2">
                  Redeem Discount
                </h3>

                <input
                  type="text"
                  // value={
                  //   redeemAmount
                  //     ? `${currency.symbol}${redeemAmount}`
                  //     : `${currency.symbol}`
                  // }
                  // onChange={onRedeemAmountChange}
                  value={referralAmount}
                  onChange={(e) => setReferralAmount(e.target.value)}
                  className={`w-full p-2 border ${
                    referralError ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  placeholder="Enter redeem amount"
                />

                <button
                  onClick={onRedeemClick}
                  disabled={referralLoading}
                  className="w-full font-bold py-1.5 rounded-full mt-4 bg-green-600 text-white"
                >
                  {referralLoading ? "Processing..." : "Redeem"}
                </button>
                {referralError && (
                  <p className="text-sm text-red-500 mt-2">
                    {referralError}
                  </p>
                )}
              </div>             
            )}

            {/* {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )} */}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-semibold shadow-sm transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsDialog;
