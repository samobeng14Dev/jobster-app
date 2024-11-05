import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Define the structure of each data point
interface MonthlyApplication {
  date: string;  // Date format like "Nov 2021"
  count: number; // Count is a number
}

interface AreaChartComponentProps {
  data: MonthlyApplication[];  // An array of MonthlyApplication objects
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
