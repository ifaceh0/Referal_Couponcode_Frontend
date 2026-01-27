import React from 'react';
import FAQSection from '../home/FAQSection'; 
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-8 py-4 text-center">
            <button
                onClick={() => navigate(-1)}
                className="mb-2 flex items-center text-white hover:text-yellow-300 font-medium"
                >
                <ArrowLeft size={20} className="mr-2" />
                Back to Contact
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Help Center & FAQs</h1>
            <p className="text-blue-100 text-lg max-w-5xl mx-auto">
              Find quick answers to the most common questions about referrals, coupons, rewards, and more.
            </p>
          </div>

          <div className="p-4 md:p-4">
            <FAQSection />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;