import React from "react";
import Chart from "react-google-charts";

const UserChart = () => {
  return (
    <Chart
      width={"20%"}
      height={"10%"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["x", "dogs"],
        [0, 0],
        [1, 10],
        [2, 23],
        [3, 17],
        [4, 18],
        [5, 9],
        [6, 11],
        [7, 27],
        [8, 33],
        [9, 40],
        [10, 32],
        [11, 35],
      ]}
      options={{
        chartArea: {
          width: "85%",
          height: "85%",
        },
        colors: ["#8e0152", "#276419"],
        pointSize: 10,
        animation: {
          duration: 1000,
          easing: "out",
          startup: true,
        },
        legend: "none",
      }}
      // rootProps={{ "data-testid": "1" }}
    />
  );
};

export default UserChart;
