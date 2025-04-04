import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../../src/apiConfig";

// Signup API
export const signupShopkeeperOld = async (formData) => {
    const url = `${VITE_BACKEND_URL}/api/auth/signup`;
    console.log(formData);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up the shopkeeper.");
    }

    console.log(response.json());

    return response.json();
};

// export const signupShopkeeper = async (formData) => {
//     try {
//         const response = await fetch(`${baseUrl.baseUrl}/api/auth/signup`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });
//         if (!response.ok) {
//             throw new Error(`Signup failed! Status: ${response.status}`);
//         }

//         const text = await response.text(); // ✅ Read as plain text
//         console.log("API Response:", text); // Debugging

//         return text; // Return the text response
//     } catch (error) {
//         console.error("Signup API Error:", error);
//         throw error;
//     }
// };
export const signupShopkeeper = async (formData) => {
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json(); // Read response as JSON

        if (!response.ok) {
            throw new Error(data.message || "Signup failed! Please try again.");
        }

        return data.message; // Return success message
    } catch (error) {
        console.error("Signup API Error:", error);
        throw error;
    }
};


// import Cookies from "js-cookie"; // Install js-cookie package using `npm install js-cookie`

// Login API
export const loginShopkeeper = async (credentials) => {
    const url = `${VITE_BACKEND_URL}/api/auth/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        withCredntials: true,
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed. Invalid credentials.");
    }

    const data = await response.json();

    // Store token in cookie (e.g., expires in 7 days)
    // Cookies.set("token", data.token, { expires: 7 });

    // Store both shopkeeper data and token in localStorage
    localStorage.setItem("shopkeeper", JSON.stringify(data.shopkeeper));
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("token", data.token);

    return data;
};

// Logout function
export const logoutShopkeeper = async () => {
    // Remove shopkeeper details and token from localStorage
    localStorage.removeItem("shopkeeper");
    localStorage.removeItem("token");

    const url = `${VITE_BACKEND_URL}/logout`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(credentials),
        withCredntials: true,
        credentials: 'include',
    });

    // Redirect to the sign-in page
    const navigate = useNavigate();
    navigate("/signin");
};


// // Login API
// export const loginShopkeeper = async (credentials) => {
//     const url = `${baseUrl.baseUrl}/api/shopkeepers/login`;
//     console.log(credentials);

//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Login failed. Invalid credentials.");
//     }

//     return response.json();
// };

// // Logout function
// export const logoutShopkeeper1 = () => {
//     // Remove token and shopkeeper details from localStorage
//     localStorage.removeItem("shopkeeper");
//     localStorage.removeItem("token");
// };


// Additional APIs can be added as needed.
