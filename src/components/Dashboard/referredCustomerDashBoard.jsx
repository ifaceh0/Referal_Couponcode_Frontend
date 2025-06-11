import React from 'react';

const ReferredCustomerDashboard = ({ customerData }) => {
  // Destructure data with safe defaults
  const {
    welcomeReward = { status: 'Pending', description: 'Your $10 welcome reward' },
    redemptionOptions = '$5 off next purchase',
    referredBy = null,
    inviteOthers = { friendsRequired: 3, reward: '$10' },
    purchaseHistory = [],
    progress = { current: 1, total: 3, bonus: '10% off' }
  } = customerData || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Referral Dashboard</h1>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Welcome Reward Status */}
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h2 className="font-semibold text-gray-700 mb-2">Welcome Reward Status</h2>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              welcomeReward.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <p className="text-gray-600">{welcomeReward.description}</p>
          </div>
          <span className="text-sm text-gray-500 mt-1 block">
            Status: {welcomeReward.status}
          </span>
        </div>
        
        {/* Reward Redemption Options */}
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
          <h2 className="font-semibold text-gray-700 mb-2">Reward Redemption</h2>
          <p className="text-gray-600 mb-3">{redemptionOptions}</p>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
            Redeem Now
          </button>
        </div>
        
        {/* Who Invited You */}
        {referredBy && (
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
            <h2 className="font-semibold text-gray-700 mb-2">Who Invited You</h2>
            <p className="text-gray-600">
              You were referred by <span className="font-medium text-purple-600">{referredBy}</span>
            </p>
          </div>
        )}
        
        {/* Invite Others */}
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-amber-500">
          <h2 className="font-semibold text-gray-700 mb-2">Invite Friends</h2>
          <p className="text-gray-600 mb-3">
            Invite {inviteOthers.friendsRequired} friends to earn {inviteOthers.reward}
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md text-sm transition-colors">
            Invite Friends
          </button>
        </div>
        
        {/* Progress Toward New Bonus */}
        <div className="bg-white p-5 rounded-lg shadow-sm md:col-span-2 border-l-4 border-teal-500">
          <h2 className="font-semibold text-gray-700 mb-2">Progress to Next Bonus</h2>
          <p className="text-gray-600 mb-1">
            Refer {progress.total - progress.current} more friends to earn {progress.bonus}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-teal-600 h-2.5 rounded-full" 
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{progress.current} referred</span>
            <span>{progress.total} required</span>
          </div>
        </div>
        
        {/* Purchase History with Rewards */}
        <div className="bg-white p-5 rounded-lg shadow-sm md:col-span-2 border-l-4 border-rose-500">
          <h2 className="font-semibold text-gray-700 mb-3">Purchase History with Rewards</h2>
          
          {purchaseHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reward Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchaseHistory.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">#{purchase.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{purchase.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">${purchase.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-rose-600 font-medium">
                        ${purchase.rewardUsed.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No purchases with referral rewards yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferredCustomerDashboard;