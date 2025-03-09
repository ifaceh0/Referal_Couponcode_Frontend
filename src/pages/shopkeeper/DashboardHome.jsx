import React from "react";
import { Link } from "react-router-dom";
import { shopkeeperDemoData, colorPalette } from "../../utils/demoData";
import DashboardGraphs from "../../components/Graphs/ShopkeeperGraphs/DashboardGraphs";

const DashboardHome = () => {
  const { subscription, stats } = shopkeeperDemoData;

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Shopkeeper Dashboard</h1>

      {/* Tiles Area */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div
          className="p-6 rounded shadow-md text-white"
          style={{ backgroundColor: colorPalette.primary }}
        >
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
        <div
          className="p-6 rounded shadow-md text-white"
          style={{ backgroundColor: colorPalette.secondary }}
        >
          <h3 className="text-xl font-semibold">Referral Codes Generated</h3>
          <p className="text-4xl font-bold mt-2">{stats.referralCodes}</p>
        </div>
        <div
          className="p-6 rounded shadow-md text-white"
          style={{ backgroundColor: colorPalette.accent }}
        >
          <h3 className="text-xl font-semibold">Coupons Redeemed</h3>
          <p className="text-4xl font-bold mt-2">{stats.couponsRedeemed}</p>
        </div>
      </section>

      <section>
        <DashboardGraphs shopkeeperId={1}/>
      </section>

      {/* Graphs Area */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4 text-black">User Growth</h3>
          <div
            className="h-48 rounded flex items-center justify-center"
            style={{ backgroundColor: colorPalette.primary }}
          >
            <p className="text-white">[Graph Placeholder]</p>
          </div>
        </div>
        <div className="p-6 rounded shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-4 text-black">Coupons vs Referrals</h3>
          <div
            className="h-48 rounded flex items-center justify-center"
            style={{ backgroundColor: colorPalette.secondary }}
          >
            <p className="text-white">[Graph Placeholder]</p>
          </div>
        </div>
      </section> */}

      {/* Subscription Overview */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">Subscription</h2>
        <div
          className="p-4 rounded shadow-md"
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
      </section>

      {/* Navigation Links */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-black">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/shopkeeper/referral-codes"
            className="block p-4 rounded text-white text-center font-medium transition"
            style={{ backgroundColor: colorPalette.primary }}
          >
            Manage Referral Codes
          </Link>
          <Link
            to="/shopkeeper/interaction-panel"
            className="block p-4 rounded text-white text-center font-medium transition"
            style={{ backgroundColor: colorPalette.secondary }}
          >
            Interaction Panel
          </Link>
          <Link
            to="/shopkeeper/subscription"
            className="block p-4 rounded text-white text-center font-medium transition"
            style={{ backgroundColor: colorPalette.accent }}
          >
            Subscription Management
          </Link>
          <Link
            to="/shopkeeper/analytics"
            className="block p-4 rounded text-white text-center font-medium transition"
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
