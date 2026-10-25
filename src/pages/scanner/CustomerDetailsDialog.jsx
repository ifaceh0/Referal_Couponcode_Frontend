// import React from 'react';
// import { getCurrentCurrency } from "../../utils/currencyUtils";

//   const CustomerDetailsDialog = ({
//     open,
//     onClose,
//     scannedData,
//     purchaseAmount,
//     setPurchaseAmount,
//     referralRedeemAmount,
//     setReferralRedeemAmount,
//     couponError,
//     referralError,
//     applications,
//     couponLoading,
//     referralLoading,
//     redeemLoading,
//     hasBothApplications,
//     hasReferral,
//     hasCoupon,
//     applyCoupon,
//     setApplyCoupon,
//     applyReferral,
//     setApplyReferral,
//     referralType,
//     setReferralType,
//     onSubmitTransaction,
//     onReferralSubmit,
//     onCouponSubmit,
//   }) => {
//   if (!open) return null;
//   const currency = getCurrentCurrency();
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
//       <div className="bg-white rounded-xl w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        
//         {/* Header */}
//         <div className="px-4 sm:px-6 md:px-8 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//           <div>
//             <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
//               Customer Profile Dashboard
//             </h2>
//             {/* <p className="text-xs font-medium text-slate-500 mt-0.5">Verify scanned credentials and authorize benefits</p> */}
//           </div>
//           <button 
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 text-2xl transition p-1 leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Scrollable Container Workspace */}
//         <div className="p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 bg-white flex-1">
          
//           {/* Left Column: Visual Data Profile Card */}
//           <div className="col-span-1 lg:col-span-4 w-full space-y-4 sm:space-y-6">
//             {/* Customer Profile Info Card */}
//             {scannedData && (
//               <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-4 sm:p-5 relative overflow-hidden">
//                 <div className="flex items-center gap-3 mb-3 sm:mb-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200/60 flex items-center justify-center shrink-0 text-slate-700 font-bold text-base sm:text-lg">
//                     {scannedData.name ? scannedData.name.charAt(0).toUpperCase() : "C"}
//                   </div>
//                   <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
//                     {scannedData.name || "N/A"}
//                   </h3>
//                 </div>
                
//                 <div className="space-y-0 sm:space-y-3 gap-6 sm:gap-0 text-xs flex flex-row sm:flex-col font-medium text-slate-600">
//                   <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                     <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
//                       Phone Number
//                     </span>
//                     <span className="text-slate-800 text-sm truncate">
//                       {scannedData.phone || "—"}
//                     </span>
//                   </div>
//                   <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                     <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
//                       Customer Email
//                     </span>
//                     <span className="text-slate-800 text-sm break-all">
//                       {scannedData.email || "—"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* App Context Metrics */}
//             <div className="space-y-3">
//               {/* Referral Card */}
//               {applications.includes("Referral") && scannedData?.referralCode && (
//                 <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3.5 sm:p-4 flex justify-between items-center gap-2">
//                   <div className="min-w-0">
//                     <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider truncate">
//                       Available Balance
//                     </span>
//                     <span className="text-base sm:text-lg font-black text-emerald-800 truncate block">
//                       {currency.symbol}{scannedData.availableBalance}
//                     </span>
//                   </div>
//                   <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40 shrink-0 ml-2">
//                     {scannedData.referralCode}
//                   </span>
//                 </div>
//               )}

//               {/* Coupon Card */}
//               {applications.includes("Coupon") && scannedData?.couponCode && (
//                 <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5 sm:p-4 space-y-2.5">
//                   <div className="flex justify-between items-center border-b border-amber-200/30 pb-2 gap-2">
//                     <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider truncate">
//                       Coupon Active
//                     </span>
//                     <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
//                       {scannedData.couponCode}
//                     </span>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-2 text-center text-xs">
//                     <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                       <span className="block text-[9px] text-slate-400 uppercase font-bold">
//                         Discount
//                       </span>
//                       <span className="font-extrabold text-amber-800 text-xs sm:text-sm truncate block">
//                         {currency.symbol}{scannedData.couponAmount}
//                       </span>
//                     </div>
//                     <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                       <span className="block text-[9px] text-slate-400 uppercase font-bold">
//                         Remaining Uses
//                       </span>
//                       <span className="font-extrabold text-slate-800 text-xs sm:text-sm truncate block">
//                         {scannedData.usageLeft} / {scannedData.couponUsageLimit}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Dynamic Action Desks */}
//           <div className="col-span-1 lg:col-span-8 flex flex-col justify-start gap-4 sm:gap-6">

