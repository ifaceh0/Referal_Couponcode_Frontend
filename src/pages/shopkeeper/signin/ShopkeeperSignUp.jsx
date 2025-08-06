import React, { useState, useEffect } from "react";
import { signupShopkeeper } from "../../../api/signin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const ShopkeeperSignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captcha = captcha.split('').map(char => (
      Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    )).join('');
    setCaptchaText(captcha);
    setUserCaptchaInput("");
    return captcha;
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = (fields) => {
    const fieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    const phoneRegex = /^\d{10}$/;

    if (fields.includes("name") && !formData.name.trim()) {
      fieldErrors.name = "Name is required.";
    }

    if (fields.includes("email") && !emailRegex.test(formData.email)) {
      fieldErrors.email = "Enter a valid email address.";
    }

    if (fields.includes("password") && formData.password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
    }

    if (fields.includes("confirmPassword") && formData.confirmPassword !== formData.password) {
      fieldErrors.confirmPassword = "Passwords do not match.";
    }

    if (fields.includes("phone") && !phoneRegex.test(formData.phone)) {
      fieldErrors.phone = "Enter a valid phone number with country code.";
    }

    if (fields.includes("companyName") && !formData.companyName.trim()) {
      fieldErrors.companyName = "Company name is required.";
    }

    if (fields.includes("companyAddress") && !formData.companyAddress.trim()) {
      fieldErrors.companyAddress = "Company address is required.";
    }

    if (fields.includes("companyEmail") && !emailRegex.test(formData.companyEmail)) {
      fieldErrors.companyEmail = "Enter a valid company email address.";
    }

    if (fields.includes("companyPhone") && !phoneRegex.test(formData.companyPhone)) {
      fieldErrors.companyPhone = "Enter a valid company phone number with country code.";
    }

    if (step === 2 && userCaptchaInput !== captchaText) {
      fieldErrors.captcha = "CAPTCHA verification failed. Please try again.";
    }

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      Object.values(fieldErrors).forEach((err) => toast.error(err, { autoClose: 10000 }));
    }

    return Object.keys(fieldErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateFields(["name", "email", "phone", "password", "confirmPassword"])) return;
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    generateCaptcha();
  };

  const handleSubmit = async () => {
    if (!validateFields(["companyName", "companyAddress", "companyEmail", "companyPhone"])) return;

    const toastId = toast.loading("Signing up...", {
      theme: "colored",
      progressStyle: { background: "#7c3aed" },
    });

    try {
      const { confirmPassword, ...submitData } = formData;
      const responseMessage = await signupShopkeeper({ ...submitData });

      toast.update(toastId, {
        render: responseMessage || "Signup successful! Redirecting...",
        type: "success",
        autoClose: 5000,
        isLoading: false,
      });

      setTimeout(() => navigate("/signin"), 5000);
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Signup failed. Please try again.",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
      generateCaptcha();
    }
  };

  const refreshCaptcha = () => {
    generateCaptcha();
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
          <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center capitalize">Shopkeeper Sign Up</h2>
          {step === 1 ? (
            <>
              <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
              <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
              <PhoneInputField
                label=""
                name="phone"
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone: phone.target.value })}
                containerClass="w-full"
                inputClass="border rounded p-2 w-full"
                error={errors.phone}
              />
              <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
              <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
              <button onClick={handleNext} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-blue-700 transition">Next</button>
            </>
          ) : (
            <>
              <InputField label="Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} error={errors.companyName} />
              <InputField label="Company Address" type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} error={errors.companyAddress} />
              <InputField label="Company Email" type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} error={errors.companyEmail} />
              <PhoneInputField
                label=""
                name="companyPhone"
                value={formData.companyPhone}
                onChange={(phone) => setFormData({ ...formData, companyPhone: phone.target.value })}
                error={errors.companyPhone}
              />
              <div className="my-4">
                <label className="block text-gray-700 mb-2 font-medium">CAPTCHA Verification</label>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded-lg">
                    <span
                      className="text-2xl font-bold tracking-wider"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        color: '#000',
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
                    className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
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
                  onChange={(e) => setUserCaptchaInput(e.target.value)}
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                {errors.captcha && <span className="text-red-500 text-sm">{errors.captcha}</span>}
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={handleBack} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">Back</button>
                <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Sign Up</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopkeeperSignUp;
