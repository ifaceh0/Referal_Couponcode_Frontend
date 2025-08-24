import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";
import { getCurrentUser } from '../../../api/signin';


// const DashboardGraphs = ({ shopkeeperId }) => {
//     const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
//                 const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);
//                 processGraphData(referralCodes, couponCodes);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, [shopkeeperId]);

//     const processGraphData = (referrals, coupons) => {
//         const currentYear = new Date().getFullYear();
//         const currentMonthIndex = new Date().getMonth();

//         const yearlyData = Array.from({ length: 12 }, (_, i) => {
//             const monthIndex = (currentMonthIndex - (11 - i) + 12) % 12;
//             const year = monthIndex > currentMonthIndex ? currentYear - 1 : currentYear;
//             return {
//                 month: `${new Date(0, monthIndex).toLocaleString("default", { month: "short" })} '${year.toString().slice(-2)}`,
//                 referralCodes: 0,
//                 couponCodes: 0,
//                 monthIndex,
//                 year,
//             };
//         });

//         referrals.forEach(({ createdDate }) => {
//             const date = new Date(createdDate);
//             const index = yearlyData.findIndex(d => d.monthIndex === date.getMonth() && d.year === date.getFullYear());
//             if (index !== -1) yearlyData[index].referralCodes++;
//         });

//         coupons.forEach(({ createdDate }) => {
//             const date = new Date(createdDate);
//             const index = yearlyData.findIndex(d => d.monthIndex === date.getMonth() && d.year === date.getFullYear());
//             if (index !== -1) yearlyData[index].couponCodes++;
//         });

//         setGraphData((prev) => ({ ...prev, yearly: yearlyData }));
//         processMonthlyData(referrals, coupons, selectedYear, selectedMonth);
//     };

//     const processMonthlyData = (referrals, coupons, year, month) => {
//         const daysInMonth = new Date(year, month + 1, 0).getDate();
//         const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
//             day: i + 1,
//             referralCodes: 0,
//             couponCodes: 0,
//         }));

//         referrals.forEach(({ createdDate }) => {
//             const date = new Date(createdDate);
//             if (date.getMonth() === month && date.getFullYear() === year) {
//                 monthlyData[date.getDate() - 1].referralCodes++;
//             }
//         });

//         coupons.forEach(({ createdDate }) => {
//             const date = new Date(createdDate);
//             if (date.getMonth() === month && date.getFullYear() === year) {
//                 monthlyData[date.getDate() - 1].couponCodes++;
//             }
//         });

//         setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
//                 const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);
//                 processMonthlyData(referralCodes, couponCodes, selectedYear, selectedMonth);
//             } catch (error) {
//                 console.error("Error fetching monthly data:", error);
//             }
//         };

//         fetchData();
//     }, [selectedYear, selectedMonth, shopkeeperId]);

//     return (
//         <div className="p-5">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>

//             {/* Yearly Graph */}
//             <div className="bg-white p-4 shadow-md rounded-lg mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-center">Yearly View (Latest Month Centered)</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={graphData.yearly}>
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
//                         <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Monthly Graph */}
//             <div className="bg-white p-4 shadow-md rounded-lg">
//                 <h3 className="text-lg font-semibold mb-2 text-center">Monthly View</h3>
//                 <div className="flex justify-center gap-4 mb-4">
//                     <select
//                         value={selectedYear}
//                         onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                         className="border border-gray-300 p-2 rounded-md"
//                     >
//                         {[...Array(5)].map((_, i) => {
//                             const year = new Date().getFullYear() - i;
//                             return <option key={year} value={year}>{year}</option>;
//                         })}
//                     </select>

//                     <select
//                         value={selectedMonth}
//                         onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                         className="border border-gray-300 p-2 rounded-md"
//                     >
//                         {Array.from({ length: 12 }, (_, i) => (
//                             <option key={i} value={i}>
//                                 {new Date(0, i).toLocaleString("default", { month: "long" })}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={graphData.monthly}>
//                         <XAxis dataKey="day" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
//                         <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

