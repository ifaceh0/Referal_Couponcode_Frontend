import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import referal1 from "../assets/referal1.png";
import referal2 from "../assets/referal2.png";
import referal3 from "../assets/referal3.png";


const features = [
  {
    id: '1',
    name: 'Custom Referral Programs',
    description: 'Create and manage tailor-made referral programs that align with your business goals and customer base.',
    image: referal1
  },
  {
    id: '2',
    name: 'Referral Tracking & Analytics',
    description: 'Monitor the performance of your referral campaigns with advanced analytics and real-time reporting.',
    image: referal2
  },
  {
    id: '3',
    name: 'Automated Referral Workflows',
    description: 'Automate your referral processes to save time and ensure consistency in customer interactions.',
    image: referal3
  },
  {
    id: '4',
    name: 'Customer Rewards & Incentives',
    description: 'Set up custom rewards and incentives to motivate customers to refer others and grow your business.',
    image: referal1
  },
  {
    id: '5',
    name: 'Referral Program Integrations',
    description: 'Easily integrate our referral platform with your existing CRM, email, and marketing tools for a seamless experience.',
    image: referal3
  },
  {
    id: '6',
    name: 'Referral Campaign Management',
    description: 'Effortlessly manage and optimize your referral campaigns from a single dashboard for better results.',
    image: referal2
  }
];

export default function ProductShowcase() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Key Features of Our Referral Software
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link 
              key={feature.id} 
              to={`/features/${feature.id}`} 
              className={`bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-2`}
            >
              <img className="w-full h-48 object-cover" src={feature.image} alt={feature.name} />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
