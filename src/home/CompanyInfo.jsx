import React from 'react';
import { Link } from 'react-router-dom';

export default function CompanyInfo() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Welcome to ReferralPro Solutions
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl">
          We specialize in delivering cutting-edge referral software that empowers businesses to grow organically through word-of-mouth. 
          From seamless integrations to actionable analytics, our platform is designed to help you maximize your referral potential.
        </p>
        <div className="mt-8">
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
