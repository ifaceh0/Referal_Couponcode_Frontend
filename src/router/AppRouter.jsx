import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ClientPage from "../pages/ClientPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Dynamic slug routing */}
        <Route path="/website/:slug/login" element={<LoginPage />} />
        <Route path="/website/:slug/client" element={<ClientPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
