import React from "react";
import Chart from "react-google-charts";
import { LoggedinContext } from "./Context/UserContext";

const UserChart = () => {
  const {
    state: { walkPerDay },
    actions: { getWalkPerDay },
  } = React.useContext(LoggedinContext);
  const accToken = localStorage.getItem("acc");
  //variable for data
  //get walking data
  //Make sure values are
  const year = "2021";
  const month = "09";
  const day = "27";
  React.useEffect(() => {
    fetch(
      `https://api.fitbit.com//1/user/9LGDJ3/activities/distance/date/${year}-${month}-${day}/1d.json`,
      {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        getWalkPerDay(data["activities-distance-intraday"].dataset);
      });
  }, []);
  const dataW = [];
  let sum = 0;
  let time = 0;
  walkPerDay.map((item) => {
    const arrOfTime = item.time.split(":");
    const seconds = arrOfTime[0] * 3600 + arrOfTime[1] * 60 + +arrOfTime[2];
    sum = sum + item.value;
    if (seconds % 3600 === 0) {
      dataW.push([time, sum]);
      sum = 0;
      time++;
    }
  });

  return (
    <Chart
      width={"20vw"}
      height={"20vh"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["x", "dogs"],
        dataW[0],
        dataW[1],
        dataW[2],
        dataW[3],
        dataW[4],
        dataW[5],
        dataW[6],
        dataW[7],
        dataW[8],
        dataW[9],
        dataW[10],
        dataW[12],
        dataW[13],
        dataW[14],
        dataW[15],
        dataW[16],
        dataW[17],
        dataW[18],
        dataW[19],
        dataW[20],
        dataW[21],
        dataW[22],
        dataW[23],
      ]}
      options={{
        chartArea: {
          width: "85%",
          height: "85%",
        },
        colors: ["#8e0152", "#276419"],
        pointSize: 2,
        animation: {
          duration: 1000,
          easing: "out",
          startup: true,
        },
        legend: "none",
      }}
    />
  );
};

export default UserChart;
