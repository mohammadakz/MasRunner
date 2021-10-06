import React from "react";
import Chart from "react-google-charts";
import { LoggedinContext } from "./Context/UserContext";

const UserChart = () => {
  const {
    state: { walkPerDay, selectedDate },
    actions: { getWalkPerDay },
  } = React.useContext(LoggedinContext);
  const accToken = localStorage.getItem("acc");
  const userID = localStorage.getItem("userId");

  React.useEffect(() => {
    fetch(
      `https://api.fitbit.com//1/user/${userID}/activities/distance/date/${selectedDate}/1d.json`,
      {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data["activities-distance"].length < 2) {
          getWalkPerDay([]);
        } else {
          getWalkPerDay(data["activities-distance-intraday"].dataset);
        }
      });
  }, [selectedDate]);
  const dataW = [];
  let sum = 0;
  let time = 0;
  dataW.push(["Hours", "Distance"]);
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
      data={dataW}
      options={{
        chartArea: {
          width: "85%",
          height: "85%",
        },
        colors: ["#8e0120", "#276419"],
        pointSize: 2,
        animation: {
          duration: 1000,
          easing: "out",
          startup: true,
        },
        title: "Exercise Chart",
        legend: "none",
        vAxis: { title: "Distance (km)", gridlines: { count: 4 } },
        hAxis: { gridlines: { count: 24 } },
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default UserChart;
