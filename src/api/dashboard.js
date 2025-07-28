import { VITE_BACKEND_URL } from "../apiConfig";
const token = localStorage.getItem("token");

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getDashboardSummary = async (shopkeeperId) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/shopkeeperDashboard/total?shopkeeperId=${shopkeeperId}`, authHeaders);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
};

export const getReferralVsNewUsers = async (shopkeeperId) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/shopkeeperDashboard/referral-vs-new-users?shopkeeperId=${shopkeeperId}`, authHeaders);
  if (!res.ok) throw new Error("Failed to fetch referral-vs-new-users");
  return res.json();
};

export const getCouponReport = async (shopkeeperId) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/shopkeeperDashboard/coupon-usage?shopkeeperId=${shopkeeperId}`, authHeaders);
  if (!res.ok) throw new Error("Failed to fetch coupon report");
  return res.json();
};
