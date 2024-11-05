import React, { useState } from "react";
import BarChartComponent from "./BarCharts";  // Assuming this is your BarChart component
import AreaChartComponent from "./AreaChart";  // Ensure you're importing your custom AreaChartComponent
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useAppSelector } from "../reduxHooks";
import { RootState } from "../store";

interface ChartData {
  date: string;
  count: number;
}

const ChartsContainer: React.FC = () => {
  const [barChart, setBarChart] = useState(true);

  const { monthlyApplications: rawData } = useAppSelector(
    (store: RootState) => store.alljobs
  );

  // Ensure rawData is in the correct shape: [{ date: string, count: number }]
  const data: ChartData[] = rawData.map((count, index) => ({
    date: `Month ${index + 1}`, // Replace this with actual logic if you have months
    count: count,
  }));

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
