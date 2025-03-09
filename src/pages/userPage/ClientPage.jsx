import React from "react";
import { useNavigate } from "react-router-dom";
import { demoData } from "../../utils/demoData";

const ClientPage = () => {
  const { company, user } = demoData;
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear session or token logic (if using backend)
    navigate(`/website/${company.slug}/login`);
  };

  // Function to share referral code
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Referral Code from ${company.name}`,
          text: `Use my referral code ${user.referralCode} to get discounts at ${company.name}!`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device.");
    }
  };

  // Function to copy referral code to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(user.referralCode)
      .then(() => alert("Referral code copied to clipboard!"))
      .catch((error) => console.error("Error copying:", error));
  };

  return (
    <div className="min-h-screen" style={{ color: company.colorPalette.text }}>
      {/* Header */}
      <header
        className="py-4 px-8 flex items-center justify-between"
        style={{ backgroundColor: company.colorPalette.primary }}
      >
        <div className="flex items-center">
          <img src={company.logo} alt="Logo" className="h-10" />
          <h1 className="text-2xl text-white ml-4">{company.name}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="p-8">
        {/* Referral Code Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Your Referral Code</h2>
          <div className="bg-gray-100 p-4 rounded flex justify-between items-center">
            <span className="font-mono">{user.referralCode}</span>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Share
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="py-1 px-3 bg-gray-300 rounded hover:bg-gray-400"
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        {/* Referral History */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Referral History</h2>
          <ul className="bg-gray-100 p-4 rounded">
            {user.referralHistory.map((referral, index) => (
              <li
                key={index}
                className="flex justify-between border-b py-2 last:border-none"
              >
                <span>{referral.referee}</span>
                <span>{referral.date}</span>
                <span>{referral.status}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Points Balance */}
        <section>
          <h2 className="text-xl font-bold mb-2">Points Balance</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-lg font-semibold">Total Points: {user.points}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientPage;
