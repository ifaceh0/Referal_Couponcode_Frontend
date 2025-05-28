// import { VITE_BACKEND_URL } from "../apiConfig";

// export const getSettingsAction = async (shopkeeperId: string) => {
//     const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/get-settings`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ shopkeeperId }),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to retrieve shop settings");
//     }

//     return response.json();
// };

// export const updateSettingsAction = async (settingsData: any) => {
//     const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/update-settings`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(settingsData),
//     });

//     if (!response.ok) {
//         throw new Error("Failed to update shop settings");
//     }

//     return response.json();
// };
