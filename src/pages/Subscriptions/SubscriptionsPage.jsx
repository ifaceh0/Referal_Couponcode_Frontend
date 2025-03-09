import { useState, useEffect } from "react"
import axios from "axios"
import { plans } from "../../utils/subscriptionData.js"
import { SubscriptionCard } from "./Subscriptions-Cards.jsx"

// This would typically come from your backend
const mockUserSubscription = {
  plan: plans[1], // Pro plan
  billingPeriod: "yearly",
  validUntil: "2024-05-01",
}

export default function SubscriptionsPage() {
  const [billingPeriod, setBillingPeriod] = useState("monthly")
  const [userSubscription, setUserSubscription] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch this from your backend
    setUserSubscription(null)
  }, [])

  const handleCancelSubscription = async () => {
    try {
      await axios.post("https://referral-system-backendnew.onrender.com/refer/api/subscriptions/cancel", {
        shopkeeperId: 2, // Assuming shopkeeperId is 2, you might want to get this from user context or props
      })
      console.log("Subscription cancelled successfully")
      setUserSubscription(null)
    } catch (error) {
      console.error("Error cancelling subscription:", error)
    }
  }

  // const handleSelectPlan = async (planType) => {
  //   try {
  //     const response = await axios.post("https://referral-system-backendnew.onrender.com/refer/api/subscriptions/create-session", {
  //       shopkeeperId: 2, // Assuming shopkeeperId is 2, you might want to get this from user context or props
  //       plan: planType,
  //     })
  //     console.log("Session created successfully:", response.data)
  //     window.location.href(response["sessionUrl"]);
  //     // Handle the response, maybe redirect to a payment page or update UI
  //   } catch (error) {
  //     console.error("Error creating session:", error)
  //   }
  // }

  const handleSelectPlan = async (planType) => {
    try {
      const response = await axios.post(
        "https://referral-system-backendnew.onrender.com/refer/api/subscriptions/create-session",
        {
          shopkeeperId: 2, // You might want to get this dynamically
          plan: planType,
        }
      );

      console.log("Session created successfully:", response.data);

      // Ensure response.data contains the sessionUrl
      if (response.data && response.data.sessionUrl) {
        window.location.href = response.data.sessionUrl; // Corrected this line
      } else {
        console.error("Session URL not found in response:", response.data);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };


  const getPlanType = (tier, billingPeriod) => {
    const prefix = tier.toUpperCase()
    const suffix = billingPeriod === "monthly" ? "MONTHLY" : billingPeriod === "quarterly" ? "QUARTERLY" : "ANNUAL"
    return `${prefix}_${suffix}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100 py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold text-center text-violet-900 mb-6">Choose Your Subscription Plan</h1>

        {userSubscription ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">Your Current Subscription</h2>
            <p className="text-lg mb-2">
              Plan: <span className="font-semibold">{userSubscription.plan.tier}</span>
            </p>
            <p className="text-lg mb-2">
              Billing Period: <span className="font-semibold">{userSubscription.billingPeriod}</span>
            </p>
            <p className="text-lg mb-4">
              Valid Until:{" "}
              <span className="font-semibold">{new Date(userSubscription.validUntil).toLocaleDateString()}</span>
            </p>
            <button
              onClick={handleCancelSubscription}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-full bg-white p-1 shadow-sm" role="group">
                {["monthly", "quarterly", "yearly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setBillingPeriod(period)}
                    className={`relative px-6 py-2 text-sm font-medium rounded-full transition-all
                      ${billingPeriod === period ? "bg-violet-600 text-white" : "text-violet-700 hover:bg-violet-50"}`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                    {period !== "monthly" && (
                      <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
                        {period === "quarterly" ? "20%" : "30%"} OFF
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, i) => (
                <SubscriptionCard
                  key={i}
                  plan={plan}
                  billingPeriod={billingPeriod}
                  onSelectPlan={() => handleSelectPlan(getPlanType(plan.tier, billingPeriod))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

