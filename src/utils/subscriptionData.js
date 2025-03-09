// export const plans = [
//     {
//       tier: "Basic",
//       description: "For individuals starting out",
//       features: [
//         "Access to basic features",
//         "Email support",
//         "Personal profile",
//       ],
//       price: "99",
//       variant: "basic"
//     },
//     {
//       tier: "Pro",
//       description: "For growing businesses",
//       features: [
//         "Referral System",
//         "Email Notifications",
//         "SMS Notifications",
//         "Priority support",
//       ],
//       price: "299",
//       variant: "pro"
//     },
//     {
//       tier: "Enterprise",
//       description: "For large organizations",
//       features: [
//         "All Pro features",
//         "Custom integrations",
//         "24/7 phone support",
//         "Dedicated account manager",
//       ],
//       price: "4999",
//       variant: "enterprise"
//     }
//   ]



export const plans= [
  {
    tier: "Basic",
    description: "Perfect for individuals and small teams",
    features: ["Up to 5 users", "5GB storage", "Basic support", "Access to core features"],
    variant: "basic",
    pricing: {
      monthly: { price: 9.99 },
      quarterly: { price: 28.99, discount: 20 },
      yearly: { price: 99.99, discount: 30 },
    },
  },
  {
    tier: "Pro",
    description: "Ideal for growing businesses",
    features: ["Up to 20 users", "50GB storage", "Priority support", "Advanced analytics", "Custom integrations"],
    variant: "pro",
    pricing: {
      monthly: { price: 29.99 },
      quarterly: { price: 84.99, discount: 20 },
      yearly: { price: 299.99, discount: 30 },
    },
  },
  {
    tier: "Enterprise",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited users",
      "Unlimited storage",
      "24/7 dedicated support",
      "Advanced security features",
      "Custom development",
      "On-premise deployment option",
    ],
    variant: "enterprise",
    pricing: {
      monthly: { price: 0 },
      quarterly: { price: 0 },
      yearly: { price: 0 },
    },
  },
]

