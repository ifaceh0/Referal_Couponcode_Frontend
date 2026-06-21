// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'


// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <div>
            
//             <p className="mt-2 text-sm text-gray-300">© 2026 Interface Hub. All rights reserved.</p>
//           </div>
//           <div className="flex space-x-6">
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Facebook</span>
//               <Facebook className="h-6 w-6" />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Twitter</span>
//               <Twitter className="h-6 w-6" />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">Instagram</span>
//               <Instagram className="h-6 w-6" />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <span className="sr-only">LinkedIn</span>
//               <Linkedin className="h-6 w-6" />
//             </a>
//           </div>
//         </div>
//         <div className="mt-8 border-t border-gray-700 pt-8">
//           <div className="flex justify-center space-x-6">
//             <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
//             <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
//             <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import Modal from './Modal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
              PromoConnect
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Earn real cash rewards and unlock exclusive coupons from top brands. Join thousands saving and earning every day.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck size={16} className="text-green-400" />
              <span>Secure & Trusted in the US</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">Help Center & FAQs</Link>
              </li>
              <li>
                <Link to="/referral-hub" className="hover:text-white transition">Referral Hub</Link>
              </li>
              <li>
                <Link to="/coupon-hub" className="hover:text-white transition">Coupon Hub</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
              {/* <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="hover:text-white transition"
                >
                  Terms of Service
                </button>
              </li> */}
              <li>
                <Link to="/signup/user" className="hover:text-white transition">Join Now</Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Stay Connected</h3>
            <div className="flex space-x-5 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={24} />
              </a>
            </div>

            {/* Optional: Email signup (can add later) */}
            <div className="text-sm text-gray-400">
              <p className="mb-2">Get the latest coupons & referral tips</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-5 rounded-r hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {currentYear} PromoConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-400" />
              Secure Payments
            </span>
            <button
                onClick={() => openModal('privacy')}
                className="hover:text-gray-300 transition"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openModal('terms')}
                className="hover:text-gray-300 transition"
              >
                Terms of Service
              </button>
          </div>
        </div>
      </div>
    </footer>

    {/* Privacy Modal */}
      <Modal
        isOpen={modalOpen && modalType === "privacy"}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <p>
          At <strong>PromoConnect</strong>, we value your privacy and are committed
          to protecting your personal information. This Privacy Policy explains how
          we collect, use, store, and safeguard your information when you use our
          referral, loyalty rewards, and coupon management platform.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p>We may collect the following types of information:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account Information:</strong> Name, email address, phone number,
            and account credentials provided during registration.
          </li>
          <li>
            <strong>Referral Information:</strong> Referral codes, referral activity,
            invited users, referral performance, and reward history.
          </li>
          <li>
            <strong>Coupon & Reward Data:</strong> Coupon issuance, coupon
            redemption, loyalty points earned, reward transactions, and related
            activity.
          </li>
          <li>
            <strong>Usage Data:</strong> Device information, browser type, IP
            address, pages visited, session duration, and interactions with our
            platform.
          </li>
          <li>
            <strong>Cookies & Tracking Technologies:</strong> Cookies and similar
            technologies used to improve user experience, remember preferences, and
            analyze platform performance.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <p>We use your information to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and maintain referral, loyalty, and coupon services.</li>
          <li>Track referrals and allocate rewards accurately.</li>
          <li>Manage loyalty points, coupons, and reward redemptions.</li>
          <li>Verify user identities and prevent fraudulent activities.</li>
          <li>Improve platform performance and user experience.</li>
          <li>
            Send service-related communications, account notifications, and support
            responses.
          </li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          3. Information Sharing
        </h2>
        <p>
          We do not sell, rent, or trade your personal information. We may share
          information with:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            Participating merchants and business partners for referral validation,
            reward processing, and coupon redemption.
          </li>
          <li>
            Trusted service providers that help us operate, maintain, and improve our
            platform.
          </li>
          <li>
            Government authorities or legal entities when required by applicable law.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          4. Data Security
        </h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards
          to protect your personal information from unauthorized access, disclosure,
          alteration, or destruction. However, no method of electronic transmission
          or storage is completely secure.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          5. Your Rights
        </h2>
        <p>You may have the right to:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Access and review your personal information.</li>
          <li>Update or correct inaccurate information.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Opt out of promotional communications.</li>
          <li>Request information about how your data is processed.</li>
        </ul>

        <p className="mt-4">
          To exercise these rights, please contact our support team.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          6. Data Retention
        </h2>
        <p>
          We retain your information only for as long as necessary to provide our
          services, maintain referral and reward records, comply with legal
          obligations, and resolve disputes.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          7. Third-Party Services
        </h2>
        <p>
          Our platform may integrate with third-party services such as analytics,
          communication, payment, and merchant systems. These providers may process
          information in accordance with their own privacy policies.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any material changes
          will be posted on this page, and where appropriate, we may notify users
          through email or platform announcements.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          9. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy or how your information
          is handled, please contact us:
          <br />
          Email: support@ifaceh.com
        </p>
      </Modal>

      {/* Terms Modal */}
      <Modal
        isOpen={modalOpen && modalType === "terms"}
        onClose={closeModal}
        title="Terms of Service"
      >
        <p>
          Welcome to <strong>PromoConnect</strong>. These Terms of Service
          ("Terms") govern your access to and use of our referral, loyalty rewards,
          coupon management, and promotional services. By accessing or using our
          platform, you agree to comply with and be bound by these Terms.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          1. Eligibility and Account Registration
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You must be at least 13 years old or meet the minimum legal age
            requirement in your jurisdiction.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your account
            credentials.
          </li>
          <li>
            You agree to provide accurate and complete information during
            registration and account usage.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          2. Referral Program Rules
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Referral rewards are granted only for valid and verified referrals that
            meet the requirements established by participating merchants.
          </li>
          <li>
            Self-referrals, duplicate accounts, fraudulent referrals, or any attempt
            to manipulate the referral system are strictly prohibited.
          </li>
          <li>
            PromoConnect reserves the right to review, withhold, reverse, or cancel
            rewards associated with suspicious or invalid referral activity.
          </li>
          <li>
            Reward eligibility, point values, and referral benefits may vary between
            participating merchants.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          3. Coupons and Promotional Offers
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Coupons, promotional offers, and discount codes are subject to merchant
            terms and conditions.
          </li>
          <li>
            PromoConnect does not guarantee the availability, validity, or
            applicability of any coupon or promotion.
          </li>
          <li>
            Merchants may modify, suspend, or discontinue offers at any time without
            prior notice.
          </li>
          <li>
            Coupons and rewards may not be sold, transferred, or exchanged unless
            explicitly permitted.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          4. Loyalty Points and Rewards
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Loyalty points and rewards are issued by participating merchants and are
            subject to their individual redemption policies.
          </li>
          <li>
            Points may expire according to merchant-defined expiration periods.
          </li>
          <li>
            PromoConnect is not responsible for merchant decisions regarding reward
            availability, redemption limits, or program changes.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          5. Acceptable Use
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You may not use the platform for unlawful, fraudulent, deceptive, or
            abusive activities.
          </li>
          <li>
            You may not attempt to gain unauthorized access to any portion of the
            platform or interfere with its operation.
          </li>
          <li>
            Automated abuse, spam referrals, fake transactions, and manipulation of
            rewards are strictly prohibited.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          6. Intellectual Property
        </h2>
        <p>
          All content, software, trademarks, logos, designs, and platform features
          available through PromoConnect are owned by PromoConnect or its licensors
          and are protected by applicable intellectual property laws.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          7. Limitation of Liability
        </h2>
        <p>
          PromoConnect provides its services on an "as available" basis. To the
          fullest extent permitted by law, we disclaim all warranties and shall not
          be liable for any indirect, incidental, special, consequential, or punitive
          damages arising from your use of the platform.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          8. Account Suspension and Termination
        </h2>
        <p>
          We reserve the right to suspend, restrict, or terminate accounts that
          violate these Terms, engage in fraudulent activity, or misuse the
          platform's referral, loyalty, or coupon systems.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          9. Changes to the Service
        </h2>
        <p>
          PromoConnect may modify, suspend, or discontinue any feature, reward
          program, coupon campaign, or service offering at any time without prior
          notice.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          10. Changes to These Terms
        </h2>
        <p>
          We may update these Terms periodically. Continued use of the platform after
          changes become effective constitutes acceptance of the revised Terms.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          11. Contact Us
        </h2>
        <p>
          If you have questions regarding these Terms of Service, please contact us:
          <br />
          Email: support@ifaceh.com
        </p>
      </Modal>
    </>
  );
}