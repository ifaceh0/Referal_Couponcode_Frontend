import { VITE_BACKEND_URL } from "../apiConfig";

export const updateAndSaveSettingAction = async()=>{
    const response = await fetch(`${VITE_BACKEND_URL}/api/shopSettings/get`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({}),
    });
    console.log(VITE_BACKEND_URL)
}