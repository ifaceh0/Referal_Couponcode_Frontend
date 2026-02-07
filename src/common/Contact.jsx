import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, MessageSquare, Globe, MapPin, Send, HelpCircle, UserCheck, 
  CheckCircle, Loader2, RefreshCw 
} from 'lucide-react';
import { VITE_BACKEND_URL } from '../apiConfig';
import { getCurrentUser } from '../api/signin';
import { useNavigate } from 'react-router-dom';


const API_BASE = `${VITE_BACKEND_URL}/api/shopkeeperDashboard/contact`;

const Contact = () => {
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    role: '',
    applicationName: 'Referral & Coupon',    
    captchaInput: '',
  });

  const [captchaText, setCaptchaText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchingUser, setFetchingUser] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadUserData = async () => {
      setFetchingUser(true);
      setError('');

      try {
        const user = await getCurrentUser(); 

        if (!user) {
          throw new Error("No user data returned");
        }

        const fullName = user.name || user.details?.name || "";
        const email    = user.details?.email || user.email || "";
        const role     = user.role || "";

        setFormData(prev => ({
          ...prev,
          fullName,
          email,
          role,
        }));

      } catch (err) {
        console.error("Failed to load user in Contact:", err);
        setError("Couldn't load your account details. You can still fill the form manually.");
      } finally {
        setFetchingUser(false);
      }
    };

    loadUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 150, 50);

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, 150, 50);

    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#1e293b";
    ctx.save();
    ctx.translate(20, 35);
    ctx.rotate(-0.02 * Math.PI);
    ctx.fillText(text, 0, 0);
    ctx.restore();

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 150, Math.random() * 50);
      ctx.lineTo(Math.random() * 150, Math.random() * 50);
      ctx.stroke();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // CAPTCHA check
    if (formData.captchaInput.toUpperCase() !== captchaText) {
      setError('Invalid CAPTCHA. Please try again.');
      generateCaptcha();
      setFormData(prev => ({ ...prev, captchaInput: '' }));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData(prev => ({
        ...prev,
        subject: '',
        message: '',
        captchaInput: '',
      }));
      generateCaptcha();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 pt-14 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            How can we <span className="text-blue-500">help you?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Whether you're a brand looking to partner or a user with a question about your rewards, our team is here to assist.
          </p>
        </div>
      </section>

      {/* 2. CONTACT OPTIONS & FORM */}
      <main className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-bold mb-8 text-slate-900">Get in touch</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Email Us</p>
                    <p className="text-slate-500 text-sm italic">support@ifaceh.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Partnerships</p>
                    <p className="text-slate-500 text-sm italic">no-reply@ifaceh.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Our Hub</p>
                    <p className="text-slate-500 text-sm">123 Tech Plaza, Suite 400<br/>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-12 pt-8 border-t border-slate-100 flex gap-4 justify-center">
                <div className="w-10 h-10 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-all cursor-pointer flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
              </div> */}
            </div>

              <div className="bg-blue-600 p-8 rounded-xl text-white shadow-xl shadow-blue-200">
              <HelpCircle className="mb-4 opacity-50" size={32} />
              <h4 className="text-lg font-bold mb-2">Check the FAQ First!</h4>
              <p className="text-blue-100 text-sm mb-6">
                90% of questions regarding missing credits, referrals, coupons, and rewards are answered here.
              </p>

              <button
                onClick={() => navigate('/faq')} 
                className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition"
              >
                View Help Center / FAQ
              </button>
            </div>
          </div>

          {/* RIGHT: The Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">

              {isLoggedIn && (
                <div className="mb-6 p-2 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  {fetchingUser ? (
                    <p className="text-blue-600 animate-pulse">Loading your details...</p>
                  ) : (
                    <p className="text-blue-800 font-semibold">
                      Logged in as <span className="font-bold">{formData.fullName || 'User'}</span>
                      {formData.email && <span className="ml-2 text-sm">({formData.email})</span>}
                      {formData.role && <span className="block text-sm mt-1">Role: {formData.role}</span>}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="mb-6 p-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                  {error}
                </div>
              )}

              {submitted && (
                <div className="mb-6 p-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-green-800 font-bold text-lg flex items-center justify-center gap-3">
                  <CheckCircle size={24} />
                  Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Full Name {isLoggedIn && <span className="text-xs text-slate-500 ml-2">(auto-filled)</span>}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      readOnly={isLoggedIn}
                      required
                      placeholder="your full name"
                      className={`w-full p-2.5 rounded-lg border ${isLoggedIn ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50 focus:border-blue-500'}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Email {isLoggedIn && <span className="text-xs text-slate-500 ml-2">(auto-filled)</span>}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={isLoggedIn}
                      required
                      placeholder="your email address"
                      className={`w-full p-2.5 rounded-lg border ${isLoggedIn ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50 focus:border-blue-500'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Missing referral reward, Partnership inquiry, Technical help..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition resize-none"
                  />
                </div>

                {/* CAPTCHA */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Security Check</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-3">
                      <canvas
                        ref={canvasRef}
                        width={150}
                        height={50}
                        className="border-2 border-slate-300 rounded-lg bg-white"
                      />
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-3 bg-slate-200 hover:bg-slate-300 rounded-full transition"
                      >
                        <RefreshCw size={20} />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="captchaInput"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      placeholder="Enter code above"
                      required
                      className="flex-1 p-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                    loading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 active:scale-[0.98]'
                  } text-white`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={22} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Contact;