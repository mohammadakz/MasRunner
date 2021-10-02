import React from "react";
import { LoggedinContext } from "../Context/UserContext";

const UserLocation = () => {
  const accToken = localStorage.getItem("acc");
  const {
    state: { selectedActivityLogs },
    actions: { getPath },
  } = React.useContext(LoggedinContext);
  React.useEffect(() => {
    const pathArray = [];

    if (accToken && selectedActivityLogs.length) {
      const fetchLocations = async () => {
        await selectedActivityLogs.map((logid) => {
          return fetch(
            `https://api.fitbit.com/1/user/-/activities/${logid.toString()}.tcx?includePartialTCX=true`,
            {
              headers: {
                Authorization: `Bearer ${accToken}`,
              },
            }
          )
            .then((response) => response.text())
            .then((str) => {
              const parser = new DOMParser();
              const xml = parser.parseFromString(str, "text/xml");

              const LatitudeDegrees = Object.values(
                xml.getElementsByTagName("LatitudeDegrees")
              );
              // console.log("LatitudeDegrees", LatitudeDegrees);

              const LongitudeDegrees = Object.values(
                xml.getElementsByTagName("LongitudeDegrees")
              );
              LatitudeDegrees.map((loc, index) => {
                pathArray.push({
                  lat: LatitudeDegrees[index].textContent,
                  lng: LongitudeDegrees[index].textContent,
                });
              });
              console.log("PATHARRAY", pathArray);
              getPath(pathArray);
            });
        });
      };
      fetchLocations();
    } else {
      getPath([]);
    }
  }, [selectedActivityLogs]);
  return <></>;
};

export default UserLocation;
