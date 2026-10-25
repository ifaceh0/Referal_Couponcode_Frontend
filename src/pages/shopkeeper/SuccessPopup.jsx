import React from 'react';
import { getCurrentCurrency } from "../../utils/currencyUtils";

const SuccessPopup = ({ 
  isOpen, 
  onClose, 
  purchaseAmount, 
  couponAmount, 
  redeemAmount 
}) => {
  const currency = getCurrentCurrency();
  const netAmount = (purchaseAmount || 0) - (couponAmount || 0) - (redeemAmount || 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in p-4">
      {/* Main Modal Card */}
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 text-center transform transition-all scale-100 duration-300">
        
        {/* Animated Premium Success Checkmark Icon */}
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 ring-4 ring-emerald-50/50">
          <svg 
            className="w-8 h-8 text-emerald-600 animate-scale-up" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2.5" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Header Text */}
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
          Transaction Successful!
        </h2>
        <p className="text-sm font-medium text-slate-500 mb-6">
          Your transaction has been processed securely.
        </p>

        {/* Premium Receipt Breakdown Container */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 space-y-3.5 text-left relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 to-transparent opacity-50 pointer-events-none" />

          {/* Line Item: Purchase Amount */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium">Subtotal</span>
            <span className="font-semibold text-slate-800">
              {currency.symbol}{Number(purchaseAmount).toFixed(2)}
            </span>
          </div>
          
          {/* Line Item: Coupon Discount */}
          {couponAmount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Coupon Discount
              </span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
                -{currency.symbol}{Number(couponAmount).toFixed(2)}
              </span>
            </div>
          )}

          {/* Line Item: Redeem Discount */}
          {redeemAmount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Redeem Discount
              </span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
                -{currency.symbol}{Number(redeemAmount).toFixed(2)}
              </span>
            </div>
          )}

          {/* Modern Elegant Divider */}
          <div className="pt-2">
            <div className="border-t-2 border-dashed border-slate-200/80 w-full" />
          </div>

          {/* Line Item: Total Payable */}
          <div className="flex justify-between items-center pt-1">
            <span className="font-bold text-slate-800">Total Amount</span>
            <span className="font-black text-xl text-slate-900 tracking-tight">
              {currency.symbol}{netAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold rounded-full text-base transition-all duration-200 shadow-lg shadow-slate-950/10 hover:shadow-xl hover:shadow-slate-950/20 active:scale-[0.99]"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;