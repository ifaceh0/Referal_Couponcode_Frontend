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
