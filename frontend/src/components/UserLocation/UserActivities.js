import { darken } from "@material-ui/core";
import React from "react";

const UserActivities = () => {
  const accToken = localStorage.getItem("acc");
  const userId = localStorage.getItem("userId");
  const userActivities = [];

  //activities after this date
  //activity name walk logId
  React.useEffect(() => {
    if (accToken) {
      fetch(
        `https://api.fitbit.com/1/user/-/activities/list.json?afterDate=${20200928}&offset=0&limit=20&sort=asc`,
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          data.activities.map((activity) => {
            if (activity.activityName === "Walk") {
              const activityInfo = {
                duration: activity.activeDuration,
                distance: activity.distance,
                idlog: activity.logId,
              };
              userActivities.push(activityInfo);
            }
          });
          const activityInfo = {
            userId,
            activity: data.activities,
          };
          fetch("/activities", {
            method: "POST",
            body: JSON.stringify(activityInfo),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
        });
    }
  }, []);

  return <></>;
};

export default UserActivities;
