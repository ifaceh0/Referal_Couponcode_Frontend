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
//     onCouponSubmit,
//     onReferralSubmit,
//     applications,
//     couponLoading,
//     referralLoading,
//     redeemLoading,
//     hasBothApplications,
//     hasReferral,
//     hasCoupon,
//     showTransactionTypeModal,
//     setShowTransactionTypeModal,
//     selectedTransactionType,
//     setSelectedTransactionType,
//     handleContinueTransaction,
//     handleTransactionSelection,
//     showReferralPopup,
//     setShowReferralPopup,
//     showRedeemChoiceModal,
//     setShowRedeemChoiceModal,
//     redeemOption,
//     setRedeemOption,
//     tempPurchaseAmount,
//     handleCombinedCouponRedeem,
//   }) => {
//   if (!open) return null;
//   const currency = getCurrentCurrency();

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
//       <div className="bg-white rounded-lg w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        
//         {/* Header */}
//         <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//           <div>
//             <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer Profile Dashboard</h2>
//             <p className="text-xs font-medium text-slate-500 mt-0.5">Verify scanned credentials and authorize benefits</p>
//           </div>
//           <button 
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 text-2xl transition p-1"
//           >
//             &times;
//           </button>
//         </div>

//         {/* Scrollable Container Workspace */}
//         <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white flex-1">
          
//           {/* Left Column: Visual Data Profile Card */}
//           <div className="lg:col-span-4 space-y-6">
//             {scannedData && (
//               <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-6 relative overflow-hidden">
//                 <div className="w-12 h-12 rounded-full bg-slate-200/60 flex items-center justify-center mb-4 text-slate-700 font-bold text-lg">
//                   {scannedData.name ? scannedData.name.charAt(0).toUpperCase() : "C"}
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900 mb-4">{scannedData.name || "N/A"}</h3>
                
//                 <div className="space-y-3.5 text-xs font-medium text-slate-600">
                  
//                   <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                     <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Phone Number</span>
//                     <span className="text-slate-800 text-sm">{scannedData.phone || "—"}</span>
//                   </div>
//                   <div className="flex flex-col gap-0.5 border-b border-slate-200/50 pb-2">
//                     <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Customer Email</span>
//                     <span className="text-slate-800 text-sm">{scannedData.email || "—"}</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* App Context Metrics */}
//             <div className="space-y-3">
//               {applications.includes("Referral") && scannedData?.referralCode && (
//                 <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-4 flex justify-between items-center">
//                   <div>
//                     <span className="block text-[10px] uppercase font-bold text-emerald-700/70 tracking-wider">Available Balance</span>
//                     <span className="text-lg font-black text-emerald-800">{currency.symbol}{scannedData.availableBalance}</span>
//                   </div>
//                   <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/40">
//                     {scannedData.referralCode}
//                   </span>
//                 </div>
//               )}

//               {applications.includes("Coupon") && scannedData?.couponCode && (
//                 <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-4 space-y-2.5">
//                   <div className="flex justify-between items-center border-b border-amber-200/30 pb-2">
//                     <span className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Active</span>
//                     <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
//                       {scannedData.couponCode}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 text-center text-xs">
//                     <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                       <span className="block text-[9px] text-slate-400 uppercase font-bold">Discount</span>
//                       <span className="font-extrabold text-amber-800">{currency.symbol}{scannedData.couponAmount}</span>
//                     </div>
//                     <div className="bg-white/80 rounded-lg p-2 border border-amber-100">
//                       <span className="block text-[9px] text-slate-400 uppercase font-bold">Remaining Uses</span>
//                       <span className="font-extrabold text-slate-800">{scannedData.usageLeft} / {scannedData.couponUsageLimit}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Dynamic Action Desks */}
//           <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6">

