import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputField = ({

  label,
  name,
  value = "",
  onChange,
  error,
  containerClass = "",
  labelClass = "",
  wrapperClass = "",
  inputClass = "",
  buttonClass = "",
  errorClass = "",
}) => {
  const [touched, setTouched] = useState(false);

  const handlePhoneChange = (phone) => {
    // Send full phone number (with + and country code) to parent
    onChange?.({
      target: {
        name,
        value: `+${phone}`,
      },
    });
  };

  // Validate phone number length (min 10 digits excluding country code)
  const validatePhone = (inputValue, country) => {
    const digitsOnly = inputValue.replace(/\D/g, ""); // Remove non-digit characters
     const nationalNumber = digitsOnly.replace(country.dialCode, ""); // Remove country code (e.g. '1' for US/CA)
    // ✅ Show error only if user has typed something and it's wrong
    if (nationalNumber.length > 0 && nationalNumber.length < 10) {
      return "Phone number must be at least 10 digits";
    }
    return true; // ✅ Return true if valid or untouched
  };


  return (
    <div className={`mb-4 w-full ${containerClass}`}>
      {label && (
        <label className={`block mb-2 font-medium ${labelClass}`}>
          {label}
        </label>
      )}
      <div className={`flex flex-col ${wrapperClass}`}>
        <PhoneInput
          country={"us"} 
          onlyCountries={["us", "ca"]} // ✅ Limit to US and Canada
          value={value.replace("+", "")} // Remove '+' for internal PhoneInput formatting
          onChange={handlePhoneChange}
          disableCountryCode={false}
          countryCodeEditable={false}
          enableSearch={true} // ✅ enable dropdown search
          onBlur={() => setTouched(true)} // ✅ Mark as touched
          isValid={validatePhone} // ✅ custom validation
          inputExtraProps={{
            name,
            required: true,
            inputMode: "numeric",
            autoComplete: "tel",
            pattern: "[0-9]*",
          }}
          containerClass="w-full"
          inputClass={`!w-full !h-12 !p-3 !pl-14 !border !rounded-lg !focus:outline-none !focus:ring-2 ${inputClass}`}
          buttonClass={`!h-12 ${buttonClass}`}
        />
      </div>
      {error && (
        <span className={`text-sm text-red-600 mt-1 block ${errorClass}`}>
          {error}
        </span>
      )}
    </div>
  );
};

export default PhoneInputField;
