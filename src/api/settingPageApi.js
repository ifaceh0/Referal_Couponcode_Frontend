import { VITE_BACKEND_URL } from "../apiConfig";


export const getSettingsAction = async (shopkeeperId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/get-settings?shopkeeperId=${shopkeeperId}`, {
        method: "GET",
        headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
    });

    if (!response.ok) {
        throw new Error("Failed to retrieve shop settings");
    }

    return response.json();
};

export const updateSettingsAction = async (settingsData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/update-settings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", //  required for JSON
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsData), //  send JSON body
    });

    if (!response.ok) {
        throw new Error("Failed to update shop settings");
    }

    return response.json();
};



// companyprofile changes
export const getProfileAction = async (shopkeeperId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/get-profile?shopkeeperId=${shopkeeperId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to retrieve profile");
    }

    return response.json();
};

export const updateCompanyProfileAction = async (companyData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/update-company`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(companyData),
    });

    if (!response.ok) {
        throw new Error("Failed to update Company profile");
    }

    return response.json();
};

export const updatePersonalProfileAction = async (personalData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No authentication token found");
    }

    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/update-personal`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(personalData),
    });

    if (!response.ok) {
        throw new Error("Failed to update personal profile");
    }

    return response.json();
};
