import React from "react";
import { LoggedinContext } from "../Context/UserContext";

const UserLocation = () => {
  const accToken = localStorage.getItem("acc");
  const {
    actions: { getPath },
  } = React.useContext(LoggedinContext);
  const pathArray = [];
  React.useEffect(() => {
    if (accToken) {
      const getUserLoc = async () => {
        await fetch(
          `https://api.fitbit.com/1/user/-/activities/${43140424434}.tcx?includePartialTCX=true`,
          {
            headers: {
              Authorization: `Bearer ${accToken}`,
            },
          }
        )
          .then((response) => response.text())
          .then((str) => {
            // const dataAsJson = JSON.parse(convert.xml2json(str));
            const parser = new DOMParser();
            const xml = parser.parseFromString(str, "text/xml");

            const LatitudeDegrees = Object.values(
              xml.getElementsByTagName("LatitudeDegrees")
            );
            const LongitudeDegrees = Object.values(
              xml.getElementsByTagName("LongitudeDegrees")
            );
            // console.log(Object.values(LatitudeDegrees)[0].textContent);
            LatitudeDegrees.map((loc, index) => {
              // console.log("loc", loc.lat);
              pathArray.push({
                lat: LatitudeDegrees[index].textContent,
                lng: LongitudeDegrees[index].textContent,
              });
            });
            getPath(pathArray);
            // console.log(LongitudeDegrees[0].textContent);
            // console.log(LatitudeDegrees[0].textContent);
          });
      };
      getUserLoc();
      // .then((response) => response.text())
      // .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      // .then((data) => console.log(data));
    }
  }, []);
  return <></>;
};

export default UserLocation;
