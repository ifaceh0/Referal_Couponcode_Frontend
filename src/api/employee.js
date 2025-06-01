import { VITE_BACKEND_URL } from "../apiConfig";

export const getAllShopEmployee = async (shopkeeperId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/getAllShopEmployees?shopkeeperId=${shopkeeperId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });

        const data = await response.json(); // Read response as JSON

        if (!response.ok) {
            throw new Error(data || "Data fetched failed! Please try again.");
        }

        return data; // Return success message
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const deleteInvitation = async (invitationId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/deleteInvitation?invitationId=${invitationId}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });

        const data = await response.json(); // Read response as JSON

        if (!response.ok) {
            throw new Error(data || "Data fetched failed! Please try again.");
        }

        return data; // Return success message
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};


export const getAllInviteEmployee = async (shopkeeperId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/getAllInviteEmployee?shopkeeperId=${shopkeeperId}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
             },
        });

        const data = await response.json(); // Read response as JSON

        if (!response.ok) {
            throw new Error(data || "Data fetched failed! Please try again.");
        }

        return data; // Return success message
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const employeeInvitation = async (email,inviteId) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams({ email });
  if (inviteId) {
    params.append("inviteId", inviteId);
  }
    // const url = `${VITE_BACKEND_URL}/api/shopkeeper/invite?email=${email}&inviteId=${inviteId}`;
    const url = `${VITE_BACKEND_URL}/api/shopkeeper/invite?${params.toString()}`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    const data = await response.text();
  
    if (!response.ok) {
      throw new Error(data || "Failed to send invite.");
    }
  
    return data;
  };
  