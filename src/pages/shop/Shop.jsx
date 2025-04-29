import React, { useState } from "react";
import { FaPhone, FaStore, FaTimes, FaQrcode } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react"; // Updated import

const Shop = () => {
  const shops = [
    {
      id: "shop001",
      name: "Urban Mart",
      phone: "+1 123 456 7890",
      image: "https://source.unsplash.com/400x300/?store,shop",
      balance: "$250.00",
      referredBy: "John Doe"
    },
    {
      id: "shop002",
      name: "Fresh Market",
      phone: "+1 234 567 8901",
      image: "https://source.unsplash.com/400x300/?grocery,market",
      balance: "$180.50",
      referredBy: null
    },
    {
      id: "shop003",
      name: "Daily Goods",
      phone: "+1 345 678 9012",
      image: "https://source.unsplash.com/400x300/?supermarket,storefront",
      balance: "$320.75",
      referredBy: "Sarah Smith"
    },
    {
      id: "shop004",
      name: "Quick Shop",
      phone: "+1 456 789 0123",
      image: "https://source.unsplash.com/400x300/?convenience,store",
      balance: "$95.25",
      referredBy: null
    },
  ];

  const [selectedShop, setSelectedShop] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVisitShop = (shop) => {
    setSelectedShop(shop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedShop(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Explore Shops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Shop Front Header */}
            <div className="bg-amber-700 p-3 text-white flex items-center">
              <FaStore className="mr-2" />
              <h2 className="font-bold text-lg">{shop.name}</h2>
            </div>
            
            {/* Shop Image with awning effect */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-red-600 clip-awning"></div>
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-40 object-cover border-b-4 border-amber-800"
              />
            </div>
            
            {/* Shop Info */}
            <div className="p-4 bg-amber-50">
              <div className="flex justify-end mb-2">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  ID: {shop.id}
                </span>
              </div>
              
              <div className="flex items-center mt-3 bg-white p-2 rounded border border-amber-200">
                <FaPhone className="mr-2 text-amber-700" />
                <span className="text-sm font-medium">{shop.phone}</span>
              </div>
              
              <button 
                onClick={() => handleVisitShop(shop)}
                className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
              >
                Visit Shop
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Details Modal */}
      {showModal && selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center bg-amber-700 p-4 text-white">
              <h2 className="text-xl font-bold">{selectedShop.name}</h2>
              <button onClick={closeModal} className="text-white hover:text-amber-200">
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              {/* QR Code Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-white p-4 rounded-lg border border-amber-200 mb-3">
                  <QRCodeSVG 
                    value={`shop:${selectedShop.id}`} 
                    size={150}
                    fgColor="#b45309" // amber-700 color
                  />
                </div>
                <div className="flex items-center text-amber-700">
                  <FaQrcode className="mr-2" />
                  <span className="font-medium">Shop ID: {selectedShop.id}</span>
                </div>
              </div>
              
              {/* Customer Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer ID</p>
                      <p className="font-medium">CUST-{selectedShop.id.slice(-3)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance</p>
                      <p className="font-medium text-green-600">{selectedShop.balance}</p>
                    </div>
                  </div>
                </div>
                
                {selectedShop.referredBy && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-700 mb-2">Referral Information</h3>
                    <p className="text-sm text-gray-500">Referred By</p>
                    <p className="font-medium">{selectedShop.referredBy}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={closeModal}
                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add custom CSS for the awning effect */}
      <style jsx>{`
        .clip-awning {
          clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
        }
      `}</style>
    </div>
  );
};

export default Shop;