import React from "react";
import {
  Users,
  Share2,
  Gift,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Link as LinkIcon,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ReferralHub() {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Customer Referrals",
      description:
        "Turn your existing customers into advocates who bring new customers to your business.",
    },
    {
      icon: <Gift className="w-6 h-6 text-purple-600" />,
      title: "Reward Automation",
      description:
        "Automatically reward referrers and referred customers when referral goals are achieved.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-indigo-600" />,
      title: "Easy Sharing",
      description:
        "Share referral links via QR codes, SMS, email, WhatsApp, and social media.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
      title: "Real-Time Analytics",
      description:
        "Track clicks, referrals, conversions, and campaign performance instantly.",
    },
  ];

  const steps = [
    {
      title: "Create Referral Campaign",
      description:
        "Configure rewards, eligibility rules, and campaign settings.",
    },
    {
      title: "Share Referral Links",
      description:
        "Customers share their unique referral links with friends and family.",
    },
    {
      title: "Acquire New Customers",
      description:
        "New customers sign up or make purchases through referral links.",
    },
    {
      title: "Reward Automatically",
      description:
        "Rewards are issued automatically once referral conditions are met.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Coffee Shop Owner",
      quote:
        "Our referral campaign increased customer acquisition by 42% in just three months with zero complexity.",
    },
    {
      name: "Marcus Chen",
      role: "Retail Store Manager",
      quote:
        "PromoConnect helped us scale our community growth without blowing our budget on paid search tracking.",
    },
    {
      name: "Elena Rostova",
      role: "Restaurant Group Director",
      quote:
        "The automated rewards system saved us hours of manual work. Our customers love the instant payouts.",
    },
  ];

  return (
    <div className="bg-slate-50/50 overflow-x-hidden text-slate-900 font-sans antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-transparent pt-20 pb-24">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Powered by iFaceh
          </div> */}

          <h1 className="mt-8 text-4xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Turn Customers Into Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Best Sales Team
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Launch frictionless referral campaigns that incentivize customer loyalty. Acquire high-value users through trusted word-of-mouth recommendations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://subscription-frontend-psi.vercel.app/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Referral Program
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all duration-200 text-center"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 -mt-4 mb-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="text-center md:px-4">
              <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500">
                3X
              </span>
              <p className="text-slate-800 font-medium mt-2 text-sm md:text-base">Faster Customer Growth</p>
              <p className="text-slate-400 text-xs mt-1">Compared to traditional ads</p>
            </div>

            <div className="text-center pt-6 md:pt-0 md:px-4">
              <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-purple-600 to-purple-500">
                40%
              </span>
              <p className="text-slate-800 font-medium mt-2 text-sm md:text-base">Lower Acquisition Cost</p>
              <p className="text-slate-400 text-xs mt-1">Organic channel optimization</p>
            </div>

            <div className="text-center pt-6 md:pt-0 md:px-4">
              <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-emerald-500">
                24/7
              </span>
              <p className="text-slate-800 font-medium mt-2 text-sm md:text-base">Automated Tracking</p>
              <p className="text-slate-400 text-xs mt-1">Instant reward distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Everything You Need to Scale
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600">
              Powerful, reliable backend rules built natively into a streamlined merchant interface.
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

      {/* PROCESS SECTION */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
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

      {/* DASHBOARD MOCKUP */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
            {/* Header / Top Bar of application mockup */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-200/60 px-2 py-0.5 rounded">
                  Referral Dashboard
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-medium text-emerald-700">
                  Live Tracking Activated
                </span>
              </div>
            </div>

            {/* Dashboard Contents */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-white to-slate-50/50">
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Total Referrals
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2 flex items-baseline gap-2">
                    1,248
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +12%
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Successful Conversions
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2 flex items-baseline gap-2">
                    842
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      67.4%
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Revenue Generated
                  </div>
                  <div className="text-3xl font-black text-slate-900 mt-2 flex items-baseline gap-2">
                    $18,500
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      +24%
                    </span>
                  </div>
                </div>
              </div>

              {/* Data visualization placeholder built out elegantly */}
              <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Campaign Velocity Trend
                  </div>
                  <div className="flex gap-2 text-[10px] text-slate-400 font-semibold">
                    <span>Clicks</span>
                    <span className="text-blue-500">Signups</span>
                  </div>
                </div>
                
                {/* Visual bar chart representations */}
                <div className="space-y-3.5 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Direct Invites</span>
                      <span className="font-semibold text-slate-700">740 clicks</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Social Shares</span>
                      <span className="font-semibold text-slate-700">412 clicks</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>QR Codes Scan</span>
                      <span className="font-semibold text-slate-700">96 clicks</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-100/40 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 mb-14">
            Validated by Live Merchant Growth
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-0.5 text-amber-400 text-sm mb-4">
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

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-indigo-50/20 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Grow Through Referrals?
          </h2>

          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Start rewarding your high-intent customers and systematically acquiring new business loops today.
          </p>

          <div className="mt-8">
            <a
              href="https://subscription-frontend-psi.vercel.app/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl transition-all duration-200"
            >
              Launch Referral Program
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}