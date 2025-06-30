import React from "react";
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
  const handlePhoneChange = (phone) => {
    // Send full phone number (with + and country code) to parent
    onChange?.({
      target: {
        name,
        value: `+${phone}`,
      },
    });
  };

  return (
    <div className={`mb-4 w-full ${containerClass}`}>
      {label && (
        <label className={`block mb-2 font-medium ${labelClass}`}>
          {label}
        </label>
      )}
      <div className={`relative w-full ${wrapperClass}`}>
        <PhoneInput
          country={"us"} // Default to India
          value={value.replace("+", "")} // Remove '+' for internal PhoneInput formatting
          onChange={handlePhoneChange}
          disableCountryCode={false}
          countryCodeEditable={false}
          enableSearch={true} // ✅ enable dropdown search
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
