import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { discountData } from "../../../../utils/demoData";
import { toast, ToastContainer } from 'react-toastify';
import { getSettingsAction, updateSettingsAction } from "../../../../api/settingPageApi";
import { getCurrentUser } from "../../../../api/signin";



const ReferralCodeSettings = ({ shopkeeperId, token }) => {
    const [loading, setLoading] = useState(true);
    // const [useCredits, setUseCredits] = useState(true);
    // const [signupPoints, setSignupPoints] = useState(100);
    const [signUpDollars, setSignupDollars] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [existingCustomerReward, setExistingCustomerReward] = useState(false);
    const [newCustomerReward, setNewCustomerReward] = useState(false);
    const [discountMapping, setDiscountMapping] = useState(discountData.discountMapping);
    const [milestoneMapping, setMilestoneMapping] = useState(discountData.milestoneMapping);
    const [userDetails, setUserDetails] = useState(null);
    const [applications, setApplications] = useState([]);
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
                 // check applications returned from backend
                    if (user.application_name && Array.isArray(user.application_name)) {
                    setApplications(user.application_name);
                    } else if (user.application_name) {
                    setApplications([user.application_name]);
                    }
                if (user?.id) {
                    // setLoading(true);
                    const response = await getSettingsAction(user?.id);
                    console.log(response)

                    if (response) {
                        // const settings = response.settings.referralSettings || {};
                        const settings = response
                        // setUseCredits(settings.useCredits ?? true);
                        // setSignupPoints(settings.signupPoints ?? 100);
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
            // setLoading(true);
            const settingsData = {
                shopkeeperId: userDetails.id,
                // useCredits,
                signUpDollars,
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
            toast.success('Promotion added successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to save promotion');
            console.error('Error saving promotion:', error);
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
        return <div className="p-6 text-center">Loading promotions...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Promotion Settings</h2>
                <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-md rounded-lg border border-gray-200">
                 <div className="flex justify-end items-center mb-6">
                    {/* <h2 className="text-2xl font-bold">Promotion Settings</h2> */}
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
                {/* <div className="flex items-center mb-6">
                    <label className="font-bold mr-4">Use Credits:</label>
                    <input
                        type="checkbox"
                        checked={useCredits}
                        onChange={(e) => setUseCredits(e.target.checked)}
                        disabled={!isEditing}
                        className="toggle-checkbox"
                    />
                </div> */}

                <div className="mb-6">
                    <div className="flex justify-between items-start gap-8 flex-wrap">
                        {/* Signup for New Users */}
                        <div>
                            <h3 className="font-bold">
                                Bonus
                                {/* {useCredits ? "Dollars" : "Points"}  */}
                                
                            </h3>
                            {isEditing ? (
                                <input
                                    type="number"
                                    // value={useCredits ? signUpDollars : signupPoints}
                                    // onChange={(e) =>
                                    //     useCredits
                                    //         ? setSignupDollars(Number(e.target.value))
                                    //         : setSignupPoints(Number(e.target.value))
                                    // }
                                    value={signUpDollars}
                                    onChange={(e) => setSignupDollars(Number(e.target.value))}
                                    className="border p-2 rounded mt-2 w-32"
                                />
                            ) : (
                                <p className="mt-2">
                                    {/* {useCredits ? `$${signUpDollars}` : `${signupPoints} Points`} */}
                                    ${signUpDollars}
                                </p>
                            )}
                        </div>

                        <div>
                            <h3 className="font-bold mb-2">Existing Customer</h3>
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
                            <h3 className="font-bold mb-2">New Customer</h3>
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
                {applications.includes("Referral") && (
                <div className="mb-6 border-t pt-6">
                    <h3 className="font-bold mb-4">Current Referral Promotion</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Begin Date</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={promotion.beginDate}
                                    onChange={(e) => setPromotion({ ...promotion, beginDate: e.target.value, expiryDate: '' })} // Clear endDate if beginDate changes
                                    className="w-full p-2 border rounded"
                                    min={new Date().toISOString().split("T")[0]} // today
                                />
                            ) : (
                                <p>{promotion.beginDate || 'Not set'}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={promotion.expiryDate}
                                    onChange={(e) => setPromotion({ ...promotion, expiryDate: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    min={promotion.beginDate || new Date().toISOString().split("T")[0]} // endDate ≥ beginDate
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
                                    min={0}
                                    value={promotion.referralAmount}
                                    onChange={(e) => setPromotion({ ...promotion, referralAmount: Number(e.target.value),
                                        referralAmount: Math.max(0, Number(e.target.value)),
                                     })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            ) : (
                                // <p>{promotion.referralAmount ? (useCredits ? `$${promotion.referralAmount}` : `${promotion.referralAmount} Points`) : 'Not set'}</p>
                                <p>{promotion.referralAmount ? `$${promotion.referralAmount}` : 'Not set'}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Referrer Amount</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    min={0}
                                    value={promotion.referrerAmount}
                                    onChange={(e) => setPromotion({ ...promotion, referrerAmount: Number(e.target.value),
                                         referrerAmount: Math.max(0, Number(e.target.value)),
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                />
                            ) : (
                                // <p>{promotion.referrerAmount ? (useCredits ? `$${promotion.referrerAmount}` : `${promotion.referrerAmount} Points`) : 'Not set'}</p>
                                <p>{promotion.referrerAmount ? `$${promotion.referrerAmount}` : 'Not set'}</p>
                            )}
                        </div>
                    </div>
                </div>
                )}

                {/* Milestone Mapping */}
                {applications.includes("Referral") && (
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
                )}
                </div>
                {/* Current Coupon Promotion */}
                {applications.includes("Coupon") && (
                <div className="mb-6 border-t pt-6">
                    {/* <h2 className="text-xl font-bold">Current Coupon Promotion</h2> */}
                    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-md rounded-lg border border-gray-200">
                    <h3 className="font-bold mb-4">Current Referral Promotion</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Begin Date</label>
                            {isEditing ? (
                                <input
                                type="date"
                                value={couponPromotion.beginDate}
                                onChange={(e) =>
                                    setCouponPromotion({ ...couponPromotion, beginDate: e.target.value, expiryDate: '' }) // Clear endDate if beginDate changes
                                }
                                className="w-full p-2 border rounded"
                                min={new Date().toISOString().split("T")[0]} // today
                                />
                            ) : (
                                <p>{couponPromotion.beginDate || "Not set"}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            {isEditing ? (
                                <input
                                type="date"
                                value={couponPromotion.expiryDate}
                                onChange={(e) =>
                                    setCouponPromotion({ ...couponPromotion, expiryDate: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                min={couponPromotion.beginDate || new Date().toISOString().split("T")[0]} // endDate ≥ beginDate
                                />
                            ) : (
                                <p>{couponPromotion.expiryDate || "Not set"}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Coupon Amount</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    min={0}
                                    value={couponPromotion.couponAmount}
                                    onChange={(e) => setCouponPromotion({ ...couponPromotion, couponAmount: Number(e.target.value),
                                        couponAmount: Math.max(0, Number(e.target.value)),
                                     })}
                                    className="w-full p-2 border rounded"
                                />
                            ) : (
                                // <p>{couponPromotion.couponAmount ? (useCredits ? `$${couponPromotion.couponAmount}` : `${couponPromotion.couponAmount} Points`) : 'Not set'}</p>
                                <p>{couponPromotion.couponAmount ? `$${couponPromotion.couponAmount}` : 'Not set'}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Limit of Use</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    min={0}
                                    value={couponPromotion.limitOfUse}
                                    onChange={(e) => setCouponPromotion({ ...couponPromotion, limitOfUse: Number(e.target.value),
                                        limitOfUse: Math.max(0, Number(e.target.value)),
                                     })}
                                    className="w-full p-2 border rounded"
                                />
                            ) : (
                                <p>{couponPromotion.limitOfUse || 'Not set'}</p>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
                )}
                {/* Discount Mapping (Credits only) */}
                {/* {!useCredits && ( */}
                
                {/* )} */}

                
            </div>
        </>
    );

};

export default ReferralCodeSettings;