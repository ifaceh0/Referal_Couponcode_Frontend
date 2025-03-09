import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const ToastTest = () => {
  // Function to show success toast
  const showSuccessToast = () => {
    toast.success("This is a success message!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Function to show error toast
  const showErrorToast = () => {
    toast.error("This is an error message!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">React Toastify Test</h1>

      <button
        onClick={showSuccessToast}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 m-2"
      >
        Show Success Toast
      </button>

      <button
        onClick={showErrorToast}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 m-2"
      >
        Show Error Toast
      </button>

      {/* ToastContainer must be included to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default ToastTest;
