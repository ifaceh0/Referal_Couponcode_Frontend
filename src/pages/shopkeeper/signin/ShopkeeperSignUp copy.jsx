import React, { useState } from "react";
import { signupShopkeeper } from "../../../api/signin";
import { colorPalette } from "../../../utils/demoData";
import { useNavigate } from "react-router-dom";

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await signupShopkeeper(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {step === 1 && (
          <div>
            <h2 className="text-purple-600 text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-gray-700 mb-6">
              Click proceed to start the signup process. You'll be guided step by step to create your account.
            </p>
            <button
              onClick={() => setStep(2)}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            >
              Proceed to Signup
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-blue-600 text-2xl font-bold mb-4">Step 1: Personal Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={() => setStep(3)}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-blue-600 text-2xl font-bold mb-4">Step 2: Company Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Phone</label>
              <input
                type="text"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">
                I accept all <a href="/terms" className="text-blue-600 underline">Terms & Conditions</a> and have read the{" "}
                <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
              </span>
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              onClick={handleSubmit}
              className={`${
                termsAccepted ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
              } text-white py-2 px-4 rounded-md`}
              disabled={!termsAccepted}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopkeeperSignUp;


// import React, { useState } from "react";
// import { signupShopkeeper } from "../../../api/signin";
// import { colorPalette } from "../../../utils/demoData";

// const steps = [
//   { label: "Step 1: Personal Details" },
//   { label: "Step 2: Company Details" },
//   { label: "Step 3: Confirm and Submit" },
// ];

// const ShopkeeperSignUp = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     companyName: "",
//     companyAddress: "",
//     companyEmail: "",
//     companyPhone: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await signupShopkeeper(formData);
//       alert("Sign-up successful! Welcome, " + response.name);
//       setCurrentStep(0);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         companyName: "",
//         companyAddress: "",
//         companyEmail: "",
//         companyPhone: "",
//       });
//     } catch (err) {
//       setError(err.message || "An error occurred during signup.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-bold mb-4" style={{ color: colorPalette.primary }}>
//           {steps[currentStep].label}
//         </h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {loading && <p className="text-blue-500 mb-4">Submitting...</p>}

//         {currentStep === 0 && (
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//           </div>
//         )}

//         {currentStep === 1 && (
//           <div>
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company Name"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="companyAddress"
//               placeholder="Company Address"
//               value={formData.companyAddress}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="email"
//               name="companyEmail"
//               placeholder="Company Email"
//               value={formData.companyEmail}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//             <input
//               type="tel"
//               name="companyPhone"
//               placeholder="Company Phone"
//               value={formData.companyPhone}
//               onChange={handleChange}
//               className="w-full mb-4 p-2 border rounded"
//             />
//           </div>
//         )}

//         {currentStep === 2 && (
//           <div>
//             <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(formData, null, 2)}</pre>
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-green-500 text-white py-2 px-4 rounded"
//               disabled={loading}
//             >
//               Submit
//             </button>
//           </div>
//         )}

//         <div className="flex justify-between mt-4">
//           {currentStep > 0 && (
//             <button
//               onClick={prevStep}
//               className="bg-gray-300 py-2 px-4 rounded"
//               style={{ color: colorPalette.black }}
//               disabled={loading}
//             >
//               Back
//             </button>
//           )}
//           {currentStep < steps.length - 1 && (
//             <button
//               onClick={nextStep}
//               className="bg-purple-500 py-2 px-4 text-white rounded"
//               style={{ backgroundColor: colorPalette.primary }}
//               disabled={loading}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopkeeperSignUp;
