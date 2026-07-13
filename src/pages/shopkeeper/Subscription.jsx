// // import React from "react";
// // import { shopkeeperDemoData } from "../../utils/demoData";

// // const Subscription = () => {
// //   const { subscription } = shopkeeperDemoData;

// //   return (
// //     <div className="min-h-screen p-8">
// //       <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
// //       <div className="bg-gray-100 p-4 rounded">
// //         <p>Tier: {subscription.tier}</p>
// //         <p>Features: {subscription.features.join(", ")}</p>
// //         <p>Expiry Date: {subscription.expiry}</p>
// //       </div>
// //       <button
// //         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
// //       >
// //         Upgrade Subscription
// //       </button>
// //     </div>
// //   );
// // };

// // export default Subscription;



// import React, { useState } from "react";
// import { AlertCircle, CheckCircle2, Gem, RefreshCcw, Users } from 'lucide-react';
// import { shopkeeperDemoData } from '../../utils/demoData';
// import { plans } from "../../utils/subscriptionData";

// export default function SubscriptionManagementPage() {
//   const [subscription, setSubscription] = useState({
//     plan: shopkeeperDemoData.subscription.tier,
//     startDate: new Date(),
//     nextBillingDate: new Date(shopkeeperDemoData.subscription.expiry),
//     features: shopkeeperDemoData.subscription.features
//   });

//   const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
//   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
//   const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null);
//   const [isContactSalesDialogOpen, setIsContactSalesDialogOpen] = useState(false);

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     }).replace(/\//g, '-');
//   };

//   const handleUpgrade = () => {
//     if (selectedUpgradePlan) {
//       if (selectedUpgradePlan.tier === "Enterprise") {
//         setIsContactSalesDialogOpen(true);
//       } else {
//         setSubscription(prev => ({
//           ...prev,
//           plan: selectedUpgradePlan.tier,
//           features: selectedUpgradePlan.features,
//           nextBillingDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
//         }));
//       }
//     }
//     setIsUpgradeDialogOpen(false);
//     setSelectedUpgradePlan(null);
//   };

//   const handleCancel = () => {
//     console.log("Subscription cancelled");
//     setIsCancelDialogOpen(false);
//   };

//   const handleContactSales = () => {
//     console.log("Contacting sales for Enterprise plan");
//     setIsContactSalesDialogOpen(false);
//   };

//   const daysUntilRenewal = Math.max(0, Math.ceil((subscription.nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

//   const currentPlanIndex = plans.findIndex(plan => plan.tier === subscription.plan);
//   const higherTierPlans = plans.slice(currentPlanIndex + 1);

//   return (
//     <div className="mx-auto py-12 px-4 min-h-screen">
//       <h1 className="text-4xl font-bold mb-8">Subscription Management</h1>

//       <div className="mx-auto bg-purple-50 rounded-lg shadow-md overflow-hidden">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Your Subscription</h2>
//             <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
//               <Gem className="inline mr-1 h-4 w-4" />
//               {subscription.plan} Plan
//             </span>
//           </div>
//           <p className="text-gray-600 mb-6">Manage your subscription and usage</p>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Subscription Details</h3>
//               <p><strong>Plan:</strong> {subscription.plan}</p>
//               <p><strong>Start Date:</strong> {formatDate(subscription.startDate)}</p>
//               <p><strong>Next Billing Date:</strong> {formatDate(subscription.nextBillingDate)}</p>
//               <p className="text-sm text-indigo-600 mt-2">
//                 <RefreshCcw className="inline mr-1 h-4 w-4" />
//                 Renews in {daysUntilRenewal} days
//               </p>
//               <h4 className="text-md font-semibold mt-4 mb-2">Features:</h4>
//               <ul className="list-disc list-inside">
//                 {subscription.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="px-6 py-4 bg-gray-50 flex justify-between">
//           {higherTierPlans.length > 0 ? (
//             <button
//               onClick={() => setIsUpgradeDialogOpen(true)}
//               className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
//             >
//               Upgrade Plan
//             </button>
//           ) : (
//             <button disabled className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
//               Highest Plan (Current)
//             </button>
//           )}
//           <button
//             onClick={() => setIsCancelDialogOpen(true)}
//             className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//           >
//             Cancel Subscription
//           </button>
//         </div>
//       </div>

//       {isUpgradeDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-3xl w-full">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2">Upgrade Your Plan</h2>
//               <p className="text-gray-600 mb-4">
//                 Choose a plan to upgrade and access more features.
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {higherTierPlans.map((plan) => (
//                   <div
//                     key={plan.tier}
//                     className={`border rounded-lg p-4 cursor-pointer ${
//                       selectedUpgradePlan?.tier === plan.tier ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
//                     }`}
//                     onClick={() => setSelectedUpgradePlan(plan)}
//                   >
//                     <h3 className="text-lg font-semibold">{plan.tier}</h3>
//                     <p className="text-gray-600 mb-2">{plan.description}</p>
//                     <p className="text-indigo-600 font-semibold">
//                       {plan.tier === "Enterprise" ? "Custom Pricing" : `$${plan.price}/month`}
//                     </p>
//                     <ul className="list-disc list-inside space-y-1 mt-2">
//                       {plan.features.map((feature, index) => (
//                         <li key={index} className="text-sm">{feature}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setIsUpgradeDialogOpen(false);
//                   setSelectedUpgradePlan(null);
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpgrade}
//                 disabled={!selectedUpgradePlan}
//                 className={`px-4 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
//                   selectedUpgradePlan
//                     ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
//                     : 'bg-gray-300 cursor-not-allowed'
//                 }`}
//               >
//                 {selectedUpgradePlan?.tier === "Enterprise" ? "Contact Sales" : "Confirm Upgrade"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isCancelDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-md w-full">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2">Cancel Subscription</h2>
//               <p className="text-gray-600 mb-4">
//                 Are you sure you want to cancel your subscription?
//               </p>
//               <div className="py-4">
//                 <p className="text-lg font-semibold text-red-500">
//                   <AlertCircle className="inline mr-2 h-5 w-5" />
//                   Warning:
//                 </p>
//                 <ul className="list-disc list-inside space-y-1 mt-2">
//                   <li>You will lose access to all premium features</li>
//                   <li>This action cannot be undone</li>
//                 </ul>
//                 <p className="mt-4 text-sm text-gray-500">
//                   If you change your mind, you can always subscribe again in the future.
//                 </p>
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
//               <button
//                 onClick={() => setIsCancelDialogOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//               >
//                 Keep Subscription
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//               >
//                 Confirm Cancellation
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isContactSalesDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-md w-full">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-2">Contact Sales</h2>
//               <p className="text-gray-600 mb-4">
//                 Thank you for your interest in our Enterprise plan. Our sales team will contact you shortly to discuss custom pricing and features.
//               </p>
//               <div className="py-4">
//                 <p className="text-lg font-semibold text-indigo-600">
//                   <Users className="inline mr-2 h-5 w-5" />
//                   Next steps:
//                 </p>
//                 <ul className="list-disc list-inside space-y-1 mt-2">
//                   <li>Our sales team will reach out via email</li>
//                   <li>Schedule a demo of Enterprise features</li>
//                   <li>Discuss your specific needs and custom pricing</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 flex justify-end">
//               <button
//                 onClick={handleContactSales}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//               >
//                 Got it
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { Loader2, Zap, ArrowRight, ShieldCheck, Mail, Layers, CreditCard, Receipt, Settings } from "lucide-react";
import { getCurrentUser } from "../../api/signin";

const SubscriptionDashboard = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        const email = user?.["company email"] || user?.email || "Not found";
        setCompanyEmail(email);
      } catch (err) {
        setCompanyEmail("Unable to load");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const isValidEmail = companyEmail && !companyEmail.includes("Not found") && !companyEmail.includes("Unable");
  const subscriptionUrl = isValidEmail
    ? `https://subscription-frontend-psi.vercel.app/subscription-dashboard?email=${encodeURIComponent(companyEmail)}`
    : "#";

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50/60 flex flex-col items-center justify-center py-28 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-zinc-500 text-sm font-medium tracking-wide">Syncing Subscription Parameters...</p>
      </div>
    );
  }

  const isButtonDisabled = !isValidEmail;

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased py-8 relative overflow-hidden">
      {/* Structural Minimal Background Blur Aura */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Main Header Panel */}
        <header className="mb-8 border-b border-zinc-200/80 pb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Billing & Governance Node</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Subscription Workspace
          </h1>
          <p className="text-zinc-500 text-sm max-w-2xl font-medium mt-1">
            Review billing frameworks, access external account statements, control transaction limits, or scale platform capabilities.
          </p>
        </header>

        {/* Full Page Split Architecture Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Core Workspace & Interactive Launcher */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-bold text-zinc-800 tracking-tight mb-2">
                External Module Integration
              </h2>
              <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-6">
                Your payment processing engine, history profiles, and credential structures are securely sandbox-hosted outside this primary application cluster. Use the tunnel launcher below to drop cleanly into your active session.
              </p>

              {/* Account Status Segment Container */}
              <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl flex flex-col gap-1.5 mb-6 shadow-inner">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  <Mail size={12} /> Active Gateway Instance Ident
                </span>
                <p className={`text-sm font-mono font-bold tracking-tight truncate ${isValidEmail ? 'text-zinc-900' : 'text-rose-600'}`}>
                  {companyEmail}
                </p>
              </div>

              {/* Submit / Action Framework */}
              <div className="space-y-4">
                <a
                  href={subscriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all shadow-sm active:scale-98 w-full sm:w-auto
                    ${isButtonDisabled
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  aria-disabled={isButtonDisabled}
                  onClick={(e) => isButtonDisabled && e.preventDefault()}
                >
                  <span>Launch Subscription Dashboard</span>
                  <ArrowRight className="h-4 w-4 text-zinc-400 shrink-0" />
                </a>

                <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                  {isButtonDisabled 
                    ? "Routing parameters are structurally blocked without an initialization credential trace." 
                    : "Routing establishes an isolated layer proxy window opening into an encrypted SSL domain."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: General Framework Status Metadata Panels */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Quick Contextual Framework Card Info */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Workspace Directives
              </h3>
              
              <div className="space-y-4 text-xs font-medium text-zinc-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-500 shrink-0">
                    <CreditCard size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-800 mb-0.5">Payment Portability</h4>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">Add secondary card fallbacks directly to mitigate profile operational dropouts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-zinc-100 pt-3">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-500 shrink-0">
                    <Receipt size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-800 mb-0.5">Automated Audits</h4>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">Tax compliance profiles generate download manifests concurrently inside the node window.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Infrastructure Identification Banner */}
            <div className="p-4 bg-zinc-100/50 border border-zinc-200/80 rounded-2xl flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Settings size={12} className="text-zinc-300" />
                PromoConnect Secure Gateway
              </span>
              <span className="text-zinc-300">v2.4.0</span>
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;