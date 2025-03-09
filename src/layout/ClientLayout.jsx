import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const ClientLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full bg-white rounded-md shadow-md">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientLayout;
