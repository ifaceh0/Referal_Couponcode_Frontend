// src/api/generateReferralCode.js

export async function generateReferralCode(data) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/referral-codes/generate`;
  // const shopkeeperId = 1; // Static value for now
  const shopkeeperId = localStorage.getItem("shopkeeperId");

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('amount', data.referralAmount);
  formData.append('expiryDate', data.expiryDate);
  formData.append('shopkeeper', shopkeeperId);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to generate referral code');
  }

  return response.json();
}


// // src/api/uploadBulkReferralCodes.js

export async function uploadBulkReferralCodes(file, expiryDate, referralAmount) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/referral-codes/bulk-upload`;
  // const shopkeeperId = 1; // Static value for now
  const shopkeeperId = localStorage.getItem("shopkeeperId");
  const formData = new FormData();
  formData.append('file', file);
  formData.append('expiryDate', expiryDate);
  formData.append('referralAmount', referralAmount);
  formData.append('shopkeeper', shopkeeperId);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload bulk referral codes');
  }

  return response.json();
}
