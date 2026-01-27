import React from 'react';
import { Link } from "react-router-dom";
import { Gift, TrendingUp, ShieldCheck, Link2, CheckCircle2, Calendar, Users } from "lucide-react";  // ← Added CheckCircle2 here

const Resources = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Referral & Coupon Resources
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the best verified referral programs, exclusive coupon codes, and proven strategies to save money and earn real cash rewards.
          </p>
        </div>

        {/* Main Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

          {/* Card 1: Top Referral Programs */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="p-8">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Top Referral Programs
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Highest-paying referral offers from Amazon, Walmart, Uber, Rakuten, and more — with instant and recurring rewards.
              </p>
              <Link
                to="/referral-programs"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Explore Programs →
              </Link>
            </div>
          </div>

          {/* Card 2: Verified Coupon Codes */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="p-8">
              <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                <Gift className="text-pink-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verified Coupon Codes
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Daily updated, community-tested promo codes for shopping, travel, food delivery, and services — all working right now.
              </p>
              <Link
                to="/coupons" // change to your actual coupons page
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Browse Coupons →
              </Link>
            </div>
          </div>

          {/* Card 3: Earning Guides & Strategies */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="p-8">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Link2 className="text-purple-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Earning Guides
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Step-by-step strategies to maximize referral income, avoid common mistakes, and scale your earnings legally & fast.
              </p>
              <Link
                to="/guides" // change to your guides/resources page
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Read Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* Trust & Verification Section */}
        <div className="mt-20 bg-blue-50 rounded-xl p-10 md:p-12 text-center border border-blue-100">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="text-blue-600" size={48} />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            100% Verified & Updated Daily
          </h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
            Every referral link and coupon code is manually verified by our team and community. We remove expired offers instantly so you only get working deals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <CheckCircle2 />, label: "Community Tested", desc: "Thousands of users report codes daily" },
              { icon: <Calendar />, label: "Daily Updates", desc: "Fresh codes added every 24 hours" },
              { icon: <Users />, label: "Trusted by 50k+ Members", desc: "Real rewards, real results" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  {React.cloneElement(item.icon, { size: 24, className: "text-blue-600" })}
                </div>
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Ready to start saving and earning?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup/user"
              className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Sign Up Free
            </Link>
            <Link
              to="/contact"
              className="bg-white border border-gray-300 text-gray-800 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Have Questions? Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;