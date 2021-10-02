import React from "react";
import { LoggedinContext } from "../Context/UserContext";

const UserLocation = () => {
  const accToken = localStorage.getItem("acc");
  const {
    state: { selectedActivityLogs, selectedDate },
    actions: { getPath },
  } = React.useContext(LoggedinContext);
  const pathArray = [];
  const urls = [];

  selectedActivityLogs.forEach((logid) => {
    urls.push(
      `https://api.fitbit.com/1/user/-/activities/${logid.toString()}.tcx?includePartialTCX=true`
    );
  });

  const getData = (urls) =>
    fetch(urls, {
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
    })
      .then((res) => res.text())
      .then((str) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

        const LatitudeDegrees = Object.values(
          xml.getElementsByTagName("LatitudeDegrees")
        );
        const LongitudeDegrees = Object.values(
          xml.getElementsByTagName("LongitudeDegrees")
        );
        LatitudeDegrees.forEach((loc, index) => {
          pathArray.push({
            lat: LatitudeDegrees[index].textContent,
            lng: LongitudeDegrees[index].textContent,
          });
        });
      });
  React.useEffect(() => {
    Promise.all(urls.map(getData)).then(() => {
      console.log(pathArray);
      getPath(pathArray);
    });
  }, [selectedActivityLogs]);
  return <></>;
};

export default UserLocation;
