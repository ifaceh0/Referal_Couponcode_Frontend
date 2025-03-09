import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { discountData } from "../../../../utils/demoData";

const ReferralCodeSettings = () => {
    const [useCredits, setUseCredits] = useState(true); // Toggle between Credits and Dollars
    const [signupPoints, setSignupPoints] = useState(100);
    const [signupDollars, setSignupDollars] = useState(10);
    const [isEditingSignup, setIsEditingSignup] = useState(false);

    // Discount Mapping (Credits only)
    const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping);

    // Milestone Mapping (Available for both)
    const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping);

    const handleSaveSignup = () => {
        setIsEditingSignup(false);
        alert(
            useCredits
                ? `Signup dollars saved: $${signupDollars}`
                : `Signup points saved: ${signupPoints}`
        );
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

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Referral Code Settings</h2>

            {/* Toggle Credits/Dollars */}
            <div className="flex items-center mb-6">
                <label className="font-bold mr-4">Use Credits:</label>
                <input
                    type="checkbox"
                    checked={useCredits}
                    onChange={(e) => setUseCredits(e.target.checked)}
                    className="toggle-checkbox"
                />
            </div>

            {/* Signup Settings */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">
                            Signup {useCredits ? "Dollars" : "Points"} for New Users
                        </h3>
                        {isEditingSignup ? (
                            <input
                                type="number"
                                value={useCredits ? signupDollars : signupPoints}
                                onChange={(e) =>
                                    useCredits
                                        ? setSignupDollars(e.target.value)
                                        : setSignupPoints(e.target.value)
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
                        {isEditingSignup ? (
                            <button
                                onClick={handleSaveSignup}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                <FaSave className="mr-2" /> Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditingSignup(true)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </button>
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
                            />
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
                        </div>
                    ))}
                    <button
                        onClick={handleAddDiscount}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Discount
                    </button>
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
                        />
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
                    </div>
                ))}
                <button
                    onClick={handleAddMilestone}
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Milestone
                </button>
            </div>
        </div>
    );
};

export default ReferralCodeSettings;




// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
// import { discountData } from "../../../../utils/demoData";

// const ReferralCodeSettings = () => {
//     const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping); // Using demo data
//     const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping); // Using demo data
//     const [signupPoints, setSignupPoints] = useState(100);
//     const [isEditingSignupPoints, setIsEditingSignupPoints] = useState(false);
//     const [editIndex, setEditIndex] = useState(null);
//     const [editMilestoneIndex, setEditMilestoneIndex] = useState(null);

//     // Handle signup points
//     const handleSaveSignupPoints = () => {
//         setIsEditingSignupPoints(false);
//         alert(`Signup points saved: ${signupPoints}`);
//     };

//     // Handle discount mapping
//     const handleEditDiscount = (index) => {
//         setEditIndex(index);
//     };

//     const handleSaveDiscount = (index) => {
//         setEditIndex(null);
//         alert("Discount settings saved!");
//     };

//     const handleDeleteDiscount = (index) => {
//         const updatedMapping = discountMapping.filter((_, i) => i !== index);
//         setDiscountMapping(updatedMapping);
//     };

//     // Handle milestone mapping
//     const handleEditMilestone = (index) => {
//         setEditMilestoneIndex(index);
//     };

//     const handleSaveMilestone = (index) => {
//         setEditMilestoneIndex(null);
//         alert("Milestone settings saved!");
//     };

//     const handleDeleteMilestone = (index) => {
//         const updatedMapping = milestoneMapping.filter((_, i) => i !== index);
//         setMilestoneMapping(updatedMapping);
//     };

//     // Add new rows
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

//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-6">Referral Code Settings</h2>

//             {/* Signup Points */}
//             <div className="mb-6">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h3 className="font-bold">Signup Points for New Users</h3>
//                         {isEditingSignupPoints ? (
//                             <input
//                                 type="number"
//                                 value={signupPoints}
//                                 onChange={(e) => setSignupPoints(e.target.value)}
//                                 className="border p-2 rounded mt-2 w-32"
//                             />
//                         ) : (
//                             <p className="mt-2">{signupPoints} Points</p>
//                         )}
//                     </div>
//                     <div>
//                         {isEditingSignupPoints ? (
//                             <button
//                                 onClick={handleSaveSignupPoints}
//                                 className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                             >
//                                 <FaSave className="mr-2" /> Save
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEditingSignupPoints(true)}
//                                 className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                             >
//                                 <FaEdit className="mr-2" /> Edit
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Discount Mapping */}
//             <div className="mb-6">
//                 <h3 className="font-bold mb-4">Discount Mapping</h3>
//                 {discountMapping.map((mapping, index) => (
//                     <div
//                         key={index}
//                         className="flex items-center space-x-4 mb-4 border p-4 rounded-md"
//                     >
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={mapping.name}
//                             disabled={editIndex !== index}
//                             onChange={(e) =>
//                                 setDiscountMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].name = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editIndex === index ? "" : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Points"
//                             value={mapping.points}
//                             disabled={editIndex !== index}
//                             onChange={(e) =>
//                                 setDiscountMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].points = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editIndex === index ? "" : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Discount"
//                             value={mapping.discount}
//                             disabled={editIndex !== index}
//                             onChange={(e) =>
//                                 setDiscountMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].discount = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editIndex === index ? "" : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         />
//                         <button
//                             onClick={() =>
//                                 editIndex === index
//                                     ? handleSaveDiscount(index)
//                                     : handleEditDiscount(index)
//                             }
//                             className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                         >
//                             {editIndex === index ? <FaSave /> : <FaEdit />}
//                         </button>
//                         <button
//                             onClick={() => handleDeleteDiscount(index)}
//                             className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                         >
//                             <FaTrash />
//                         </button>
//                     </div>
//                 ))}
//                 <button
//                     onClick={handleAddDiscount}
//                     className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Add Discount
//                 </button>
//             </div>

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
//                             disabled={editMilestoneIndex !== index}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].milestoneValue = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editMilestoneIndex === index
//                                     ? ""
//                                     : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         />
//                         <select
//                             value={milestone.milestoneType}
//                             disabled={editMilestoneIndex !== index}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].milestoneType = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editMilestoneIndex === index
//                                     ? ""
//                                     : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         >
//                             <option value="Referrals">Referrals</option>
//                             <option value="Points">Points</option>
//                         </select>
//                         <select
//                             value={milestone.rewardType}
//                             disabled={editMilestoneIndex !== index}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].rewardType = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editMilestoneIndex === index
//                                     ? ""
//                                     : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         >
//                             <option value="Points">Points</option>
//                             <option value="Item">Item</option>
//                         </select>
//                         <input
//                             type="text"
//                             placeholder="Reward"
//                             value={milestone.reward}
//                             disabled={editMilestoneIndex !== index}
//                             onChange={(e) =>
//                                 setMilestoneMapping((prev) => {
//                                     const updated = [...prev];
//                                     updated[index].reward = e.target.value;
//                                     return updated;
//                                 })
//                             }
//                             className={`w-1/4 p-2 border rounded ${
//                                 editMilestoneIndex === index
//                                     ? ""
//                                     : "bg-gray-100 cursor-not-allowed"
//                             }`}
//                         />
//                         <button
//                             onClick={() =>
//                                 editMilestoneIndex === index
//                                     ? handleSaveMilestone(index)
//                                     : handleEditMilestone(index)
//                             }
//                             className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                         >
//                             {editMilestoneIndex === index ? <FaSave /> : <FaEdit />}
//                         </button>
//                         <button
//                             onClick={() => handleDeleteMilestone(index)}
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
