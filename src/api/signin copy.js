import baseUrl from "./baseUrl.json";

// Signup API
export const signupShopkeeper = async (formData) => {
    const url = `${baseUrl.baseUrl}/api/shopkeepers/signup`;
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

// Login API
export const loginShopkeeper = async (credentials) => {
    const url = `${baseUrl.baseUrl}/api/shopkeepers/login`;
    console.log(credentials);

    const response = await fetch(url, {
        method: "POST",
        withCredntials: true,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed. Invalid credentials.");
    }

    return response.json();
};

// Logout function
export const logoutShopkeeper1 = () => {
    // Remove token and shopkeeper details from localStorage
    localStorage.removeItem("shopkeeper");
    localStorage.removeItem("token");
};


export const logoutShopkeeper = async () => {
    const url = `${baseUrl.baseUrl}/api/shopkeepers/logout`;

    const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Include the cookie with the logout request
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Logout failed");
    }

    // Optionally, remove shopkeeper data from localStorage
    localStorage.removeItem("shopkeeper");

    // Redirect to the login page or perform other logout actions
    window.location.href = "/signin";
};


// Additional APIs can be added as needed.
