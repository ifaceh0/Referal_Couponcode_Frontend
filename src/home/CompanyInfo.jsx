
// // import { Link } from "react-router-dom";

// export default function CompanyInfo() {
//   return (
//     <section className="bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//           Welcome to ReferralPro Solutions
//         </h2>
//         <p className="mt-4 text-xl text-gray-500 max-w-3xl">
//           We specialize in delivering cutting-edge <b className="text-black">referral and coupon code
//           solutions </b>that help businesses grow organically through word-of-mouth
//           and strategic promotions. Our platform offers seamless integrations,
//           actionable analytics, and automated workflows to maximize your
//          <b className="text-black"> referral potential and coupon-based conversions.</b> Whether you&#39;re
//           rewarding loyal customers or driving new sales, we make it easy to
//           launch and manage effective programs.
//         </p>
//         {/* <div className="mt-8">
//           <Link
//             to="/about"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             Learn More
//           </Link>
//         </div> */}
//       </div>
//     </section>
//   );
// }


import { Link } from "react-router-dom";
import { CheckCircle2, BarChart3, Zap, Users, Gift, DollarSign, Link as LinkIcon } from 'lucide-react';

export default function CompanyInfo() {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN: VISUAL / MOCKUP */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-8 shadow-2xl overflow-hidden group">
              {/* Realistic US-style dashboard mockup */}
              <div className="space-y-5 opacity-85 group-hover:opacity-100 transition-opacity">
                {/* Top stats bar */}
                <div className="flex justify-between items-center">
                  <div className="text-white text-sm font-medium">ReferralPro Dashboard</div>
                  <div className="text-green-400 text-xs">Live</div>
                </div>

                {/* Key metrics in USD */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-green-400 font-bold text-xl">$18,720</div>
                    <div className="text-[10px] uppercase text-gray-400 mt-1">Rewards Paid</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-blue-400 font-bold text-xl">6.2k</div>
                    <div className="text-[10px] uppercase text-gray-400 mt-1">Active Referrals</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-purple-400 font-bold text-xl">94%</div>
                    <div className="text-[10px] uppercase text-gray-400 mt-1">Success Rate</div>
                  </div>
                </div>

                {/* Coupon / referral list mockup */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between mb-3">
                    <div className="text-xs text-gray-300">Latest Verified Coupons</div>
                    <div className="text-xs text-blue-400">View All</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-600 rounded-full"></div>
                    <div className="h-2 w-4/5 bg-gray-600 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT + FEATURES */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Grow Smarter with <br />
              <span className="text-blue-600">Referral & Coupon Rewards</span>
            </h2>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              ReferralPro connects users, brands, and merchants with powerful referral links and verified coupon codes — helping everyone save money and earn real cash rewards.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                {
                  icon: <LinkIcon size={22} />,
                  text: "Instant referral link generation",
                  sub: "Share your unique link and track every click & conversion"
                },
                {
                  icon: <Gift size={22} />,
                  text: "Daily verified US coupon codes",
                  sub: "Tested & working discounts from top retailers"
                },
                {
                  icon: <DollarSign size={22} />,
                  text: "Earn real money & savings",
                  sub: "Cash payouts via PayPal, bank transfer, or gift cards"
                },
                {
                  icon: <CheckCircle2 size={22} />,
                  text: "Transparent & secure system",
                  sub: "Instant reward credit for valid referrals — no hidden fees"
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 rounded-full flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.text}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup/user" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1 transition-all"
              >
                Start Earning Today
              </Link>

              <a  href="https://subscription-frontend-psi.vercel.app/subscription"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-bold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all"
                        >
                          Partner with Us
                        </a> 
            </div>

            {/* Optional US trust signals */}
            <div className="mt-8 flex flex-wrap gap-6 opacity-80">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>PayPal Secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Verified Brands</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}