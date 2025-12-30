// orignal code

// import React, { useState, useEffect } from "react";
// import { colorPalette } from "../../../utils/demoData";
// import { loginShopkeeper } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from '../../../api/signin';


// const ShopkeeperSignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [captchaText, setCaptchaText] = useState("");
//   const [userCaptchaInput, setUserCaptchaInput] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
//   const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
//   const navigate = useNavigate();

//   // Generate random alphanumeric CAPTCHA (6 characters)
//   const generateCaptcha = () => {
//     const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
//     let captcha = '';
//     for (let i = 0; i < 6; i++) {
//       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
    
//     // Add slight distortion effect by randomly changing case
//     captcha = captcha.split('').map(char => {
//       return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
//     }).join('');
    
//     setCaptchaText(captcha);
//     setUserCaptchaInput("");
//     return captcha;
//   };

//   // Initialize CAPTCHA on component mount
//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCaptchaChange = (e) => {
//     setUserCaptchaInput(e.target.value);
//   };

//   const validateFields = () => {
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     if (!formData.password || formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }
//     if (userCaptchaInput !== captchaText) {
//       setError("CAPTCHA verification failed");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (!validateFields()) return;
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await loginShopkeeper(formData);
//       // const role = localStorage.getItem("role");
//       console.log("Login successful:", response);
//       if(response != null){
//       const user = await getCurrentUser();
//       if(user.role === 'USER'){
//         navigate("/shopkeeper/referredCustomerDashBoard");
//       }
//       else if(user.role === 'SHOPKEEPER'){
//         navigate("/shopkeeper/dashboard");
//       }
//       else if(user.role === 'SHOP_EMPLOYEE'){
//         navigate("/shopkeeper/interaction-panel");
//       }
//       }
      
      
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed. Please try again.");
//       // Regenerate CAPTCHA on error
//       generateCaptcha();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
//       setForgotPasswordMessage("Please enter a valid email address");
//       return;
//     }

//     setForgotPasswordLoading(true);
//     setForgotPasswordMessage("");

//     try {
//       // Replace this with your actual forgot password API call
//       // const response = await forgotPasswordAPI(forgotPasswordEmail);
      
//       // Simulating API call for now
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       setForgotPasswordMessage("Password reset link has been sent to your email address.");
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       setForgotPasswordMessage(err.message || "Failed to send reset email. Please try again.");
//     } finally {
//       setForgotPasswordLoading(false);
//     }
//   };

//   const refreshCaptcha = () => {
//     generateCaptcha();
//   };

//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setForgotPasswordEmail("");
//     setForgotPasswordMessage("");
//     setError(null);
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//             Forgot Password
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Enter your email address and we'll send you a link to reset your password.
//           </p>
          
//           {forgotPasswordMessage && (
//             <p className={`mb-4 ${forgotPasswordMessage.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
//               {forgotPasswordMessage}
//             </p>
//           )}
          
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={forgotPasswordEmail}
//               onChange={(e) => setForgotPasswordEmail(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
          
//           <button
//             onClick={handleForgotPassword}
//             disabled={forgotPasswordLoading}
//             className={`w-full text-white py-2 px-4 rounded-md transition-colors mb-4 ${
//               forgotPasswordLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
//             }`}
//           >
//             {forgotPasswordLoading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Sending...
//               </span>
//             ) : "Send Reset Link"}
//           </button>
          
//           <button
//             onClick={toggleForgotPassword}
//             className="w-full text-purple-600 hover:text-purple-800 font-medium"
//           >
//             Back to Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//           Sign-In
//         </h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
        
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
        
//         {/* Alphanumeric CAPTCHA */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Enter the text below</label>
//           <div className="flex items-center gap-2 mb-2">
//             <div className="flex-1 flex items-center justify-center bg-gray-100 p-3 rounded">
//               <span 
//                 className="text-2xl font-bold tracking-wider"
//                 style={{
//                   fontFamily: "'Courier New', monospace",
//                   color: '#333',
//                   letterSpacing: '3px',
//                   textDecoration: 'line-through',
//                   textDecorationColor: 'rgba(0,0,0,0.2)'
//                 }}
//               >
//                 {captchaText}
//               </span>
//             </div>
//             <button 
//               type="button" 
//               onClick={refreshCaptcha}
//               className="p-2 text-purple-600 hover:text-purple-800 rounded-full hover:bg-purple-50"
//               aria-label="Refresh CAPTCHA"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//           <input
//             type="text"
//             placeholder="Type the characters above"
//             value={userCaptchaInput}
//             onChange={handleCaptchaChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>
        
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`w-full text-white py-2 px-4 rounded-md transition-colors mb-4 ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center gap-2">
//               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Logging in...
//             </span>
//           ) : "Login"}
//         </button>
        
//         {/* Forgot Password Link */}
//         <div className="text-center">
//           <button
//             onClick={toggleForgotPassword}
//             className="text-purple-600 hover:text-purple-800 font-medium text-sm underline"
//           >
//             Forgot your password?
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSignIn;











// // update code for multi role 

// import React, { useState, useEffect } from "react";
// import { colorPalette } from "../../../utils/demoData";
// import { loginShopkeeper, getRoles } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from '../../../api/signin';
// import { User, Store, Users } from "lucide-react"; // Icons for roles

// const ShopkeeperSignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [captchaText, setCaptchaText] = useState("");
//   const [userCaptchaInput, setUserCaptchaInput] = useState("");
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
//   const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
//   const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

//   // Multi-role states
//   const [step, setStep] = useState(1); // 1 = credentials, 2 = role cards
//   const [possibleRoles, setPossibleRoles] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("");

//   const navigate = useNavigate();

//   // Generate CAPTCHA
//   const generateCaptcha = () => {
//     const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
//     let captcha = '';
//     for (let i = 0; i < 6; i++) {
//       captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     captcha = captcha.split('').map(char => {
//       return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
//     }).join('');
//     setCaptchaText(captcha);
//     setUserCaptchaInput("");
//     return captcha;
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCaptchaChange = (e) => {
//     setUserCaptchaInput(e.target.value);
//   };

//   const validateFields = () => {
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     if (!formData.password || formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }
//     if (userCaptchaInput !== captchaText) {
//       setError("CAPTCHA verification failed");
//       generateCaptcha();
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (step === 1) {
//       if (!validateFields()) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const roles = await getRoles({
//           email: formData.email,
//           password: formData.password
//         });

//         if (roles.length === 1) {
//           // Single role → auto login
//           await loginShopkeeper({
//             email: formData.email,
//             password: formData.password,
//             role: roles[0]
//           });
//           const user = await getCurrentUser();
//           navigateBasedOnRole(user.role);
//         } else if (roles.length > 1) {
//           // Multi role → show role cards
//           setPossibleRoles(roles);
//           setStep(2);
//         } else {
//           setError("No roles found for this account");
//         }
//       } catch (err) {
//         console.error("Get roles error:", err);
//         setError(err.message || "Invalid email or password");
//         generateCaptcha();
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (step === 2) {
//       if (!selectedRole) {
//         setError("Please select a role");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         await loginShopkeeper({
//           email: formData.email,
//           password: formData.password,
//           role: selectedRole
//         });

//         const user = await getCurrentUser();
//         navigateBasedOnRole(user.role);
//       } catch (err) {
//         console.error("Login error:", err);
//         setError(err.message || "Login failed");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const navigateBasedOnRole = (role) => {
//     if (role === 'USER') {
//       navigate("/shopkeeper/referrerdashboard");
//     } else if (role === 'SHOPKEEPER') {
//       navigate("/shopkeeper/dashboard");
//     } else if (role === 'SHOP_EMPLOYEE') {
//       navigate("/shopkeeper/interaction-panel");
//     }
//   };

//   const getRoleInfo = (role) => {
//     switch (role) {
//       case 'SHOPKEEPER':
//         return { name: "Shopkeeper", icon: Store, color: "bg-purple-600" };
//       case 'USER':
//         return { name: "Customer", icon: User, color: "bg-green-600" };
//       case 'SHOP_EMPLOYEE':
//         return { name: "Shop Employee", icon: Users, color: "bg-blue-600" };
//       default:
//         return { name: role, icon: User, color: "bg-gray-600" };
//     }
//   };

//   const handleRoleSelect = (role) => {
//     setSelectedRole(role);
//     setError(null);
//   };

//   const refreshCaptcha = () => generateCaptcha();

//   const toggleForgotPassword = () => {
//     setShowForgotPassword(!showForgotPassword);
//     setForgotPasswordEmail("");
//     setForgotPasswordMessage("");
//     setError(null);
//     setStep(1);
//     setPossibleRoles([]);
//     setSelectedRole("");
//   };

//   const handleForgotPassword = async () => {
//     if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
//       setForgotPasswordMessage("Please enter a valid email address");
//       return;
//     }

//     setForgotPasswordLoading(true);
//     setForgotPasswordMessage("");

//     try {
//       const response = await fetch("https://referral-couponcode-backend.onrender.com/refer/api/auth/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: forgotPasswordEmail }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to send reset link");
//       }

//       setForgotPasswordMessage(data.message || "Password reset link has been sent to your email!");
//       setTimeout(() => {
//         toggleForgotPassword();
//       }, 3000);
//     } catch (err) {
//       setForgotPasswordMessage(err.message || "Failed to send reset link. Please try again.");
//     } finally {
//       setForgotPasswordLoading(false);
//     }
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//             Forgot Password
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Enter your email address and we'll send you a link to reset your password.
//           </p>
          
//           {forgotPasswordMessage && (
//             <p className={`mb-4 ${forgotPasswordMessage.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
//               {forgotPasswordMessage}
//             </p>
//           )}
          
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={forgotPasswordEmail}
//               onChange={(e) => setForgotPasswordEmail(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
          
//           <button
//             onClick={handleForgotPassword}
//             disabled={forgotPasswordLoading}
//             className={`w-full text-white py-2 px-4 rounded-md transition-colors mb-4 ${
//               forgotPasswordLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
//             }`}
//           >
//             {forgotPasswordLoading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Sending...
//               </span>
//             ) : "Send Reset Link"}
//           </button>
          
//           <button
//             onClick={toggleForgotPassword}
//             className="w-full text-purple-600 hover:text-purple-800 font-medium"
//           >
//             Back to Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//           Sign-In
//         </h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         {/* STEP 1: Email, Password, CAPTCHA */}
//         {step === 1 && (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Enter the text below</label>
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="flex-1 flex items-center justify-center bg-gray-100 p-2 rounded">
//                   <span className="text-2xl font-bold tracking-wider" style={{
//                     fontFamily: "'Courier New', monospace",
//                     color: '#333',
//                     letterSpacing: '3px',
//                     textDecoration: 'line-through',
//                     textDecorationColor: 'rgba(0,0,0,0.2)'
//                   }}>
//                     {captchaText}
//                   </span>
//                 </div>
//                 <button type="button" onClick={refreshCaptcha}
//                   className="p-2 text-purple-600 hover:text-purple-800 rounded-full hover:bg-purple-50">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Type the characters above"
//                 value={userCaptchaInput}
//                 onChange={handleCaptchaChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className={`w-full text-white py-2 px-4 rounded transition-colors mb-2 ${
//                 loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Checking...
//                 </span>
//               ) : "Continue"}
//             </button>
//           </>
//         )}

//         {/* STEP 2: Role Cards (only if multi-role) */}
//         {step === 2 && (
//           <>
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
//                 Choose how you want to sign in:
//               </h3>
//               <div className="space-y-2">
//                 {possibleRoles.map((role) => {
//                   const { name, icon: Icon, color } = getRoleInfo(role);
//                   const isSelected = selectedRole === role;

//                   return (
//                     <div
//                       key={role}
//                       onClick={() => handleRoleSelect(role)}
//                       className={`p-3 rounded border-2 cursor-pointer transition-all transform hover:scale-105 ${
//                         isSelected
//                           ? "border-green-600 shadow-lg ring-2 ring-green-300"
//                           : "border-gray-300 hover:border-gray-400"
//                       } bg-white`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className={`p-2 rounded-full text-white ${color}`}>
//                             <Icon size={24} />
//                           </div>
//                           <div>
//                             <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
//                             <p className="text-sm text-gray-600">Access your {name.toLowerCase()} dashboard</p>
//                           </div>
//                         </div>
//                         {isSelected && (
//                           <div className="text-purple-600">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <button
//               onClick={handleLogin}
//               disabled={loading || !selectedRole}
//               className={`w-full text-white py-2 px-4 rounded transition-colors mb-4 ${
//                 loading || !selectedRole
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-purple-600 hover:bg-purple-700"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : "Login"}
//             </button>

//             <button
//               onClick={() => setStep(1)}
//               className="w-full text-purple-600 hover:text-purple-800 font-medium text-sm"
//             >
//               ← Back to credentials
//             </button>
//           </>
//         )}

//         {/* Forgot Password Link */}
//         <div className="text-center">
//           <button
//             onClick={toggleForgotPassword}
//             className="text-purple-600 hover:text-purple-800 font-medium text-sm underline"
//           >
//             Forgot your password?
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSignIn;










// update code for multi role & multi shop employee
import React, { useState, useEffect } from "react";
import { colorPalette } from "../../../utils/demoData";
import { loginShopkeeper, getRoles, getEmployeeShops } from "../../../api/signin"; // ← ADDED: getEmployeeShops
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../../api/signin';
import { User, Store, Users } from "lucide-react"; // Icons for roles

const ShopkeeperSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  // Multi-role states
  const [step, setStep] = useState(1); // 1 = credentials, 2 = role cards, 3 = shop selection ← ADDED step 3
  const [possibleRoles, setPossibleRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  // ← ADDED FOR MULTI-SHOP EMPLOYEE SUPPORT
  const [employeeShops, setEmployeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const navigate = useNavigate();

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captcha = captcha.split('').map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }).join('');
    setCaptchaText(captcha);
    setUserCaptchaInput("");
    return captcha;
  };

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
      generateCaptcha();
      return false;
    }
    return true;
  };

  // ← ADDED FOR MULTI-SHOP EMPLOYEE SUPPORT: Helper to perform actual login
  const performLogin = async (shopkeeperId = null) => {
    setLoading(true);
    setError(null);
    try {
      if (shopkeeperId === null && selectedRole === "SHOP_EMPLOYEE") {
        setError("Shop not selected");
        return;
      }

      await loginShopkeeper({
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        shopkeeperId: shopkeeperId
      });

      const user = await getCurrentUser();
      navigateBasedOnRole(user.role);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (step === 1) {
      if (!validateFields()) return;

      setLoading(true);
      setError(null);

      try {
        const roles = await getRoles({
          email: formData.email,
          password: formData.password
        });

        if (roles.length === 1) {
          // ← ADDED: Handle single SHOP_EMPLOYEE role with auto shop selection
          if (roles[0] === "SHOP_EMPLOYEE") {
            setSelectedRole(roles[0]);
            const shops = await getEmployeeShops(formData.email);
            setEmployeeShops(shops);
            if (shops.length === 1) {
              await performLogin(shops[0].shopkeeperId);
            } else {
              setStep(3);
            }
            return;
          }

          // Existing single role logic (USER or SHOPKEEPER)
          await loginShopkeeper({
            email: formData.email,
            password: formData.password,
            role: roles[0]
          });
          const user = await getCurrentUser();
          navigateBasedOnRole(user.role);
        } else if (roles.length > 1) {
          // Existing multi-role logic
          setPossibleRoles(roles);
          setStep(2);
        } else {
          setError("No roles found for this account");
        }
      } catch (err) {
        console.error("Get roles error:", err);
        setError(err.message || "Invalid email or password");
        generateCaptcha();
      } finally {
        setLoading(false);
      }
    }

    if (step === 2) {
      if (!selectedRole) {
        setError("Please select a role");
        return;
      }

      // ← ADDED: If SHOP_EMPLOYEE selected → go to shop selection
      if (selectedRole === "SHOP_EMPLOYEE") {
        setLoading(true);
        try {
          const shops = await getEmployeeShops(formData.email);
          setEmployeeShops(shops);
          if (shops.length === 1) {
            await performLogin(shops[0].shopkeeperId);
          } else {
            setStep(3);
          }
        } catch (err) {
          setError("Failed to load your shops");
        } finally {
          setLoading(false);
        }
        return;
      }

      // Existing normal role login
      await performLogin();
    }

    // ← ADDED FOR MULTI-SHOP EMPLOYEE SUPPORT: Shop selection step
    if (step === 3) {
      if (!selectedShop) {
        setError("Please select a shop");
        return;
      }
      await performLogin(selectedShop.shopkeeperId);
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === 'USER') {
      navigate("/shopkeeper/referrerdashboard");
    } else if (role === 'SHOPKEEPER') {
      navigate("/shopkeeper/dashboard");
    } else if (role === 'SHOP_EMPLOYEE') {
      navigate("/shopkeeper/interaction-panel");
    }
  };

  const getRoleInfo = (role) => {
    switch (role) {
      case 'SHOPKEEPER':
        return { name: "Shopkeeper", icon: Store, color: "bg-purple-600" };
      case 'USER':
        return { name: "Customer", icon: User, color: "bg-green-600" };
      case 'SHOP_EMPLOYEE':
        return { name: "Shop Employee", icon: Users, color: "bg-blue-600" };
      default:
        return { name: role, icon: User, color: "bg-gray-600" };
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError(null);
  };

  const refreshCaptcha = () => generateCaptcha();

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
    setError(null);
    setStep(1);
    setPossibleRoles([]);
    setSelectedRole("");
    // ← ADDED: Reset shop states
    setEmployeeShops([]);
    setSelectedShop(null);
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordMessage("Please enter a valid email address");
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    try {
      const response = await fetch("https://referral-couponcode-backend.onrender.com/refer/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset link");
      }

      setForgotPasswordMessage(data.message || "Password reset link has been sent to your email!");
      setTimeout(() => {
        toggleForgotPassword();
      }, 3000);
    } catch (err) {
      setForgotPasswordMessage(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
            Forgot Password
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          {forgotPasswordMessage && (
            <p className={`mb-4 ${forgotPasswordMessage.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
              {forgotPasswordMessage}
            </p>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button
            onClick={handleForgotPassword}
            disabled={forgotPasswordLoading}
            className={`w-full text-white py-2 px-4 rounded-md transition-colors mb-4 ${
              forgotPasswordLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {forgotPasswordLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Reset Link"}
          </button>
          
          <button
            onClick={toggleForgotPassword}
            className="w-full text-purple-600 hover:text-purple-800 font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
          Sign-In
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* STEP 1: Email, Password, CAPTCHA */}
        {step === 1 && (
          <>
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

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter the text below</label>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 flex items-center justify-center bg-gray-100 p-2 rounded">
                  <span className="text-2xl font-bold tracking-wider" style={{
                    fontFamily: "'Courier New', monospace",
                    color: '#333',
                    letterSpacing: '3px',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(0,0,0,0.2)'
                  }}>
                    {captchaText}
                  </span>
                </div>
                <button type="button" onClick={refreshCaptcha}
                  className="p-2 text-purple-600 hover:text-purple-800 rounded-full hover:bg-purple-50">
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
              className={`w-full text-white py-2 px-4 rounded transition-colors mb-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </span>
              ) : "Continue"}
            </button>
          </>
        )}

        {/* STEP 2: Role Cards (unchanged) */}
        {step === 2 && (
          <>
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-center mb-2 text-gray-800">
                Welcome Back!
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Please select how you want to sign in today
              </p>

              <div className="space-y-3">
                {possibleRoles.map((role) => {
                  const { name, icon: Icon, color } = getRoleInfo(role);
                  const isSelected = selectedRole === role;

                  return (
                    <div
                      key={role}
                      onClick={() => handleRoleSelect(role)}
                      className={`
                        relative p-2 rounded border-2 transition-all duration-300 cursor-pointer
                        shadow-lg hover:shadow-2xl transform hover:-translate-y-1
                        ${isSelected
                          ? "border-cyan-500 bg-cyan-50 ring-4 ring-cyan-100"
                          : "border-gray-200 bg-white hover:border-gray-300"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded ${isSelected ? color : "bg-gray-300"} text-white shadow-md`}>
                            <Icon size={22} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">{name}</h4>
                            <p className="text-gray-600 mt-1">
                              Sign in as a <span className="font-medium">{name.toLowerCase()}</span>
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-5 right-4">
                            <div className="bg-cyan-600 text-white rounded-full p-1 shadow-lg">
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !selectedRole}
              className={`
                w-full py-2 px-6 rounded font-bold text-lg shadow-xl transition-all duration-300
                ${loading || !selectedRole
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                }
              `}
            >
              {loading ? "Signing you in..." : "Login →"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-center text-cyan-600 hover:text-cyan-800 font-medium mt-5"
            >
              ← Change email or password
            </button>
          </>
        )}

        {/* --- IMPROVED: Shop Selection (Step 3) --- */}
        {step === 3 && (
          <>
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-center mb-3 text-gray-800">
                Choose Your Shop
              </h3>
              <p className="text-center text-gray-600 mb-6 max-w-md mx-auto">
                You are an employee at multiple locations. Please select the shop you want to manage today.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employeeShops.map((shop) => {
                  const isSelected = selectedShop?.shopkeeperId === shop.shopkeeperId;

                  return (
                    <div
                      key={shop.shopkeeperId}
                      onClick={() => {
                        setSelectedShop({
                          shopkeeperId: shop.shopkeeperId,
                          shopName: shop.shopName
                        });
                        setError(null);
                      }}
                      className={`
                        relative p-2 rounded border-2 transition-all duration-300 cursor-pointer
                        shadow-xl hover:shadow-2xl transform hover:-translate-y-2 text-center
                        ${isSelected
                          ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 ring-4 ring-cyan-100"
                          : "border-gray-200 bg-white hover:border-gray-300"
                        }
                      `}
                    >
                      {/* Shop Icon */}
                      <div className="mb-1 mt-1">
                        <div className={`inline-flex p-2 rounded ${isSelected ? "bg-cyan-600" : "bg-gray-300"} text-white shadow-lg`}>
                          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      </div>

                      <h4 className="text-lg font-extrabold text-gray-800 mb-1">
                        {shop.shopName}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Shop ID: {shop.shopkeeperId}
                      </p>

                      {isSelected && (
                        <div className="absolute -top-3 -right-3">
                          <div className="bg-cyan-600 text-white rounded-full p-2 shadow-2xl">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !selectedShop}
              className={`
                w-full py-2 px-8 rounded font-bold text-xl shadow-2xl transition-all duration-300
                ${loading || !selectedShop
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                }
              `}
            >
              {loading ? "Accessing Dashboard..." : "Enter Dashboard →"}
            </button>

            <button
              onClick={() => setStep(2)}
              className="w-full text-center text-cyan-600 hover:text-cyan-800 font-medium mt-5"
            >
              ← Back to account type
            </button>
          </>
        )}
        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <button
            onClick={toggleForgotPassword}
            className="text-purple-600 hover:text-purple-800 font-medium text-sm underline"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperSignIn;