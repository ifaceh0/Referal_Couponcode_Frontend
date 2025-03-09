import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";

const DashboardGraphs = ({ shopkeeperId }) => {
    const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
                const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);
                processGraphData(referralCodes, couponCodes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [shopkeeperId]);

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
        const fetchData = async () => {
            try {
                const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
                const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);
                processMonthlyData(referralCodes, couponCodes, selectedYear, selectedMonth);
            } catch (error) {
                console.error("Error fetching monthly data:", error);
            }
        };

        fetchData();
    }, [selectedYear, selectedMonth, shopkeeperId]);

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>

            {/* Yearly Graph */}
            <div className="bg-white p-4 shadow-md rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">Yearly View (Latest Month Centered)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={graphData.yearly}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
                        <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
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
                        <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
                        <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardGraphs;


// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";

// const DashboardGraphs = ({ shopkeeperId }) => {
//     const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
//     const [view, setView] = useState("yearly"); // "yearly" or "monthly"
//     const [selectedMonth, setSelectedMonth] = useState(null);

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
//         const latestEntry = [...referrals, ...coupons].reduce((latest, item) => 
//             new Date(item.createdDate) > new Date(latest.createdDate) ? item : latest, { createdDate: new Date() }
//         );

//         const latestDate = new Date(latestEntry.createdDate);
//         const latestMonthIndex = latestDate.getMonth();
//         const latestYear = latestDate.getFullYear();

//         const yearlyData = Array.from({ length: 12 }, (_, i) => {
//             const monthIndex = (latestMonthIndex - (11 - i) + 12) % 12;
//             const monthYear = monthIndex > latestMonthIndex ? latestYear - 1 : latestYear;
//             return {
//                 month: `${new Date(0, monthIndex).toLocaleString("default", { month: "short" })} '${monthYear.toString().slice(-2)}`,
//                 referralCodes: 0,
//                 couponCodes: 0,
//                 monthIndex,
//                 year: monthYear,
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
//     };

//     const handleMonthClick = (data) => {
//         if (!data || (!data.referralCodes && !data.couponCodes)) return;

//         const daysInMonth = new Date(data.year, data.monthIndex + 1, 0).getDate();
//         const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
//             day: i + 1,
//             referralCodes: 0,
//             couponCodes: 0,
//         }));

//         getAllReferralCodeByShopkeeper(shopkeeperId).then((referrals) => {
//             referrals.forEach(({ createdDate }) => {
//                 const date = new Date(createdDate);
//                 if (date.getMonth() === data.monthIndex && date.getFullYear() === data.year) {
//                     monthlyData[date.getDate() - 1].referralCodes++;
//                 }
//             });
//             setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//         });

//         getAllCouponCodeByShopkeeper(shopkeeperId).then((coupons) => {
//             coupons.forEach(({ createdDate }) => {
//                 const date = new Date(createdDate);
//                 if (date.getMonth() === data.monthIndex && date.getFullYear() === data.year) {
//                     monthlyData[date.getDate() - 1].couponCodes++;
//                 }
//             });
//             setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//         });

//         setSelectedMonth(data.month);
//         setView("monthly");
//     };

//     const resetView = () => {
//         setView("yearly");
//         setSelectedMonth(null);
//     };

//     return (
//         <div className="p-5">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>
//             <div className="bg-white p-4 shadow-md rounded-lg">
//                 <h3 className="text-lg font-semibold mb-2 text-center">
//                     {view === "yearly" ? "Yearly View (Latest Month Centered)" : `Monthly View (${selectedMonth})`}
//                 </h3>
//                 {view === "yearly" ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={graphData.yearly} onClick={(e) => handleMonthClick(e.activePayload?.[0]?.payload)}>
//                             <XAxis dataKey="month" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
//                             <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 ) : (
//                     // <ResponsiveContainer key={graphData.monthly.length} width="100%" height={300}>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={graphData.monthly}>
//                             <XAxis dataKey="day" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
//                             <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 )}
//                 {view === "monthly" && (
//                     <button onClick={resetView} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
//                         Reset to Yearly View
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DashboardGraphs;


// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";

// const DashboardGraphs = ({ shopkeeperId }) => {
//     const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
//     const [view, setView] = useState("yearly"); // "yearly" or "monthly"
//     const [selectedMonth, setSelectedMonth] = useState(null);

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
//         const yearlyData = Array.from({ length: 12 }, (_, i) => ({
//             month: new Date(0, i).toLocaleString("default", { month: "short" }),
//             referralCodes: 0,
//             couponCodes: 0,
//         }));

