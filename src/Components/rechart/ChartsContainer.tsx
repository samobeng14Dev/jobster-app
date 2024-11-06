import React, { useState } from "react";
import BarChartComponent from "./BarCharts";
import AreaChartComponent from "./AreaChart";
import Wrapper from "../../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface MonthlyApplication {
  date: string;
  count: number;
}

const ChartsContainer: React.FC = () => {
  const [barChart, setBarChart] = useState<boolean>(true);

  // Fetch the data from the Redux store
  const { monthlyApplications } = useSelector((store: RootState) => store.alljobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {/* Pass only the monthlyApplications data to the charts */}
      {barChart ? (
        <BarChartComponent data={monthlyApplications} />
      ) : (
        <AreaChartComponent data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
