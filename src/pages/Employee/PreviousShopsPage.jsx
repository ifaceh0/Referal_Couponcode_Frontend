import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Building2, Calendar, LogOut } from 'lucide-react';
import { getPreviousShops } from '../../api/employee';

const PreviousShopsPage = () => {
  const [previousShops, setPreviousShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviousShops = async () => {
      try {
        setLoading(true);
        const data = await getPreviousShops();
        setPreviousShops(data);
      } catch (err) {
        console.error('Error fetching previous shops:', err);
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousShops();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Loading your work history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 text-xl font-medium mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (previousShops.length === 0) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Previous Work History</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          You currently have no inactive shops. This section will show shops you've previously worked at.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
        <LogOut className="w-9 h-9 text-blue-600" />
        Previous Shops You've Worked At
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {previousShops.map((shop) => (
          <div
            key={shop.shopkeeperId}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                {shop.shopName}
              </h3>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                Inactive
              </span>
            </div>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{formatDate(shop.joinedDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Left</p>
                  <p className="font-medium">{formatDate(shop.resignedDate)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                Worked from {formatDate(shop.joinedDate)} to {formatDate(shop.resignedDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousShopsPage;