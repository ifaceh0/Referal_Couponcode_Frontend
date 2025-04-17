// // Generate a coupon code
// export const generateCouponCode = async (formData) => {
//   const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/generate`;
  
//   const payload = {
//     ...formData,
//     shopkeeper: {
//       shopkeeperId: 1, // Replace with actual ID or fetch dynamically if needed
      
      
//       // name: "Awesome Shop",
//       // email: "contact@example.com",
//       // phone: "+1234567890",
//       // logo: "https://example.com/logo.png",
//       // companyName: "Awesome Shop",
//       // companyAddress: "123 Market Street, City, Country",
//       // companyEmail: "contact@example.com",
//       // companyPhone: "+1234567890",
//       // couponLink: "https://example.com/coupon/ABC123",
//       // subscription: null,
//       // settings: null,
//       // generatedCodes: [],
//     },
//   };

//   console.log(payload);

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // credentials: true,
//     credentials: 'include',
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to generate coupon code');
//   }

//   return response.json();
// };

// // Upload bulk coupon codes
// export const uploadBulkCouponCodes = async (file, expiryDate, couponAmount, usageLimit) => {
//   const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/bulk-upload`;

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('expiryDate', expiryDate);
//   formData.append('usageLimit', usageLimit);
//   formData.append('couponAmount', couponAmount);
//   formData.append('shopkeeper', shopkeeperId);

//   const shopkeeper = {
//     shopkeeperId: 1, // Replace with actual ID or fetch dynamically if needed
    
//     // name: "Awesome Shop",
//     // email: "contact@example.com",
//     // phone: "+1234567890",
//     // logo: "https://example.com/logo.png",
//     // companyName: "Awesome Shop",
//     // companyAddress: "123 Market Street, City, Country",
//     // companyEmail: "contact@example.com",
//     // companyPhone: "+1234567890",
//     // couponLink: "https://example.com/coupon/ABC123",
//     // subscription: null,
//     // settings: null,
//     // generatedCodes: [],
//   };

//   formData.append('shopkeeper', JSON.stringify(shopkeeper));

//   const response = await fetch(url, {
//     method: 'POST',
//     credentials: true,
//     body: formData,
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to upload bulk coupon codes');
//   }

//   return response.json();
// };

// // Additional coupon code-related API functions can be added here.



// // // src/api/couponCodes.js

// // export const generateCouponCode = async (codeData) => {
// //     const response = await fetch("/api/coupon-codes/generate", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(codeData),
// //     });
// //     return response.json();
// //   };
  
// //   export const bulkUploadCouponCodes = async (file, expiryDate, couponAmount, shopkeeperId) => {
// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("expiryDate", expiryDate);
// //     formData.append("couponAmount", couponAmount);
// //     formData.append("shopkeeperId", shopkeeperId);
  
// //     const response = await fetch("/api/coupon-codes/bulk-upload", {
// //       method: "POST",
// //       body: formData,
// //     });
// //     return response.ok;
// //   };
  
// //   export const deleteCouponCode = async (id) => {
// //     const response = await fetch(`/api/coupon-codes/${id}`, {
// //       method: "DELETE",
// //     });
// //     return response.ok;
// //   };
  
// //   export const renewCouponCode = async (id) => {
// //     const response = await fetch(`/api/coupon-codes/renew/${id}`, {
// //       method: "PUT",
// //     });
// //     return response.ok;
// //   };
  

// export const generateCouponCode = async (formData) => {
//   const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/generate`;
  
//   // Get shopkeeper ID and token from localStorage
//   const shopkeeperId = localStorage.getItem("shopkeeperId");
//   const token = localStorage.getItem("token"); // Assuming you store the token with key "token"

//   if (!shopkeeperId || !token) {
//     throw new Error("Shopkeeper ID or authentication token not found");
//   }

//   const payload = {
//     ...formData,
//     shopkeeper: {
//       shopkeeperId: shopkeeperId
//     }
//   };

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//     },
//     credentials: 'include',
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to generate coupon code');
//   }

//   return response.json();
// };

// export const uploadBulkCouponCodes = async (file, expiryDate, couponAmount, usageLimit) => {
//   const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/bulk-upload`;

//   // Get shopkeeper ID and token from localStorage
//   const shopkeeperId = localStorage.getItem("shopkeeperId");
//   const token = localStorage.getItem("token");

//   if (!shopkeeperId || !token) {
//     throw new Error("Shopkeeper ID or authentication token not found");
//   }

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('expiryDate', expiryDate);
//   formData.append('usageLimit', usageLimit);
//   formData.append('couponAmount', couponAmount);

//   const shopkeeper = {
//     shopkeeperId: shopkeeperId
//   };

//   formData.append('shopkeeper', JSON.stringify(shopkeeper));

//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//     },
//     credentials: 'include',
//     body: formData,
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to upload bulk coupon codes');
//   }

//   return response.json();
// };
  

export const generateCouponCode = async (formData) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/generate`;

  const token = localStorage.getItem("token");
  const shopkeeperId = 1; 

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const payload = {
    ...formData,
    shopkeeper: {
      shopkeeperId: shopkeeperId
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate coupon code');
  }

  return response.json();
};

export const uploadBulkCouponCodes = async (file, expiryDate, couponAmount, usageLimit) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/shopkeepers/coupon-codes/bulk-upload`;

  const token = localStorage.getItem("token");
  const shopkeeperId = 1; 

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('expiryDate', expiryDate);
  formData.append('usageLimit', usageLimit);
  formData.append('couponAmount', couponAmount);

  const shopkeeper = { shopkeeperId: shopkeeperId };
  formData.append('shopkeeper', JSON.stringify(shopkeeper));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upload bulk coupon codes');
  }

  return response.json();
};
