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

import React, { useState, useRef } from "react";
import { colorPalette } from "../../../utils/demoData";
import { loginShopkeeper } from "../../../api/signin";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const ShopkeeperSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  // Replace with your actual reCAPTCHA site key
  const RECAPTCHA_SITE_KEY = "6Lf_TIoqAAAAAAXYolwSahryD09PcdLptCEnQaQH";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value) => {
    // Value will be null when reCAPTCHA expires
    setIsCaptchaVerified(!!value);
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
    if (!isCaptchaVerified) {
      setError("Please verify you're not a robot");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Get the captcha token
      const captchaToken = captchaRef.current.getValue();
      
      const response = await loginShopkeeper({
        ...formData,
        captchaToken // Include the captcha token in your submission
      });
      
      console.log("Login successful:", response);
      navigate("/shopkeeper/dashboard"); // Redirect to shopkeeper dashboard
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      // Reset the captcha when there's an error
      captchaRef.current.reset();
      setIsCaptchaVerified(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
          Shopkeeper Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        
        {/* Add reCAPTCHA component */}
        <div className="mb-4">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>
        
        <button
          onClick={handleLogin}
          className={`w-full text-white py-2 px-4 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500"
          }`}
          style={{ backgroundColor: loading ? colorPalette.gray : colorPalette.primary }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default ShopkeeperSignIn;