import React from "react";
import {
  Ticket,
  Percent,
  BarChart3,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Target,
  Clock,
  Sparkles,
  Layers,
  Sparkle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CouponHub() {
  const features = [
    {
      icon: <Ticket className="w-6 h-6 text-orange-600" />,
      title: "Create Coupon Codes",
      description:
        "Generate unlimited coupon codes for discounts, promotions, and custom special offers.",
    },
    {
      icon: <Target className="w-6 h-6 text-amber-600" />,
      title: "Targeted Campaigns",
      description:
        "Create high-yield campaigns tailored to specific customer cohorts, unique products, or viral events.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Redemption Analytics",
      description:
        "Track customer coupon usage metrics, immediate conversions, and net revenue lift in real time.",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Instant Distribution",
      description:
        "Seamlessly share digital coupons across automated email, SMS, dynamic QR codes, and social pipelines.",
    },
  ];

  const steps = [
    {
      title: "Create a Campaign",
      description:
        "Define fixed or percentage discount value, specific validity windows, and global usage thresholds.",
    },
    {
      title: "Generate Coupon Codes",
      description:
        "Instantly produce custom human-readable phrases or secure, bulk randomized alphanumeric codes.",
    },
    {
      title: "Distribute to Customers",
      description:
        "Embed coupons directly within marketing flows, checkout banners, or segmented blast lists.",
    },
    {
      title: "Track Performance",
      description:
        "Monitor immediate cash-register redemptions, total gross revenue impact, and ROI health curves.",
    },
  ];

  const testimonials = [
    {
      name: "Clara Davenport",
      role: "E-commerce Growth Director",
      quote:
        "Our seasonal coupon campaign increased sales velocity by 37% within two weeks without eroding product margin tier rules.",
    },
    {
      name: "Julian Mercer",
      role: "Hospitality & Restaurant Group Owner",
      quote:
        "CouponHub gave us the precision tools to bring back inactive diners and directly boost mid-week repeat visits.",
    },
    {
      name: "Siddharth Mehta",
      role: "D2C Brand Founder",
      quote:
        "The clear visual analytics dashboard showed exactly which micro-influencer promotion codes delivered true margin ROI.",
    },
  ];

  return (
    <div className="bg-slate-50/50 overflow-x-hidden text-slate-900 font-sans antialiased">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-amber-50/20 to-transparent pt-20 pb-24">
        {/* Modern Dot/Grid Matrix Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 text-orange-700 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            Powered by iFaceh
          </div> */}

          <h1 className="mt-8 text-4xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Launch High-Converting{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-500 to-amber-600">
              Coupon Campaigns
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create, distribute, and track clean promotional codes that optimize customer acquisition costs, reward loyalty, and clear out inventory.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://subscription-frontend-psi.vercel.app/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              Launch Coupon Campaign
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all duration-200 text-center"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 -mt-4 mb-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/40 p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="text-center px-2">
              <span className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-orange-500">
                250K+
              </span>
              <p className="text-slate-800 font-medium mt-2 text-xs md:text-sm">Coupons Redeemed</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Secure validation cycles</p>
            </div>

            <div className="text-center px-2 pt-6 md:pt-0">
              <span className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-emerald-500">
                32%
              </span>
              <p className="text-slate-800 font-medium mt-2 text-xs md:text-sm">Average Conversion Lift</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Across dynamic channels</p>
            </div>

            <div className="text-center px-2 pt-6 md:pt-0">
              <span className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500">
                5M+
              </span>
              <p className="text-slate-800 font-medium mt-2 text-xs md:text-sm">Customer Actions</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Organic customer intent</p>
            </div>

            <div className="text-center px-2 pt-6 md:pt-0">
              <span className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-purple-500">
                24/7
              </span>
              <p className="text-slate-800 font-medium mt-2 text-xs md:text-sm">Real-Time Tracking</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Fraud prevention built-in</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Powerful Coupon Marketing Tools
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600">
              Stop offering generic discounts. Deploy a smart incentive architecture engineered to protect your operational margins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {feature.icon}
                </div>

                <h3 className="font-bold text-slate-900 text-lg mt-5 mb-2">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION (HOW IT WORKS) */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              How CouponHub Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-100">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL-LOOKING LIGHT APPLICATION DASHBOARD MOCKUP */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Top Chrome UI Bar Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-200/60 px-2.5 py-0.5 rounded">
                  Campaign Control Dashboard
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-600">
                  Live Merchant API Connected
                </span>
              </div>
            </div>

            {/* Main Application Container Elements */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-white to-slate-50/30">
              
              {/* Primary Analytical Metrics Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Coupons Issued
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1.5 flex items-baseline gap-2">
                    8,245
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                      Bulk
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Total Redeemed
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1.5 flex items-baseline gap-2">
                    5,180
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +4.2%
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Redemption Rate
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1.5 flex items-baseline gap-2">
                    62.8%
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      Optimal
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Revenue Impact
                  </div>
                  <div className="text-2xl font-black text-slate-900 mt-1.5 flex items-baseline gap-2">
                    $42,150
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                      14x ROI
                    </span>
                  </div>
                </div>
              </div>

              {/* Functional Interactive Velocity Chart Placeholder */}
              <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Active Campaign Metrics
                    </span>
                    <span className="text-[11px] text-slate-400">Comparing discount tiers directly</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Overall performance up +18.4%
                  </div>
                </div>
                
                {/* Simulated Custom CSS/Tailwind Horizontal Bar Chart Graph lines */}
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-medium">WINTER30 (30% Off Storewide)</span>
                      <span className="font-semibold text-slate-800">82% conversion efficiency</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-medium">WELCOME10 (New User Signups)</span>
                      <span className="font-semibold text-slate-800">68% conversion efficiency</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span className="font-medium">BOGOFLASHSALE (Buy 1 Get 1 Free)</span>
                      <span className="font-semibold text-slate-800">91% conversion efficiency</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE BENEFITS SECTION */}
      <section className="py-20 bg-orange-50/50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 mb-14">
            Why Modern Commerce Relies on CouponHub
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                <TrendingUp className="text-emerald-600" size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Increase Sales Velocity
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nudge hesitant or high-intent window shoppers into checking out with ultra-targeted promotional campaigns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                <ShoppingBag className="text-orange-600" size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Boost Repeat Purchases
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Encourage long-term loyalty and maximize lifetime user value with completely personalized customer retention incentives.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <Clock className="text-blue-600" size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Deploy Inside Minutes
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Build comprehensive, complex rule conditions and go completely live across all customer channels without code overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 mb-14">
            Validated Merchant Success Stories
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 text-amber-400 text-xs mb-4">
                    {"★".repeat(5)}
                  </div>

                  <p className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION (CTA) SECTION */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/40 via-amber-50/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Launch Your Next Promotion?
          </h2>

          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Create high-converting, fully customized promo-code routines to sustainably grow your conversion metric.
          </p>

          <div className="mt-8">
            <a
              href="https://subscription-frontend-psi.vercel.app/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all duration-200"
            >
              Start Coupon Campaign
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}