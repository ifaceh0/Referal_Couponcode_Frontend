import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import referal1 from "../assets/referal1.png";
// import referal2 from "../assets/referal2.png";
// import referal3 from "../assets/referal3.png";
import referal1  from "../assets/re1.png";
import referal2 from "../assets/re_tracking.png";
import referal3 from "../assets/referal_integration.png";
import referal4 from "../assets/reward _incetives.png";
import referal5 from "../assets/referal_program_integration.png";
import referal6 from "../assets/referal_coupon_code_management_system.png"


const features = [
  {
    id: '1',
    name: 'Custom Referral / Coupon Programs',
    description: 'Boost your business with personalized Referral and Coupon Programs designed to reward your customers and drive growth. Whether you are looking to increase customer engagement, encourage repeat purchases, or expand your reach, our flexible programs make it easy.',
    image: referal1
  },
  {
    id: '2',
    name: 'Referral & Coupon Code Tracking Analysis',
    description: 'Maximize the impact of your referral and coupon programs with real-time tracking and data-driven insights. Our advanced analytics tools help you monitor performance,optimize rewards, and make informed decisions to boost conversions.',
    image: referal2
  },
  {
    id: '3',
    name: 'Referral & Coupon Code Program Integrations',
    description: 'Seamlessly integrate our Referral &amp; Coupon Code Programs with your existing stems for a hassle-free experience. Whether you are using eCommerce platforms,CRM tools, payment gateways, or marketing automation, our integrations ensure smooth operations and accurate tracking.',
    image: referal3
  },
  {
    id: '4',
    name: 'Customer Rewards & Incentives',
    description: 'Set up custom rewards and incentives to motivate customers to refer others and grow your business.',
    image: referal4
  },
  {
    id: '5',
    name: 'Referral Program Integrations',
    description: 'Easily integrate our referral platform with your existing CRM, email, and marketing tools for a seamless experience.',
    image: referal5
  },
  {
    id: '6',
    name: 'Referral & Coupon Code Campaign Management',
    description: 'Take full control of your Referral & Coupon Code Campaigns with our powerful management tools. From creating and customizing campaigns to tracking performance and optimizing results, our platform ensures your promotions drive real business growth.',
    image: referal6
  }
];

const ProductShowcase = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log(animate);
    setAnimate(true);
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Key Features of Our Referral Software
          </h2>
          <p className="text-xl text-gray-600">
            Discover powerful tools to grow your business through strategic referrals and promotions
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link 
              key={feature.id} 
              to={`/features/${feature.id}`} 
              state={{image:feature.image}}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold">
                  Learn More
                  <svg 
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductShowcase;