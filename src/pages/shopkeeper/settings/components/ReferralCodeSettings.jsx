// import React, { useState,useEffect } from "react";
// import { FaEdit, FaTrash, FaSave, FaPaperPlane } from "react-icons/fa";
// import { discountData } from "../../../../utils/demoData";
// import { toast } from 'react-toastify';
// import { updateAndSaveSettingAction } from "../../../../api/settingPageApi";

// // const ReferralCodeSettings = () => {
// //     const [useCredits, setUseCredits] = useState(true); // Toggle between Credits and Dollars
// //     const [signupPoints, setSignupPoints] = useState(100);
// //     const [signupDollars, setSignupDollars] = useState(10);
// //     const [isEditingSignup, setIsEditingSignup] = useState(false);
// //     const [existingCustomerValue, setExistingCustomerValue] = useState(10);

// const ReferralCodeSettings = ({ shopkeeperId }) => {
//     const [loading, setLoading] = useState(true);
//     const [useCredits, setUseCredits] = useState(true);
//     const [signupPoints, setSignupPoints] = useState(100);
//     const [signupDollars, setSignupDollars] = useState(10);
//     const [isEditingSignup, setIsEditingSignup] = useState(false);
//     const [existingCustomerValue, setExistingCustomerValue] = useState(10);
//     const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping);
//     const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping);
//      const [promotion, setPromotion] = useState({
//         beginDate: '',
//         expiryDate: '',
//         referralAmount: '',
//         referrerAmount: ''
//     });
//     const [isEditingPromotion, setIsEditingPromotion] = useState(false);
//     const [couponPromotion, setCouponPromotion] = useState({
//         beginDate: '',
//         expiryDate: '',
//         couponAmount: '',
//         limitOfUse: ''
//     });
//     const [isEditingCouponPromotion, setIsEditingCouponPromotion] = useState(false);



//     //updateAndSaveSettingAction();

//     // // Discount Mapping (Credits only)
//     // const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping);

//     // // Milestone Mapping (Available for both)
//     // const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping);

//     // // New Referral Promotion state
//     // const [promotion, setPromotion] = useState({
//     //     beginDate: '',
//     //     expiryDate: '',
//     //     referralAmount: '',
//     //     referrerAmount: ''
//     // });
//     // const [isEditingPromotion, setIsEditingPromotion] = useState(false);

//     // // New Coupon Promotion state
//     // const [couponPromotion, setCouponPromotion] = useState({
//     //     beginDate: '',
//     //     expiryDate: '',
//     //     couponAmount: '',
//     //     limitOfUse: ''
//     // });
//     // const [isEditingCouponPromotion, setIsEditingCouponPromotion] = useState(false);

//     useEffect(() => {
//         const fetchSettings = async () => {
//             try {
//                 setLoading(true);
//                 const response = await getSettingsAction(shopkeeperId);
                
//                 if (response.settings) {
//                     const settings = response.settings.referralSettings || {};
                    
//                     setUseCredits(settings.useCredits || true);
//                     setSignupPoints(settings.signupPoints || 100);
//                     setSignupDollars(settings.signupDollars || 10);
//                     setExistingCustomerValue(settings.existingCustomerValue || 10);
//                     setDiscountMapping(settings.discountMapping || discountData.discountMapping);
//                     setMilestoneMapping(settings.milestoneMapping || discountData.milestoneMapping);
//                     setPromotion(settings.promotion || {
//                         beginDate: '',
//                         expiryDate: '',
//                         referralAmount: '',
//                         referrerAmount: ''
//                     });
//                     setCouponPromotion(settings.couponPromotion || {
//                         beginDate: '',
//                         expiryDate: '',
//                         couponAmount: '',
//                         limitOfUse: ''
//                     });
//                 }
//             } catch (error) {
//                 toast.error('Failed to load settings');
//                 console.error('Error fetching settings:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchSettings();
//     }, [shopkeeperId]);

//     const handleSaveSignup = () => {
//         setIsEditingSignup(false);
//         alert(
//             useCredits
//                 ? `Signup dollars saved: $${signupDollars}`
//                 : `Signup points saved: ${signupPoints}`
//         );
//     };

//     const handleSavePromotion = () => {
//         setIsEditingPromotion(false);
//         alert('Promotion settings saved');
//     };

//     const handleSaveCouponPromotion = () => {
//         setIsEditingCouponPromotion(false);
//         alert('Coupon promotion settings saved');
//     };



//     // Helper function to check if a date is in the future
//         const isFutureDate = (dateString) => {
//         if (!dateString) return false;
//         const inputDate = new Date(dateString);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
//         return inputDate >= today;
//         };

//         // Helper function to check if expiry date is after begin date
//         const isValidDateRange = (beginDate, expiryDate) => {
//         if (!beginDate || !expiryDate) return false;
//         return new Date(expiryDate) >= new Date(beginDate);
//         };

//     const handleSendPromotion = async () => {
//     try {
//         // Validate required fields
//         if (!promotion.beginDate || !promotion.expiryDate || !promotion.referralAmount || !promotion.referrerAmount) {
//             alert('Please fill all promotion fields before sending');
//             return;
//         }

//         // Check if begin date is in the future
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
//         const beginDate = new Date(promotion.beginDate);
        
//         if (beginDate < today) {
//             alert('Begin date must be in the future!');
//             return;
//         }

//         // Check if expiry date is after begin date
//         const expiryDate = new Date(promotion.expiryDate);
//         if (expiryDate <= beginDate) {
//             alert('Expiry date must be after begin date!');
//             return;
//         }

//         // API call to send promotion
//         const response = await fetch('/api/promotions/referral', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add authorization header if needed
//                 // 'Authorization': `Bearer ${yourAuthToken}`
//             },
//             body: JSON.stringify({
//                 ...promotion,
//                 currencyType: useCredits ? 'dollars' : 'points'
//             }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         alert('Referral promotion sent successfully!');
//         console.log('Server response:', result);

//         // Optional: Reset form after successful submission
//         setPromotion({
//             beginDate: '',
//             expiryDate: '',
//             referralAmount: '',
//             referrerAmount: ''
//         });
//     } catch (error) {
//         console.error('Error sending referral promotion:', error);
//         alert('Failed to send referral promotion. Please try again.');
//     }
// };

//     const handleSendCouponPromotion = async () => {
//         try {
//             // Validate data before sending
//             if (!couponPromotion.beginDate || !couponPromotion.expiryDate || !couponPromotion.couponAmount || !couponPromotion.limitOfUse) {
//                 alert('Please fill all coupon promotion fields before sending');
//                 return;
//             }

//             const response = await fetch('/api/promotions/coupon', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Add authorization header if needed
//                     // 'Authorization': `Bearer ${yourAuthToken}`
//                 },
//                 body: JSON.stringify({
//                     ...couponPromotion,
//                     currencyType: useCredits ? 'dollars' : 'points'
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             alert('Coupon promotion sent successfully!');
//             console.log('Server response:', result);
//         } catch (error) {
//             console.error('Error sending coupon promotion:', error);
//             alert('Failed to send coupon promotion. Please try again.');
//         }
//     };

//     const handleAddDiscount = () => {
//         setDiscountMapping([
//             ...discountMapping,
//             { name: "", points: "", discount: "" },
//         ]);
//     };

//     const handleAddMilestone = () => {
//         setMilestoneMapping([
//             ...milestoneMapping,
//             { milestoneType: "Referrals", milestoneValue: "", rewardType: "", reward: "" },
//         ]);
//     };

//     // Replace `alert()` with:
//     toast.error('Begin date must be in the future!', { position: 'top-right' });
//     toast.success('Referral promotion sent successfully!', { position: 'top-right' });

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-6">Promotion Settings</h2>

//             {/* Toggle Credits/Dollars */}
//             <div className="flex items-center mb-6">
//                 <label className="font-bold mr-4">Use Credits:</label>
//                 <input
//                     type="checkbox"
//                     checked={useCredits}
//                     onChange={(e) => setUseCredits(e.target.checked)}
//                     className="toggle-checkbox"
//                 />
//             </div>

//             {/* Signup Settings */}
//             {/* <div className="mb-6">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h3 className="font-bold">
//                             Signup {useCredits ? "Dollars" : "Points"} for New Users
//                         </h3>
//                         {isEditingSignup ? (
//                             <input
//                                 type="number"
//                                 value={useCredits ? signupDollars : signupPoints}
//                                 onChange={(e) =>
//                                     useCredits
//                                         ? setSignupDollars(e.target.value)
//                                         : setSignupPoints(e.target.value)
//                                 }
//                                 className="border p-2 rounded mt-2 w-32"
//                             />
//                         ) : (
//                             <p className="mt-2">
//                                 {useCredits ? `$${signupDollars}` : `${signupPoints} Points`}
//                             </p>
//                         )}
//                     </div>
//                     <div>
//                         {isEditingSignup ? (
//                             <button
//                                 onClick={handleSaveSignup}
//                                 className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                                 <FaSave className="mr-2" /> Save
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEditingSignup(true)}
//                                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                             >
//                                 <FaEdit className="mr-2" /> Edit
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div> */}

//             <div className="mb-6">
//                 <div className="flex justify-between items-start gap-8 flex-wrap">
//                     {/* Signup for New Users */}
//                     <div>
//                         <h3 className="font-bold">
//                             Signup {useCredits ? "Dollars" : "Points"} for New Users
//                         </h3>
//                         {isEditingSignup ? (
//                             <input
//                                 type="number"
//                                 value={useCredits ? signupDollars : signupPoints}
//                                 onChange={(e) =>
//                                     useCredits
//                                         ? setSignupDollars(e.target.value)
//                                         : setSignupPoints(e.target.value)
//                                 }
//                                 className="border p-2 rounded mt-2 w-32"
//                             />
//                         ) : (
//                             <p className="mt-2">
//                                 {useCredits ? `$${signupDollars}` : `${signupPoints} Points`}
//                             </p>
//                         )}
//                     </div>

//                    <div>
//                     <h3 className="font-bold mb-2">Existing Customer</h3>
//                     <button
//                         onClick={() => applyReward('existing')}
//                         className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//                     >
//                         Apply Reward
//                     </button>
//                     </div>

//                     <div>
//                     <h3 className="font-bold mb-2">New Customer</h3>
//                     <button
//                         onClick={() => applyReward('new')}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Apply Reward
//                     </button>
//                     </div>

//                     {/* Edit / Save Button */}
//                     <div>
//                         {isEditingSignup ? (
//                             <button
//                                 onClick={handleSaveSignup}
//                                 className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                                 <FaSave className="mr-2" /> Save
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEditingSignup(true)}
//                                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                             >
//                                 <FaEdit className="mr-2" /> Edit
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Current Referral Promotion */}
//             <div className="mb-6 border-t pt-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-bold">Current Referral Promotion</h3>
//                     <div className="flex space-x-2">
//                         {isEditingPromotion ? (
//                             <button
//                                 onClick={handleSavePromotion}
//                                 className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                                 <FaSave className="mr-2" /> Save
//                             </button>
//                         ) : (
//                             <>
//                                 <button
//                                     onClick={handleSendPromotion}
//                                     className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//                                 >
//                                     <FaPaperPlane className="mr-2" /> Send
//                                 </button>
//                                 <button
//                                     onClick={() => setIsEditingPromotion(true)}
//                                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 >
//                                     <FaEdit className="mr-2" /> Edit
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Begin Date</label>
//                         {isEditingPromotion ? (
//                             <input
//                                 type="date"
//                                 value={promotion.beginDate}
//                                 onChange={(e) => setPromotion({...promotion, beginDate: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{promotion.beginDate || 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Expiry Date</label>
//                         {isEditingPromotion ? (
//                             <input
//                                 type="date"
//                                 value={promotion.expiryDate}
//                                 onChange={(e) => setPromotion({...promotion, expiryDate: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{promotion.expiryDate || 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Referral Amount</label>
//                         {isEditingPromotion ? (
//                             <input
//                                 type="number"
//                                 value={promotion.referralAmount}
//                                 onChange={(e) => setPromotion({...promotion, referralAmount: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{promotion.referralAmount ? (useCredits ? `$${promotion.referralAmount}` : `${promotion.referralAmount} Points`) : 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Referrer Amount</label>
//                         {isEditingPromotion ? (
//                             <input
//                                 type="number"
//                                 value={promotion.referrerAmount}
//                                 onChange={(e) => setPromotion({...promotion, referrerAmount: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{promotion.referrerAmount ? (useCredits ? `$${promotion.referrerAmount}` : `${promotion.referrerAmount} Points`) : 'Not set'}</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Current Coupon Promotion */}
//             <div className="mb-6 border-t pt-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-bold">Current Coupon Promotion</h3>
//                     <div className="flex space-x-2">
//                         {isEditingCouponPromotion ? (
//                             <button
//                                 onClick={handleSaveCouponPromotion}
//                                 className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                                 <FaSave className="mr-2" /> Save
//                             </button>
//                         ) : (
//                             <>
//                                 <button
//                                     onClick={handleSendCouponPromotion}
//                                     className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//                                 >
//                                     <FaPaperPlane className="mr-2" /> Send
//                                 </button>
//                                 <button
//                                     onClick={() => setIsEditingCouponPromotion(true)}
//                                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 >
//                                     <FaEdit className="mr-2" /> Edit
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Begin Date</label>
//                         {isEditingCouponPromotion ? (
//                             <input
//                                 type="date"
//                                 value={couponPromotion.beginDate}
//                                 onChange={(e) => setCouponPromotion({...couponPromotion, beginDate: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{couponPromotion.beginDate || 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Expiry Date</label>
//                         {isEditingCouponPromotion ? (
//                             <input
//                                 type="date"
//                                 value={couponPromotion.expiryDate}
//                                 onChange={(e) => setCouponPromotion({...couponPromotion, expiryDate: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{couponPromotion.expiryDate || 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Coupon Amount</label>
//                         {isEditingCouponPromotion ? (
//                             <input
//                                 type="number"
//                                 value={couponPromotion.couponAmount}
//                                 onChange={(e) => setCouponPromotion({...couponPromotion, couponAmount: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{couponPromotion.couponAmount ? (useCredits ? `$${couponPromotion.couponAmount}` : `${couponPromotion.couponAmount} Points`) : 'Not set'}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1">Limit of Use</label>
//                         {isEditingCouponPromotion ? (
//                             <input
//                                 type="number"
//                                 value={couponPromotion.limitOfUse}
//                                 onChange={(e) => setCouponPromotion({...couponPromotion, limitOfUse: e.target.value})}
//                                 className="w-full p-2 border rounded"
//                             />
//                         ) : (
//                             <p>{couponPromotion.limitOfUse || 'Not set'}</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Discount Mapping (Credits only) */}
//             {!useCredits && (
//                 <div className="mb-6">
//                     <h3 className="font-bold mb-4">Discount Mapping</h3>
//                     {discountMapping.map((mapping, index) => (
//                         <div
//                             key={index}
//                             className="flex items-center space-x-4 mb-4 border p-4 rounded-md"
//                         >
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 value={mapping.name}
//                                 onChange={(e) =>
//                                     setDiscountMapping((prev) => {
//                                         const updated = [...prev];
//                                         updated[index].name = e.target.value;
//                                         return updated;
//                                     })
//                                 }
//                                 className="w-1/4 p-2 border rounded"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Points"
//                                 value={mapping.points}
//                                 onChange={(e) =>
//                                     setDiscountMapping((prev) => {
//                                         const updated = [...prev];
//                                         updated[index].points = e.target.value;
//                                         return updated;
//                                     })
//                                 }
//                                 className="w-1/4 p-2 border rounded"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Discount"
//                                 value={mapping.discount}
//                                 onChange={(e) =>
//                                     setDiscountMapping((prev) => {
//                                         const updated = [...prev];
//                                         updated[index].discount = e.target.value;
//                                         return updated;
//                                     })
//                                 }
//                                 className="w-1/4 p-2 border rounded"
//                             />
//                             <button
//                                 onClick={() =>
//                                     setDiscountMapping((prev) =>
//                                         prev.filter((_, i) => i !== index)
//                                     )
//                                 }
//                                 className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                             >
//                                 <FaTrash />
//                             </button>
//                         </div>
//                     ))}
//                     <button
//                         onClick={handleAddDiscount}
//                         className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Add Discount
//                     </button>
//                 </div>
//             )}

//             {/* Milestone Mapping */}
//             <div>
//                 <h3 className="font-bold mb-4">Milestone Rewards</h3>
//                 {milestoneMapping.map((milestone, index) => (
//                     <div
//                         key={index}
//                         className="flex items-center space-x-4 mb-4 border p-4 rounded-md"
//                     >
//                         <input
//                             type="number"
//                             placeholder="Value"
//                             value={milestone.milestoneValue}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].milestoneValue = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className="w-1/4 p-2 border rounded"
//                         />
//                         <select
//                             value={milestone.milestoneType}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].milestoneType = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className="w-1/4 p-2 border rounded"
//                         >
//                             <option value="Referrals">Referrals</option>
//                             <option value="Points">Points</option>
//                         </select>
//                         <select
//                             value={milestone.rewardType}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].rewardType = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className="w-1/4 p-2 border rounded"
//                         >
//                             <option value="Points">Points</option>
//                             <option value="Item">Item</option>
//                         </select>
//                         <input
//                             type="text"
//                             placeholder="Reward"
//                             value={milestone.reward}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].reward = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className="w-1/4 p-2 border rounded"
//                         />
//                         <button
//                             onClick={() =>
//                                 setMilestoneMapping((prev) =>
//                                     prev.filter((_, i) => i !== index)
//                                 )
//                             }
//                             className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                         >
//                             <FaTrash />
//                         </button>
//                     </div>
//                 ))}
//                 <button
//                     onClick={handleAddMilestone}
//                     className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Add Milestone
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ReferralCodeSettings;


