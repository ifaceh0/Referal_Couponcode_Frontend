import React from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Jan", referrals: 400, coupons: 240 },
  { name: "Feb", referrals: 300, coupons: 139 },
  { name: "Mar", referrals: 200, coupons: 980 },
  { name: "Apr", referrals: 278, coupons: 390 },
  { name: "May", referrals: 189, coupons: 480 },
  { name: "Jun", referrals: 239, coupons: 380 },
  { name: "Jul", referrals: 349, coupons: 430 },
];

const COLORS = ["#7c3aed", "#fb923c"];

const ComparisonGraphs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Bar Chart - Referral vs Coupon Codes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="referrals" fill={COLORS[0]} />
            <Bar dataKey="coupons" fill={COLORS[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Line Chart - Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="referrals" stroke={COLORS[0]} />
            <Line type="monotone" dataKey="coupons" stroke={COLORS[1]} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Area Chart - Growth Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="referrals" stroke={COLORS[0]} fill={COLORS[0]} opacity={0.7} />
            <Area type="monotone" dataKey="coupons" stroke={COLORS[1]} fill={COLORS[1]} opacity={0.7} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Pie Chart - Usage Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="referrals" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill={COLORS[0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Pie data={data} dataKey="coupons" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={120} fill={COLORS[1]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Radar Chart - Performance View</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Referrals" dataKey="referrals" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
            <Radar name="Coupons" dataKey="coupons" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonGraphs;
