import { demoData } from "./demoData";

export const authenticateUser = async (slug, email, password) => {
  if (slug !== demoData.company.slug) {
    throw new Error("Invalid company slug.");
  }
  const user = demoData.user;
  if (email === user.email && password === "password123") {
    return { success: true, user };
  } else {
    throw new Error("Invalid login credentials.");
  }
};

export const fetchClientData = async (slug) => {
  if (slug !== demoData.company.slug) {
    throw new Error("Invalid company slug.");
  }
  return demoData.user;
};
