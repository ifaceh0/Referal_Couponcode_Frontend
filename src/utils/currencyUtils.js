export const getCurrencyFromCountry = (countryCode) => {
  const currencyMap = {
    IN: { code: "INR", symbol: "₹", name: "Indian Rupee" },
    US: { code: "USD", symbol: "$",   name: "US Dollar" },
    GB: { code: "GBP", symbol: "£",   name: "British Pound" },
    EU: { code: "EUR", symbol: "€",   name: "Euro" },
    CA: { code: "CAD", symbol: "C$",  name: "Canadian Dollar" },
    AU: { code: "AUD", symbol: "A$",  name: "Australian Dollar" },
  };

  return currencyMap[countryCode?.toUpperCase()] || currencyMap.IN;
};

// Get country from localStorage
export const getUserCountry = () => {
  return localStorage.getItem("userCountry") || "US"; // Default to US if not set
};

// Get full currency object
export const getCurrentCurrency = () => {
  const country = getUserCountry();
  return getCurrencyFromCountry(country);
};