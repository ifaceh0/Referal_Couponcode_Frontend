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
//Get All shopkeeper
export const getAllShopkeeper = async (userId) => {

  const token = localStorage.getItem("token");

  const url = `${import.meta.env.VITE_BACKEND_URL}/api/qrcode/getAllShopkeeper?userId=${userId}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include", 
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

  });

  if (!response.ok) {
    const text = await response.text();
    let errorMessage = "Failed to fetch shopkeepers.";
    
    try {
      const error = JSON.parse(text);
      errorMessage = error.message || errorMessage;
    } catch (err) {
      // response wasn't JSON, use plain text
      if (text) errorMessage = text;
    }
  
    throw new Error(errorMessage);
  }
  
  return response.json();
};

export const getQRCodeByShopkeeper = async (shopkeeperId) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/qrcode?shopkeeperId=${shopkeeperId}`;
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch QR code.");
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob); // returns a blob URL to use in <img src="..." />
};

