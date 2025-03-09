import baseUrl from "./baseUrl.json";

export const validateCode = async (code) => {
  try {
    const response = await fetch(`${baseUrl.baseUrl}/api/code/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};
