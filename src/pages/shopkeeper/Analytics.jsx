
import { shopkeeperDemoData } from "../../utils/demoData";

const Analytics = () => {
  const { referralCodes } = shopkeeperDemoData;

  const handleExport = () => {
    alert("Exporting referral performance as CSV.");
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div>
        <h2 className="text-xl mb-4">Referral Code Usage</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Code</th>
              <th className="border border-gray-200 p-2">Uses</th>
              <th className="border border-gray-200 p-2">Expiry</th>
            </tr>
          </thead>
          <tbody>
            {referralCodes.map((code, index) => (
              <tr key={index}>
                <td className="border border-gray-200 p-2">{code.code}</td>
                <td className="border border-gray-200 p-2">{code.used}</td>
                <td className="border border-gray-200 p-2">{code.expiresOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleExport}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export Data
      </button>
    </div>
  );
};

export default Analytics;
