import { useParams, Link ,useLocation} from 'react-router-dom';
// import referalHero from "../assets/referal-hero.jpg";
import referal1 from "../assets/referal1.png";
import referal2 from "../assets/referal2.png";
import referal3 from "../assets/referal3.png"



const featureDetails = {

  '1': {
    title: 'Custom Referral / Coupon Programs',
    sections: [
      {
        title: 'Why Choose Our Custom Programs?',
        content: [
          '✅ Tailored to Your Business – Set up referral and coupon structures that align with your goals.',
          '✅ Automated & Easy to Manage – Seamlessly track referrals, rewards, and redemptions.',
          '✅ Increase Customer Loyalty – Keep customers coming back with exclusive discounts and perks.',
          '✅ Boost Word-of-Mouth Marketing – Turn happy customers into your best promoters.'
        ],
        image: referal1
      },
      {
        title: 'How It Works',
        content: [
          '1️⃣ Referral Program: Customers share a unique referral link with friends.',
          '2️⃣ Friends Join & Purchase: When a new customer signs up and makes a purchase, both parties get rewarded.',
          '3️⃣ Instant Rewards: Coupons, discounts, or store credit applied automatically.'
        ],
        image: referal2
      }
    ],
    cta: 'Want to launch your own referral or coupon program? Contact us now to create a customized solution that fits your business needs.'
  },

  '2': {
    title: 'Referral & Coupon Code Tracking Analysis',
    sections: [
      {
        title: 'Key Features',
        content: [
          '📊 Real-Time Tracking – Monitor referral usage, coupon redemptions, and campaign effectiveness instantly.',
          '📈 Performance Insights – Identify top referrers, successful discount strategies, and customer engagement trends.',
          '🔑 Unique Code Generation – Create personalized referral links and coupon codes to track individual performance.',
          '🌍 Location & Demographic Data – Understand where and how customers are using your promotions.',
          '🛡️ Fraud Prevention – Detect and prevent coupon misuse with built-in validation tools.'
        ],
        image: referal3
      },
      {
        title: 'How It Works',
        content: [
          '1️⃣ Track Every Referral & Coupon – Assign unique codes to customers and analyze their usage.',
          '2️⃣ Monitor Key Metrics – See redemption rates, purchase behavior, and campaign ROI in real-time.',
          '3️⃣ Optimize & Improve – Use data insights to adjust strategies, increase conversions, and maximize customer loyalty.'
        ],
        image: referal1
      }
    ],
    cta: 'Ready to gain deeper insights? Contact us today!'
  },
  '6': {
    title: 'Referral & Coupon Code Campaign Management',
    sections: [
      {
        title: 'Key Features of Our Campaign Management',
        content: [
          '⚙️ Customizable Campaign Setup',
          '🎯 Set unique referral rewards, discount amounts, and expiration dates.',
          '🛑 Define eligibility criteria and usage limits to prevent fraud.',
          '🔑 Automated Code Generation & Distribution',
          '📩 Generate personalized referral links and unique coupon codes.',
          '📲 Deliver codes via email, SMS, social media, or user accounts.',
          '📢 Multi-Channel Promotion',
          '🌐 Easily promote campaigns on your website, email newsletters, social media, and ads.',
          '💡 Allow customers to share referral links instantly across different platforms.',
          '📊 Real-Time Tracking & Analytics',
          '📈 Monitor campaign performance, referral success rates, and coupon redemptions.',
          '🧐 Get insights into customer behavior and optimize promotions based on data.',
          '🧪 A/B Testing & Optimization',
          '📝 Test different campaign structures to find the best-performing strategies.',
          '🔄 Adjust discounts, rewards, or messaging based on data-driven insights.',
          '🛡️ Fraud Prevention & Security',
          '🚫 Implement usage limits, IP tracking, and duplicate detection to prevent misuse.'
        ],
        image: referal2
      },
      {
        title: 'How It Works',
        content: [
          '1️⃣ Create & Launch – Define campaign rules, set rewards, and generate referral links/coupon codes.',
          '2️⃣ Promote & Engage – Share campaigns via website, email, or social media.',
          '3️⃣ Track & Analyze – Get real-time insights and adjust campaigns for better results.',
          '4️⃣ Reward & Retain – Deliver rewards automatically and build customer loyalty.'
        ],
        image: referal2
      },
      {
        title: 'Why Choose Our Campaign Management Solution?',
        content: [
          '✅ Effortless Automation – Save time with fully automated tracking and code distribution.',
          '✅ Boost Conversions & Sales – Drive revenue by leveraging word-of-mouth marketing.',
          '✅ Data-Driven Decisions – Optimize campaigns based on real-time performance analytics.',
          '✅ Scalable & Flexible – Manage multiple campaigns with different structures and rewards.',
          '🚀 Start Managing Your Referral & Coupon Campaigns Today!',
          '📞 Get in touch now to launch your next successful campaign!'
        ],
        image: referal3
      }
    ],
    cta: 'Ready to manage your campaigns efficiently? Contact us today!'
  },

};

const FeatureDetailPage = () =>{
  const { id } = useParams();
  const location = useLocation();
  const feature = featureDetails[id];
  const featureImage = location.state?.image || referal1;
  console.log(feature);

  if (!feature) return <div>Feature not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-32">
        <img 
          src={featureImage}
          alt="Referral Programs" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {feature.title}
          </h1>
          <Link 
            to="/features" 
            className="mt-6 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100"
          >
            ← Back to Features
          </Link>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {feature.sections.map((section, index) => (
          <div key={index} className={`mb-16 flex flex-wrap items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start text-lg text-gray-700">
                    <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img 
                src={section.image} 
                alt={section.title} 
                className="w-full rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-xl p-8 shadow-inner">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-gray-700 mb-6">
            {feature.cta}
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeatureDetailPage;