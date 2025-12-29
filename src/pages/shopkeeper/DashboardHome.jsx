// import {React,useEffect,useState} from "react";
// import { Link } from "react-router-dom";
// import { shopkeeperDemoData, colorPalette } from "../../utils/demoData";
// import DashboardGraphs from "../../components/Graphs/ShopkeeperGraphs/DashboardGraphs";
// import { getCurrentUser } from "../../api/signin";

// const DashboardHome = () => {
//   const { subscription, stats } = shopkeeperDemoData;
//   const [userDetails, setUserDetails] = useState(null);
//    useEffect(() => {
//           const fetchData = async () => {
//               try {
//                   const user = await getCurrentUser();
//                   console.log("Fetched user:", user.id);
//                   setUserDetails(user);
//               } catch (error) {
//                   console.error("Error fetching monthly data:", error);
//               }
//           };
  
//           fetchData();
//       }, []);

//   return (
//     <div className="min-h-screen p-8 bg-white">
//       <h1 className="text-3xl font-bold mb-6 text-black">Shopkeeper Dashboard</h1>

//       {/* Tiles Area */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div
//           className="p-6 rounded shadow-md text-white"
//           style={{ backgroundColor: colorPalette.primary }}
//         >
//           <h3 className="text-xl font-semibold">Total Users</h3>
//           <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
//         </div>
//         <div
//           className="p-6 rounded shadow-md text-white"
//           style={{ backgroundColor: colorPalette.secondary }}
//         >
//           <h3 className="text-xl font-semibold">Referral Codes Generated</h3>
//           <p className="text-4xl font-bold mt-2">{stats.referralCodes}</p>
//         </div>
//         <div
//           className="p-6 rounded shadow-md text-white"
//           style={{ backgroundColor: colorPalette.accent }}
//         >
//           <h3 className="text-xl font-semibold">Coupons Redeemed</h3>
//           <p className="text-4xl font-bold mt-2">{stats.couponsRedeemed}</p>
//         </div>
//       </section>

//       <section>
//         {/* <DashboardGraphs shopkeeperId={userDetails?.id}/> */}
//         {userDetails?.id ? (
//         <DashboardGraphs shopkeeperId={userDetails.id} />
//       ) : (
//         <p>Loading...</p>
//       )}
//       </section>

//       {/* Graphs Area */}
//       {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="p-6 rounded shadow-md bg-white">
//           <h3 className="text-xl font-semibold mb-4 text-black">User Growth</h3>
//           <div
//             className="h-48 rounded flex items-center justify-center"
//             style={{ backgroundColor: colorPalette.primary }}
//           >
//             <p className="text-white">[Graph Placeholder]</p>
//           </div>
//         </div>
//         <div className="p-6 rounded shadow-md bg-white">
//           <h3 className="text-xl font-semibold mb-4 text-black">Coupons vs Referrals</h3>
//           <div
//             className="h-48 rounded flex items-center justify-center"
//             style={{ backgroundColor: colorPalette.secondary }}
//           >
//             <p className="text-white">[Graph Placeholder]</p>
//           </div>
//         </div>
//       </section> */}

//       {/* Subscription Overview */}
//       <section className="mb-6">
//         <h2 className="text-xl font-semibold mb-2 text-black">Subscription</h2>
//         <div
//           className="p-4 rounded shadow-md"
//           style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}
//         >
//           <p>
//             Tier: <span className="font-semibold">{subscription.tier}</span>
//           </p>
//           <p>
//             Features:{" "}
//             <span className="font-semibold">{subscription.features.join(", ")}</span>
//           </p>
//           <p>
//             Expiry: <span className="font-semibold">{subscription.expiry}</span>
//           </p>
//         </div>
//       </section>

