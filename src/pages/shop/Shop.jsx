// import React, { useState } from "react";
// import { FaPhone, FaStore, FaTimes, FaQrcode } from "react-icons/fa";
// import { QRCodeSVG } from "qrcode.react";

// const Shop = () => {
//   const shops = [
//     {
//       id: "shop001",
//       name: "Urban Mart",
//       phone: "+1 123 456 7890",
//       image: "https://source.unsplash.com/400x300/?store,shop",
//       balance: "$250.00",
//       referredBy: "John Doe"
//     },
//     {
//       id: "shop002",
//       name: "Fresh Market",
//       phone: "+1 234 567 8901",
//       image: "https://source.unsplash.com/400x300/?grocery,market",
//       balance: "$180.50",
//       referredBy: null
//     },
//     {
//       id: "shop003",
//       name: "Daily Goods",
//       phone: "+1 345 678 9012",
//       image: "https://source.unsplash.com/400x300/?supermarket,storefront",
//       balance: "$320.75",
//       referredBy: "Sarah Smith"
//     },
//     {
//       id: "shop004",
//       name: "Quick Shop",
//       phone: "+1 456 789 0123",
//       image: "https://source.unsplash.com/400x300/?convenience,store",
//       balance: "$95.25",
//       referredBy: null
//     },
//   ];

//   const [selectedShop, setSelectedShop] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const handleVisitShop = (shop) => {
//     setSelectedShop(shop);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedShop(null);
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
//       {/* Only show main content when modal is not visible */}
//       {!showModal && (
//         <>
//           <h1 className="text-3xl font-bold mb-6 text-blue-800">Explore Shops</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
//             {shops.map((shop) => (
//               <div
//                 key={shop.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
//               >
//                 {/* Shop Front Header */}
//                 <div className="bg-blue-700 p-3 text-white flex items-center">
//                   <FaStore className="mr-2" />
//                   <h2 className="font-bold text-lg">{shop.name}</h2>
//                 </div>

//                 {/* Shop Image with awning effect */}
//                 <div className="relative">
//                   <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
//                   <img
//                     src={shop.image}
//                     alt={shop.name}
//                     className="w-full h-40 object-cover border-b-4 border-blue-800"
//                   />
//                 </div>

//                 {/* Shop Info */}
//                 <div className="p-4 bg-blue-50">
//                   <div className="flex justify-end mb-2">
//                     <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                       ID: {shop.id}
//                     </span>
//                   </div>

//                   <div className="flex items-center mt-3 bg-white p-2 rounded border border-blue-200">
//                     <FaPhone className="mr-2 text-blue-700" />
//                     <span className="text-sm font-medium text-blue-800">{shop.phone}</span>
//                   </div>

//                   <button 
//                     onClick={() => handleVisitShop(shop)}
//                     className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
//                   >
//                     QR code
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Shop Details Modal */}
//       {showModal && selectedShop && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-blue-200">
//             <div className="flex justify-between items-center bg-blue-700 p-4 text-white">
//               <h2 className="text-xl font-bold">{selectedShop.name}</h2>
//               <button onClick={closeModal} className="text-white hover:text-blue-200">
//                 <FaTimes />
//               </button>
//             </div>

//             <div className="p-6">
//               {/* QR Code Section */}
//               <div className="flex flex-col items-center mb-6">
//                 <div className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
//                   <QRCodeSVG 
//                     value={`shop:${selectedShop.id}`} 
//                     size={150}
//                     fgColor="#1d4ed8"
//                   />
//                 </div>
//                 <div className="flex items-center text-blue-700">
//                   <FaQrcode className="mr-2" />
//                   <span className="font-medium">Shop ID: {selectedShop.id}</span>
//                 </div>
//               </div>

//               {/* Customer Details */}
//               <div className="space-y-4">
//                 <div className="bg-blue-50 p-4 rounded-lg">
//                   <h3 className="font-bold text-blue-800 mb-2">Customer Information</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-blue-600">Customer ID</p>
//                       <p className="font-medium text-blue-800">CUST-{selectedShop.id.slice(-3)}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-blue-600">Balance</p>
//                       <p className="font-medium text-blue-600">{selectedShop.balance}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {selectedShop.referredBy && (
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h3 className="font-bold text-blue-800 mb-2">Referral Information</h3>
//                     <p className="text-sm text-blue-600">Referred By</p>
//                     <p className="font-medium text-blue-800">{selectedShop.referredBy}</p>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add custom CSS for the awning effect */}
//       <style jsx>{`
//         .clip-awning {
//           clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Shop;

import React, { useState, useEffect } from "react";
import { FaPhone, FaStore, FaTimes, FaQrcode } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { getAllShopkeeper, getQRCodeByShopkeeper } from "../../api/users";
import { getCurrentUser } from "../../api/signin";


const Shop = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shops, setShops] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        console.log("Fetched user:", user.userId);
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchData();
  }, []);


  if (userDetails) {
    console.log("User ID:", userDetails.userId);
    console.log("Shopkeeper ID:",userDetails.shopkeeperId)
  }
  useEffect(() => {
    const fetchShopkeeper = async () => {
      // if (!userDetails?.userId) return;
      setIsLoading(true);
      try {
        if (userDetails) {
          const result = await getAllShopkeeper(userDetails.userId,userDetails.shopkeeperId); // Assumes it returns user data and shopkeepers list
          setUserInfo({
            id: result.userId,
            name: result.userName,
            balance: result.availableBalance,
          });

          const mappedShops = result.shopkeepers.map((shop, index) => ({
            // shopkeeperId:shop.id,
            id: shop.shopkeeperId,
            name: shop.name,
            phone: shop.phone,
            image: `https://source.unsplash.com/400x300/?store,shop,${index}`,
            balance: `$${result.availableBalance.toFixed(2)}`,
            referredBy: shop.referralCode,
            referralAmount: shop.referralAmount,
            referrerAmount: shop.referrerAmount,
            expiryDate: shop.expiryDate
          }));
          setShops(mappedShops);
        }
      } catch (error) {
        console.error("Failed to fetch shopkeepers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopkeeper();
  }, [userDetails]);

  const handleVisitShop = async (shop) => {
    console.log(shop)
    // setSelectedShop(shop);
    // setShowModal(true);
    try {
      const qrImageUrl = await getQRCodeByShopkeeper(shop.id);
      const shopWithQR = { ...shop, qrImageUrl };

      setSelectedShop(shopWithQR);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch QR code:", err);
      setSelectedShop({ ...shop, qrImageUrl: null, qrError: err.message });
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedShop(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
      {isLoading ? (
        <p className="text-blue-700 font-semibold">Loading shops...</p>
      ) : (
        <>
          {/* {userInfo && (
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-blue-900">
                Welcome, {userInfo.name} (User ID: {userInfo.id})
              </h2>
              <p className="text-blue-700">
                Available Balance: ${userInfo.balance.toFixed(2)}
              </p>
            </div>
          )} */}

          {!showModal && (
            <>
              <h1 className="text-3xl font-bold mb-6 text-blue-800">Explore Shops</h1>
              {shops.length === 0 ? (
                <p className="text-blue-700 font-semibold text-center w-full mt-6">
                  No shops available for this user.
                </p>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 border border-blue-100"
                  >
                    <div className="bg-blue-700 p-3 text-white flex items-center">
                      <FaStore className="mr-2" />
                      <h2 className="font-bold text-lg">{shop.name}</h2>
                    </div>

                    <div className="relative">
                      <div className="absolute top-0 left-0 right-0 h-4 bg-blue-600 clip-awning"></div>
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-40 object-cover border-b-4 border-blue-800"
                      />
                    </div>

                    <div className="p-4 bg-blue-50">
                      <div className="flex justify-end mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ID: {`shop${shop.id}`}
                        </span>
                      </div>

                      <div className="flex items-center mt-3 bg-white p-2 rounded border border-blue-200">
                        <FaPhone className="mr-2 text-blue-700" />
                        <span className="text-sm font-medium text-blue-800">{shop.phone}</span>
                      </div>

                      <button
                        onClick={() => handleVisitShop(shop)}
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition"
                      >
                        QR code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </>
          )}

          {showModal && selectedShop && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-blue-200">
                <div className="flex justify-between items-center bg-blue-700 p-4 text-white">
                  <h2 className="text-xl font-bold">{selectedShop.name}</h2>
                  <button onClick={closeModal} className="text-white hover:text-blue-200">
                    <FaTimes />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    {/* <div className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
                      <QRCodeSVG
                        value={`shop:${selectedShop.id}`}
                        size={150}
                        fgColor="#1d4ed8"
                      />
                    </div> */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
                      {selectedShop.qrImageUrl ? (
                        <img
                          src={selectedShop.qrImageUrl}
                          alt="QR Code"
                          className="w-[250px] h-[250px]"
                        />
                      ) : (
                        <p className="text-gray-500">QR Code loading...</p>
                      )}
                    </div>
                    <div className="flex items-center text-blue-700">
                      <FaQrcode className="mr-2" />
                      <span className="font-medium">Shop ID: {`shop${selectedShop.id}`}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-2">Customer Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-600">Customer ID</p>
                          <p className="font-medium text-blue-800">
                            CUST-{userInfo.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Balance</p>
                          <p className="font-medium text-blue-600">{selectedShop.balance}</p>
                        </div>
                      </div>
                    </div>

                    {selectedShop.referredBy ? (
  <div className="bg-blue-50 p-4 rounded-lg">
    <h3 className="font-bold text-blue-800 mb-2">Referral Information</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-blue-600">Referral Code</p>
        <p className="font-medium text-blue-800">{selectedShop.referredBy}</p>
      </div>
      <div>
        <p className="text-sm text-blue-600">Expiry Date</p>
        <p className="font-medium text-blue-800">{selectedShop.expiryDate}</p>
      </div>
      <div>
        <p className="text-sm text-blue-600">Referral Amount</p>
        <p className="font-medium text-blue-800">${selectedShop.referralAmount}</p>
      </div>
      <div>
        <p className="text-sm text-blue-600">Referrer Amount</p>
        <p className="font-medium text-blue-800">${selectedShop.referrerAmount}</p>
      </div>
    </div>
  </div>
) : (
  <div className="bg-blue-50 p-4 rounded-lg">
    <h3 className="font-bold text-blue-800 mb-2">Referral Information</h3>
    <p className="text-blue-600">Referral not added here.</p>
  </div>
)}

                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <style>
        {`
    .clip-awning {
      clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
    }
  `}
      </style>

    </div>
  );
};

export default Shop;
