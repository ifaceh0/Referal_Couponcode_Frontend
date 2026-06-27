// import React, { useState,useEffect } from "react";
// import { signupUser,checkUserStatus } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import PhoneInput from "react-phone-input-2";
// // import "react-phone-input-2/lib/style.css";
// import PhoneInputField from "../../../components/ui/PhoneInputField";



// const InputField = ({ label, type, name, value, onChange, error }) => (
//   <div className="mb-4 w-full">
//     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full h-12 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

// /* const PhoneInputField = ({ label, name, value, onChange, error }) => (
//   <div className="mb-4 w-full">
//     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
//     <PhoneInput
//       country={"us"}
//       onlyCountries={["us", "ca"]}
//       value={value}
//       isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
//       // onChange={(phone, countryData) => {
//       //   const dialCode = countryData?.dialCode || "";
//       //   const nationalNumber = phone.startsWith(dialCode)
//       //     ? phone.slice(dialCode.length)
//       //     : phone;

//       //   onChange({ target: { name, value: nationalNumber } });
//       // }}

//       onChange={(phone, countryData) => {
//           const nationalNumber = phone.replace(`+${countryData?.dialCode}`, "");
//           onChange({ target: { name, value: nationalNumber } });
//         }}
//         inputProps={{
//           name,
//           required: true
//         }}
//       inputClass="!w-full !h-12 !p-3 !pl-14 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500 !transition-all"
//       containerClass="w-full"
//       buttonClass="!h-12"
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// ); */

// // To have the front end ph# input to be displayed with Country Code (+1), Area Code (xxx), Ph# (xxx-xxxx) format
// // const PhoneInputField = ({ label, name, value, onChange, error }) => (
// //   <div className="mb-4 w-full">
// //     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
// //     <div className="relative w-full">
// //       <PhoneInput
// //         country={"us"}
// //         onlyCountries={["us", "ca"]}
// //         isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
// //         countryCodeEditable={false}
// //         value={value}
// //         onChange={(phone) => {
// //           onChange({ target: { name, value: phone } });
// //         }}
// //         inputProps={{
// //           name,
// //           required: true
// //         }}
// //         inputClass="!w-full !h-12 !p-3 !pl-16 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500"
// //         buttonClass="!h-12"
// //         containerClass="!w-full"
// //         specialLabel="" // Removes default label
// //       />
// //     </div>
// //     {error && <span className="text-red-500 text-sm">{error}</span>}
// //   </div>
// // );


// const generateCaptcha = () => {
//   const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let captcha = "";
//   for (let i = 0; i < 6; i++) {
//     captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return captcha;
// };

// const UserSignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [referralCode, setReferralCode] = useState("");
//   const [captchaText, setCaptchaText] = useState(generateCaptcha());
//   const [userCaptchaInput, setUserCaptchaInput] = useState("");
// //   const [userStatus, setUserStatus] = useState({
// //   existingUser: false,
// //   passwordMatched: true,
// // });
// const [checkInProgress, setCheckInProgress] = useState(false);

//   const navigate = useNavigate();
//   // const [phoneNumber, setPhone] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateFields = () => {
//     const fieldErrors = {};
//     if (!formData.name.trim()) {
//       fieldErrors.name = "Name is required.";
//     }
//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       fieldErrors.email = "Invalid email address.";
//     }
//     if (formData.password.length < 6) {
//       fieldErrors.password = "Password must be at least 6 characters.";
//     }
//     if (formData.confirmPassword !== formData.password) {
//       fieldErrors.confirmPassword = "Passwords do not match.";
//     }
//     if (userCaptchaInput !== captchaText) {
//       fieldErrors.captcha = "CAPTCHA verification failed. Please try again.";
//     }

//     if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
//       fieldErrors.phoneNumber = "Enter a valid 10-digit phone number.";
//     } else if (formData.phoneNumber.startsWith("0")) {
//        fieldErrors.phoneNumber =
//         "Phone number's area code cannot start with 0.";
//       }


//       setErrors(fieldErrors);
//       return Object.keys(fieldErrors).length === 0;
//   };

//   const handleSignUpClick = () => {
//     if (!validateFields()) return;
//     setShowPopup(true);
//   };

//   const handlePopupSubmit = async () => {
//     setShowPopup(false);
//     const toastId = toast.loading("Signing up...", {
//       theme: "colored",
//       progressStyle: { background: "#7c3aed" },
//     });
//     console.log("Referral Code before submit:", referralCode); 
//     try {
//       const { confirmPassword, ...submitData } = formData;
//       const responseMessage = await signupUser(
//         submitData,
//         referralCode,
//       );

//       toast.update(toastId, {
//         render: responseMessage || "Signup successful! Redirecting...",
//         type: "success",
//         autoClose: 5000,
//         isLoading: false,
//       });

//       setFormData({
//         name: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         confirmPassword: "",
//       });
//       setReferralCode("");
//       setUserCaptchaInput("");
//       setCaptchaText(generateCaptcha());

//       setTimeout(() => navigate("/signin"), 5000);
//     } catch (err) {
//       toast.update(toastId, {
//         render: err.message || "Signup failed. Please try again.",
//         type: "error",
//         autoClose: 5000,
//         isLoading: false,
//       });
//       setUserCaptchaInput("");
//       setCaptchaText(generateCaptcha());
//     }
//   };

//   const refreshCaptcha = () => {
//     setCaptchaText(generateCaptcha());
//     setUserCaptchaInput("");
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
//         <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
//           <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">
//             Create Your Account
//           </h2>
//           <InputField
//             label="Name"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             error={errors.name}
//           />
//           <InputField
//             label="Email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             error={errors.email}
//           />
//           {/* <PhoneInputField
//             label="Phone"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             error={errors.phoneNumber}
//           /> */}
//            <PhoneInputField
//               label="Phone"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={({ target, areaCodeInvalid }) => {
//               setFormData((prev) => ({
//                 ...prev,
//                 phoneNumber: target.value,
//               }));

//               // If area code is invalid
//               if (areaCodeInvalid) {
//                 setErrors((prev) => ({
//                   ...prev,
//                   phoneNumber: "Phone number's area code cannot start with 0.",
//                 }));
//                 } else {
//                  setErrors((prev) => ({
//                     ...prev,
//                     phoneNumber: "",
//                   }));
//                 }
//               }}
//               error={errors.phoneNumber}
//             />

//           <InputField
//             label="Password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             error={errors.password}
//           />
//           {/* {!userStatus.existingUser && ( */}
//           <InputField
//             label="Confirm Password"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             error={errors.confirmPassword}
//           />
//           {/* )} */}

//           {/* CAPTCHA */}
//           <div className="my-4">
//             <div className="flex items-center mb-2">
//               <div className="flex-1 bg-gray-100 p-2 rounded-lg text-center font-mono text-xl tracking-widest select-none">
//                 {captchaText.split("").map((char, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       display: "inline-block",
//                       transform: `rotate(${Math.random() * 30 - 15}deg)`,
//                       color: "black",
//                       fontSize: "24px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {char}
//                   </span>
//                 ))}
//               </div>
//               <button
//                 onClick={refreshCaptcha}
//                 className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                 type="button"
//                 aria-label="Refresh CAPTCHA"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <input
//               type="text"
//               value={userCaptchaInput}
//               onChange={(e) => setUserCaptchaInput(e.target.value)}
//               placeholder="Enter the CAPTCHA above"
//               className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
//             />
//             {errors.captcha && (
//               <span className="text-red-500 text-sm">{errors.captcha}</span>
//             )}
//           </div>

//           <button
//             onClick={handleSignUpClick}
//             className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-700 transition"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <h3 className="text-xl font-bold mb-4">Enter Referral Code</h3>
//             <InputField
//               label="Referral Code"
//               type="text"
//               name="referralCode"
//               value={referralCode}
//               onChange={(e) => setReferralCode(e.target.value)}
//             />
//             <button
//               onClick={handlePopupSubmit}
//               className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-blue-700 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserSignUp;











import React, { useState, useEffect } from "react";
import { signupUser, checkUserStatus } from "../../../api/signin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGift, FaCoins, FaTicketAlt, FaShieldAlt } from "react-icons/fa";
import PhoneInputField from "../../../components/ui/PhoneInputField";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4 w-full">
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-12 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const generateCaptcha = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [checkInProgress, setCheckInProgress] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const fieldErrors = {};
    if (!formData.name.trim()) {
      fieldErrors.name = "Name is required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      fieldErrors.email = "Invalid email address.";
    }
    if (formData.password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.confirmPassword !== formData.password) {
      fieldErrors.confirmPassword = "Passwords do not match.";
    }
    if (userCaptchaInput !== captchaText) {
      fieldErrors.captcha = "CAPTCHA verification failed. Please try again.";
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      fieldErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    } else if (formData.phoneNumber.startsWith("0")) {
      fieldErrors.phoneNumber = "Phone number's area code cannot start with 0.";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSignUpClick = () => {
    if (!validateFields()) return;
    setShowPopup(true);
  };

  const handlePopupSubmit = async () => {
    setShowPopup(false);
    const toastId = toast.loading("Signing up...", {
      theme: "colored",
      progressStyle: { background: "#7c3aed" },
    });
    
    try {
      const { confirmPassword, ...submitData } = formData;
      const responseMessage = await signupUser(submitData, referralCode);

      toast.update(toastId, {
        render: responseMessage || "Signup successful! Redirecting...",
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setReferralCode("");
      setUserCaptchaInput("");
      setCaptchaText(generateCaptcha());

      setTimeout(() => navigate("/signin"), 5000);
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Signup failed. Please try again.",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
      setUserCaptchaInput("");
      setCaptchaText(generateCaptcha());
    }
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserCaptchaInput("");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-500 to-orange-400 p-4 md:p-8">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-[650px]">
          
          {/* LEFT SIDE: User Rewards & Promotional Panel (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-purple-900 to-purple-800 p-8 text-white flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />

            {/* Panel Header */}
            <div className="relative z-10">
              <span className="bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Member Perks
              </span>
              <h1 className="text-3xl font-extrabold mt-4 tracking-tight leading-tight">
                Unlock Perks, Discounts & Cashbacks!
              </h1>
              <p className="text-purple-200 mt-2 text-sm leading-relaxed">
                Join our community to save money on local purchases and earn ongoing bonuses by inviting friends.
              </p>
            </div>

            {/* Central App Card Simulation */}
            <div className="my-6 flex justify-center items-center relative z-10 group">
              <div className="w-64 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-orange-300 tracking-wide">MY WALLET</span>
                  <div className="flex items-center gap-1 text-green-400 font-bold text-sm">
                    <FaCoins className="animate-spin-slow" />
                    <span>$45.00</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-purple-950/40 p-2.5 rounded-lg border border-white/5 flex items-center gap-3">
                    <FaTicketAlt className="text-orange-400 w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">15% Shop Coupon</p>
                      <p className="text-[10px] text-purple-300">Ready to redeem at checkout</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-950/40 p-2.5 rounded-lg border border-white/5 flex items-center gap-3">
                    <FaGift className="text-green-400 w-5 h-5 shrink-0 animate-bounce" />
                    <div>
                      <p className="text-xs font-bold">Referral Bonus Pending</p>
                      <p className="text-[10px] text-purple-300">+$10.00 arriving soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Value Checkpoints */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-start gap-3">
                <div className="bg-purple-700/60 p-2 rounded-lg text-orange-400 shrink-0">
                  <FaGift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Claim Referral Codes</h4>
                  <p className="text-xs text-purple-200">Have a code from a business or a friend? Enter it next to claim instant sign-up benefits.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-700/60 p-2 rounded-lg text-orange-400 shrink-0">
                  <FaShieldAlt className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Secure & Spam-Free</h4>
                  <p className="text-xs text-purple-200">Your profile credentials and communication configurations remain completely private.</p>
                </div>
              </div>
            </div>

            {/* Footer Sign-off */}
            <p className="text-[11px] text-purple-300 mt-6 pt-4 border-t border-white/10 relative z-10">
              ⚡ Safe sign up verified • Instant access to live marketplace benefits.
            </p>
          </div>

          {/* RIGHT SIDE: Interactive Signup Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-600 text-center">
              Create Your Account
            </h2>
            
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <PhoneInputField
              label="Phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={({ target, areaCodeInvalid }) => {
                setFormData((prev) => ({
                  ...prev,
                  phoneNumber: target.value,
                }));

                if (areaCodeInvalid) {
                  setErrors((prev) => ({
                    ...prev,
                    phoneNumber: "Phone number's area code cannot start with 0.",
                  }));
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    phoneNumber: "",
                  }));
                }
              }}
              error={errors.phoneNumber}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />

            {/* CAPTCHA Wrapper */}
            <div className="my-4">
              <label className="block text-gray-700 mb-2 font-medium">Verification Code</label>
              <div className="flex items-center mb-2 gap-2">
                <div className="flex-1 bg-gray-100 p-3 rounded-lg text-center font-mono text-xl tracking-widest select-none flex justify-center items-center h-12">
                  {captchaText.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{
                        display: "inline-block",
                        transform: `rotate(${Math.random() * 30 - 15}deg)`,
                        color: "black",
                        fontSize: "22px",
                        fontWeight: "bold",
                        margin: "0 2px"
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <button
                  onClick={refreshCaptcha}
                  className="p-3.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition shrink-0"
                  type="button"
                  aria-label="Refresh CAPTCHA"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <input
                type="text"
                value={userCaptchaInput}
                onChange={(e) => setUserCaptchaInput(e.target.value)}
                placeholder="Enter the code above"
                className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              {errors.captcha && (
                <span className="text-red-500 text-sm">{errors.captcha}</span>
              )}
            </div>

            <button
              onClick={handleSignUpClick}
              className="bg-green-600 font-semibold text-white py-3 px-4 rounded-lg w-full mt-4 hover:bg-green-700 shadow-md transition"
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>

      {/* Referral Code Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-bold mb-2 text-purple-700">Have a Referral Code?</h3>
            <p className="text-xs text-gray-500 mb-4">Enter a friend's link code or a shop invitation token to unlock introductory perks. Leave blank if none.</p>
            <InputField
              label="Referral Token (Optional)"
              type="text"
              name="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              onClick={handlePopupSubmit}
              className="bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg w-full mt-2 hover:bg-blue-700 shadow transition"
            >
              Confirm & Complete Registration
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSignUp;