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

import React, { useState, useRef } from "react";
import { signupUser } from "../../../api/signin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from "react-google-recaptcha";

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
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  // Replace with your actual reCAPTCHA site key
  const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleCaptchaChange = (value) => {
    // Value will be null when reCAPTCHA expires
    setIsCaptchaVerified(!!value);
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
    if (!isCaptchaVerified) {
      fieldErrors.captcha = "Please verify you're not a robot.";
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
      // Get the captcha token
      const captchaToken = captchaRef.current.getValue();
      
      const { confirmPassword, ...submitData } = formData;
      const responseMessage = await signupUser({
        ...submitData,
        referralCode,
        captchaToken // Include the captcha token in your submission
      });

      toast.update(toastId, {
        render: responseMessage || "Signup successful! Redirecting...",
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });
      
      // Reset form
      setFormData({ name: "", email: "", phoneNumber: "", password: "", confirmPassword: "" });
      setReferralCode("");
      captchaRef.current.reset();
      setIsCaptchaVerified(false);

      setTimeout(() => navigate("/signin"), 5000);
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Signup failed. Please try again.",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
      // Reset the captcha when there's an error
      captchaRef.current.reset();
      setIsCaptchaVerified(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
          <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">User Sign Up</h2>
          <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
          <PhoneInputField label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} error={errors.phoneNumber} />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
          <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
          
          {/* Add reCAPTCHA component */}
          <div className="my-4">
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
            {errors.captcha && <span className="text-red-500 text-sm">{errors.captcha}</span>}
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
            <InputField label="Referral Code" type="text" name="referralCode" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
            <button onClick={handlePopupSubmit} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-2 hover:bg-blue-700 transition">OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSignUp;