//       {/* Navigation Links */}
//       <section>
//         <h2 className="text-xl font-semibold mb-2 text-black">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Link
//             to="/shopkeeper/referral-codes"
//             className="block p-4 rounded text-white text-center font-medium transition"
//             style={{ backgroundColor: colorPalette.primary }}
//           >
//             Manage Referral Codes
//           </Link>
//           <Link
//             to="/shopkeeper/interaction-panel"
//             className="block p-4 rounded text-white text-center font-medium transition"
//             style={{ backgroundColor: colorPalette.secondary }}
//           >
//             Interaction Panel
//           </Link>
//           <Link
//             to="/shopkeeper/subscription"
//             className="block p-4 rounded text-white text-center font-medium transition"
//             style={{ backgroundColor: colorPalette.accent }}
//           >
//             Subscription Management
//           </Link>
//           <Link
//             to="/shopkeeper/analytics"
//             className="block p-4 rounded text-white text-center font-medium transition"
//             style={{ backgroundColor: colorPalette.black }}
//           >
//             Analytics
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DashboardHome;


import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { shopkeeperDemoData, colorPalette } from "../../utils/demoData";
import DashboardGraphs from "../../components/Graphs/ShopkeeperGraphs/DashboardGraphs";
import { getCurrentUser } from "../../api/signin";
import {
  getDashboardSummary,
  getReferralVsNewUsers,
  getCouponReport,
} from "../../api/dashboard";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardHome = () => {
  const { subscription } = shopkeeperDemoData;
  const [userDetails, setUserDetails] = useState(null);
   const [applications, setApplications] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    referralCodes: 0,
    couponCodesGenerated: 0,
    couponsRedeemed: 0,
    uniqueCouponUsers: 0,
    newUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        console.log("Fetched user:", user.id);
        setUserDetails(user);

        // check applications returned from backend
        if (user.application_name && Array.isArray(user.application_name)) {
          setApplications(user.application_name);
        } else if (user.application_name) {
          setApplications([user.application_name]);
        }

        const shopkeeperId = localStorage.getItem("shopkeeperId");

        const [summary, referralData, couponData] = await Promise.all([
          getDashboardSummary(shopkeeperId),
          getReferralVsNewUsers(shopkeeperId),
          getCouponReport(shopkeeperId),
        ]);
        setStats({
          totalUsers: summary.totalUsers,
          referralCodes: summary.totalReferralCodes,
          couponCodesGenerated: summary.totalCouponCodes,
          couponsRedeemed: couponData.totalRedeemCount,
          uniqueCouponUsers: couponData.totalUniqueUsers,
          newUsers: referralData.totalNewUsers,
        });
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchData();
  }, []);

  // Chart data for Total Referral Codes vs New Users
  const referralVsNewUsersData = {
    labels: ["Referral Codes Generated", "New Users"],
    datasets: [
      {
        label: "Counts",
        data: [stats.referralCodes, stats.newUsers],
        backgroundColor: [colorPalette.primary, colorPalette.secondary],
        borderColor: [colorPalette.primary, colorPalette.secondary],
        borderWidth: 1,
        barThickness: 45, 
        maxBarThickness: 50, 
      },
    ],
  };

  // Chart data for Coupon Codes vs Redeemed vs Unique Users
  const couponData = {
    labels: ["Coupon Codes Generated", "Coupons Redeemed", "Unique Users"],
    datasets: [
      {
        label: "Counts",
        data: [stats.couponCodesGenerated, stats.couponsRedeemed, stats.uniqueCouponUsers],
        backgroundColor: [colorPalette.accent, colorPalette.primary, colorPalette.secondary],
        borderColor: [colorPalette.accent, colorPalette.primary, colorPalette.secondary],
        borderWidth: 1,
        barThickness: 45, 
        maxBarThickness: 50, 
      },
    ],
  };

  // Chart options for consistent styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        color: "#333",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopkeeper Dashboard</h1>

      {/* Tiles Area */}
      {userDetails && (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className="p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform duration-200"
          style={{ backgroundColor: colorPalette.primary }}
        >
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        {applications.includes("Referral") && (
        <div
          className="p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform duration-200"
          style={{ backgroundColor: colorPalette.secondary }}
        >
          <h3 className="text-xl font-semibold">Total Referral Codes Generated</h3>
          <p className="text-4xl font-bold mt-2">{stats.referralCodes}</p>
        </div>
        )}
        {applications.includes("Coupon") && (
        <div
          className="p-6 rounded-lg shadow-lg text-white transform hover:scale-105 transition-transform duration-200"
          style={{ backgroundColor: colorPalette.accent }}
        >
          <h3 className="text-xl font-semibold">Total Coupons Codes Generated</h3>
          <p className="text-4xl font-bold mt-2">{stats.couponCodesGenerated}</p>
        </div>
        )}
      </section>
      )}

      <section className="mb-8">
        {userDetails?.id ? (
          <DashboardGraphs shopkeeperId={userDetails.id} />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </section>

      {/* Graphs Area */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         {applications.includes("Referral") && (
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Total Referral Codes vs New Users
          </h3>
          <div className="h-64">
            <Bar
              data={referralVsNewUsersData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Referral Codes vs New Users",
                  },
                },
              }}
            />
          </div>
        </div>
         )}

         {applications.includes("Coupon") && (
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Total Coupon Codes vs Redeemed vs Unique Users
          </h3>
          <div className="h-64">
            <Bar
              data={couponData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Coupon Metrics",
                  },
                },
              }}
            />
          </div>
        </div>
         )}
      </section>
      

      {/* Subscription Overview */}
      {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscription</h2>
        <div
          className="p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: colorPalette.accent, color: colorPalette.white }}
        >
          <p>
            Tier: <span className="font-semibold">{subscription.tier}</span>
          </p>
          <p>
            Features:{" "}
            <span className="font-semibold">{subscription.features.join(", ")}</span>
          </p>
          <p>
            Expiry: <span className="font-semibold">{subscription.expiry}</span>
          </p>
        </div>
      </section> */}

      {/* Navigation Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.includes("Referral") && (
          <>
            <Link
              to="/shopkeeper/referral-codes"
              className="block p-6 rounded-lg text-white text-center font-medium transition-transform transform hover:scale-105"
              style={{ backgroundColor: colorPalette.primary }}
            >
              Manage Referral Codes
            </Link>

            <Link
              to="/shopkeeper/shopkeeperownerdashboard"
              className="block p-4 rounded-lg text-white text-center font-medium transition-all transform hover:scale-105 shadow-lg flex flex-col items-center justify-center"
              style={{ backgroundColor: '#722ed1' }} 
            >
              <span className="font-bold">📊 View Detailed Referral Dashboard</span>
              <span className="text-sm mt-1 opacity-90">Trends, Funnel, Top Referrers & More</span>
            </Link>
          </>
          )}
          {applications.includes("Coupon") && (
          <Link
            to="/shopkeeper/coupon-codes"
            className="block p-4 rounded-lg text-white text-center font-medium transition-transform transform hover:scale-105"
            style={{ backgroundColor: colorPalette.primary }}
          >
            Manage Coupon Codes
          </Link>
          )}
          <Link
            to="/shopkeeper/interaction-panel"
            className="block p-4 rounded-lg text-white text-center font-medium transition-transform transform hover:scale-105"
            style={{ backgroundColor: colorPalette.secondary }}
          >
            Interaction Panel
          </Link>
          <Link
            to="/shopkeeper/subscription"
            className="block p-4 rounded-lg text-white text-center font-medium transition-transform transform hover:scale-105"
            style={{ backgroundColor: colorPalette.accent }}
          >
            Subscription Management
          </Link>
          <Link
            to="/shopkeeper/analytics"
            className="block p-4 rounded-lg text-white text-center font-medium transition-transform transform hover:scale-105"
            style={{ backgroundColor: colorPalette.black }}
          >
            Analytics
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;