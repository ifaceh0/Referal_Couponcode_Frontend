// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { demoData } from "../../utils/demoData";

// const LoginPage = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   // States for email, password, and error handling
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Check if slug exists in demo data
//     if (slug !== demoData.company.slug) {
//       setError("Invalid company URL.");
//       navigate(`/404`);
//       return;
//     }

//     // Authenticate with demo data
//     const user = demoData.user;
//     if (email === user.email && password === "123") {
//       // Redirect securely to client dashboard
//       navigate(`/${slug}/client`);
//     } else {
//       setError("Invalid login credentials.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center"
//       style={{ backgroundColor: demoData.company.colorPalette.primary }}
//     >
//       <img src={demoData.company.logo} alt="Logo" className="w-32 mb-6" />
//       <h1 className="text-2xl text-white mb-4">{demoData.company.name}</h1>
//       <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { demoData } from "../../utils/demoData";

const LoginPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // States for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // States for forgot password
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if slug exists in demo data
    if (slug !== demoData.company.slug) {
      setError("Invalid company URL.");
      navigate(`/404`);
      return;
    }

    // Authenticate with demo data
    const user = demoData.user;
    if (email === user.email && password === "123") {
      // Redirect securely to client dashboard
      navigate(`/${slug}/client`);
    } else {
      setError("Invalid login credentials.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordMessage("Please enter a valid email address");
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage("");

    try {
      // Replace this with your actual forgot password API call
      // const response = await forgotPasswordAPI(forgotPasswordEmail);
      
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setForgotPasswordMessage("Password reset link has been sent to your email address.");
    } catch (err) {
      console.error("Forgot password error:", err);
      setForgotPasswordMessage(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
    setError("");
  };

  if (showForgotPassword) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: demoData.company.colorPalette.primary }}
      >
        <img src={demoData.company.logo} alt="Logo" className="w-32 mb-6" />
        <h1 className="text-2xl text-white mb-4">{demoData.company.name}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
          <p className="text-gray-600 mb-4 text-sm text-center">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          {forgotPasswordMessage && (
            <p className={`mb-4 text-sm text-center ${
              forgotPasswordMessage.includes('sent') ? 'text-green-600' : 'text-red-500'
            }`}>
              {forgotPasswordMessage}
            </p>
          )}
          
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <button
              type="submit"
              disabled={forgotPasswordLoading}
              className={`w-full py-2 px-4 text-white rounded mb-4 transition-colors ${
                forgotPasswordLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-green-500 hover:bg-green-600"
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
          </form>
          
          <button
            onClick={toggleForgotPassword}
            className="w-full text-green-600 hover:text-green-800 font-medium text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: demoData.company.colorPalette.primary }}
    >
      <img src={demoData.company.logo} alt="Logo" className="w-32 mb-6" />
      <h1 className="text-2xl text-white mb-4">{demoData.company.name}</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
        >
          Login
        </button>
        
        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={toggleForgotPassword}
            className="text-green-600 hover:text-green-800 font-medium text-sm underline"
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;