// Get all users
export const getAllUsers = async () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/users`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users.");
  }

  return response.json();
};