//         referrals.forEach(({ createdDate }) => {
//             const monthIndex = new Date(createdDate).getMonth();
//             yearlyData[monthIndex].referralCodes++;
//         });

//         coupons.forEach(({ createdDate }) => {
//             const monthIndex = new Date(createdDate).getMonth();
//             yearlyData[monthIndex].couponCodes++;
//         });

//         setGraphData((prev) => ({ ...prev, yearly: yearlyData }));
//     };

//     const handleMonthClick = (data) => {
//         if (!data || (!data.referralCodes && !data.couponCodes)) return;

//         const monthIndex = new Date("1 " + data.month + " 2024").getMonth();
//         const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
//         const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
//             day: i + 1,
//             referralCodes: 0,
//             couponCodes: 0,
//         }));

//         graphData.yearly[monthIndex].referralCodes && 
//         getAllReferralCodeByShopkeeper(shopkeeperId).then((referrals) => {
//             referrals.forEach(({ createdDate }) => {
//                 const date = new Date(createdDate);
//                 if (date.getMonth() === monthIndex) {
//                     monthlyData[date.getDate() - 1].referralCodes++;
//                 }
//             });
//             setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//         });

//         graphData.yearly[monthIndex].couponCodes && 
//         getAllCouponCodeByShopkeeper(shopkeeperId).then((coupons) => {
//             coupons.forEach(({ createdDate }) => {
//                 const date = new Date(createdDate);
//                 if (date.getMonth() === monthIndex) {
//                     monthlyData[date.getDate() - 1].couponCodes++;
//                 }
//             });
//             setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//         });

//         setSelectedMonth(data.month);
//         setView("monthly");
//     };

//     const resetView = () => {
//         setView("yearly");
//         setSelectedMonth(null);
//     };

//     return (
//         <div className="p-5">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>
//             <div className="bg-white p-4 shadow-md rounded-lg">
//                 <h3 className="text-lg font-semibold mb-2 text-center">
//                     {view === "yearly" ? "Yearly View (Jan - Dec)" : `Monthly View (${selectedMonth})`}
//                 </h3>
//                 {view === "yearly" ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={graphData.yearly} onClick={(e) => handleMonthClick(e.activePayload?.[0]?.payload)}>
//                             <XAxis dataKey="month" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
//                             <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 ) : (
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={graphData.monthly}>
//                             <XAxis dataKey="day" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
//                             <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 )}
//                 {view === "monthly" && (
//                     <button onClick={resetView} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
//                         Reset to Yearly View
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DashboardGraphs;



// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";
// import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";
// import Card from "../../ui/Card";

// const DashboardGraphs = ({ shopkeeperId }) => {
//   const [graphData, setGraphData] = useState({ yearly: [], monthly: [] });
//   const [view, setView] = useState("yearly"); // "yearly" or "monthly"
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const referralCodes = await getAllReferralCodeByShopkeeper(shopkeeperId);
//         const couponCodes = await getAllCouponCodeByShopkeeper(shopkeeperId);
//         processGraphData(referralCodes, couponCodes);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [shopkeeperId]);

//   const processGraphData = (referrals, coupons) => {
//     const currentMonth = new Date().getMonth();
//     const yearlyData = Array(12).fill(null).map((_, i) => ({
//       month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
//       referralCodes: 0,
//       couponCodes: 0,
//     }));

//     referrals.forEach(({ createdDate }) => {
//       const date = new Date(createdDate);
//       yearlyData[date.getMonth()].referralCodes++;
//     });

//     coupons.forEach(({ createdDate }) => {
//       const date = new Date(createdDate);
//       yearlyData[date.getMonth()].couponCodes++;
//     });

//     yearlyData.sort((a, b) => (a.month === new Date(2024, currentMonth, 1).toLocaleString("default", { month: "short" }) ? -1 : 1));
//     setGraphData((prev) => ({ ...prev, yearly: yearlyData }));
//   };

//   const handleBarClick = (data) => {
//     if (!data || !data.month) return;
//     const monthIndex = new Date(2024, new Date("2024 " + data.month).getMonth(), 1).getMonth();
    
