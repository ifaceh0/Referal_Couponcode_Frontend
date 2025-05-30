import { VITE_BACKEND_URL } from "../apiConfig";

export const getSettingsAction = async (token) => {
    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/get-settings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to retrieve shop settings");
    }

    return response.json();
};

export const updateSettingsAction = async (settingsData, token) => {
    const formData = new FormData();

    Object.entries(settingsData).forEach(([key, value]) => {
        // Convert booleans and numbers to string
        formData.append(key, String(value));
    });

    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/update-settings`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to update shop settings");
    }

    return response.json();
};
