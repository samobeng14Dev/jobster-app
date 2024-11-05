import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the structure of each data point
interface ChartData {
  date: string;  // Date format like "Nov 2021"
  count: number; // Numeric value for the count
}

interface BarChartComponentProps {
  data: ChartData[];  // An array of ChartData objects
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
