import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../apiConfig";

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

export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_BACKEND_URL}/api/auth/current-user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include", // `withCredentials` is not needed in Fetch API
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); // Store parsed JSON
          console.log("Response JSON:", data);
          localStorage.setItem("shopkeeperId", data.id);
          localStorage.setItem("role",data.role)

        return data;
    } catch (error) {
        console.dir("Failed to fetch referral codes:", error);
        return [];
    }
};

// added multi role code
//get roles
export const getRoles = async (credentials) => {
    const url = `${VITE_BACKEND_URL}/api/auth/get-roles`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials), // {email, password}
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get roles.");
    }

    return response.json(); // array of strings, e.g., ["USER", "SHOPKEEPER"]
};

export const getEmployeeShops = async (email) => {
  const response = await fetch(`${VITE_BACKEND_URL}/api/auth/get-employee-shops`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error("Failed to fetch shops");
  return response.json(); // array of { shopkeeperId, shopName }
};


// import Cookies from "js-cookie"; // Install js-cookie package using `npm install js-cookie`


// working original code

// Login API
// export const loginShopkeeper = async (credentials) => {
//     const url = `${VITE_BACKEND_URL}/api/auth/login`;

//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//         withCredntials: true,
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Login failed. Invalid credentials.");
//     }

//     const data = await response.json();
//     console.log(data)
//     // Store token in cookie (e.g., expires in 7 days)
//     // Cookies.set("token", data.token, { expires: 7 });

//     // Store both shopkeeper data and token in localStorage
//     localStorage.setItem("shopkeeper", JSON.stringify(data.shopkeeper));
//     localStorage.setItem("data", JSON.stringify(data));
//     localStorage.setItem("token", data.token);
    

//     return data;
// };


// multi role login code

export const loginShopkeeper = async ({ email, password, role, shopkeeperId }) => {
    const url = `${VITE_BACKEND_URL}/api/auth/login`;

    const payload = { email, password, role };
    if (shopkeeperId !== undefined && shopkeeperId !== null) {
      payload.shopkeeperId = shopkeeperId;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed. Invalid credentials.");
    }

    const data = await response.json();
    console.log(data)

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
    localStorage.removeItem("shopkeeperId")
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

// User Signup API
export const signupUser = async (formData, referralCode) => {
    try {
      // Remove referralCode from formData if it's present
      const { referralCode: _, ...cleanFormData } = formData;
  
      // Debugging: Check referralCode type
      console.log("Type of referralCode:", typeof referralCode);
      console.log("Value of referralCode:", referralCode);
  
      // Check if referralCode is a valid string
      if (typeof referralCode !== "string") {
        console.error("Referral Code is not a valid string:", referralCode);
        throw new Error("Referral Code is not a valid string.");
      }
  
      // Construct the URL with referralCode as a query parameter if it exists
      let url = `${VITE_BACKEND_URL}/api/auth/user/register`;
      
      if (referralCode) {
        url += `?referralCode=${encodeURIComponent(referralCode)}`;
      }
      console.log("Generated URL:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData), // Only submit the formData without referralCode
      });
  
      const data = await response.text();
  
      if (!response.ok) {
        throw new Error(data || "Signup failed! Please try again.");
      }
  
      return data || "Signup successful!";
    } catch (error) {
      console.error("Signup API Error:", error);
      throw error;
    }
  };


  // Employee Signup API
export const signupEmployee = async (formData, invitationToken) => {
  try {
    const url = `${VITE_BACKEND_URL}/api/auth/signup/employee?token=${encodeURIComponent(invitationToken)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data || "Signup failed! Please try again.");
    }

    return data || "Signup successful!";
  } catch (error) {
    console.error("Signup Employee API Error:", error);
    throw error;
  }
};

// s
export const checkUserStatus = async (formData) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/check-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to check user status");
  }

  return res.json(); // { existingUser: true/false, passwordMatched: true/false }
};



  

