import React, { useState } from "react";
import { signupShopkeeper } from "../../../api/signin";
import { colorPalette } from "../../../utils/demoData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-md focus:outline-none ${error ? `border-red-500` : `border-gray-300`
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
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    companyPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on input
  };

  const validateFields = (fields) => {
    const fieldErrors = {};
    if (fields.includes("name") && !formData.name.trim()) {
      fieldErrors.name = "Name is required.";
    }
    if (fields.includes("email") && !/\S+@\S+\.\S+/.test(formData.email)) {
      fieldErrors.email = "Invalid email address.";
    }
    if (fields.includes("phone") && !/^\d{10}$/.test(formData.phone)) {
      fieldErrors.phone = "Phone must be a 10-digit number.";
    }
    if (fields.includes("password") && formData.password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
    }
    if (fields.includes("companyName") && !formData.companyName.trim()) {
      fieldErrors.companyName = "Company name is required.";
    }
    if (fields.includes("companyAddress") && !formData.companyAddress.trim()) {
      fieldErrors.companyAddress = "Company address is required.";
    }
    if (fields.includes("companyEmail") && !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      fieldErrors.companyEmail = "Invalid company email address.";
    }
    if (fields.includes("companyPhone") && !/^\d{10}$/.test(formData.companyPhone)) {
      fieldErrors.companyPhone = "Company phone must be a 10-digit number.";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      console.log("Validating fields...");
      const isValid = validateFields([
        "name",
        "email",
        "phone",
        "password",
        "companyName",
        "companyAddress",
        "companyEmail",
        "companyPhone",
      ]);

      console.log("Validation result:", isValid);
      if (!isValid) {
        toast.error("Please fill all required fields correctly.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setError(null);
      console.log("Form data before submission:", formData);

      const response = await signupShopkeeper(formData);

      console.log("API response:", response);

      if (response) {
        // alert("Successful");
        toast.success("Signup successful! Redirecting to sign-in...", {
          position: "top-right",
          autoClose: 10000,
        });

        setTimeout(() => {
          console.log("Redirecting to /signin");
          navigate("/signin");
        }, 10000);
      } else {
        throw new Error("Signup failed. No response received.");
      }
    } catch (err) {
      console.error("Signup error:", err);

      toast.error(err.message || "Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 10000,
      });

      setTimeout(() => {
        console.log("Reloading page after error...");
        window.location.reload();
      }, 10000);
    }
  };

  const getButtonStyle = (state) => {
    switch (state) {
      case 1:
        return { backgroundColor: colorPalette.primary, hover: colorPalette.primaryLight };
      case 2:
        return { backgroundColor: colorPalette.secondary, hover: colorPalette.secondaryLight };
      case 3:
        return termsAccepted
          ? { backgroundColor: colorPalette.accent, hover: colorPalette.accentLight }
          : { backgroundColor: colorPalette.gray, hover: colorPalette.gray };
      default:
        return { backgroundColor: colorPalette.primary };
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br"
      style={{
        background: `linear-gradient(135deg, ${colorPalette.primary} 0%, ${colorPalette.accent} 100%)`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg relative overflow-hidden">
        <h2
          className={`text-2xl font-bold mb-4`}
          style={{ color: colorPalette.primary }}
        >
          {step === 1
            ? "Welcome!"
            : step === 2
              ? "Step 1: Personal Details"
              : "Step 2: Company Details"}
        </h2>
        <p className="text-gray-700 mb-6">
          {step === 1
            ? "Get started by clicking the button below!"
            : "Please fill out all fields below carefully."}
        </p>
        {step > 1 && (
          <>
            {step === 2 && (
              <>
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
                <InputField
                  label="Phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
              </>
            )}
            {step === 3 && (
              <>
                <InputField
                  label="Company Name"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                />
                <InputField
                  label="Company Address"
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  error={errors.companyAddress}
                />
                <InputField
                  label="Company Email"
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  error={errors.companyEmail}
                />
                <InputField
                  label="Company Phone"
                  type="text"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleInputChange}
                  error={errors.companyPhone}
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">
                    Accept{" "}
                    <a href="/terms" className="text-blue-600 underline">
                      Terms & Conditions
                    </a>
                  </span>
                </div>
              </>
            )}
          </>
        )}
        <div className="flex justify-between items-center mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className={`bg-[${colorPalette.gray}] text-${colorPalette.black} py-2 px-4 rounded-md hover:bg-[${colorPalette.gray}]`}
            >
              Back
            </button>
          )}
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="py-2 px-4 rounded-md"
              style={{
                backgroundColor: colorPalette.primary,
                color: "white",
                borderRadius: "0.375rem",
              }}
            >
              Proceed
            </button>
          ) : step === 2 ? (
            <button
              onClick={() =>
                validateFields(["name", "email", "phone", "password"]) &&
                setStep(3)
              }
              className="py-2 px-4 rounded-md"
              style={{
                backgroundColor: colorPalette.secondary,
                color: "white",
                borderRadius: "0.375rem",
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-md"
              disabled={!termsAccepted}
              style={{
                backgroundColor: termsAccepted
                  ? colorPalette.accent
                  : colorPalette.gray,
                color: "white",
                borderRadius: "0.375rem",
              }}
            >
              Sign Up
            </button>
          )}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    <ToastContainer />
    </div>
  );
};

export default ShopkeeperSignUp;
