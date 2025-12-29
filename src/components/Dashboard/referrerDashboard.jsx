// import React, { useState } from 'react';
// import { FaShareAlt, FaCopy, FaQrcode, FaWhatsapp, FaEnvelope, FaSms } from 'react-icons/fa';

// const ReferrerDashboard = () => {
//   // State for share options
//   const [showShareOptions, setShowShareOptions] = useState(false);
  
//   // Sample data - in a real app this would come from props or API
//   const dashboardData = {
//     totalReferred: 24,
//     successfulReferrals: 18,
//     totalRewardsEarned: 145,
//     pendingRewards: 35,
//     nextMilestone: {
//       friendsNeeded: 2,
//       reward: "$10",
//       description: "Refer 2 more friends to get $10"
//     },
//     rewardHistory: [
//       { id: 1, date: "2023-06-15", friend: "Sarah Johnson", status: "Claimed", amount: 10 },
//       { id: 2, date: "2023-06-10", friend: "Mike Chen", status: "Issued", amount: 10 },
//       { id: 3, date: "2023-06-05", friend: "Alex Kim", status: "Pending", amount: 10 },
//       { id: 4, date: "2023-05-28", friend: "Jamal Williams", status: "Claimed", amount: 15 },
//       { id: 5, date: "2023-05-20", friend: "Emily Rodriguez", status: "Claimed", amount: 10 },
//     ],
//     redemptionHistory: [
//       { id: 1, date: "2023-06-12", order: "#ORD-78945", amount: 10, description: "$10 off used" },
//       { id: 2, date: "2023-05-30", order: "#ORD-78231", amount: 15, description: "15% discount applied" },
//       { id: 3, date: "2023-05-15", order: "#ORD-77892", amount: 10, description: "Free shipping + $5 off" },
//     ],
//     shareLink: "https://example.com/refer?code=REF12345"
//   };

//   // Calculate progress percentage for next milestone
//   const progressPercentage = Math.min(100, Math.floor(
//     (dashboardData.totalReferred / (dashboardData.totalReferred + dashboardData.nextMilestone.friendsNeeded)) * 100
//   ));

//   // Function to copy referral link
//   const copyReferralLink = () => {
//     navigator.clipboard.writeText(dashboardData.shareLink);
//     alert("Referral link copied to clipboard!");
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Referral Dashboard</h1>
//           <p className="text-gray-600 mt-2">Track your referral progress and rewards</p>
//         </div>
//         <button 
//           onClick={() => setShowShareOptions(!showShareOptions)}
//           className="mt-4 md:mt-0 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
//         >
//           <FaShareAlt className="mr-2" />
//           Share Referral Link
//         </button>
//       </div>

//       {/* Share Options Modal */}
//       {showShareOptions && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Share Referral Link</h3>
//               <button 
//                 onClick={() => setShowShareOptions(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="mb-4 flex">
//               <input 
//                 type="text" 
//                 value={dashboardData.shareLink}
//                 readOnly
//                 className="flex-grow border border-gray-300 rounded-l-lg py-2 px-3"
//               />
//               <button 
//                 onClick={copyReferralLink}
//                 className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg flex items-center"
//               >
//                 <FaCopy className="text-gray-700" />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
//                 <FaWhatsapp className="text-2xl text-green-500 mb-1" />
//                 <span>WhatsApp</span>
//               </button>
//               <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
//                 <FaEnvelope className="text-2xl text-gray-700 mb-1" />
//                 <span>Email</span>
//               </button>
//               <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
//                 <FaSms className="text-2xl text-blue-500 mb-1" />
//                 <span>SMS</span>
//               </button>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <div className="bg-white p-2 rounded-lg mb-2">
//                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
//                   <FaQrcode className="text-4xl text-gray-500" />
//                 </div>
//               </div>
//               <p className="text-gray-600 text-sm">Scan QR code to share</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
//           <h3 className="text-gray-500 text-sm font-medium mb-1">Total Friends Referred</h3>
//           <p className="text-3xl font-bold text-gray-800">{dashboardData.totalReferred}</p>
//           <p className="text-green-600 text-sm mt-1">+3 this week</p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
//           <h3 className="text-gray-500 text-sm font-medium mb-1">Successful Referrals</h3>
//           <p className="text-3xl font-bold text-gray-800">{dashboardData.successfulReferrals}</p>
//           <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//             <div 
//               className="bg-green-500 h-2 rounded-full" 
//               style={{ width: `${(dashboardData.successfulReferrals / dashboardData.totalReferred) * 100}%` }}
//             ></div>
//           </div>
//           <p className="text-gray-600 text-sm mt-1">Conversion rate: {Math.round((dashboardData.successfulReferrals / dashboardData.totalReferred) * 100)}%</p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
//           <h3 className="text-gray-500 text-sm font-medium mb-1">Total Rewards Earned</h3>
//           <p className="text-3xl font-bold text-gray-800">${dashboardData.totalRewardsEarned}</p>
//           <p className="text-amber-600 text-sm mt-1 flex items-center">
//             <span className="bg-amber-100 px-2 py-1 rounded mr-2">Pending: ${dashboardData.pendingRewards}</span>
//           </p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
//           <h3 className="text-gray-500 text-sm font-medium mb-1">Next Reward Milestone</h3>
//           <p className="text-lg font-bold text-gray-800">{dashboardData.nextMilestone.description}</p>
//           <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//             <div 
//               className="bg-purple-500 h-2 rounded-full" 
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//           <p className="text-gray-600 text-sm mt-1">
//             {dashboardData.totalReferred} of {dashboardData.totalReferred + dashboardData.nextMilestone.friendsNeeded} friends
//           </p>
//         </div>
//       </div>

