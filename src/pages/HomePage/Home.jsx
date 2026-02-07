
// import { useInView } from 'react-intersection-observer';
// import Carousel from '../../home/Carousel';
// import CompanyInfo from '../../home/CompanyInfo';
// import ProductShowcase from '../../home/ProductShowcase';

// const Home = () => {
//   const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [infoRef, infoInView] = useInView({ triggerOnce: false, threshold: 0.1 });
//   const [productShowCaseRef, productShowCaseInView] = useInView({ triggerOnce: false, threshold: 0.1 });

//   return (
//     <>
//       <div ref={carouselRef} className={`transition-opacity duration-1000 ${carouselInView ? 'opacity-100' : 'opacity-0'}`}>
//         <Carousel/>
//       </div>

//       <div 
//         ref={infoRef} 
//         className={`transition-all duration-1000 transform ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//       >
//         <CompanyInfo/>
//       </div>

//       <div 
//         ref={productShowCaseRef} 
//         className={`transition-all duration-1000 transform ${productShowCaseInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//       >
//         <ProductShowcase/>
//       </div>
      
//     </>
//   );
// };

// export default Home;







import { useInView } from 'react-intersection-observer';
import { MousePointerClick, Gift, TrendingUp, ShieldCheck, UserPlus, Link as LinkIcon, DollarSign, ChevronDown } from 'lucide-react';
import Carousel from '../../home/Carousel';
import CompanyInfo from '../../home/CompanyInfo';
import ProductShowcase from '../../home/ProductShowcase';
import FAQSection from '../../home/FAQSection';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [explainRef, explainInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [infoRef, infoInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [productShowCaseRef, productShowCaseInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. HERO VISUAL */}
      <section ref={carouselRef} className={`transition-all duration-1000 ease-out ${carouselInView ? 'opacity-100' : 'opacity-0'}`}>
        <Carousel />
      </section>

      {/* 2. CORE FEATURES (The "What") */}
      <section ref={explainRef} className={`py-20 px-6 max-w-7xl mx-auto transition-all duration-1000 delay-300 transform ${explainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why People Love ReferralPro</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real rewards, verified coupons, and simple sharing — all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Gift className="text-pink-500" size={48} />, title: "Verified Coupons", desc: "Fresh, working codes from Amazon, Walmart, Target, and more — updated daily" },
            { icon: <TrendingUp className="text-green-500" size={48} />, title: "Real Cash Rewards", desc: "Get paid actual money when friends shop using your referral link" },
            { icon: <MousePointerClick className="text-blue-500" size={48} />, title: "One-Click Sharing", desc: "Instant copy for links & codes — share on social, text, or email" },
            { icon: <ShieldCheck className="text-purple-500" size={48} />, title: "Safe & Transparent", desc: "100% verified — instant credit, no hidden rules, secure payouts" }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS (The "How") */}
      <section ref={stepsRef} className={`py-20 bg-gradient-to-b from-blue-50 to-white transition-all duration-1000 ${stepsInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">How It Works in 3 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              {
                num: "1",
                title: "Sign Up Free",
                desc: "Create your account in seconds — no credit card required.",
                iconColor: "bg-blue-100 text-blue-600"
              },
              {
                num: "2",
                title: "Get Your Links & Codes",
                desc: "Instant access to your unique referral links and top coupons.",
                iconColor: "bg-purple-100 text-purple-600"
              },
              {
                num: "3",
                title: "Earn Cash & Save",
                desc: "Get paid via PayPal or bank when friends shop — plus big discounts for you.",
                iconColor: "bg-green-100 text-green-600"
              }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative">
                <div className={`w-20 h-20 ${step.iconColor} rounded-full flex items-center justify-center text-4xl font-bold mb-6 shadow-lg z-10`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-lg max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. USER TESTIMONIALS (Social Proof) */}
      <section className="py-20 max-w-7xl mx-auto px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sarah J.", quote: "I've saved over $200 this month alone using the coupon codes here. It's so easy!", rating: "⭐⭐⭐⭐⭐" },
            { name: "Mike R.", quote: "The referral program is legit. I shared my link with 5 friends and already got my first payout.", rating: "⭐⭐⭐⭐⭐" },
            { name: "Jessica L.", quote: "The only site where the codes actually work. Highly recommended for savvy shoppers.", rating: "⭐⭐⭐⭐" }
          ].map((t, idx) => (
            <div key={idx} className="p-8 bg-gray-50 rounded-lg border border-gray-100 shadow-md">
              <p className="text-blue-600 font-bold mb-4 text-xl">{t.rating}</p>
              <p className="italic text-gray-700 mb-6 text-lg">"{t.quote}"</p>
              <p className="font-bold text-gray-900">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY INFO */}
      <div ref={infoRef} className={`transition-all duration-1000 transform ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <CompanyInfo/>
      </div>

      {/* 4. PRODUCT SHOWCASE */}
      <div ref={productShowCaseRef} className={`transition-all duration-1000 transform ${productShowCaseInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="py-16"><ProductShowcase/></div>
      </div>

      {/* 6. FAQ SECTION */}
      <FAQSection />

      {/* 8. QUICK ACTION BAR */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
        <div className="max-w-md mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-2xl flex items-center justify-between pointer-events-auto border border-gray-700">
          <div>
            <p className="text-xs text-gray-400">Ready to start earning cash?</p>
            <p className="font-bold text-sm">Join now — free & takes less than 30 sec.</p>
          </div>
          <button 
            onClick={() => navigate('/signup/user')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition">Sign Up Free</button>
        </div>
      </div>
    </div>
  );
};

export default Home;