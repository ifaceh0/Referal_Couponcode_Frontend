
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/userPage/LoginPage";
import ClientPage from "./pages/userPage/ClientPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DashboardHome from "./pages/shopkeeper/DashboardHome";
import ReferralCodes from "./pages/shopkeeper/ReferralCodes";
import CouponCodes from "./pages/shopkeeper/CouponCodes";
import InteractionPanel from "./pages/shopkeeper/InteractionPanel";
import Subscription from "./pages/shopkeeper/Subscription";
import Analytics from "./pages/shopkeeper/Analytics";
import SettingsPage from "./pages/shopkeeper/settings/SettingsPage";
import SubscriptionsPage from "./pages/Subscriptions/SubscriptionsPage";
import Home from "./pages/HomePage/Home";
import ScrollToTop from "./common/ScrollToTop";
// import Layout from "./Layout"
import Transactions from "./pages/shopkeeper/Transaction";
import Shopkeepers from "./pages/admin/Shopkeepers";
import UsersList from "./pages/admin/UsersList";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";
import UserLayout from "./layout/UserLayout";
import GenerateCodes from "./pages/shopkeeper/GenerateCodes";
import ShopkeeperSignIn from "./pages/shopkeeper/signin/ShopkeeperSignIn";
// import ShopkeeperSignUp from "./pages/shopkeeper/signin/ShopkeeperSignUp";
import ShopkeeperDashboardLayout from "./layout/ShopkeeperDashboardLayout";
import GraphDashboard from "./components/Graphs/graphs";
import ToastTest from "./pages/shopkeeper/signin/s";
import SignUpToggle from "./pages/shopkeeper/signin/SignUpToggle";
import Scanner from "./pages/scanner/Scanner";
//import UserSignUp from "./pages/shopkeeper/signin/UserSignUp";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* <Layout> */}
          {/* Routes for client pages with ClientLayout */}
          <Route
            path="/"
            element={
              <ClientLayout>
                <Outlet />
              </ClientLayout>
            }>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<ShopkeeperSignIn />} />
              <Route path="/signup/:role" element={<SignUpToggle/>} />
              <Route path="/t" element={<ToastTest />} />
            </Route>
          <Route
            path="/:slug"
            element={
              <UserLayout>
                <Outlet />
              </UserLayout>
            }>
            <Route path="login" element={<LoginPage />} />
            <Route path="client" element={<ClientPage />} />
           
          </Route>
        {/* </Layout> */}

        {/* <Route path="subscriptions" element={<SubscriptionsPage />} />
          
          <Route
            path="/shopkeeper"
            element={
              <ShopkeeperDashboardLayout>
                <Outlet />
              </ShopkeeperDashboardLayout>
            }>

            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="referral-codes" element={<ReferralCodes />} />
            <Route path="interaction-panel" element={<InteractionPanel />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route> */}
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        {/* Routes for shopkeeper pages with ShopkeeperDashboardLayout */}
        <Route
          path="/shopkeeper"
          element={
            <ShopkeeperDashboardLayout>
              <Outlet />
            </ShopkeeperDashboardLayout>
          }>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="referral-codes" element={<ReferralCodes />} />
          <Route path="coupon-codes" element={<CouponCodes />} />
          <Route path="interaction-panel" element={<InteractionPanel />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="generate-codes" element={<GenerateCodes />} />
          <Route path="g" element={<GraphDashboard />} />
          <Route path="scanner" element={<Scanner/>} />
        </Route>

        {/* Routes for admin pages with AdminLayout */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          }>
          <Route path="shopkeepers" element={<Shopkeepers />} />
          <Route path="users" element={<UsersList />} />
          <Route path="settings" element={<AdminSettings />} />
          
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
