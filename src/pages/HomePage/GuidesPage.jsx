// import { BookOpen, DollarSign, Lightbulb, BarChart3, Clock } from "lucide-react";
// import { Link } from "react-router-dom";

// const guides = [
//   {
//     title: "How to Earn $500+/Month with Referrals in 2025",
//     desc: "Step-by-step guide to selecting programs, creating content, and scaling your referrals.",
//     readTime: "12 min",
//   },
//   {
//     title: "Best Times to Share Referral Links for Maximum Conversions",
//     desc: "Timing tips, social media strategies, and email templates that actually work.",
//     readTime: "8 min",
//   },
//   {
//     title: "Top 10 Mistakes That Kill Referral Earnings (and How to Fix Them)",
//     desc: "Avoid common pitfalls like spamming links or choosing low-paying programs.",
//     readTime: "10 min",
//   },
//   {
//     title: "How to Combine Coupons & Referrals for Double Savings",
//     desc: "Advanced stacking techniques to maximize discounts + earn referral cash.",
//     readTime: "9 min",
//   },
// ];

// export default function GuidesPage() {
//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//             Earning Guides & Strategies
//           </h1>
//           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//             Proven tips, step-by-step tutorials, and real-world strategies to maximize your referral income.
//           </p>
//         </div>

//         {/* Guides List */}
//         <div className="space-y-8">
//           {guides.map((guide, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300"
//             >
//               <div className="flex items-start gap-6">
//                 <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
//                   <BookOpen className="text-blue-600" size={32} />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                     {guide.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4 text-lg">{guide.desc}</p>
//                   <div className="flex items-center gap-6 text-sm text-gray-500">
//                     <span className="flex items-center gap-2">
//                       <Clock size={16} /> {guide.readTime} read
//                     </span>
//                     <span className="flex items-center gap-2">
//                       <BarChart3 size={16} /> Beginner to Advanced
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-16 text-center">
//           <p className="text-xl text-gray-700 mb-6">
//             Want personalized tips to start earning faster?
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
//           >
//             Contact Us for Help
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function GuidesPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <h1 className="text-4xl font-bold text-center">Guides</h1>
      <p className="text-center mt-8 text-xl">Coming soon — we're adding the best guides...</p>
    </div>
  );
}