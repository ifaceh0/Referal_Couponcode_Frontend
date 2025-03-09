import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Card from "../../ui/Card";

const ChartContainer = ({ title, children, width = 600, height = 400 }) => (
  <Card className="p-4 m-4 shadow-lg rounded-xl bg-white">
    <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
    <div style={{ width, height }}>{children}</div>
  </Card>
);

export const BarChartComponent = ({ data, width = 600, height = 400 }) => (
  <ChartContainer title="Referral vs Coupon Code Generation" width={width} height={height}>
    <BarChart width={width} height={height} data={data}>
      <XAxis dataKey="timeFrame" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="referralCodes" fill="#7c3aed" name="Referral Codes" />
      <Bar dataKey="couponCodes" fill="#fb923c" name="Coupon Codes" />
    </BarChart>
  </ChartContainer>
);

export const LineChartComponent = ({ data, width = 600, height = 400 }) => (
  <ChartContainer title="Referral vs Coupon Code Trend" width={width} height={height}>
    <LineChart width={width} height={height} data={data}>
      <XAxis dataKey="timeFrame" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="referralCodes" stroke="#7c3aed" name="Referral Codes" />
      <Line type="monotone" dataKey="couponCodes" stroke="#fb923c" name="Coupon Codes" />
    </LineChart>
  </ChartContainer>
);