//             {hasBothApplications && (
//               <div className="flex-1 border border-slate-100 rounded-lg p-6 bg-gradient-to-b from-white to-slate-50 shadow-sm">
//                 <div className="flex items-center gap-3 mb-6">
//                   <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
//                   <div>
//                     <h3 className="font-extrabold text-lg text-slate-800">
//                       Transaction
//                     </h3>
//                     <p className="text-xs text-slate-500">
//                       Enter purchase amount once and choose transaction type.
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-600 mb-2">
//                     Purchase Amount
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
//                       {currency.symbol}
//                     </span>
//                     <input
//                       type="number"
//                       value={purchaseAmount}
//                       onChange={(e) => {
//                         setPurchaseAmount(e.target.value);
//                       }}
//                       placeholder="Enter Purchase Amount"
//                       className="w-full pl-8 pr-4 py-2.5 rounded-md border border-slate-200
//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-indigo-500/20
//                       focus:border-indigo-500" 
//                     />
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleContinueTransaction}
//                   className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-full font-semibold transition"
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}
            
//             {/* Referral Workspace Panel */}
//             {hasReferral && !hasCoupon && (
//               <div className="flex-1 border border-slate-100 rounded-lg p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
//                     <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Referral Management</h3>
//                   </div>
                  
//                   <div className="space-y-3.5">
//                     <div>
//                       <label className="block text-xs font-bold text-slate-500 mb-1">Purchase Amount</label>
//                       <div className="relative">
//                         <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
//                         <input
//                           type="number"
//                           value={purchaseAmount}
//                           onChange={(e) => setPurchaseAmount(e.target.value)}
//                           placeholder="0.00"
//                           className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-xs font-bold text-slate-500 mb-1">Redeem Discount</label>
//                       <div className="relative">
//                         <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
//                         <input
//                           type="number"
//                           value={referralRedeemAmount}
//                           onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                           placeholder="0.00"
//                           className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {referralError && <p className="text-xs font-semibold text-rose-500 mt-2">{referralError}</p>}

//                 <button
//                   onClick={onReferralSubmit}
//                   disabled={referralLoading}
//                   className="w-full mt-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-md shadow-slate-900/10 disabled:bg-slate-300"
//                 >
//                   {referralLoading ? "Processing..." : "Submit Referral"}
//                 </button>
//               </div>
//             )}

//             {/* Coupon Workspace Panel */}
//             {hasCoupon && !hasReferral && (
//               <div className="flex-1 border border-slate-100 rounded-lg p-5 bg-gradient-to-b from-white to-slate-50/40 shadow-sm flex flex-col justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
//                     <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Coupon Processing</h3>
//                   </div>
                  
//                   <div>
//                     <label className="block text-xs font-bold text-slate-500 mb-1">Purchase Amount</label>
//                     <div className="relative">
//                       <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
//                       <input
//                         type="number"
//                         value={purchaseAmount}
//                         onChange={(e) => setPurchaseAmount(e.target.value)}
//                         placeholder="0.00"
//                         className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {couponError && <p className="text-xs font-semibold text-rose-500 mt-2">{couponError}</p>}

//                 <button
//                   onClick={onCouponSubmit}
//                   disabled={couponLoading}
//                   className="w-full mt-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10"
//                 >
//                   {couponLoading ? "Processing..." : "Submit Coupon"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Panel Actions */}
//         <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
//           <button 
//             onClick={onClose} 
//             className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-full text-sm font-medium transition shadow-sm"
//           >
//             Dismiss Profile
//           </button>
//         </div>
//       </div>
//       {/* Transaction Type Modal - Rendered here since dialog is open */}
//       {showTransactionTypeModal && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
//             {/* Header */}
//             <div className="border-b px-6 py-5">
//               <h2 className="text-xl font-bold text-slate-800">
//                 Choose Transaction
//               </h2>
//               <p className="text-sm text-slate-500 mt-1">
//                 Select how you want to process this purchase.
//               </p>
//             </div>
//             {/* Body */}
//             <div className="p-6 space-y-4">
//               {/* Purchase */}
//               <div className="rounded-md border bg-slate-50 p-3">
//                 <p className="text-xs uppercase font-bold text-slate-500">
//                   Purchase Amount
//                 </p>
//                 <h3 className="text-2xl font-black text-slate-900 mt-1">
//                   {currency.symbol}
//                   {purchaseAmount}
//                 </h3>
//               </div>
//               {/* Referral */}
//               <label
//                 className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition ${
//                   selectedTransactionType === "referral"
//                     ? "border-emerald-500 bg-emerald-50"
//                     : "border-slate-200"
//                 }`}
//               >
//                 <div>
//                   <h3 className="font-bold text-slate-800">
//                     Referral
//                   </h3>
//                   <p className="text-sm text-slate-500">
//                     Redeem customer referral balance.
//                   </p>
//                 </div>
//                 <input
//                   type="radio"
//                   checked={selectedTransactionType === "referral"}
//                   onChange={() => setSelectedTransactionType("referral")}
//                 />
//               </label>
//               {/* Coupon */}
//               <label
//                 className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition ${
//                   selectedTransactionType === "coupon"
//                     ? "border-amber-500 bg-amber-50"
//                     : "border-slate-200"
//                 }`}
//               >
//                 <div>
//                   <h3 className="font-bold text-slate-800">
//                     Coupon
//                   </h3>
//                   <p className="text-sm text-slate-500">
//                     Apply available coupon discount.
//                   </p>
//                 </div>
//                 <input
//                   type="radio"
//                   checked={selectedTransactionType === "coupon"}
//                   onChange={() => setSelectedTransactionType("coupon")}
//                 />
//               </label>
//             </div>
//             {/* Footer */}
//             <div className="border-t px-6 py-4 flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowTransactionTypeModal(false);
//                   setSelectedTransactionType("");
//                 }}
//                 className="flex-1 py-2 rounded-full border border-slate-300 hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleTransactionSelection}
//                 className="flex-1 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Referral Popup Modal */}
//       {showReferralPopup && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden">
//             {/* Header */}
//             <div className="px-6 py-5 border-b">
//               <h2 className="text-xl font-bold text-slate-800">
//                 Referral Transaction
//               </h2>
//               <p className="text-sm text-slate-500 mt-1">
//                 Complete referral balance redemption.
//               </p>
//             </div>
//             {/* Body */}
//             <div className="p-6 space-y-5">
//               {/* Purchase Amount */}
//               <div>
//                 <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
//                   Purchase Amount
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
//                     {currency.symbol}
//                   </span>
//                   <input
//                     type="number"
//                     value={purchaseAmount}
//                     readOnly
//                     className="w-full pl-8 pr-4 py-2 rounded-md border bg-slate-100 cursor-not-allowed"
//                   />
//                 </div>
//               </div>
//               {/* Available Balance */}
//               <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
//                 <p className="text-xs uppercase font-bold text-emerald-700">
//                   Available Referral Balance
//                 </p>
//                 <h3 className="text-3xl font-black text-emerald-700 mt-2">
//                   {currency.symbol}
//                   {scannedData.availableBalance}
//                 </h3>
//               </div>
//               {/* Redeem Amount */}
//               <div>
//                 <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
//                   Redeem Amount
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
//                     {currency.symbol}
//                   </span>
//                   <input
//                     type="number"
//                     value={referralRedeemAmount}
//                     onChange={(e) => {
//                       setReferralRedeemAmount(e.target.value);
//                     }}
//                     placeholder="Enter redeem amount"
//                     className="w-full pl-8 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               {/* Error */}
//               {referralError && (
//                 <div className="text-sm text-red-600 font-medium">
//                   {referralError}
//                 </div>
//               )}
//             </div>
//             {/* Footer */}
//             <div className="border-t px-6 py-4 flex gap-3">
//               <button
//                 onClick={() => {
//                   setShowReferralPopup(false);
//                   // reset amounts if needed
//                 }}
//                 className="flex-1 py-2 rounded-full border border-slate-300 hover:bg-slate-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onReferralSubmit}
//                 disabled={referralLoading}
//                 className="flex-1 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:bg-slate-300"
//               >
//                 {referralLoading ? "Processing..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Redeem Choice Modal for Combined */}
//       {showRedeemChoiceModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in">
//           <div className="bg-white rounded-lg w-full max-w-md p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-slate-100 transform scale-100 transition-all">
            
//             <h2 className="text-xl font-black text-slate-900 tracking-tight text-center mb-1">Complete Transaction</h2>
//             <p className="text-xs font-medium text-slate-500 text-center mb-5">Select a balance settlement configuration method</p>

//             {/* Coupon Information Banner */}
//             <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-5 flex justify-between items-center text-sm">
//               <div>
//                 <span className="block text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Coupon Discount Applied</span>
//                 <span className="font-black text-amber-900 text-base">{currency.symbol}{scannedData?.couponAmount || 0}</span>
//               </div>
//               <div className="text-right">
//                 <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Purchase Val</span>
//                 <span className="font-bold text-slate-700">{currency.symbol}{tempPurchaseAmount}</span>
//               </div>
//             </div>

//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Redeem from Referral Balance</p>

//             {/* Option 1: Full Balance Selection */}
//             <div
//               onClick={() => setRedeemOption("full")}
//               className={`group p-3 border rounded-md mb-3 cursor-pointer transition-all flex items-start gap-3.5 ${
//                 redeemOption === "full" 
//                   ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
//                   : "border-slate-200 hover:border-slate-300 bg-white"
//               }`}
//             >
//               {/* Styled Checkbox/Radio Circle Container */}
//               <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
//                 redeemOption === "full" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 group-hover:border-slate-400 bg-white"
//               }`}>
//                 {redeemOption === "full" && <span className="w-2 h-2 rounded-full bg-white" />}
//               </div>
//               <div className="text-sm">
//                 <span className="block font-bold text-slate-800">Use Full Available Balance</span>
//                 <span className="text-xs font-medium text-slate-500">Deduct max possible: <strong className="text-emerald-700 font-bold">{currency.symbol}{scannedData?.availableBalance || 0}</strong></span>
//               </div>
//             </div>

//             {/* Option 2: Partial Selection Row */}
//             <div
//               onClick={() => setRedeemOption("partial")}
//               className={`group p-3 border rounded-md cursor-pointer transition-all ${
//                 redeemOption === "partial" 
//                   ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm" 
//                   : "border-slate-200 hover:border-slate-300 bg-white"
//               }`}
//             >
//               <div className="flex items-start gap-3.5">
//                 {/* Styled Checkbox/Radio Circle Container */}
//                 <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
//                   redeemOption === "partial" ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 group-hover:border-slate-400 bg-white"
//                 }`}>
//                   {redeemOption === "partial" && <span className="w-2 h-2 rounded-full bg-white" />}
//                 </div>
//                 <div className="text-sm">
//                   <span className="block font-bold text-slate-800">Use Partial Amount</span>
//                   <span className="text-xs font-medium text-slate-500">Enter a specific customizable value subset</span>
//                 </div>
//               </div>

//               {/* Dynamic Inner input drawer panel */}
//               {redeemOption === "partial" && (
//                 <div className="mt-3.5 pt-3.5 border-t border-emerald-200/40" onClick={(e) => e.stopPropagation()}>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency.symbol}</span>
//                     <input
//                       type="number"
//                       value={referralRedeemAmount}
//                       onChange={(e) => setReferralRedeemAmount(e.target.value)}
//                       placeholder="0.00"
//                       className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-slate-800"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {referralError && <p className="text-xs font-semibold text-rose-500 mt-3">{referralError}</p>}

//             {/* Bottom Control Actions */}
//             <div className="flex gap-3.5 mt-6">
//               <button 
//                 onClick={() => setShowRedeemChoiceModal(false)} 
//                 className="flex-1 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-sm font-semibold transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCombinedCouponRedeem}
//                 disabled={redeemLoading || !redeemOption || (redeemOption === "partial" && !referralRedeemAmount)}
//                 className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition shadow-lg shadow-slate-950/10 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
//               >
//                 {redeemLoading ? "Processing..." : "Confirm Transaction"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerDetailsDialog;








import React from 'react';
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100 max-h-[90vh] sm:max-h-[92vh] flex flex-col overflow-hidden transform scale-100 transition-all">
        
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              Customer Profile Dashboard
            </h2>
            {/* <p className="text-xs font-medium text-slate-500 mt-0.5">Verify scanned credentials and authorize benefits</p> */}
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
                      {currency.symbol}{scannedData.availableBalance}
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
                        {currency.symbol}{scannedData.couponAmount}
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
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-800">Transaction</h3>
                      {/* <p className="text-xs text-slate-500">
                        Process coupon and referral in a single transaction.
                      </p> */}
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
                        }}
                        className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                        placeholder="Enter purchase amount"
                      />
                    </div>
                  </div>

                  {/* Coupon Checkbox */}
                  <div className="border border-slate-200 rounded-md p-2 sm:p-2.5 mb-3 sm:mb-4 bg-white">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyCoupon}
                        onChange={(e) => setApplyCoupon(e.target.checked)}
                        className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                      />
                      <span className="font-semibold text-xs text-slate-800">Apply Coupon</span>
                    </label>
                    {applyCoupon && (
                      <div className="mt-3 bg-amber-50/80 border border-amber-100 rounded-md p-2 sm:p-2.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Coupon Discount</span>
                          <span className="font-bold text-amber-800">{currency.symbol}{scannedData.couponAmount}</span>
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
                        }}
                        className="w-3 h-3 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="font-semibold text-xs text-slate-800">Redeem Available Balance</span>
                    </label>

                    {applyReferral && (
                      <>
                        <div className="mt-3 bg-emerald-50/80 border border-emerald-100 rounded-md p-2 sm:p-2.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 font-medium">Available Balance</span>
                            <span className="font-bold text-emerald-800">{currency.symbol}{scannedData.availableBalance}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-row gap-6 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                            <input
                              type="radio"
                              checked={referralType === "full"}
                              onChange={() => setReferralType("full")}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Use Full Balance</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                            <input
                              type="radio"
                              checked={referralType === "partial"}
                              onChange={() => setReferralType("partial")}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Use Partial Balance</span>
                          </label>
                        </div>

                        {referralType === "partial" && (
                          <div className="mt-3">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Amount</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={referralRedeemAmount}
                                onChange={(e) => setReferralRedeemAmount(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                placeholder="Enter amount"
                                min={0}
                              />
                            </div>
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
                        {applyCoupon ? `${currency.symbol}${scannedData.couponAmount}` : `${currency.symbol}0`}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Redeem Balance</span>
                      <span className="font-semibold text-slate-800">
                        {applyReferral
                          ? referralType === "full"
                            ? `${currency.symbol}${scannedData.availableBalance}`
                            : `${currency.symbol}${referralRedeemAmount || 0}`
                          : `${currency.symbol}0`}
                      </span>
                    </div>
                  </div>

                  {(couponError || referralError) && (
                    <p className="text-rose-500 text-xs font-semibold mt-3">{couponError || referralError}</p>
                  )}
                </div>

                <button
                  onClick={onSubmitTransaction}
                  disabled={couponLoading || referralLoading || redeemLoading}
                  className="w-auto self-end px-8 py-2.5 mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition shadow-sm disabled:bg-slate-300"
                >
                  {couponLoading || referralLoading || redeemLoading ? "Processing..." : "Submit Transaction"}
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
                          onChange={(e) => setPurchaseAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                          min={0}
                        />
                      </div>
                    </div>

                    {Number(scannedData?.availableBalance) > 0 && (
                      <>
                        <div className="mt-4 text-xs flex flex-row gap-6 sm:text-sm">
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="radio"
                              checked={referralType === "full"}
                              onChange={() => {
                                setReferralType("full");
                                setReferralRedeemAmount("");
                              }}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Use Full Balance</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="radio"
                              checked={referralType === "partial"}
                              onChange={() => setReferralType("partial")}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Use Partial Balance</span>
                          </label>
                        </div>

                        {referralType === "partial" && (
                          <div className="mt-3">
                            <label className="block text-xs font-bold text-slate-500 mb-1">Enter Redeem Balance</label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                {currency.symbol}
                              </span>
                              <input
                                type="number"
                                value={referralRedeemAmount}
                                onChange={(e) => setReferralRedeemAmount(e.target.value)}
                                className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                placeholder="0.00"
                                min={0}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {referralError && (
                  <p className="text-xs font-semibold text-rose-500 mt-2">{referralError}</p>
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

                {/* Single Row Flex Container (Stacked on mobile, row on tablet/desktop) */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 w-full">
                  {/* Input Field Block */}
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
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={onCouponSubmit}
                    disabled={couponLoading}
                    className="w-full sm:w-auto px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full transition shadow-md shadow-amber-500/10 shrink-0 h-[38px] flex items-center justify-center"
                  >
                    {couponLoading ? "Processing..." : "Submit"}
                  </button>
                </div>

                {/* Error Message Below */}
                {couponError && (
                  <p className="text-xs font-semibold text-rose-500 mt-1">{couponError}</p>
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