//             {/* Both Applications Active Panel */}
//             {hasBothApplications && (
//               <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm flex flex-col justify-between">
//                 <div>
//                   {/* Header */}
//                   <div className="flex items-center gap-3 mb-4 sm:mb-6">
//                     <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
//                     <div>
//                       <h3 className="font-extrabold text-base sm:text-lg text-slate-800">Transaction</h3>
//                       {/* <p className="text-xs text-slate-500">
//                         Process coupon and referral in a single transaction.
//                       </p> */}
//                     </div>
//                   </div>

//                   {/* Purchase Amount */}
//                   <div className="mb-4 sm:mb-5">
//                     <label className="block text-xs sm:text-sm font-semibold text-slate-600 mb-1.5 sm:mb-2">
//                       Enter Purchase Amount
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
//                         {currency.symbol}
//                       </span>
//                       <input
//                         type="number"
//                         value={purchaseAmount}
//                         onChange={(e) => {
//                           setPurchaseAmount(e.target.value);
//                         }}
//                         className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
//                         placeholder="Enter purchase amount"
//                       />
//                     </div>
//                   </div>

//                   {/* Coupon Checkbox */}
//                   <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 mb-3 sm:mb-4 bg-white">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={applyCoupon}
//                         onChange={(e) => setApplyCoupon(e.target.checked)}
//                         className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
//                       />
//                       <span className="font-semibold text-xs text-slate-800">Apply Coupon</span>
//                     </label>
//                     {applyCoupon && (
//                       <div className="mt-3 bg-amber-50/80 border border-amber-100 rounded-md p-2 sm:p-2.5 text-xs">
//                         <div className="flex justify-between items-center">
//                           <span className="text-slate-600 font-medium">Coupon Discount</span>
//                           <span className="font-bold text-amber-800">{currency.symbol}{scannedData.couponAmount}</span>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Referral Checkbox + Options */}
//                   <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 bg-white">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={applyReferral}
//                         onChange={(e) => {
//                           setApplyReferral(e.target.checked);
//                           if (!e.target.checked) {
//                             setReferralType("");
//                             setReferralRedeemAmount("");
//                           }
//                         }}
//                         className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
//                       />
//                       <span className="font-semibold text-xs text-slate-800">Redeem Available Balance</span>
//                     </label>

//                     {applyReferral && (
//                       <>
//                         <div className="mt-3 bg-emerald-50/80 border border-emerald-100 rounded-md p-2 sm:p-2.5 text-xs">
//                           <div className="flex justify-between items-center">
//                             <span className="text-slate-600 font-medium">Available Balance</span>
//                             <span className="font-bold text-emerald-800">{currency.symbol}{scannedData.availableBalance}</span>
//                           </div>
//                         </div>

//                         <div className="mt-3 flex flex-row gap-6 text-xs">
//                           <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
//                             <input
//                               type="radio"
//                               checked={referralType === "full"}
//                               onChange={() => setReferralType("full")}
//                               className="text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <span>Use Full Balance</span>
//                           </label>
//                           <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
//                             <input
//                               type="radio"
//                               checked={referralType === "partial"}
//                               onChange={() => setReferralType("partial")}
//                               className="text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <span>Use Partial Balance</span>
//                           </label>
//                         </div>

//                         {referralType === "partial" && (
//                           <div className="mt-3">
//                             <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Amount</label>
//                             <div className="relative">
//                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
//                                 {currency.symbol}
//                               </span>
//                               <input
//                                 type="number"
//                                 value={referralRedeemAmount}
//                                 onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                                 className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
//                                 placeholder="Enter amount"
//                                 min={0}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>

