import { Check, User, Briefcase, Building2 } from "lucide-react"

export function SubscriptionCard({ plan, billingPeriod, onSelectPlan }) {
  const icons = {
    basic: User,
    pro: Briefcase,
    enterprise: Building2,
  }

  const Icon = icons[plan.variant]

  const gradients = {
    basic: "bg-gradient-to-br from-violet-500 to-violet-600",
    pro: "bg-gradient-to-br from-orange-400 to-yellow-400",
    enterprise: "bg-gradient-to-br from-blue-500 to-blue-600",
  }

  const buttonColors = {
    basic: "bg-violet-600 hover:bg-violet-700",
    pro: "bg-orange-500 hover:bg-orange-600",
    enterprise: "bg-blue-600 hover:bg-blue-700",
  }

  const pricing = plan.pricing[billingPeriod]
  const discountedPrice = pricing.discount ? pricing.price * (1 - pricing.discount / 100) : pricing.price

  return (
    <div className="w-full overflow-hidden bg-white rounded-xl shadow-lg flex flex-col relative">
      {pricing.discount && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs sm:text-sm font-bold rounded-full px-2 sm:px-3 py-1 z-10">
          {pricing.discount}% OFF
        </div>
      )}
      <div className={`${gradients[plan.variant]} p-6`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{plan.tier}</h3>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <p className="text-base text-white/90">{plan.description}</p>
      </div>
      <div className="p-6 bg-white flex flex-col flex-grow">
        <div className="flex flex-col items-start mb-6">
          {plan.variant === "enterprise" ? (
            <span className="text-2xl font-bold text-gray-900">Contact Sales</span>
          ) : (
            <>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-lg text-gray-600">/{billingPeriod.slice(0, -2)}</span>
              </div>
              {pricing.discount && (
                <div className="text-base text-gray-500 mt-1">
                  <span className="line-through">${pricing.price.toFixed(2)}</span>
                </div>
              )}
            </>
          )}
        </div>
        <ul className="space-y-4 mb-6 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="mr-2 h-5 w-5 shrink-0 mt-1 text-green-500" />
              <span className="text-base text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onSelectPlan}
          className={`w-full h-12 text-white font-semibold text-lg rounded-md transition-colors ${buttonColors[plan.variant]}`}
        >
          {plan.variant === "enterprise" ? "Contact Sales" : `Select ${plan.tier} Plan`}
        </button>
      </div>
    </div>
  )
}

