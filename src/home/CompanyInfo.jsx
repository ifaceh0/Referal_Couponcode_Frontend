
// import { Link } from "react-router-dom";

export default function CompanyInfo() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Welcome to ReferralPro Solutions
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl">
          We specialize in delivering cutting-edge <b className="text-black">referral and coupon code
          solutions </b>that help businesses grow organically through word-of-mouth
          and strategic promotions. Our platform offers seamless integrations,
          actionable analytics, and automated workflows to maximize your
         <b className="text-black"> referral potential and coupon-based conversions.</b> Whether you&#39;re
          rewarding loyal customers or driving new sales, we make it easy to
          launch and manage effective programs.
        </p>
        {/* <div className="mt-8">
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Learn More
          </Link>
        </div> */}
      </div>
    </section>
  );
}