const DashboardGraphs = ({ shopkeeperId }) => {
    const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const user = await getCurrentUser();
            setUserDetails(user);
             console.log(user)
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        
        fetchUser();
      }, []);

    useEffect(() => {
         if (!userDetails) return;
        const fetchData = async () => {
            try {
                const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
                const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);

                // ✅ Apply filtering based on user subscription/application
                let filteredReferrals = referralCodes;
                let filteredCoupons = couponCodes;

                if (userDetails.subscription === "yes") {
                    if (userDetails.application_name === "Referral") filteredCoupons = [];
                    if (userDetails.application_name === "Coupon") filteredReferrals = [];
                }

                processGraphData(filteredReferrals, filteredCoupons);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [shopkeeperId,userDetails]);

    const processGraphData = (referrals, coupons) => {
        const currentYear = new Date().getFullYear();
        const currentMonthIndex = new Date().getMonth();

        const yearlyData = Array.from({ length: 12 }, (_, i) => {
            const monthIndex = (currentMonthIndex - (11 - i) + 12) % 12;
            const year = monthIndex > currentMonthIndex ? currentYear - 1 : currentYear;
            return {
                month: `${new Date(0, monthIndex).toLocaleString("default", { month: "short" })} '${year.toString().slice(-2)}`,
                referralCodes: 0,
                couponCodes: 0,
                monthIndex,
                year,
            };
        });

        referrals.forEach(({ createdDate }) => {
            const date = new Date(createdDate);
            const index = yearlyData.findIndex(d => d.monthIndex === date.getMonth() && d.year === date.getFullYear());
            if (index !== -1) yearlyData[index].referralCodes++;
        });

        coupons.forEach(({ createdDate }) => {
            const date = new Date(createdDate);
            const index = yearlyData.findIndex(d => d.monthIndex === date.getMonth() && d.year === date.getFullYear());
            if (index !== -1) yearlyData[index].couponCodes++;
        });

        setGraphData((prev) => ({ ...prev, yearly: yearlyData }));
        processMonthlyData(referrals, coupons, selectedYear, selectedMonth);
    };

    const processMonthlyData = (referrals, coupons, year, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            referralCodes: 0,
            couponCodes: 0,
        }));

        referrals.forEach(({ createdDate }) => {
            const date = new Date(createdDate);
            if (date.getMonth() === month && date.getFullYear() === year) {
                monthlyData[date.getDate() - 1].referralCodes++;
            }
        });

        coupons.forEach(({ createdDate }) => {
            const date = new Date(createdDate);
            if (date.getMonth() === month && date.getFullYear() === year) {
                monthlyData[date.getDate() - 1].couponCodes++;
            }
        });

        setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
    };

    useEffect(() => {
        if (!userDetails) return;
        const fetchData = async () => {
            try {
                const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
                const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);

                let filteredReferrals = referralCodes;
                let filteredCoupons = couponCodes;

                if (userDetails.subscription === "yes") {
                    if (userDetails.application_name === "Referral") filteredCoupons = [];
                    if (userDetails.application_name === "Coupon") filteredReferrals = [];
                }

                processMonthlyData(filteredReferrals, filteredCoupons, selectedYear, selectedMonth);
            } catch (error) {
                console.error("Error fetching monthly data:", error);
            }
        };

        fetchData();
    }, [selectedYear, selectedMonth, shopkeeperId,userDetails]);

    if (!userDetails) {
    return <p className="text-gray-500">Loading user details....</p>;
  }

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {userDetails.application_name === "Referral"
                    ? "Referral Code Generation"
                    : userDetails.application_name === "Coupon"
                        ? "Coupon Code Generation"
                        : "Referral vs Coupon Code Generation"}
            </h2>

            {/* Yearly Graph */}
            <div className="bg-white p-4 shadow-md rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">Yearly View</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={graphData.yearly}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {(userDetails.subscription === "no" || userDetails.application_name === "Referral") && (
                            <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
                        )}
                        {(userDetails.subscription === "no" || userDetails.application_name === "Coupon") && (
                            <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Graph */}
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-center">Monthly View</h3>
                <div className="flex justify-center gap-4 mb-4">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        {[...Array(5)].map((_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>

                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString("default", { month: "long" })}
                            </option>
                        ))}
                    </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.monthly}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {(userDetails.subscription === "no" || userDetails.application_name === "Referral") && (
                            <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
                        )}
                        {(userDetails.subscription === "no" || userDetails.application_name === "Coupon") && (
                            <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default DashboardGraphs;


