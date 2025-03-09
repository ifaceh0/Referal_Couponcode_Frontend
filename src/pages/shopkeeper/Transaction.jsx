import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      {/* Display Transactions */}
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Coupon Code</th>
              <th className="border-b py-2">Name</th>
              <th className="border-b py-2">Email</th>
              <th className="border-b py-2">Phone</th>
              <th className="border-b py-2">Referral Amount</th>
              <th className="border-b py-2">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border-b py-2">{transaction.couponCode}</td>
                <td className="border-b py-2">{transaction.name}</td>
                <td className="border-b py-2">{transaction.email}</td>
                <td className="border-b py-2">{transaction.phone}</td>
                <td className="border-b py-2">${transaction.referralAmount}</td>
                <td className="border-b py-2">{transaction.expiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
