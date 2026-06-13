import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  // const faqs = [
  //   {
  //     q: "How do I get my own referral code?",
  //     a: "Simply sign up for a free account, go to your dashboard, and click 'Generate Code' for any available brand."
  //   },
  //   {
  //     q: "Is it free to use?",
  //     a: "Yes! Our platform is 100% free for users to find coupons and share referral links."
  //   },
  //   {
  //     q: "When do I get my rewards?",
  //     a: "Rewards are processed within 24-48 hours after a successful referral is verified by the merchant. You can track this in your Earnings tab."
  //   },
  //   {
  //     q: "What if a coupon code doesn't work?",
  //     a: "We verify codes daily, but brands occasionally end promos early. If a code fails, please click the 'Report' button so our team can update it immediately."
  //   },
  //   {
  //     q: "How many friends can I refer?",
  //     a: "There is no limit! You can share your link with as many people as you like. The more people use your code, the more you earn."
  //   },
  //   {
  //     q: "Can I use multiple coupons on one order?",
  //     a: "This depends on the store's policy. Most brands only allow one coupon per transaction, but you can usually combine a coupon with a referral link."
  //   },
  //   {
  //     q: "How do I withdraw my earnings?",
  //     a: "Once you reach the minimum payout threshold ($10), you can withdraw your balance via PayPal, Bank Transfer, or Gift Cards."
  //   },
  //   {
  //     q: "Do my referral links ever expire?",
  //     a: "Most referral links stay active as long as the partner program exists. If a program is paused, we will notify you via email and your dashboard."
  //   }
  // ];
  const businessFaqs = [
    {
      q: "How do I launch a referral program?",
      a: "Create an account, configure rewards, define referral rules, and launch your campaign in minutes."
    },
    {
      q: "Is there a free trial?",
      a: "Yes. Businesses can explore PromoConnect and test referral campaigns before selecting a subscription plan."
    },
    {
      q: "How do I track conversions?",
      a: "Our analytics dashboard tracks referral clicks, signups, purchases, coupon redemptions, and campaign performance in real time."
    },
    {
      q: "Can I customize referral rewards?",
      a: "Absolutely. You can offer fixed rewards, percentage discounts, coupons, points, or custom incentives."
    },
    {
      q: "What integrations do you support?",
      a: "PromoConnect integrates with websites, e-commerce stores, QR codes, email campaigns, and custom applications through APIs."
    },
    {
      q: "Can I run coupon and referral campaigns together?",
      a: "Yes. Businesses can combine referral programs with coupon campaigns to maximize customer acquisition and retention."
    },
    {
      q: "How are rewards distributed?",
      a: "Rewards are automatically issued once referral conditions are met, reducing manual work."
    },
    {
      q: "Is customer data secure?",
      a: "Yes. We use secure authentication, encrypted communication, and access controls to protect customer information."
    }
  ];

  const userFaqs = [
    {
      q: "How do I get my own referral code?",
      a: "Simply sign up for an account and access your referral links or codes from your dashboard."
    },
    {
      q: "Is it free to use?",
      a: "Yes. Users can join referral programs and redeem coupons completely free of charge."
    },
    {
      q: "When do I receive my rewards?",
      a: "Rewards are credited once the referral or purchase is successfully verified by the business."
    },
    {
      q: "What if a coupon code doesn't work?",
      a: "Promotions may expire early. If a code fails, report it and our team will review it."
    },
    {
      q: "How many people can I refer?",
      a: "There is no limit. The more successful referrals you make, the more rewards you can earn."
    },
    {
      q: "Can I use multiple coupons on one order?",
      a: "This depends on the business policy. Most businesses allow one coupon per transaction."
    },
    {
      q: "How do I redeem my rewards?",
      a: "Rewards can be redeemed according to the program rules set by the business."
    },
    {
      q: "Do referral links expire?",
      a: "Most referral links remain active until the campaign ends or the business disables the program."
    }
  ];

  return (
    // <section className="py-10 bg-white border-t border-gray-100">
    //   <div className="max-w-6xl mx-auto px-6">
    //     <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
    //     <div className="space-y-4">
    //       {faqs.map((item, idx) => (
    //         <details
    //           key={idx}
    //           className="group p-5 bg-gray-50 rounded-lg cursor-pointer border border-transparent hover:border-blue-200 transition-all"
    //         >
    //           <summary className="flex justify-between items-center font-bold text-gray-900 list-none">
    //             {item.q}
    //             <ChevronDown className="group-open:rotate-180 transition-transform text-blue-600" />
    //           </summary>
    //           <div className="text-gray-600 mt-4 leading-relaxed border-t border-gray-200 pt-4 text-sm">
    //             {item.a}
    //           </div>
    //         </details>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-1">

        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* BUSINESS FAQ */}
          <div>
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              For Businesses
            </h3>

            <div className="w-20 h-1 bg-blue-600 rounded-full mb-8"></div>

            <div className="space-y-4">
              {businessFaqs.map((item, idx) => (
                <details
                  key={idx}
                  className="group p-3 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <summary className="flex justify-between items-center font-semibold cursor-pointer list-none">
                    {item.q}
                    <ChevronDown className="group-open:rotate-180 transition-transform text-blue-600" />
                  </summary>

                  <p className="mt-4 text-gray-600 border-t pt-4">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* USER FAQ */}
          <div>
            <h3 className="text-2xl font-bold text-orange-600 mb-2">
              For Users
            </h3>

            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

            <div className="space-y-4">
              {userFaqs.map((item, idx) => (
                <details
                  key={idx}
                  className="group p-3 bg-orange-50 rounded-xl border border-orange-100"
                >
                  <summary className="flex justify-between items-center font-semibold cursor-pointer list-none">
                    {item.q}
                    <ChevronDown className="group-open:rotate-180 transition-transform text-orange-500" />
                  </summary>

                  <p className="mt-4 text-gray-600 border-t pt-4">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;