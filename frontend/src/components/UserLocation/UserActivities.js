import React from "react";
import { LoggedinContext } from "../Context/UserContext";

const UserActivities = () => {
  const {
    state: { selectedDate },
    actions: { getActivityLog, getLogDate },
  } = React.useContext(LoggedinContext);
  const accToken = localStorage.getItem("acc");
  const userId = localStorage.getItem("userId");
  const userActivities = [];
  const activityLogs = [];
  const logDate = [];

  React.useEffect(() => {
    if (accToken) {
      fetch(
        `https://api.fitbit.com/1/user/-/activities/list.json?afterDate=${selectedDate}&offset=0&limit=20&sort=asc`,
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.activities.length) {
            data.activities.map((activity) => {
              if (activity.activityName === "Walk") {
                activityLogs.push(activity.logId);
                logDate.push(activity.lastModified);
                const activityInfo = {
                  duration: activity.activeDuration,
                  distance: activity.distance,
                  idlog: activity.logId,
                };
                userActivities.push(activityInfo);
              }
            });
            getActivityLog(activityLogs);
            getLogDate(logDate);
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
          } else {
            getActivityLog([]);
            getLogDate([]);
          }
        });
    }
  }, [selectedDate]);

  return <></>;
};

export default UserActivities;
