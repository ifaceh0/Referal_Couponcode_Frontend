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
              ReferralPro
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
                <Link to="/referral-programs" className="hover:text-white transition">Referral Programs</Link>
              </li>
              <li>
                <Link to="/coupons" className="hover:text-white transition">Coupon Codes</Link>
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
              <li>
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
              </li>
              <li>
                <Link to="/signup/user" className="hover:text-white transition">Sign Up Free</Link>
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
            © {currentYear} ReferralPro. All rights reserved.
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
      <Modal isOpen={modalOpen && modalType === 'privacy'} onClose={closeModal} title="Privacy Policy">
        <p>
            At ReferralPro (Interface Hub), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our platform.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number (if provided), and account credentials when you sign up or contact us.</li>
            <li><strong>Referral Data:</strong> Referral links, tracking IDs, and performance metrics (clicks, conversions) to attribute rewards correctly.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent, and referral activity for analytics and improvement.</li>
            <li><strong>Cookies & Tracking:</strong> We use cookies, pixels, and similar technologies to enhance user experience and measure performance.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our referral and coupon services</li>
            <li>Process and pay referral rewards and commissions</li>
            <li>Send transactional emails (e.g., account verification, reward notifications)</li>
            <li>Detect fraud, abuse, or violations of our Terms</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Merchant partners (only referral tracking IDs, no personal data)</li>
            <li>Payment processors (e.g., PayPal, Stripe) for reward payouts</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or delete your personal information</li>
            <li>Opt out of marketing emails</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-4">
            Contact us at support@referralpro.com to exercise these rights.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Security</h2>
          <p>We implement reasonable security measures to protect your data, but no system is 100% secure. You are responsible for keeping your login credentials safe.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">6. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or on the website.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at:
            <br />
            Email: support@ifaceh.com
          </p>
      </Modal>

      {/* Terms Modal */}
      <Modal isOpen={modalOpen && modalType === 'terms'} onClose={closeModal} title="Terms of Service">
        <p>
            Welcome to ReferralPro (operated by Interface Hub). These Terms of Service ("Terms") govern your use of our website, referral links, coupon codes, and related services. By accessing or using our platform, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">1. Use of the Service</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 13 years old (or the minimum age required in your country) to use our service.</li>
            <li>You may not use our platform for illegal activities, spam, fraud, or abuse.</li>
            <li>Referral links and coupon codes are provided for personal, non-commercial use unless otherwise stated.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Referral Program Rules</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Rewards are paid only for valid referrals (verified purchases or sign-ups).</li>
            <li>We reserve the right to withhold or reverse rewards for fraudulent activity, self-referrals, or policy violations.</li>
            <li>Payouts are processed via PayPal, bank transfer, or gift cards once the $10 minimum threshold is reached.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Coupon Codes & Accuracy</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Codes are community-verified but not guaranteed by us. Always test codes at checkout.</li>
            <li>We are not responsible for expired, invalid, or merchant-specific restrictions on coupons.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Intellectual Property</h2>
          <p>All content, trademarks, and referral links on our platform are owned by ReferralPro or our partners. You may not copy, reproduce, or distribute without permission.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Limitation of Liability</h2>
          <p>We provide the service "as is" and disclaim all warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">6. Termination</h2>
          <p>We may suspend or terminate your account at any time for violations of these Terms or applicable law.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">7. Governing Law</h2>
          <p>These Terms are governed by the laws of the United States and the State of [Your State, e.g., Delaware]. Any disputes will be resolved in the courts of [Your City/State].</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">8. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">9. Contact Us</h2>
          <p>
            Questions about these Terms? Reach out at:
            <br />
            Email: support@ifaceh.com
          </p>
      </Modal>
    </>
  );
}