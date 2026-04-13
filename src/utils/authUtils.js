export const saveCountryToLocalStorage = (userData) => {
    if (!userData) return;

    let country = userData?.country;

    // Fallback: check inside details object
    if (!country && userData?.details?.country) {
        country = userData.details.country;
    }

    // Final fallback
    if (!country || country === null || country === "null") {
        country = "US";        // Change to "US" if you prefer
    }

    localStorage.setItem("userCountry", country);
    console.log("✅ Country saved to localStorage:", country);
};

// Optional: Get country anywhere
export const getUserCountry = () => {
    return localStorage.getItem("userCountry") || "US";
};