//                   {/* Total Discount Summary */}
//                   <div className="mt-5 border-t border-slate-200 pt-4 text-xs sm:text-sm">
//                     <h4 className="font-bold text-slate-800 mb-2.5">Total Discount</h4>
//                     <div className="flex justify-between text-slate-600 mb-1.5">
//                       <span>Redeem Coupon</span>
//                       <span className="font-semibold text-slate-800">
//                         {applyCoupon ? `${currency.symbol}${scannedData.couponAmount}` : `${currency.symbol}0`}
//                       </span>
//                     </div>
//                     <div className="flex justify-between text-slate-600">
//                       <span>Redeem Balance</span>
//                       <span className="font-semibold text-slate-800">
//                         {applyReferral
//                           ? referralType === "full"
//                             ? `${currency.symbol}${scannedData.availableBalance}`
//                             : `${currency.symbol}${referralRedeemAmount || 0}`
//                           : `${currency.symbol}0`}
//                       </span>
//                     </div>
//                   </div>

//                   {(couponError || referralError) && (
//                     <p className="text-rose-500 text-xs font-semibold mt-3">{couponError || referralError}</p>
//                   )}
//                 </div>

//                 <button
//                   onClick={onSubmitTransaction}
//                   disabled={couponLoading || referralLoading || redeemLoading}
//                   className="w-auto self-end px-8 py-2.5 mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
//                 >
//                   {couponLoading || referralLoading || redeemLoading ? "Processing..." : "Submit Transaction"}
//                 </button>
//               </div>
//             )}
            
//             {/* Referral Only Workspace Panel */}
//             {hasReferral && !hasCoupon && (
//               <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
//                     <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
//                       Transaction
//                     </h3>
//                   </div>

//                   <div className="space-y-3.5">
//                     <div>
//                       <label className="block text-xs font-bold text-slate-500 mb-1">
//                         Enter Purchase Amount
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                           {currency.symbol}
//                         </span>
//                         <input
//                           type="number"
//                           value={purchaseAmount}
//                           onChange={(e) => setPurchaseAmount(e.target.value)}
//                           placeholder="0.00"
//                           className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
//                           min={0}
//                         />
//                       </div>
//                     </div>

//                     {Number(scannedData?.availableBalance) > 0 && (
//                       <>
//                         <div className="mt-4 text-xs flex flex-row gap-6 sm:text-sm">
//                           <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
//                             <input
//                               type="radio"
//                               checked={referralType === "full"}
//                               onChange={() => {
//                                 setReferralType("full");
//                                 setReferralRedeemAmount("");
//                               }}
//                               className="text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <span>Use Full Balance</span>
//                           </label>
//                           <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
//                             <input
//                               type="radio"
//                               checked={referralType === "partial"}
//                               onChange={() => setReferralType("partial")}
//                               className="text-emerald-600 focus:ring-emerald-500"
//                             />
//                             <span>Use Partial Balance</span>
//                           </label>
//                         </div>

//                         {referralType === "partial" && (
//                           <div className="mt-3">
//                             <label className="block text-xs font-bold text-slate-500 mb-1">Enter Redeem Balance</label>
//                             <div className="relative">
//                               <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                                 {currency.symbol}
//                               </span>
//                               <input
//                                 type="number"
//                                 value={referralRedeemAmount}
//                                 onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                                 className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
//                                 placeholder="0.00"
//                                 min={0}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {referralError && (
//                   <p className="text-xs font-semibold text-rose-500 mt-2">{referralError}</p>
//                 )}

//                 <button
//                   onClick={onReferralSubmit}
//                   disabled={referralLoading || redeemLoading}
//                   className="w-auto self-end px-8 py-2.5 mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
//                 >
//                   {referralLoading || redeemLoading ? "Processing..." : "Submit"}
//                 </button>
//               </div>
//             )}

//             {/* Coupon Only Workspace Panel */}
//             {hasCoupon && !hasReferral && (
//               <div className="border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col gap-3">
//                 <div className="flex items-center gap-2 shrink-0">
//                   <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
//                   <h3 className="font-extrabold text-base text-slate-800 tracking-tight whitespace-nowrap">
//                     Transaction
//                   </h3>
//                 </div>

//                 {/* Single Row Flex Container (Stacked on mobile, row on tablet/desktop) */}
//                 <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full">
//                   {/* Input Field Block */}
//                   <div className="flex-1 w-full">
//                     <label className="block text-xs font-bold text-slate-500 mb-1">
//                       Enter Purchase Amount
//                     </label>
//                     <div className="relative">
//                       <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
//                         {currency.symbol}
//                       </span>
//                       <input
//                         type="number"
//                         value={purchaseAmount}
//                         onChange={(e) => setPurchaseAmount(e.target.value)}
//                         placeholder="0.00"
//                         className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//                         min={0}
//                       />
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={onCouponSubmit}
//                     disabled={couponLoading}
//                     className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10 shrink-0 h-[38px] flex items-center justify-center"
//                   >
//                     {couponLoading ? "Processing..." : "Submit"}
//                   </button>
//                 </div>

//                 {/* Error Message Below */}
//                 {couponError && (
//                   <p className="text-xs font-semibold text-rose-500 mt-1">{couponError}</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Panel Actions */}
//         <div className="px-4 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
//           <button 
//             onClick={onClose} 
//             className="w-full sm:w-auto px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetailsDialog;











import React from "react";
import { getCurrentCurrency } from "../../utils/currencyUtils";

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
  transactionError,
  setTransactionError,
  setCouponError,
  setReferralError,
  applications,
  couponLoading,
  referralLoading,
  redeemLoading,
  hasBothApplications,
  hasReferral,
  hasCoupon,
  applyCoupon,
  setApplyCoupon,
  applyReferral,
  setApplyReferral,
  referralType,
  setReferralType,
  onSubmitTransaction,
  onReferralSubmit,
  onCouponSubmit,
}) => {
  if (!open) return null;
  const currency = getCurrentCurrency();

  // Display value for redeem balance in Total Discount section
  const displayRedeemBalance = () => {
    if (!applyReferral) return `${currency.symbol}0`;
    if (referralType === "full")
      return `${currency.symbol}${scannedData?.availableBalance ?? 0}`;
    if (referralType === "partial")
      return `${currency.symbol}${referralRedeemAmount || 0}`;
    if (referralType === "purchase") {
      const purchase = Number(purchaseAmount || 0);
      const balance = Number(scannedData?.availableBalance) || 0;
      return `${currency.symbol}${Math.min(purchase, balance)}`;
    }
    return `${currency.symbol}0`;
  };

  const clearErrors = () => {
    if (setTransactionError) setTransactionError("");
    if (setCouponError) setCouponError("");
    if (setReferralError) setReferralError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              Customer Profile Dashboard
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl transition p-1 leading-none"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Container Workspace */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8 bg-white flex-1">
          {/* Left Column: Visual Data Profile Card */}
          <div className="col-span-1 lg:col-span-4 w-full space-y-4 sm:space-y-6">
            {/* Customer Profile Info Card */}
            {scannedData && (
              <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-4 sm:p-5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200/60 flex items-center justify-center shrink-0 text-slate-700 font-bold text-base sm:text-lg">
                    {scannedData.name ? scannedData.name.charAt(0).toUpperCase() : "C"}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {scannedData.name || "N/A"}
                  </h3>
                </div>

                <div className="space-y-0 sm:space-y-3 gap-6 sm:gap-0 text-xs flex flex-row sm:flex-col font-medium text-slate-600">
                  <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-slate-800 text-sm truncate">
                      {scannedData.phone || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                      Customer Email
                    </span>
                    <span className="text-slate-800 text-sm break-all">
                      {scannedData.email || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* App Context Metrics */}
            <div className="space-y-3">
              {/* Referral Card */}
              {applications.includes("Referral") && scannedData?.referralCode && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3.5 sm:p-4 flex justify-between items-center gap-2">
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider truncate">
                      Available Balance
                    </span>
                    <span className="text-base sm:text-lg font-black text-emerald-800 truncate block">
                      {currency.symbol}
                      {scannedData.availableBalance}
                    </span>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40 shrink-0 ml-2">
                    {scannedData.referralCode}
                  </span>
                </div>
              )}

              {/* Coupon Card */}
              {applications.includes("Coupon") && scannedData?.couponCode && (
                <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-amber-200/30 pb-2 gap-2">
                    <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider truncate">
                      Coupon Active
                    </span>
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full shrink-0">
                      {scannedData.couponCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">
                        Discount
                      </span>
                      <span className="font-extrabold text-amber-800 text-xs sm:text-sm truncate block">
                        {currency.symbol}
                        {scannedData.couponAmount}
                      </span>
                    </div>
                    <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
                      <span className="block text-[9px] text-slate-400 uppercase font-bold">
                        Remaining Uses
                      </span>
                      <span className="font-extrabold text-slate-800 text-xs sm:text-sm truncate block">
                        {scannedData.usageLeft} / {scannedData.couponUsageLimit}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Action Desks */}
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-start gap-4 sm:gap-6">
            {/* Both Applications Active Panel */}
            {hasBothApplications && (
              <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                        Transaction
                      </h3>
                    </div>
                  </div>

                  {/* Purchase Amount */}
                  <div className="mb-4 sm:mb-5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-600 mb-1.5 sm:mb-2">
                      Enter Purchase Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        value={purchaseAmount}
                        onChange={(e) => {
                          setPurchaseAmount(e.target.value);
                          clearErrors();
                        }}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                        placeholder="Enter purchase amount"
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Coupon Checkbox */}
                  <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 mb-3 sm:mb-4 bg-white">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyCoupon}
                        onChange={(e) => {
                          setApplyCoupon(e.target.checked);
                          clearErrors();
                        }}
                        className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span className="font-semibold text-xs text-slate-800">Apply Coupon</span>
                    </label>
                    {applyCoupon && (
                      <div className="mt-3 bg-amber-50/80 border border-amber-100 rounded-md p-2 sm:p-2.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Coupon Discount</span>
                          <span className="font-bold text-amber-800">
                            {currency.symbol}
                            {scannedData.couponAmount}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Referral Checkbox + Options */}
                  <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 bg-white">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyReferral}
                        onChange={(e) => {
                          setApplyReferral(e.target.checked);
                          if (!e.target.checked) {
                            setReferralType("");
                            setReferralRedeemAmount("");
                          }
                          clearErrors();
                        }}
                        className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="font-semibold text-xs text-slate-800">
                        Redeem Amount
                      </span>
                    </label>

                    {applyReferral && (
                      <>
                        <div className="mt-3 bg-emerald-50/80 border border-emerald-100 rounded-md p-2 sm:p-2.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 font-medium">Available Balance</span>
                            <span className="font-bold text-emerald-800">
                              {currency.symbol}
                              {scannedData.availableBalance}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                            <input
                              type="radio"
                              checked={referralType === "purchase"}
                              onChange={() => {
                                setReferralType("purchase");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Purchase Amount</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                            <input
                              type="radio"
                              checked={referralType === "partial"}
                              onChange={() => {
                                setReferralType("partial");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Partial Available Balance</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                            <input
                              type="radio"
                              checked={referralType === "full"}
                              onChange={() => {
                                setReferralType("full");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Full Available Balance</span>
                          </label>
                        </div>

                        {referralType === "partial" && (
                          <div className="mt-3">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Enter Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={referralRedeemAmount}
                                onChange={(e) => {
                                  setReferralRedeemAmount(e.target.value);
                                  clearErrors();
                                }}
                                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                placeholder="Enter amount"
                                min={0}
                              />
                            </div>
                          </div>
                        )}
                        {referralType === "purchase" && (
                          <div className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-600">
                            Will redeem{" "}
                            <span className="font-bold text-emerald-700">
                              {currency.symbol}
                              {Math.min(
                                Number(purchaseAmount || 0),
                                Number(scannedData?.availableBalance) || 0
                              )}
                            </span>{" "}
                            (min of purchase amount & available balance)
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Total Discount Summary */}
                  <div className="mt-5 border-t border-slate-200 pt-4 text-xs sm:text-sm">
                    <h4 className="font-bold text-slate-800 mb-2.5">Total Discount</h4>
                    <div className="flex justify-between text-slate-600 mb-1.5">
                      <span>Redeem Coupon</span>
                      <span className="font-semibold text-slate-800">
                        {applyCoupon
                          ? `${currency.symbol}${scannedData.couponAmount}`
                          : `${currency.symbol}0`}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Redeem Balance</span>
                      <span className="font-semibold text-slate-800">
                        {displayRedeemBalance()}
                      </span>
                    </div>
                  </div>

                  {(couponError || referralError || transactionError) && (
                    <p className="text-rose-500 text-xs font-semibold mt-3">
                      {couponError || referralError || transactionError}
                    </p>
                  )}
                </div>

                <button
                  onClick={onSubmitTransaction}
                  disabled={couponLoading || referralLoading || redeemLoading}
                  className="w-auto self-end px-8 py-2.5 mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
                >
                  {couponLoading || referralLoading || redeemLoading
                    ? "Processing..."
                    : "Submit Transaction"}
                </button>
              </div>
            )}

            {/* Referral Only Workspace Panel */}
            {hasReferral && !hasCoupon && (
              <div className="flex-1 border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <h3 className="font-extrabold text-base text-slate-800 tracking-tight">
                      Transaction
                    </h3>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        Enter Purchase Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                          {currency.symbol}
                        </span>
                        <input
                          type="number"
                          value={purchaseAmount}
                          onChange={(e) => {
                            setPurchaseAmount(e.target.value);
                            clearErrors();
                          }}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                          min={0}
                        />
                      </div>
                    </div>

                    {Number(scannedData?.availableBalance) > 0 && (
                      <>
                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="radio"
                              checked={referralType === "purchase"}
                              onChange={() => {
                                setReferralType("purchase");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Purchase Amount</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="radio"
                              checked={referralType === "partial"}
                              onChange={() => {
                                setReferralType("partial");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Partial Available Balance</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="radio"
                              checked={referralType === "full"}
                              onChange={() => {
                                setReferralType("full");
                                setReferralRedeemAmount("");
                                clearErrors();
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Full Available Balance</span>
                          </label>
                        </div>

                        {referralType === "partial" && (
                          <div className="mt-3">
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              Enter Amount
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={referralRedeemAmount}
                                onChange={(e) => {
                                  setReferralRedeemAmount(e.target.value);
                                  clearErrors();
                                }}
                                className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                placeholder="0.00"
                                min={0}
                              />
                            </div>
                          </div>
                        )}
                        {referralType === "purchase" && (
                          <div className="mt-2 bg-slate-50 border border-slate-200 rounded-md p-2 text-xs text-slate-600">
                            Will redeem{" "}
                            <span className="font-bold text-emerald-700">
                              {currency.symbol}
                              {Math.min(
                                Number(purchaseAmount || 0),
                                Number(scannedData?.availableBalance) || 0
                              )}
                            </span>{" "}
                            (min of purchase amount & available balance)
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {(referralError || transactionError) && (
                  <p className="text-xs font-semibold text-rose-500 mt-2">
                    {referralError || transactionError}
                  </p>
                )}

                <button
                  onClick={onReferralSubmit}
                  disabled={referralLoading || redeemLoading}
                  className="w-auto self-end px-8 py-2.5 mt-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
                >
                  {referralLoading || redeemLoading ? "Processing..." : "Submit"}
                </button>
              </div>
            )}

            {/* Coupon Only Workspace Panel */}
            {hasCoupon && !hasReferral && (
              <div className="border border-slate-100 rounded-lg p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="font-extrabold text-base text-slate-800 tracking-tight whitespace-nowrap">
                    Transaction
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      Enter Purchase Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                        {currency.symbol}
                      </span>
                      <input
                        type="number"
                        value={purchaseAmount}
                        onChange={(e) => {
                          setPurchaseAmount(e.target.value);
                          clearErrors();
                        }}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                        min={0}
                      />
                    </div>
                  </div>

                  <button
                    onClick={onCouponSubmit}
                    disabled={couponLoading}
                    className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10 shrink-0 h-[38px] flex items-center justify-center"
                  >
                    {couponLoading ? "Processing..." : "Submit"}
                  </button>
                </div>

                {(couponError || transactionError) && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">
                    {couponError || transactionError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Panel Actions */}
        <div className="px-4 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsDialog;