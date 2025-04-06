export const registerUser = async (userData, shopkeeperId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/register-user?shopkeeperId=${shopkeeperId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
            //   withCredntials: true,
            credentials: 'include',
        });

        const result = await response.text(); // Since the backend returns a plain text response

        return result; // Returns success or error message
    } catch (error) {
        console.error("Error registering user:", error);
        return "Failed to register user. Please try again.";
    }
};

// export const uploadBulkReferralCodes = async (file, expiryDate, referralAmount, shopkeeperId, type) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("expiryDate", expiryDate);
//   formData.append("referralAmount", referralAmount);
//   formData.append("type", type);
// //   formData.append("referrerAmount", referrerAmount);

//   try {
//     const response = await fetch(
//       `${baseUrl.baseUrl}/api/shopkeeper/upload-bulk-referral-codes?shopkeeperId=${shopkeeperId}`,
//       {
//         method: "POST",
//         body: formData,
//         // withCredentials: true,
//         credentials: "include",
//       }
//     );

//     const result = await response.json();
//     return result; // Expected to return { message: "...", generatedCodes: [...] }
//   } catch (error) {
//     console.error("Error uploading bulk referral codes:", error);
//     return { message: "Failed to upload referral codes.", generatedCodes: [] };
//   }
// };

export const uploadBulkReferralCodes = async (file, expiryDate, referralAmount, referrerAmount, usageLimit, shopkeeperId, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiryDate", expiryDate);
    formData.append("referralAmount", referralAmount);
    formData.append("referrerAmount", referrerAmount);
    formData.append("usageLimit", usageLimit);
    formData.append("shopkeeperId", shopkeeperId);
    formData.append("type", type);

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/upload-bulk-referral-codes`,
            {
                method: "POST",
                body: formData,
                credentials: "include", // If authentication is needed
            }
        );

        const result = await response.json();
        return result; // Expected response { message: "...", generatedCodes: [...] }
    } catch (error) {
        console.error("Error uploading bulk referral codes:", error);
        return { message: "Failed to upload referral codes.", generatedCodes: [] };
    }
};

export const uploadBulkCouponCodes = async (file, expiryDate, referralAmount, usageLimit, shopkeeperId, type) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiryDate", expiryDate);
    formData.append("referralAmount", referralAmount);
    formData.append("referrerAmount", 0);
    formData.append("usageLimit", usageLimit);
    formData.append("shopkeeperId", shopkeeperId);
    formData.append("type", type);

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/upload-bulk-referral-codes`,
            {
                method: "POST",
                body: formData,
                credentials: "include", // If authentication is needed
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();
        return result; // Expected response { message: "...", generatedCodes: [...] }
    } catch (error) {
        console.error("Error uploading bulk coupon codes:", error);
        return { message: "Failed to upload coupon codes.", generatedCodes: [] };
    }
};


export const getAllReferralCode = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/getAllReferralCode`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        console.log("response: ", response);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch referral codes:", error);
        return [];
    }
};

export const getAllCouponCode = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/getAllCouponCode`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        console.log("response: ", response);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch coupon codes:", error);
        return [];
    }
};

export const getAllReferralCodeByShopkeeper = async (shopkeeperId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/getAllReferralCodeByShopkeeper/${shopkeeperId}`, {
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
        //   console.log("Response JSON:", data);

        return data;
    } catch (error) {
        console.error("Failed to fetch referral codes:", error);
        return [];
    }
};

export const getAllCouponCodeByShopkeeper = async (shopkeeperId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shopkeeper/getAllCouponCodeByShopkeeper/${shopkeeperId}`, {
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
        //   console.log("Response JSON:", data);

        return data;
    } catch (error) {
        console.error("Failed to fetch coupon codes:", error);
        return [];
    }
};

// OUTPUT OF GET REFERRAL CODE
//   {
//     "referralCodeId": 1,
//     "code": "R10213255250",
//     "referralAmount": 10.0,
//     "referrerAmount": 3.0,
//     "status": "ACTIVE",
//     "expiryDate": "2025-02-28",
//     "generatedBy": {
//         "shopkeeperId": 1,
//         "name": "mr. tirupati",
//         "email": "tirupati@example.com",
//         "phone": "9876543210",
//         "password": "$2a$12$wPlFSmm85SFe2ByNwqkkge2RQUyKWnKYTcJhp4PPVW53pJBdTP3eC",
//         "logo": null,
//         "companyName": "Tirupati Gen Store",
//         "companyAddress": "podapadar",
//         "companyEmail": "genstore@example.com",
//         "companyPhone": "1234567890",
//         "referralLink": null,
//         "createdDate": null,
//         "updatedDate": null,
//         "updatedBy": null
//     },
//     "user": {
//         "userId": 12,
//         "name": "xrdcfgh",
//         "email": "xrdcfv@xdtcfgh.afds",
//         "phone": "7412589544",
//         "address": "",
//         "password": "7412589544",
//         "createdDate": "2025-02-13T10:36:10.239681",
//         "updatedDate": null,
//         "credits": []
//     },
//     "createdDate": "2025-02-13T10:36:12.883777",
//     "updatedDate": null
// }