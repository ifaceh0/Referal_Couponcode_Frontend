import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Ensure this is installed

const PhoneInputField = ({
    label,
    name,
    value,
    onChange,
    error,
    containerClass = "",
    labelClass = "",
    wrapperClass = "",
    inputClass = "",
    buttonClass = "",
    errorClass = ""
}) => {
    return (
        <div className={`mb-4 w-full ${containerClass}`}>
            <label className={`block mb-2 font-medium ${labelClass}`}>{label}</label>
            <div className={`relative w-full ${wrapperClass}`}>
                <PhoneInput
                    country={"us"}
                    onlyCountries={["us", "ca"]}
                    isValid={(inputNumber, country) => ["us", "ca"].includes(country?.iso2)}
                    value={value}
                    // onChange={(phone) => onChange({ target: { name, value: phone } })}
                    onChange={(phone, countryData) => {
                        const dialCode = countryData?.dialCode || "";
                        const nationalNumber = phone.startsWith(dialCode)
                          ? phone.slice(dialCode.length)
                          : phone;
                
                        onChange({ target: { name, value: nationalNumber } });
                      }}
                    containerClass={`w-full ${wrapperClass}`}
                    inputClass={`!w-full !h-12 !p-3 !pl-14 !border !rounded-lg !focus:outline-none !focus:ring-2 !transition-all ${inputClass}`}
                    buttonClass={`!h-12 ${buttonClass}`}
                />
            </div>
            {error && <span className={`text-sm ${errorClass}`}>{error}</span>}
        </div>
    );
};

export default PhoneInputField;