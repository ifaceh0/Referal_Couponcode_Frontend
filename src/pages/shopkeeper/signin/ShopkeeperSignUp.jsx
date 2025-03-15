import React, { useState } from "react";
import { signupShopkeeper } from "../../../api/signin";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
    <div className="relative w-full">
      <PhoneInput
        country={"us"} // Default country (change as needed)
        onlyCountries={["us", "ca"]}
        isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
        value={value}
        onChange={(phone) => onChange({ target: { name, value: phone } })}
        inputClass="!w-full !h-12 !p-3 !pl-14 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-purple-500 !transition-all"
        containerClass="w-full"
        buttonClass="!h-12"
      />
    </div>
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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = (fields) => {
    const fieldErrors = {};
    if (fields.includes("name") && !formData.name.trim()) {
      fieldErrors.name = "Name is required.";
    }
    if (fields.includes("email") && !/\S+@\S+\.\S+/.test(formData.email)) {
      fieldErrors.email = "Invalid email address.";
    }
    // if (fields.includes("phone") && !/^\d{10}$/.test(formData.phone)) {
    //   fieldErrors.phone = "Phone must be a 10-digit number.";
    // }
    if (fields.includes("password") && formData.password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters.";
    }
    if (fields.includes("confirmPassword") && formData.confirmPassword !== formData.password) {
      fieldErrors.confirmPassword = "Passwords do not match.";
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
    // if (fields.includes("companyPhone") && !/^\d{10}$/.test(formData.companyPhone)) {
    //   fieldErrors.companyPhone = "Company phone must be a 10-digit number.";
    // }
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
  };

  const handleSubmitOld = async () => {
    if (!validateFields(["companyName", "companyAddress", "companyEmail", "companyPhone"])) return;
    const toastId = toast.loading("Signing up...");
    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await signupShopkeeper(submitData);
      if (response) {
        toast.update(toastId, { render: "Signup successful! Redirecting...", type: "success", autoClose: 5000, isLoading: false });
        setTimeout(() => navigate("/signin"), 5000);
      } else {
        throw new Error("Signup failed. No response received.");
      }
    } catch (err) {
      toast.update(toastId, { render: err.message || "Signup failed. Please try again.", type: "error", autoClose: 5000, isLoading: false });
    }
  };

  const handleSubmitOld2 = async () => {
    if (!validateFields(["companyName", "companyAddress", "companyEmail", "companyPhone"])) return;

    const toastId = toast.loading("Signing up...", {
      theme: "colored",
      progressStyle: { background: "#7c3aed" }, // Purple progress bar
    });

    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await signupShopkeeper(submitData);

      if (response) {
        toast.update(toastId, {
          render: "Signup successful! Redirecting...",
          type: "success",
          autoClose: 5000,
          isLoading: false,
        });
        setTimeout(() => navigate("/signin"), 5000);
      } else {
        throw new Error("Signup failed. No response received.");
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Signup failed. Please try again.",
        type: "error",
        autoClose: 5000,
        isLoading: false,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateFields(["companyName", "companyAddress", "companyEmail", "companyPhone"])) return;
    
    const toastId = toast.loading("Signing up...", {
        theme: "colored",
        progressStyle: { background: "#7c3aed" }, // Purple loading bar
    });

    try {
        const { confirmPassword, ...submitData } = formData;
        const responseMessage = await signupShopkeeper(submitData);

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
    }
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
              {/* <InputField label="Phone" type="text" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} /> */}
              <PhoneInputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
              <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
              <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
              <button onClick={handleNext} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-blue-700 transition">Next</button>
            </>
          ) : (
            <>
              <InputField label="Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} error={errors.companyName} />
              <InputField label="Company Address" type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} error={errors.companyAddress} />
              <InputField label="Company Email" type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} error={errors.companyEmail} />
              {/* <InputField label="Company Phone" type="text" name="companyPhone" value={formData.companyPhone} onChange={handleInputChange} error={errors.companyPhone} /> */}
              <PhoneInputField label="Company Phone" name="companyPhone" value={formData.companyPhone} onChange={handleInputChange} error={errors.companyPhone} />
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


// import React, { useState } from "react";
// import { signupShopkeeper } from "../../../api/signin";
// import { colorPalette } from "../../../utils/demoData";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const InputField = ({ label, type, name, value, onChange, error }) => (
//   <div className="mb-4">
//     <label className="block text-gray-700 mb-2 font-medium">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <span className="text-red-500 text-sm">{error}</span>}
//   </div>
// );

// const ShopkeeperSignUp = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     companyName: "",
//     companyAddress: "",
//     companyEmail: "",
//     companyPhone: "",
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateFields = (fields) => {
//     const fieldErrors = {};
//     if (fields.includes("name") && !formData.name.trim()) {
//       fieldErrors.name = "Name is required.";
//     }
//     if (fields.includes("email") && !/\S+@\S+\.\S+/.test(formData.email)) {
//       fieldErrors.email = "Invalid email address.";
//     }
//     if (fields.includes("phone") && !/^\d{10}$/.test(formData.phone)) {
//       fieldErrors.phone = "Phone must be a 10-digit number.";
//     }
//     if (fields.includes("password") && formData.password.length < 6) {
//       fieldErrors.password = "Password must be at least 6 characters.";
//     }
//     if (fields.includes("confirmPassword") && formData.confirmPassword !== formData.password) {
//       fieldErrors.confirmPassword = "Passwords do not match.";
//     }
//     if (fields.includes("companyName") && !formData.companyName.trim()) {
//       fieldErrors.companyName = "Company name is required.";
//     }
//     if (fields.includes("companyAddress") && !formData.companyAddress.trim()) {
//       fieldErrors.companyAddress = "Company address is required.";
//     }
//     if (fields.includes("companyEmail") && !/\S+@\S+\.\S+/.test(formData.companyEmail)) {
//       fieldErrors.companyEmail = "Invalid company email address.";
//     }
//     if (fields.includes("companyPhone") && !/^\d{10}$/.test(formData.companyPhone)) {
//       fieldErrors.companyPhone = "Company phone must be a 10-digit number.";
//     }
//     setErrors(fieldErrors);
//     if (Object.keys(fieldErrors).length > 0) {
//       Object.values(fieldErrors).forEach((err) => toast.error(err, { autoClose: 10000 }));
//     }
//     return Object.keys(fieldErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (!validateFields(["name", "email", "phone", "password", "confirmPassword"])) return;
//     setStep(2);
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   const handleSubmit = async () => {
//     if (!validateFields(["companyName", "companyAddress", "companyEmail", "companyPhone"])) return;
//     try {
//       const { confirmPassword, ...submitData } = formData;
//       const response = await signupShopkeeper(submitData);
//       if (response) {
//         toast.success("Signup successful! Redirecting to sign-in...", {
//           position: "top-right",
//           autoClose: 5000,
//         });
//         setTimeout(() => navigate("/signin"), 5000);
//       } else {
//         throw new Error("Signup failed. No response received.");
//       }
//     } catch (err) {
//       toast.error(err.message || "Signup failed. Please try again.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-orange-400 p-6">
//         <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
//           <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">Shopkeeper Sign Up</h2>
//           {step === 1 ? (
//             <>
//               <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
//               <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
//               <InputField label="Phone" type="text" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
//               <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
//               <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
//               <button onClick={handleNext} className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-blue-700 transition">Next</button>
//             </>
//           ) : (
//             <>
//               <InputField label="Company Name" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} error={errors.companyName} />
//               <InputField label="Company Address" type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} error={errors.companyAddress} />
//               <InputField label="Company Email" type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange} error={errors.companyEmail} />
//               <InputField label="Company Phone" type="text" name="companyPhone" value={formData.companyPhone} onChange={handleInputChange} error={errors.companyPhone} />
//               <div className="flex justify-between mt-4">
//                 <button onClick={handleBack} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition">Back</button>
//                 <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Sign Up</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShopkeeperSignUp;