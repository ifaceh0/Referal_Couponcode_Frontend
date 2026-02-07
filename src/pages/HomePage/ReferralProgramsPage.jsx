// import { Link } from "react-router-dom";
// import { DollarSign, Clock, BarChart3, CheckCircle } from "lucide-react";

// const referralPrograms = [
//   {
//     name: "Amazon Associates",
//     payout: "$10–$100+ per sale",
//     commission: "1–10% depending on category",
//     cookieDuration: "24 hours",
//     description: "Earn commissions on almost any product sold through your referral links.",
//     logo: "amazon",
//     link: "https://affiliate-program.amazon.com/",
//   },
//   {
//     name: "Rakuten Marketing",
//     payout: "$5–$50+ per referral",
//     commission: "Up to 20% per sale",
//     cookieDuration: "30 days",
//     description: "Partner with thousands of top US brands like Walmart, Nike, Sephora.",
//     logo: "rakuten",
//     link: "https://rakutenmarketing.com/",
//   },
//   {
//     name: "Walmart Affiliate Program",
//     payout: "$10–$100 per sale",
//     commission: "1–4% on most items",
//     cookieDuration: "3 days",
//     description: "Promote everyday essentials and electronics from a trusted retailer.",
//     logo: "walmart",
//     link: "https://affiliates.walmart.com/",
//   },
//   {
//     name: "eBay Partner Network",
//     payout: "50–70% of eBay revenue",
//     commission: "1–4% per sale",
//     cookieDuration: "24 hours",
//     description: "Earn on auctions, new & used items — huge variety of products.",
//     logo: "ebay",
//     link: "https://partnernetwork.ebay.com/",
//   },
//   {
//     name: "Target Affiliate Program",
//     payout: "$5–$50+ per sale",
//     commission: "1–8% depending on category",
//     cookieDuration: "7 days",
//     description: "Promote clothing, home goods, electronics, and seasonal items.",
//     logo: "target",
//     link: "https://affiliate.target.com/",
//   },
// ];

// export default function ReferralProgramsPage() {
//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//             Best Referral Programs in 2025
//           </h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Discover the highest-paying, most reliable referral programs with real cash rewards.
//           </p>
//         </div>

//         {/* Programs Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {referralPrograms.map((program, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="p-8">
//                 {/* Program Logo / Name */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
//                     {/* Replace with real logo images later */}
//                     <span className="text-2xl font-bold text-gray-600">
//                       {program.name.charAt(0)}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900">{program.name}</h3>
//                 </div>

//                 {/* Key Info */}
//                 <div className="space-y-4 mb-6">
//                   <div className="flex items-center gap-3">
//                     <DollarSign className="text-green-600" size={20} />
//                     <span className="text-gray-900 font-medium">{program.payout}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <BarChart3 className="text-blue-600" size={20} />
//                     <span className="text-gray-900 font-medium">{program.commission}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock className="text-purple-600" size={20} />
//                     <span className="text-gray-900 font-medium">{program.cookieDuration} cookie</span>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 mb-6">{program.description}</p>

//                 <a
//                   href={program.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
//                 >
//                   Join Now →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-16 text-center">
//           <p className="text-xl text-gray-700 mb-6">
//             Want to start earning from these programs today?
//           </p>
//           <Link
//             to="/signup/user"
//             className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
//           >
//             Sign Up Free
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }






export default function ReferralProgramsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <h1 className="text-4xl font-bold text-center">Referral Programs</h1>
      <p className="text-center mt-8 text-xl">Coming soon — we're adding the best programs...</p>
    </div>
  );
}