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


// export const validateCode = async (code) => {
//   try {
//     const token = localStorage.getItem("token"); // Get token from storage

//     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/code/validate`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`, // Corrected string interpolation
//       },
//       // body: JSON.stringify({ code }),
//       // credentials: 'include', // Keep if backend uses cookies
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return { success: false, message: "Network error. Please try again." };
//   }
// };