// import { Gift, Search, Filter } from "lucide-react";
// import { Link } from "react-router-dom";

// const sampleCoupons = [
//   { store: "Amazon", code: "SAVE10NOW", discount: "10% off", expires: "Dec 31, 2025" },
//   { store: "Walmart", code: "FREESHIP25", discount: "Free shipping $35+", expires: "Jan 15, 2026" },
//   { store: "Target", code: "TARGET20", discount: "20% off select items", expires: "Jan 10, 2026" },
//   { store: "Uber Eats", code: "EATS20OFF", discount: "$20 off first order", expires: "Ongoing" },
//   { store: "Sephora", code: "BEAUTY15", discount: "15% off $50+", expires: "Feb 28, 2026" },
// ];

// export default function CouponsPage() {
//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//             Verified Coupon Codes
//           </h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Hand-tested, working promo codes updated daily from top US retailers.
//           </p>
//         </div>

//         {/* Search & Filter (placeholder for now) */}
//         <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search for store or code..."
//               className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           </div>
//           <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-6 py-4 rounded-2xl font-medium hover:bg-gray-50">
//             <Filter size={20} />
//             Filter
//           </button>
//         </div>

//         {/* Coupon Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sampleCoupons.map((coupon, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
//                   <Gift className="text-pink-600" size={28} />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">{coupon.store}</h3>
//                   <p className="text-sm text-gray-500">Expires: {coupon.expires}</p>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
//                 <p className="text-3xl font-bold text-gray-900 tracking-wide">{coupon.code}</p>
//               </div>

//               <p className="text-center text-lg font-medium text-gray-800 mb-6">
//                 {coupon.discount}
//               </p>

//               <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
//                 Copy Code
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-16 text-center">
//           <p className="text-xl text-gray-700 mb-6">Want more exclusive codes?</p>
//           <Link
//             to="/signup/user"
//             className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
//           >
//             Sign Up for Daily Updates
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }





export default function CouponsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <h1 className="text-4xl font-bold text-center">Coupons</h1>
      <p className="text-center mt-8 text-xl">Coming soon — we're adding the best coupons...</p>
    </div>
  );
}