//     if (graphData.yearly[monthIndex].referralCodes === 0 && graphData.yearly[monthIndex].couponCodes === 0) {
//       return;
//     }

//     setSelectedMonth(monthIndex);
//     generateMonthlyData(monthIndex);
//     setView("monthly");
//   };

//   const generateMonthlyData = (monthIndex) => {
//     const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
//     const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
//       day: i + 1,
//       referralCodes: 0,
//       couponCodes: 0,
//     }));
    
//     setGraphData((prev) => ({ ...prev, monthly: monthlyData }));
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ChartContainer title={view === "yearly" ? "Yearly Overview" : `Monthly View - ${new Date(2024, selectedMonth, 1).toLocaleString("default", { month: "long" })}`}>
//           <ResponsiveContainer width="100%" height={300}>
//             {view === "yearly" ? (
//               <BarChart data={graphData.yearly} onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
//                 <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
//               </BarChart>
//             ) : (
//               <LineChart data={graphData.monthly}>
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
//                 <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
//               </LineChart>
//             )}
//           </ResponsiveContainer>
//         </ChartContainer>
//       </div>
//     </div>
//   );
// };

// const ChartContainer = ({ title, children }) => (
//   <Card className="p-4 m-4 shadow-lg rounded-xl bg-white">
//     <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
//     {children}
//   </Card>
// );

// export default DashboardGraphs;


// import React, { useState, useEffect } from "react";
// import { getAllReferralCodeByShopkeeper, getAllCouponCodeByShopkeeper } from "../../../api/registerUser";
// import { BarChartComponent } from "./g";
// import { LineChartComponent } from "./g";

// const DashboardGraphs = ({ shopkeeperId }) => {
//     const [graphData, setGraphData] = useState({
//         daily: [],
//         weekly: [],
//         monthly: [],
//         yearly: [],
//     });

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
//         const today = new Date();
//         const startOfWeek = new Date(today);
//         startOfWeek.setDate(today.getDate() - 7);

//         const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//         const startOfYear = new Date(today.getFullYear(), 0, 1);

//         const timeFrames = {
//             daily: { referrals: 0, coupons: 0 },
//             weekly: { referrals: 0, coupons: 0 },
//             monthly: { referrals: 0, coupons: 0 },
//             yearly: { referrals: 0, coupons: 0 },
//         };

//         const processData = (data, type) => {
//             data.forEach((item) => {
//                 const createdDate = new Date(item.createdDate);

//                 if (createdDate.toDateString() === today.toDateString()) {
//                     timeFrames.daily[type]++;
//                 }
//                 if (createdDate >= startOfWeek) {
//                     timeFrames.weekly[type]++;
//                 }
//                 if (createdDate >= startOfMonth) {
//                     timeFrames.monthly[type]++;
//                 }
//                 if (createdDate >= startOfYear) {
//                     timeFrames.yearly[type]++;
//                 }
//             });
//         };

//         processData(referrals, "referrals");
//         processData(coupons, "coupons");

//         setGraphData({
//             daily: [
//                 { timeFrame: "Daily", referralCodes: timeFrames.daily.referrals, couponCodes: timeFrames.daily.coupons },
//             ],
//             weekly: [
//                 { timeFrame: "Weekly", referralCodes: timeFrames.weekly.referrals, couponCodes: timeFrames.weekly.coupons },
//             ],
//             monthly: [
//                 { timeFrame: "Monthly", referralCodes: timeFrames.monthly.referrals, couponCodes: timeFrames.monthly.coupons },
//             ],
//             yearly: [
//                 { timeFrame: "Yearly", referralCodes: timeFrames.yearly.referrals, couponCodes: timeFrames.yearly.coupons },
//             ],
//         });
//     };

//     return (
//         <div className="p-5">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Referral vs Coupon Code Generation</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Bar Chart */}
//                 <div className="bg-white p-4 shadow-md rounded-lg">
//                     <h3 className="text-lg font-semibold mb-2 text-center">Bar Chart - Code Generation</h3>
//                     <BarChartComponent data={graphData.yearly} width={500} height={300} />
//                 </div>

//                 {/* Line Chart */}
//                 <div className="bg-white p-4 shadow-md rounded-lg">
//                     <h3 className="text-lg font-semibold mb-2 text-center">Line Chart - Code Trends</h3>
//                     <LineChartComponent data={graphData.daily} width={500} height={300} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardGraphs;
