// import React, { useState } from "react";
//  import { signupUser } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

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

// const PhoneInputField = ({ label, name, value, onChange, error }) => (
//   <div className="mb-4 w-full">
//     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
//     <PhoneInput
//       country={"us"}
//       onlyCountries={["us", "ca"]}
//       isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
//       value={value}
//       onChange={(phone) => onChange({ target: { name, value: phone } })}
//       inputClass="!w-full !h-12 !p-3 !pl-14 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500 !transition-all"
//       containerClass="w-full"
//       buttonClass="!h-12"
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

// const UserSignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

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
//     setErrors(fieldErrors);
//     if (Object.keys(fieldErrors).length > 0) {
//       Object.values(fieldErrors).forEach((err) => toast.error(err, { autoClose: 10000 }));
//     }
//     return Object.keys(fieldErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateFields()) return;
//     const toastId = toast.loading("Signing up...", {
//       theme: "colored",
//       progressStyle: { background: "#7c3aed" },
//     });

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       const responseMessage = await signupUser(submitData);

//       toast.update(toastId, {
//         render: responseMessage || "Signup successful! Redirecting...",
//         type: "success",
//         autoClose: 5000,
//         isLoading: false,
//       });

//       setTimeout(() => navigate("/signin"), 5000);
//     } catch (err) {
//       toast.update(toastId, {
//         render: err.message || "Signup failed. Please try again.",
//         type: "error",
//         autoClose: 5000,
//         isLoading: false,
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
//         <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
//           <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">User Sign Up</h2>
//           <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
//           <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
//           <PhoneInputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
//           <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
//           <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
//           <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-700 transition">Sign Up</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserSignUp;

// import React, { useState } from "react";
// import { signupUser } from "../../../api/signin";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

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

// const PhoneInputField = ({ label, name, value, onChange, error }) => (
//   <div className="mb-4 w-full">
//     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
//     <PhoneInput
//       country={"us"}
//       onlyCountries={["us", "ca"]}
//       isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
//       value={value}
//       onChange={(phoneNumber) => onChange({ target: { name, value: phoneNumber } })}
//       inputClass="!w-full !h-12 !p-3 !pl-14 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500 !transition-all"
//       containerClass="w-full"
//       buttonClass="!h-12"
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

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
//   const navigate = useNavigate();

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
//     setErrors(fieldErrors);
//     return Object.keys(fieldErrors).length === 0;
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

//     try {
//       const { confirmPassword, ...submitData } = formData;
//       // submitData.referralCode = referralCode;
//       const responseMessage = await signupUser(submitData,referralCode);

//       toast.update(toastId, {
//         render: responseMessage || "Signup successful! Redirecting...",
//         type: "success",
//         autoClose: 5000,
//         isLoading: false,
//       });
//       // Reset form
//       setFormData({ name: "", email: "", phoneNumber: "", password: "", confirmPassword: "" });
//       setReferralCode("");

//       setTimeout(() => navigate("/signin"), 5000);
//     } catch (err) {
//       toast.update(toastId, {
//         render: err.message || "Signup failed. Please try again.",
//         type: "error",
//         autoClose: 5000,
//         isLoading: false,
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
//         <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
//           <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">User Sign Up</h2>
//           <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
//           <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
//           <PhoneInputField label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} error={errors.phoneNumber} />
//           <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
//           <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
//           <button onClick={handleSignUpClick} className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-700 transition">Sign Up</button>
//         </div>
//       </div>
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//             <h3 className="text-xl font-bold mb-4">Enter Referral Code</h3>
//             <InputField label="Referral Code" type="text" name="referralCode" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
//             <button onClick={handlePopupSubmit} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-blue-700 transition">OK</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserSignUp;

import React, { useState } from "react";
import { signupUser } from "../../../api/signin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

const PhoneInputField = ({ label, name, value, onChange, error }) => (
  <div className="mb-4 w-full">
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <PhoneInput
      country={"us"}
      onlyCountries={["us", "ca"]}
      value={value}
      isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
      onChange={(phone, countryData) => {
        const dialCode = countryData?.dialCode || "";
        const nationalNumber = phone.startsWith(dialCode)
          ? phone.slice(dialCode.length)
          : phone;

        onChange({ target: { name, value: nationalNumber } });
      }}
      inputClass="!w-full !h-12 !p-3 !pl-14 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500 !transition-all"
      containerClass="w-full"
      buttonClass="!h-12"
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
    console.log("Referral Code before submit:", referralCode); 
    try {
      const { confirmPassword, ...submitData } = formData;
      const responseMessage = await signupUser(
        submitData,
        referralCode,
      );

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
          <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">
            User Sign Up
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
            onChange={handleInputChange}
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

          {/* CAPTCHA */}
          <div className="my-4">
            <div className="flex items-center mb-2">
              <div className="flex-1 bg-gray-100 p-2 rounded-lg text-center font-mono text-xl tracking-widest select-none">
                {captchaText.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      transform: `rotate(${Math.random() * 30 - 15}deg)`,
                      color: "black",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <button
                onClick={refreshCaptcha}
                className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                type="button"
                aria-label="Refresh CAPTCHA"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              value={userCaptchaInput}
              onChange={(e) => setUserCaptchaInput(e.target.value)}
              placeholder="Enter the CAPTCHA above"
              className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            {errors.captcha && (
              <span className="text-red-500 text-sm">{errors.captcha}</span>
            )}
          </div>

          <button
            onClick={handleSignUpClick}
            className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Enter Referral Code</h3>
            <InputField
              label="Referral Code"
              type="text"
              name="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              onClick={handlePopupSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSignUp;
