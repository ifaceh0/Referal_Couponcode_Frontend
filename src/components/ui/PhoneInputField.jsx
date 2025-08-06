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
  const [fullPhone, setFullPhone] = useState(""); // full phone with +1 prefix

  const handlePhoneChange = (phone, country) => {
    const digitsOnly = phone.replace(/\D/g, "");
    const nationalNumber = digitsOnly.replace(country.dialCode, "");

    // Update local state for displaying full value (required by react-phone-input-2)
    setFullPhone(phone);

    // Send only clean 10-digit number to form state
    const cleanNumber = nationalNumber.slice(0, 10); // Limit to 10 digits
    onChange?.({
      target: {
        name,
        value: cleanNumber,
      },
    });
  };

  const validatePhone = (inputValue, country) => {
    const digitsOnly = inputValue.replace(/\D/g, "");
    const nationalNumber = digitsOnly.replace(country.dialCode, "");

    if (nationalNumber.length > 0 && nationalNumber.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    if (nationalNumber.startsWith("0")) {
      return "Area code cannot start with zero";
    }

    return true;
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
          onlyCountries={["us", "ca"]}
          value={fullPhone} // use internal state to store full number
          onChange={handlePhoneChange}
          disableCountryCode={false}
          countryCodeEditable={false}
          enableSearch={true}
          onBlur={() => setTouched(true)}
          isValid={validatePhone}
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
