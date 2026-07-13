// import React from 'react';
// import { getCurrentCurrency } from "../../utils/currencyUtils";

//   const CustomerDetailsDialog = ({
//     open,
//     onClose,
//     scannedData,
//     couponAmount,
//     setCouponAmount,
//     referralAmount,
//     setReferralAmount,
//     couponError,
//     referralError,
//     onRedeemClick,
//     onApplyCoupon,
//     applications,
//     couponLoading,
//     referralLoading,
//   }) => {
//   if (!open) return null;
//   const currency = getCurrentCurrency();

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl w-full max-w-[600px] h-[90vh] border border-purple-300 shadow-xl p-0 overflow-hidden flex flex-col">
        
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </div>

//         <div className="p-6 bg-white overflow-y-auto flex-1">
//           {scannedData && (
//             <div className="flex flex-col md:flex-row">
              
//               <div className="w-full md:w-1/2 md:pl-4 md:order-2 mb-6 md:mb-0 flex flex-col items-center justify-center md:border-l md:border-gray-200">
//                 <div className="text-center">
//                   {applications.includes("Referral") && 
//                     scannedData?.referralCode && (
//                     <>
//                       <p className="text-lg font-semibold text-gray-700 mb-2">
//                         Available Balance
//                       </p>

//                       <div className="text-4xl font-bold text-blue-600 mb-4">
//                         {currency.symbol}
//                         {scannedData.availableBalance.toFixed(2)}
//                       </div>
//                     </>
//                   )}

//                   {applications.includes("Coupon") && 
//                     scannedData?.couponCode && (
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <p className="text-sm text-gray-600 mb-1">
//                         Coupon Amount: {currency.symbol}
//                         {scannedData.couponAmount}
//                       </p>

//                       <p className="text-sm text-gray-600">
//                         Usage Limit: {scannedData.couponUsageLimit}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Usage Left: {scannedData.usageLeft}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Left Section - Table */}
//               <div className="w-full md:w-1/2 md:pr-4 md:order-1">
//                 <table className="w-full border-collapse border border-gray-300 text-left">
//                   <tbody>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Shop Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.shopName}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                     </tr>
                    
//                     {applications.includes("Coupon") && 
//                       scannedData?.couponCode && (
//                       <tr className="border-b border-gray-300">
//                         <td className="py-2 px-4 font-semibold text-gray-700">
//                           Coupon Code:
//                         </td>

//                         <td className="py-2 px-4 text-gray-600">
//                           {scannedData.couponCode || "N/A"}
//                         </td>
//                       </tr>
//                     )}

//                     {applications.includes("Referral") && 
//                       scannedData?.referralCode && (
//                       <tr className="border-b border-gray-300">
//                         <td className="py-2 px-4 font-semibold text-gray-700">
//                           Referred User Code:
//                         </td>

//                         <td className="py-2 px-4 text-gray-600">
//                           {scannedData?.referralCode === "None"
//                             ? "Shopkeeper"
//                             : scannedData?.referralCode || "N/A"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <div className="mt-6 flex flex-row gap-3">

//             {/* Coupon Section */}
//             {applications.includes("Coupon") && 
//               scannedData?.couponCode && (
//               <div className="border p-4 rounded-lg bg-yellow-50">

//                 <h3 className="font-semibold mb-2">
//                   Purchase amount
//                 </h3>

//                 <input
//                   type="text"
//                   value={couponAmount}
//                   onChange={(e) => setCouponAmount(e.target.value)}
//                   className={`w-full p-2 border ${
//                     couponError ? "border-red-500" : "border-gray-300"
//                   } rounded-lg`}
//                   placeholder="Enter purchase amount"
//                 />

//                 <button
//                   onClick={onApplyCoupon}
//                   disabled={couponLoading}
//                   className="w-full font-bold py-1.5 rounded-full mt-4 bg-yellow-500 text-white"
//                 >
//                   {couponLoading ? "Processing..." : "Apply Coupon"}
//                 </button>
//                 {couponError && (
//                   <p className="text-sm text-red-500 mt-2">
//                     {couponError}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Referral Section */}
//             {applications.includes("Referral") && 
//               scannedData?.referralCode && (
//               <div className="border p-4 rounded-lg bg-green-50">

//                 <h3 className="font-semibold mb-2">
//                   Redeem Discount
//                 </h3>

//                 <input
//                   type="text"
//                   value={referralAmount}
//                   onChange={(e) => setReferralAmount(e.target.value)}
//                   className={`w-full p-2 border ${
//                     referralError ? "border-red-500" : "border-gray-300"
//                   } rounded-lg`}
//                   placeholder="Enter redeem amount"
//                 />

//                 <button
//                   onClick={onRedeemClick}
//                   disabled={referralLoading}
//                   className="w-full font-bold py-1.5 rounded-full mt-4 bg-green-600 text-white"
//                 >
//                   {referralLoading ? "Processing..." : "Redeem"}
//                 </button>
//                 {referralError && (
//                   <p className="text-sm text-red-500 mt-2">
//                     {referralError}
//                   </p>
//                 )}
//               </div>             
//             )}

//           </div>

//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="mt-4 w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-semibold shadow-sm transition-all duration-200"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetailsDialog;




// import React from 'react';
// import { getCurrentCurrency } from "../../utils/currencyUtils";

// const CustomerDetailsDialog = ({
//   open,
//   onClose,
//   scannedData,
//   couponPurchaseAmount,
//   setCouponPurchaseAmount,
//   referralPurchaseAmount,
//   setReferralPurchaseAmount,
//   referralRedeemAmount,
//   setReferralRedeemAmount,
//   couponError,
//   referralError,
//   onCouponSubmit,
//   onReferralSubmit,
//   applications,
//   couponLoading,
//   referralLoading,
// }) => {
//   if (!open) return null;
//   const currency = getCurrentCurrency();

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-xl w-full max-w-[700px] h-[90vh] border border-purple-300 shadow-xl p-0 overflow-hidden flex flex-col">
        
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-xl font-bold py-4">
//           Customer Details
//         </div>

//         <div className="p-6 bg-white overflow-y-auto flex-1">
//           {scannedData && (
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Customer Info */}
//               <div className="w-full md:w-1/2">
//                 <table className="w-full border-collapse border border-gray-300 text-left">
//                   <tbody>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Customer ID:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.customerId}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Name:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.name}</td>
//                     </tr>
//                     <tr className="border-b border-gray-300">
//                       <td className="py-2 px-4 font-semibold text-gray-700">Phone:</td>
//                       <td className="py-2 px-4 text-gray-600">{scannedData.phone}</td>
//                     </tr>
//                     {applications.includes("Coupon") && scannedData?.couponCode && (
//                       <>
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Coupon Code:</td>
//                           <td className="py-2 px-4 text-gray-600">{scannedData.couponCode}</td>
//                         </tr>
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Coupon Amount:</td>
//                           <td className="py-2 px-4 text-gray-600">{currency.symbol}{scannedData.couponAmount}</td>
//                         </tr> 
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Coupon Usage Limit:</td>
//                           <td className="py-2 px-4 text-gray-600">{scannedData.couponUsageLimit}</td> 
//                         </tr>
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Coupon Usage Left:</td>
//                           <td className="py-2 px-4 text-gray-600">{scannedData.usageLeft}</td>
//                         </tr>
//                       </>
//                     )}
//                     {applications.includes("Referral") && scannedData?.referralCode && (
//                       <>
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Available Balance:</td>
//                           <td className="py-2 px-4 text-gray-600">{currency.symbol}{scannedData.availableBalance}</td>
//                         </tr>
//                         <tr className="border-b border-gray-300">
//                           <td className="py-2 px-4 font-semibold text-gray-700">Referral Code:</td>
//                           <td className="py-2 px-4 text-gray-600">{scannedData.referralCode}</td>
//                         </tr> 
//                       </>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           <div className="mt-8 flex flex-col lg:flex-row gap-6">
//             {/* ================= REFERRAL CARD ================= */}
//             {applications.includes("Referral") && scannedData?.referralCode && (
//               <div className="flex-1 border p-5 rounded-2xl bg-green-50">
//                 <h3 className="font-bold text-lg mb-4">Referral</h3>
                
//                 <input
//                   type="number"
//                   value={referralPurchaseAmount}
//                   onChange={(e) => setReferralPurchaseAmount(e.target.value)}
//                   placeholder="Enter Purchase Amount"
//                   className="w-full p-3 border rounded-lg mb-3"
//                 />

//                 <input
//                   type="number"
//                   value={referralRedeemAmount}
//                   onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                   placeholder="Enter Redeem Amount"
//                   className="w-full p-3 border rounded-lg mb-4"
//                 />

//                 <button
//                   onClick={onReferralSubmit}
//                   disabled={referralLoading}
//                   className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full"
//                 >
//                   {referralLoading ? "Processing..." : "Submit Referral"}
//                 </button>
//                 {referralError && <p className="text-red-500 text-sm mt-3">{referralError}</p>}
//               </div>
//             )}

//             {/* ================= COUPON CARD ================= */}
//             {applications.includes("Coupon") && scannedData?.couponCode && (
//               <div className="flex-1 border p-5 rounded-2xl bg-yellow-50">
//                 <h3 className="font-bold text-lg mb-4">Coupon</h3>
                
//                 <input
//                   type="number"
//                   value={couponPurchaseAmount}
//                   onChange={(e) => setCouponPurchaseAmount(e.target.value)}
//                   placeholder="Enter Purchase Amount"
//                   className="w-full p-3 border rounded-lg mb-4"
//                 />

//                 <button
//                   onClick={onCouponSubmit}
//                   disabled={couponLoading}
//                   className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full"
//                 >
//                   {couponLoading ? "Processing..." : "Submit Coupon"}
//                 </button>

//                 {couponError && <p className="text-red-500 text-sm mt-3">{couponError}</p>}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="m-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-semibold shadow-sm"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetailsDialog;










import React from 'react';
import { getCurrentCurrency } from "../../utils/currencyUtils";

// const CustomerDetailsDialog = ({
//   open,
//   onClose,
//   scannedData,
//   couponPurchaseAmount,
//   setCouponPurchaseAmount,
//   referralPurchaseAmount,
//   setReferralPurchaseAmount,
//   referralRedeemAmount,
//   setReferralRedeemAmount,
//   couponError,
//   referralError,
//   onCouponSubmit,
//   onReferralSubmit,
//   applications,
//   couponLoading,
//   referralLoading,
// }) => {

  const CustomerDetailsDialog = ({
    open,
    onClose,
    scannedData,
    purchaseAmount,
    setPurchaseAmount,
    referralRedeemAmount,
    setReferralRedeemAmount,
    couponError,
    referralError,
    onCouponSubmit,
    onReferralSubmit,
    applications,
    couponLoading,
    referralLoading,
    redeemLoading,
    hasBothApplications,
    hasReferral,
    hasCoupon,
    showTransactionTypeModal,
    setShowTransactionTypeModal,
    selectedTransactionType,
    setSelectedTransactionType,
    handleContinueTransaction,
    handleTransactionSelection,
    showReferralPopup,
    setShowReferralPopup,
    showRedeemChoiceModal,
    setShowRedeemChoiceModal,
    redeemOption,
    setRedeemOption,
    tempPurchaseAmount,
    handleCombinedCouponRedeem,
    // currency,
  }) => {
  if (!open) return null;
  const currency = getCurrentCurrency();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white rounded-lg w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer Profile Dashboard</h2>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Verify scanned credentials and authorize benefits</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl transition p-1"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Container Workspace */}
        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white flex-1">
          
          {/* Left Column: Visual Data Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            {scannedData && (
              <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-6 relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-slate-200/60 flex items-center justify-center mb-4 text-slate-700 font-bold text-lg">
                  {scannedData.name ? scannedData.name.charAt(0).toUpperCase() : "C"}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{scannedData.name || "N/A"}</h3>
                
                <div className="space-y-3.5 text-xs font-medium text-slate-600">
                  {/* <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Customer Name</span>
                    <span className="text-slate-800 font-mono text-sm">{scannedData.name || "—"}</span>
                  </div> */}
                  <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Phone Number</span>
                    <span className="text-slate-800 text-sm">{scannedData.phone || "—"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Customer Email</span>
                    <span className="text-slate-800 text-sm">{scannedData.email || "—"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* App Context Metrics */}
            <div className="space-y-3">
              {applications.includes("Referral") && scannedData?.referralCode && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider">Available Balance</span>
                    <span className="text-lg font-black text-emerald-800">{currency.symbol}{scannedData.availableBalance}</span>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40">
                    {scannedData.referralCode}
                  </span>
                </div>
              )}

              {applications.includes("Coupon") && scannedData?.couponCode && (
                <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-4 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-amber-200/30 pb-2">
                    <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Active</span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {scannedData.couponCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Discount</span>
                      <span className="font-extrabold text-amber-800">{currency.symbol}{scannedData.couponAmount}</span>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">Remaining Uses</span>
                      <span className="font-extrabold text-slate-800">{scannedData.usageLeft} / {scannedData.couponUsageLimit}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Action Desks */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6">

            {hasBothApplications && (
              <div className="flex-1 border border-slate-100 rounded-lg p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-800">
                      Transaction
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter purchase amount once and choose transaction type.
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Purchase Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => {
                        setPurchaseAmount(e.target.value);
                      }}
                      placeholder="Enter Purchase Amount"
                      className="w-full pl-8 pr-4 py-2.5 rounded-md border border-slate-200
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500/20
                      focus:border-indigo-500" 
                    />
                  </div>
                </div>
                <button
                  onClick={handleContinueTransaction}
                  className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-full font-semibold transition"
                >
                  Continue
                </button>
              </div>
            )}
            
            {/* Referral Workspace Panel */}
            {/* {applications.includes("Referral") && scannedData?.referralCode && ( */}
            {hasReferral && !hasCoupon && (
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
                          // value={referralPurchaseAmount}
                          // onChange={(e) => setReferralPurchaseAmount(e.target.value)}
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(e.target.value)}
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
                  onClick={onReferralSubmit}
                  disabled={referralLoading}
                  className="w-full mt-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-md shadow-slate-900/10 disabled:bg-slate-300"
                >
                  {referralLoading ? "Processing..." : "Submit Referral"}
                </button>
              </div>
            )}

            {/* Coupon Workspace Panel */}
            {/* {applications.includes("Coupon") && scannedData?.couponCode && ( */}
            {hasCoupon && !hasReferral && (
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
                        // value={couponPurchaseAmount}
                        // onChange={(e) => setCouponPurchaseAmount(e.target.value)}
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {couponError && <p className="text-xs font-semibold text-rose-500 mt-2">{couponError}</p>}

                <button
                  onClick={onCouponSubmit}
                  disabled={couponLoading}
                  className="w-full mt-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10"
                >
                  {couponLoading ? "Processing..." : "Submit Coupon"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Panel Actions */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
          >
            Dismiss Profile
          </button>
        </div>
      </div>
      {/* Transaction Type Modal - Rendered here since dialog is open */}
      {showTransactionTypeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="border-b px-6 py-5">
              <h2 className="text-xl font-bold text-slate-800">
                Choose Transaction
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select how you want to process this purchase.
              </p>
            </div>
            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Purchase */}
              <div className="rounded-md border bg-slate-50 p-3">
                <p className="text-xs uppercase font-bold text-slate-500">
                  Purchase Amount
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {currency.symbol}
                  {purchaseAmount}
                </h3>
              </div>
              {/* Referral */}
              <label
                className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition ${
                  selectedTransactionType === "referral"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <h3 className="font-bold text-slate-800">
                    Referral
                  </h3>
                  <p className="text-sm text-slate-500">
                    Redeem customer referral balance.
                  </p>
                </div>
                <input
                  type="radio"
                  checked={selectedTransactionType === "referral"}
                  onChange={() => setSelectedTransactionType("referral")}
                />
              </label>
              {/* Coupon */}
              <label
                className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition ${
                  selectedTransactionType === "coupon"
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200"
                }`}
              >
                <div>
                  <h3 className="font-bold text-slate-800">
                    Coupon
                  </h3>
                  <p className="text-sm text-slate-500">
                    Apply available coupon discount.
                  </p>
                </div>
                <input
                  type="radio"
                  checked={selectedTransactionType === "coupon"}
                  onChange={() => setSelectedTransactionType("coupon")}
                />
              </label>
            </div>
            {/* Footer */}
            <div className="border-t px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowTransactionTypeModal(false);
                  setSelectedTransactionType("");
                }}
                className="flex-1 py-2 rounded-full border border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleTransactionSelection}
                className="flex-1 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Popup Modal */}
      {showReferralPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                Referral Transaction
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Complete referral balance redemption.
              </p>
            </div>
            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Purchase Amount */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Purchase Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    value={purchaseAmount}
                    readOnly
                    className="w-full pl-8 pr-4 py-2 rounded-md border bg-slate-100 cursor-not-allowed"
                  />
                </div>
              </div>
              {/* Available Balance */}
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs uppercase font-bold text-emerald-700">
                  Available Referral Balance
                </p>
                <h3 className="text-3xl font-black text-emerald-700 mt-2">
                  {currency.symbol}
                  {scannedData.availableBalance}
                </h3>
              </div>
              {/* Redeem Amount */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Redeem Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    value={referralRedeemAmount}
                    onChange={(e) => {
                      setReferralRedeemAmount(e.target.value);
                    }}
                    placeholder="Enter redeem amount"
                    className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>
              </div>
              {/* Error */}
              {referralError && (
                <div className="text-sm text-red-600 font-medium">
                  {referralError}
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="border-t px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  setShowReferralPopup(false);
                  // reset amounts if needed
                }}
                className="flex-1 py-2 rounded-full border border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={onReferralSubmit}
                disabled={referralLoading}
                className="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:bg-slate-300"
              >
                {referralLoading ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Choice Modal for Combined */}
      {showRedeemChoiceModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-slate-100 transform scale-100 transition-all">
            
            <h2 className="text-xl font-black text-slate-900 tracking-tight text-center mb-1">Complete Transaction</h2>
            <p className="text-xs font-medium text-slate-500 text-center mb-5">Select a balance settlement configuration method</p>

            {/* Coupon Information Banner */}
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
                <span className="text-xs font-medium text-slate-500">Deduct max possible: <strong className="text-emerald-700 font-bold">{currency.symbol}{scannedData?.availableBalance || 0}</strong></span>
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

            {referralError && <p className="text-xs font-semibold text-rose-500 mt-3">{referralError}</p>}

            {/* Bottom Control Actions */}
            <div className="flex gap-3.5 mt-6">
              <button 
                onClick={() => setShowRedeemChoiceModal(false)} 
                className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCombinedCouponRedeem}
                disabled={redeemLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-lg shadow-slate-950/10 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                {redeemLoading ? "Processing..." : "Confirm Transaction"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsDialog;