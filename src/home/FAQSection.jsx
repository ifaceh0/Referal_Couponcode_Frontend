import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: "How do I get my own referral code?",
      a: "Simply sign up for a free account, go to your dashboard, and click 'Generate Code' for any available brand."
    },
    {
      q: "Is it free to use?",
      a: "Yes! Our platform is 100% free for users to find coupons and share referral links."
    },
    {
      q: "When do I get my rewards?",
      a: "Rewards are processed within 24-48 hours after a successful referral is verified by the merchant. You can track this in your Earnings tab."
    },
    {
      q: "What if a coupon code doesn't work?",
      a: "We verify codes daily, but brands occasionally end promos early. If a code fails, please click the 'Report' button so our team can update it immediately."
    },
    {
      q: "How many friends can I refer?",
      a: "There is no limit! You can share your link with as many people as you like. The more people use your code, the more you earn."
    },
    {
      q: "Can I use multiple coupons on one order?",
      a: "This depends on the store's policy. Most brands only allow one coupon per transaction, but you can usually combine a coupon with a referral link."
    },
    {
      q: "How do I withdraw my earnings?",
      a: "Once you reach the minimum payout threshold ($10), you can withdraw your balance via PayPal, Bank Transfer, or Gift Cards."
    },
    {
      q: "Do my referral links ever expire?",
      a: "Most referral links stay active as long as the partner program exists. If a program is paused, we will notify you via email and your dashboard."
    }
  ];

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group p-5 bg-gray-50 rounded-lg cursor-pointer border border-transparent hover:border-blue-200 transition-all"
            >
              <summary className="flex justify-between items-center font-bold text-gray-900 list-none">
                {item.q}
                <ChevronDown className="group-open:rotate-180 transition-transform text-blue-600" />
              </summary>
              <div className="text-gray-600 mt-4 leading-relaxed border-t border-gray-200 pt-4 text-sm">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;