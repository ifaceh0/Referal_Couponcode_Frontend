// Generate a referral code
// export const generateReferralCode = async (formData) => {
//   const url = `${baseUrl.baseUrl}/api/referral-codes/generate`;
  
//   const payload = {
//     ...formData,
//     shopkeeper: {
//       shopkeeperId: 1, // get the shopkeeper id from the data stored in local storage.
//     },
//   };

//   console.log(payload);

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Auth'
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to generate referral code');
//   }

//   return response.json();
// };
export const generateReferralCodeCookie = async (formData) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/referral-codes/generate`;

  const payload = {
    ...formData,
    shopkeeper: {
      shopkeeperId: 1,  // You can retrieve the shopkeeper ID as needed
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: true,
    body: JSON.stringify(payload),
    // credentials: 'include',  // Send the HttpOnly token cookie with the request
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate referral code');
  }

  return response.json();
};

export const generateReferralCode = async (formData) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/referral-codes/generate`;

  // Retrieve token and shopkeeper data from localStorage
  // const token = localStorage.getItem("token");
  // const shopkeeper = JSON.parse(localStorage.getItem("shopkeeper"));

  // if (!token || !shopkeeper) {
  //   throw new Error("Authorization details not found. Please log in again.");
  // }

  const payload = {
    ...formData,
    shopkeeper: {
      shopkeeperId: 5, // Get shopkeeperId from localStorage
      // shopkeeperId: shopkeeper.id, // Get shopkeeperId from localStorage
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, // Include token in Authorization header
    },
    // withCredntials: true,
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to generate referral code");
  }
  return response.json();
};



// Upload bulk referral codes
export const uploadBulkReferralCodes = async (file, expiryDate, referralAmount) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/referral-codes/bulk-upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('expiryDate', expiryDate);
  formData.append('referralAmount', referralAmount);

  const shopkeeper = {
    shopkeeperId: 1, // Replace with actual ID or fetch dynamically if needed
    name: "Awesome Shop",
    email: "contact@example.com",
    phone: "+1234567890",
    logo: "https://example.com/logo.png",
    companyName: "Awesome Shop",
    companyAddress: "123 Market Street, City, Country",
    companyEmail: "contact@example.com",
    companyPhone: "+1234567890",
    referralLink: "https://example.com/referral/ABC123",
    subscription: null,
    settings: null,
    generatedCodes: [],
  };

  formData.append('shopkeeper', JSON.stringify(shopkeeper));

  const response = await fetch(url, {
    method: 'POST',
    credentials: true,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload bulk referral codes');
  }

  return response.json();
};

// Additional referral code-related API functions can be added here.



// // src/api/referralCodes.js

// export const generateReferralCode = async (codeData) => {
//     const response = await fetch("/api/referral-codes/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(codeData),
//     });
//     return response.json();
//   };
  
//   export const bulkUploadReferralCodes = async (file, expiryDate, referralAmount, shopkeeperId) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("expiryDate", expiryDate);
//     formData.append("referralAmount", referralAmount);
//     formData.append("shopkeeperId", shopkeeperId);
  
//     const response = await fetch("/api/referral-codes/bulk-upload", {
//       method: "POST",
//       body: formData,
//     });
//     return response.ok;
//   };
  
//   export const deleteReferralCode = async (id) => {
//     const response = await fetch(`/api/referral-codes/${id}`, {
//       method: "DELETE",
//     });
//     return response.ok;
//   };
  
//   export const renewReferralCode = async (id) => {
//     const response = await fetch(`/api/referral-codes/renew/${id}`, {
//       method: "PUT",
//     });
//     return response.ok;
//   };
  