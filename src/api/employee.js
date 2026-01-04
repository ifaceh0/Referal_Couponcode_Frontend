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
  

  export const toggleEmployeeStatus = async (userId) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/toggle-employee-status?userId=${userId}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update status");
        }

        return data;
    } catch (error) {
        console.error("Error toggling status:", error);
        throw error;
    }
};


// Helper function for employee auth headers
const getEmployeeAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

// Get previous (inactive) shops for logged-in employee
export const getPreviousShops = async () => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/api/shopkeeper/previous-shops`, {
      method: "GET",
      headers: getEmployeeAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Only employees can view this page.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to load work history.');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching previous shops:", error);
    throw error;
  }
};