//       {/* Tables Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Reward History */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="border-b border-gray-200 px-6 py-4">
//             <h2 className="text-xl font-bold text-gray-800">Reward History</h2>
//             <p className="text-gray-600 text-sm">Track your referral rewards and status</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friend</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {dashboardData.rewardHistory.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.friend}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         item.status === 'Claimed' ? 'bg-green-100 text-green-800' :
//                         item.status === 'Issued' ? 'bg-blue-100 text-blue-800' :
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Redemption History */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="border-b border-gray-200 px-6 py-4">
//             <h2 className="text-xl font-bold text-gray-800">Reward Redemption Tracker</h2>
//             <p className="text-gray-600 text-sm">How and when your rewards were used</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Used</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {dashboardData.redemptionHistory.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.order}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.amount}</td>
//                     <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center">
//         <h2 className="text-2xl font-bold text-white mb-2">Share with Friends, Earn More Rewards!</h2>
//         <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
//           Invite your friends to join and earn rewards for every successful referral. The more friends you refer, the more you earn!
//         </p>
//         <button 
//           onClick={() => setShowShareOptions(true)}
//           className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center mx-auto"
//         >
//           <FaShareAlt className="mr-2" />
//           Share Referral Link
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReferrerDashboard;









import React, { useState, useEffect } from 'react';
import { FaShareAlt, FaCopy, FaQrcode, FaWhatsapp, FaEnvelope, FaSms } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { getCurrentUser } from "../../api/signin";

const ReferrerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Function to fetch referral dashboard data
  const fetchDashboardData = async (userId) => {
    const token = localStorage.getItem('token');
    const url = `https://referral-couponcode-backend.onrender.com/refer/api/shopkeeperDashboard/referrerDashboard?userId=${userId}`;

    setIsLoading(true);
    try {
      console.log('Fetching dashboard data with URL:', url);
      console.log('Token:', token);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response status:', response.status); // Log status code
      console.log('Response headers:', response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Raw response:', errorText);
        let errorMessage = 'Failed to fetch dashboard data.';
        try {
          const error = JSON.parse(errorText);
          errorMessage = error.message || errorMessage;
        } catch (err) {
          if (errorText) errorMessage = errorText;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      // Map backend data to frontend structure
      const mappedData = {
        totalReferred: data.totalFriendsReferred,
        friendsReferredThisWeek: data.friendsReferredThisWeek,
        successfulReferrals: data.successfulReferrals,
        totalRewardsEarned: data.totalRewardsEarned ?? 0,
        pendingRewards: data.pendingRewards ?? 0,
        conversionRate: data.conversionRate,
        rewardHistory: data.rewardHistory.map((item) => ({
          id: item.date.toString(), // Use date as a unique key or add an ID in DTO
          date: new Date(item.date).toISOString().split('T')[0], // Format date
          friend: item.name,
          status: item.status,
          amount: item.amount ?? 0,
        })),
        redemptionHistory: data.rewardRedemptions.map((item) => ({
          id: item.date.toString(), // Use date as a unique key or add an ID in DTO
          date: new Date(item.date).toISOString().split('T')[0], // Format date
          order: item.orderId,
          amount: item.amountUsed ?? 0,
          description: item.description || `${item.amountUsed} off used`, // Add description if not provided
        })),
        shareLink: data.shareLink || 'https://example.com/refer?code=REF12345', // Adjust based on backend
        nextMilestone: {
          friendsNeeded: data.nextMilestone?.friendsNeeded || 2, // Adjust based on backend
          reward: data.nextMilestone?.reward || '$10',
          description: data.nextMilestone?.description || 'Refer 2 more friends to get $10',
        },
      };
      setDashboardData(mappedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user ID and dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getCurrentUser is defined similarly to Shop.jsx
        const user = await getCurrentUser(); // Fetch user details
        if (user?.userId) {
          await fetchDashboardData(user.userId);
        }
      } catch (error) {
        setError('Failed to fetch user data.');
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to copy referral link
  const copyReferralLink = () => {
    if (dashboardData?.shareLink) {
      navigator.clipboard.writeText(dashboardData.shareLink);
      alert('Referral link copied to clipboard!');
    }
  };

  // Calculate progress percentage for next milestone
  const progressPercentage = dashboardData
    ? Math.min(
        100,
        Math.floor(
          (dashboardData.totalReferred /
            (dashboardData.totalReferred + dashboardData.nextMilestone.friendsNeeded)) *
            100
        )
      )
    : 0;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <p className="text-gray-700 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <p className="text-gray-700 font-semibold">No dashboard data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Referral Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your referral progress and rewards</p>
        </div>
        <button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="mt-4 md:mt-0 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <FaShareAlt className="mr-2" />
          Share Referral Link
        </button>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Share Referral Link</h3>
              <button
                onClick={() => setShowShareOptions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mb-4 flex">
              <input
                type="text"
                value={dashboardData.shareLink}
                readOnly
                className="flex-grow border border-gray-300 rounded-l-lg py-2 px-3"
              />
              <button
                onClick={copyReferralLink}
                className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg flex items-center"
              >
                <FaCopy className="text-gray-700" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <FaWhatsapp className="text-2xl text-green-500 mb-1" />
                <span>WhatsApp</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <FaEnvelope className="text-2xl text-gray-700 mb-1" />
                <span>Email</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <FaSms className="text-2xl text-blue-500 mb-1" />
                <span>SMS</span>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg mb-2">
                <QRCodeSVG
                  value={dashboardData.shareLink}
                  size={128}
                  fgColor="#1d4ed8"
                />
              </div>
              <p className="text-gray-600 text-sm">Scan QR code to share</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Friends Referred</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.totalReferred}</p>
          <p className="text-green-600 text-sm mt-1">+{dashboardData.friendsReferredThisWeek} this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Successful Referrals</h3>
          <p className="text-3xl font-bold text-gray-800">{dashboardData.successfulReferrals}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${(dashboardData.successfulReferrals / dashboardData.totalReferred) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-1">Conversion rate: {dashboardData.conversionRate}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Rewards Earned</h3>
          <p className="text-3xl font-bold text-gray-800">${(dashboardData.totalRewardsEarned ?? 0).toFixed(2)}</p>
          <p className="text-amber-600 text-sm mt-1 flex items-center">
            <span className="bg-amber-100 px-2 py-1 rounded mr-2">
              Pending: ${(dashboardData.pendingRewards ?? 0).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Next Reward Milestone</h3>
          <p className="text-lg font-bold text-gray-800">{dashboardData.nextMilestone.description}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {dashboardData.totalReferred} of{' '}
            {dashboardData.totalReferred + dashboardData.nextMilestone.friendsNeeded} friends
          </p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reward History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">Reward History</h2>
            <p className="text-gray-600 text-sm">Track your referral rewards and status</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.rewardHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.friend}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'INVITED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.amount ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Redemption History */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800">Reward Redemption Tracker</h2>
            <p className="text-gray-600 text-sm">How and when your rewards were used</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Used</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.redemptionHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(item.amount ?? 0).toFixed(2)}</td>
                    {/* <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Share with Friends, Earn More Rewards!</h2>
        <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
          Invite your friends to join and earn rewards for every successful referral. The more friends you refer, the more you earn!
        </p>
        <button
          onClick={() => setShowShareOptions(true)}
          className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center mx-auto"
        >
          <FaShareAlt className="mr-2" />
          Share Referral Link
        </button>
      </div>
    </div>
  );
};

export default ReferrerDashboard;