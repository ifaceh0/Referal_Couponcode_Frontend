export const validateCode = async (code) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/code/validate`, {
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
