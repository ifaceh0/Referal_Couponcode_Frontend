// import React, { useState } from "react";
// import { colorPalette } from "../../../utils/demoData";
// import { loginShopkeeper } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";

// const ShopkeeperSignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await loginShopkeeper(formData); // Call the API
//       console.log("Login successful:", response);
//       // alert("Login successful!");
//       navigate("/shopkeeper/dashboard"); // Redirect to shopkeeper dashboard
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//           Shopkeeper Login
//         </h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button
//           onClick={handleLogin}
//           className={`w-full text-white py-2 px-4 rounded ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500"
//           }`}
//           style={{ backgroundColor: loading ? colorPalette.gray : colorPalette.primary }}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSignIn;



// import React, { useState } from "react";
// import { colorPalette } from "../../../utils/demoData";
// import { loginShopkeeper } from "../../../api/signin";

// const ShopkeeperSignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = () => {
//     console.log(formData);
//     alert("Login successful!");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//           Shopkeeper Login
//         </h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button
//           onClick={handleLogin}
//           className="w-full bg-purple-500 text-white py-2 px-4 rounded"
//           style={{ backgroundColor: colorPalette.primary }}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSignIn;



import React, { useState, useEffect } from "react";
import { colorPalette } from "../../../utils/demoData";
import { loginShopkeeper } from "../../../api/signin";
import { useNavigate } from "react-router-dom";

const ShopkeeperSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const navigate = useNavigate();

  // Generate random alphanumeric CAPTCHA (6 characters)
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Add slight distortion effect by randomly changing case
    captcha = captcha.split('').map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
    
    setCaptchaText(captcha);
    setUserCaptchaInput("");
    return captcha;
  };

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };

  const validateFields = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (userCaptchaInput !== captchaText) {
      setError("CAPTCHA verification failed");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await loginShopkeeper(formData);
      console.log("Login successful:", response);
      navigate("/shopkeeper/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      // Regenerate CAPTCHA on error
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const refreshCaptcha = () => {
    generateCaptcha();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
          Sign-In
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        {/* Alphanumeric CAPTCHA */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter the text below</label>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 flex items-center justify-center bg-gray-100 p-3 rounded">
              <span 
                className="text-2xl font-bold tracking-wider"
                style={{
                  fontFamily: "'Courier New', monospace",
                  color: '#333',
                  letterSpacing: '3px',
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(0,0,0,0.2)'
                }}
              >
                {captchaText}
              </span>
            </div>
            <button 
              type="button" 
              onClick={refreshCaptcha}
              className="p-2 text-purple-600 hover:text-purple-800 rounded-full hover:bg-purple-50"
              aria-label="Refresh CAPTCHA"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder="Type the characters above"
            value={userCaptchaInput}
            onChange={handleCaptchaChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-md transition-colors ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : "Login"}
        </button>
      </div>
    </div>
  );
};

export default ShopkeeperSignIn;