import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { discountData } from "../../../../utils/demoData";
import { toast } from 'react-toastify';
import { getSettingsAction, updateSettingsAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";



const ReferralCodeSettings = ({ shopkeeperId, token }) => {
    const [loading, setLoading] = useState(true);
    const [useCredits, setUseCredits] = useState(true);
    const [signupPoints, setSignupPoints] = useState(100);
    const [signupDollars, setSignupDollars] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [existingCustomerReward, setExistingCustomerReward] = useState(false);
    const [newCustomerReward, setNewCustomerReward] = useState(false);
    const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping);
    const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping);
    const [userDetails, setUserDetails] = useState(null);
    const [promotion, setPromotion] = useState({
        beginDate: '',
        expiryDate: '',
        referralAmount: '',
        referrerAmount: ''
    });
    const [couponPromotion, setCouponPromotion] = useState({
        beginDate: '',
        expiryDate: '',
        couponAmount: '',
        limitOfUse: ''
    });

    

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                 const user = await getCurrentUser();
                console.log("Fetched user:", user);
                setUserDetails(user);
                if (user?.id) {
                setLoading(true);
                const response = await getSettingsAction(user?.id);
                console.log(response)
                
                if (response) {
                    // const settings = response.settings.referralSettings || {};
                    const settings = response
                    setUseCredits(settings.useCredits ?? true);
                    setSignupPoints(settings.signupPoints ?? 100);
                    setSignupDollars(settings.signUpDollars);
                    setExistingCustomerReward(settings.existingCustomer ?? false);
                    setNewCustomerReward(settings.newCustomer ?? false);
                    setDiscountMapping(settings.discountMapping ?? discountData.discountMapping);
                    setMilestoneMapping(settings.milestoneMapping ?? discountData.milestoneMapping);
                    // setPromotion(settings.promotion ?? {
                    //     beginDate: '',
                    //     expiryDate: '',
                    //     referralAmount: '',
                    //     referrerAmount: ''
                    // });
                    // Set promotion object properly
                    setPromotion({
                        beginDate: settings.referralPromotionBeginDate || '',
                        expiryDate: settings.referralPromotionEndDate || '',
                        referralAmount: settings.referralAmount ?? '',
                        referrerAmount: settings.referrerAmount ?? '',
                    });
                    setCouponPromotion({
                        beginDate: settings.couponPromotionBeginDate || '',
                        expiryDate: settings.couponPromotionEndDate || '',
                        couponAmount: settings.couponAmount ?? '',
                        limitOfUse: settings.couponUseLimit ?? ''
                    });
                }
            }
            } catch (error) {
                toast.error('Failed to load settings');
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSettings();
    }, []);

    const handleSaveAll = async () => {
        try {
            setLoading(true);
            const settingsData = {
            shopkeeperId:userDetails.id,
            useCredits,
            signupDollars,
            // signupPoints,
            existingCustomer: existingCustomerReward,
            newCustomer: newCustomerReward,
            referralPromotionBeginDate: promotion.beginDate,
            referralPromotionEndDate: promotion.expiryDate,
            referralAmount: promotion.referralAmount,
            referrerAmount: promotion.referrerAmount,
            couponPromotionBeginDate: couponPromotion.beginDate,
            couponPromotionEndDate: couponPromotion.expiryDate,
            couponAmount: couponPromotion.couponAmount,
            couponUseLimit: couponPromotion.limitOfUse,
            // discountMapping,
            // milestoneMapping,
            };

            await updateSettingsAction(settingsData);
            toast.success('Settings saved successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to save settings');
            console.error('Error saving settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDiscount = () => {
        setDiscountMapping([
            ...discountMapping,
            { name: "", points: "", discount: "" },
        ]);
    };

    const handleAddMilestone = () => {
        setMilestoneMapping([
            ...milestoneMapping,
            { milestoneType: "Referrals", milestoneValue: "", rewardType: "", reward: "" },
        ]);
    };

    if (loading) {
        return <div className="p-6 text-center">Loading settings...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Promotion Settings</h2>
                <div className="flex space-x-2">
                    {isEditing ? (
                        <button
                            onClick={handleSaveAll}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            <FaSave className="mr-2" /> 
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            <FaEdit className="mr-2" /> Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Toggle Credits/Dollars */}
            <div className="flex items-center mb-6">
                <label className="font-bold mr-4">Use Credits:</label>
                <input
                    type="checkbox"
                    checked={useCredits}
                    onChange={(e) => setUseCredits(e.target.checked)}
                    disabled={!isEditing}
                    className="toggle-checkbox"
                />
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-start gap-8 flex-wrap">
                    {/* Signup for New Users */}
                    <div>
                        <h3 className="font-bold">
                            Signup {useCredits ? "Dollars" : "Points"} for New Users
                        </h3>
                        {isEditing ? (
                            <input
                                type="number"
                                value={useCredits ? signupDollars : signupPoints}
                                onChange={(e) =>
                                    useCredits
                                        ? setSignupDollars(Number(e.target.value))
                                        : setSignupPoints(Number(e.target.value))
                                }
                                className="border p-2 rounded mt-2 w-32"
                            />
                        ) : (
                            <p className="mt-2">
                                {useCredits ? `$${signupDollars}` : `${signupPoints} Points`}
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">Existing Customer Reward</h3>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={existingCustomerReward}
                                onChange={(e) => setExistingCustomerReward(e.target.checked)}
                                disabled={!isEditing}
                            />
                            <span className="slider round">
                                {existingCustomerReward ? 'Yes' : 'No'}
                            </span>
                        </label>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">New Customer Reward</h3>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={newCustomerReward}
                                onChange={(e) => setNewCustomerReward(e.target.checked)}
                                disabled={!isEditing}
                            />
                            <span className="slider round">
                                {newCustomerReward ? 'Yes' : 'No'}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Current Referral Promotion */}
            <div className="mb-6 border-t pt-6">
                <h3 className="font-bold mb-4">Current Referral Promotion</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Begin Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={promotion.beginDate}
                                onChange={(e) => setPromotion({...promotion, beginDate: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{promotion.beginDate || 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Expiry Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={promotion.expiryDate}
                                onChange={(e) => setPromotion({...promotion, expiryDate: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{promotion.expiryDate || 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Referral Amount</label>
                        {isEditing ? (
                            <input
                                type="number"
                                value={promotion.referralAmount}
                                onChange={(e) => setPromotion({...promotion, referralAmount: Number(e.target.value)})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{promotion.referralAmount ? (useCredits ? `$${promotion.referralAmount}` : `${promotion.referralAmount} Points`) : 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Referrer Amount</label>
                        {isEditing ? (
                            <input
                                type="number"
                                value={promotion.referrerAmount}
                                onChange={(e) => setPromotion({...promotion, referrerAmount: Number(e.target.value)})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{promotion.referrerAmount ? (useCredits ? `$${promotion.referrerAmount}` : `${promotion.referrerAmount} Points`) : 'Not set'}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Current Coupon Promotion */}
            <div className="mb-6 border-t pt-6">
                <h3 className="font-bold mb-4">Current Coupon Promotion</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Begin Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={couponPromotion.beginDate}
                                onChange={(e) => setCouponPromotion({...couponPromotion, beginDate: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{couponPromotion.beginDate || 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Expiry Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={couponPromotion.expiryDate}
                                onChange={(e) => setCouponPromotion({...couponPromotion, expiryDate: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{couponPromotion.expiryDate || 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Coupon Amount</label>
                        {isEditing ? (
                            <input
                                type="number"
                                value={couponPromotion.couponAmount}
                                onChange={(e) => setCouponPromotion({...couponPromotion, couponAmount: Number(e.target.value)})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{couponPromotion.couponAmount ? (useCredits ? `$${couponPromotion.couponAmount}` : `${couponPromotion.couponAmount} Points`) : 'Not set'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Limit of Use</label>
                        {isEditing ? (
                            <input
                                type="number"
                                value={couponPromotion.limitOfUse}
                                onChange={(e) => setCouponPromotion({...couponPromotion, limitOfUse: Number(e.target.value)})}
                                className="w-full p-2 border rounded"
                            />
                        ) : (
                            <p>{couponPromotion.limitOfUse || 'Not set'}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Discount Mapping (Credits only) */}
            {!useCredits && (
                <div className="mb-6">
                    <h3 className="font-bold mb-4">Discount Mapping</h3>
                    {discountMapping.map((mapping, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-4 mb-4 border p-4 rounded-md"
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={mapping.name}
                                onChange={(e) =>
                                    setDiscountMapping((prev) => {
                                        const updated = [...prev];
                                        updated[index].name = e.target.value;
                                        return updated;
                                    })
                                }
                                className="w-1/4 p-2 border rounded"
                                disabled={!isEditing}
                            />
                            <input
                                type="number"
                                placeholder="Points"
                                value={mapping.points}
                                onChange={(e) =>
                                    setDiscountMapping((prev) => {
                                        const updated = [...prev];
                                        updated[index].points = e.target.value;
                                        return updated;
                                    })
                                }
                                className="w-1/4 p-2 border rounded"
                                disabled={!isEditing}
                            />
                            <input
                                type="text"
                                placeholder="Discount"
                                value={mapping.discount}
                                onChange={(e) =>
                                    setDiscountMapping((prev) => {
                                        const updated = [...prev];
                                        updated[index].discount = e.target.value;
                                        return updated;
                                    })
                                }
                                className="w-1/4 p-2 border rounded"
                                disabled={!isEditing}
                            />
                            {isEditing && (
                                <button
                                    onClick={() =>
                                        setDiscountMapping((prev) =>
                                            prev.filter((_, i) => i !== index)
                                        )
                                    }
                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                    {isEditing && (
                        <button
                            onClick={handleAddDiscount}
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Discount
                        </button>
                    )}
                </div>
            )}

            {/* Milestone Mapping */}
            <div>
                <h3 className="font-bold mb-4">Milestone Rewards</h3>
                {milestoneMapping.map((milestone, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-4 mb-4 border p-4 rounded-md"
                    >
                        <input
                            type="number"
                            placeholder="Value"
                            value={milestone.milestoneValue}
                            onChange={(e) =>
                                setMilestoneMapping((prev) => {
                                    const updated = [...prev];
                                    updated[index].milestoneValue = e.target.value;
                                    return updated;
                                })
                            }
                            className="w-1/4 p-2 border rounded"
                            disabled={!isEditing}
                        />
                        <select
                            value={milestone.milestoneType}
                            onChange={(e) =>
                                setMilestoneMapping((prev) => {
                                    const updated = [...prev];
                                    updated[index].milestoneType = e.target.value;
                                    return updated;
                                })
                            }
                            className="w-1/4 p-2 border rounded"
                            disabled={!isEditing}
                        >
                            <option value="Referrals">Referrals</option>
                            <option value="Points">Points</option>
                        </select>
                        <select
                            value={milestone.rewardType}
                            onChange={(e) =>
                                setMilestoneMapping((prev) => {
                                    const updated = [...prev];
                                    updated[index].rewardType = e.target.value;
                                    return updated;
                                })
                            }
                            className="w-1/4 p-2 border rounded"
                            disabled={!isEditing}
                        >
                            <option value="Points">Points</option>
                            <option value="Item">Item</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Reward"
                            value={milestone.reward}
                            onChange={(e) =>
                                setMilestoneMapping((prev) => {
                                    const updated = [...prev];
                                    updated[index].reward = e.target.value;
                                    return updated;
                                })
                            }
                            className="w-1/4 p-2 border rounded"
                            disabled={!isEditing}
                        />
                        {isEditing && (
                            <button
                                onClick={() =>
                                    setMilestoneMapping((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                ))}
                {isEditing && (
                    <button
                        onClick={handleAddMilestone}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Milestone
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReferralCodeSettings;